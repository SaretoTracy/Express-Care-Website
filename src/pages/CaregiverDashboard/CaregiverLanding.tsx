import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  DollarSign,
  Briefcase,
  Clock,
  Calendar,
  Award,
  SlidersHorizontal,
  Heart as HeartIcon,
  Search as SearchIcon,
  Bookmark,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import type { IJob, IJobApplication } from "../../Interfaces/IJobs";
import { getAllJobs, applyForJob, getApplicationsByCaregiver } from "../../services/authService";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatJobType = (type: string) =>
  type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

const formatTime = (time: string) => {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
};

// ─── Saved Jobs (localStorage) ────────────────────────────────────────────────
const readSavedJobs = (): string[] => {
  try {
    const raw = localStorage.getItem("savedJobs");
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch { return []; }
};

const writeSavedJobs = (arr: string[]) => {
  try { localStorage.setItem("savedJobs", JSON.stringify(arr)); } catch {}
};

// ─── Filter options ───────────────────────────────────────────────────────────
const FILTERS = {
  workingSchedule: ["FULL_TIME", "PART_TIME", "CONTRACT"],
};

// ─── Animation variants ───────────────────────────────────────────────────────
const modalVariantsDesktop = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -10 },
};
const modalVariantsMobile = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "100%" },
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white animate-pulse">
    <div className="bg-gray-200 h-20 w-full" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
      <div className="h-4 bg-gray-100 rounded w-2/3" />
    </div>
    <div className="px-4 pb-4">
      <div className="h-9 bg-gray-200 rounded-md w-full" />
    </div>
  </div>
);

// ─── Application Status Badge (used on card) ──────────────────────────────────
const ApplicationStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  if (status === "ACCEPTED") {
    return (
      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full text-xs font-semibold">
        ✓ Accepted
      </span>
    );
  }
  if (status === "REJECTED") {
    return (
      <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 border border-red-200 px-2 py-0.5 rounded-full text-xs font-semibold">
        ✗ Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full text-xs font-semibold">
      ⏳ Applied
    </span>
  );
};

// ─── Job Details Modal ────────────────────────────────────────────────────────
const JobDetailsModal: React.FC<{
  job: IJob | null;
  onClose: () => void;
  onToggleSave: (id: string) => void;
  isSaved: boolean;
  application: IJobApplication | null;
  onApply: (jobId: string) => Promise<void>;
  applyLoading: boolean;
  applyError: string | null;
}> = ({ job, onClose, onToggleSave, isSaved, application, onApply, applyLoading, applyError }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 640 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!job) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={isMobile ? modalVariantsMobile : modalVariantsDesktop}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`w-full ${isMobile ? "max-w-full" : "max-w-3xl"} bg-white rounded-t-xl md:rounded-xl overflow-y-auto max-h-[90vh]`}
          style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}
        >
          {/* Header */}
          <div className="bg-[#557A95] p-5 rounded-t-xl flex items-start justify-between text-white">
            <div>
              <h2 className="text-2xl font-bold">{job.job_role}</h2>
              <p className="opacity-90 mt-1 text-sm">{formatJobType(job.job_type)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSave(job.id)}
                className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-white hover:opacity-90 cursor-pointer"
              >
                <HeartIcon className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
                <span className="text-sm">{isSaved ? "Saved" : "Save"}</span>
              </button>
              <button onClick={onClose} className="text-white text-2xl font-medium leading-none cursor-pointer">
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5 text-gray-700">
            {/* Pay + Type */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-[#557A95] font-semibold">
                <DollarSign className="w-4 h-4" />
                <span>${job.payment_rate}/hr</span>
              </div>
              <div className="flex items-center gap-2 bg-[#e68a1f] text-white px-3 py-1 rounded-full font-medium text-sm">
                <Briefcase className="w-4 h-4" />
                <span>{formatJobType(job.job_type)}</span>
              </div>
              {job.is_urgent && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  🔴 Urgent
                </span>
              )}
              {job.is_filled && (
                <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm font-semibold">
                  Position Filled
                </span>
              )}
            </div>

            {/* Shift & Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#557A95] mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Shift</p>
                  <p>{formatTime(job.shift_start)} – {formatTime(job.shift_end)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-[#557A95] mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Dates</p>
                  <p>{formatDate(job.start_date)} → {formatDate(job.end_date)}</p>
                </div>
              </div>
            </div>

            {/* Staff Needed */}
            <div className="flex items-start gap-2 text-sm">
              <Users className="w-4 h-4 text-[#557A95] mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Staff Needed</p>
                <p>{job.staff_needed} position{job.staff_needed !== 1 ? "s" : ""}</p>
              </div>
            </div>

            {/* Certificates */}
            {job.certificates_needed.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Certificates Required</h4>
                <ul className="space-y-1">
                  {job.certificates_needed.map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#e68a1f]" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Posted date */}
            <p className="text-xs text-gray-400">Posted: {formatDate(job.createdAt)}</p>

            {/* ── Application Status or Apply Button ── */}
            {job.is_filled ? (
              <div className="bg-gray-100 text-gray-500 text-center py-3 rounded-lg font-semibold text-sm">
                This position has been filled
              </div>
            ) : application ? (
              <div className={`rounded-xl px-5 py-5 border-2 ${
                application.status === "ACCEPTED"
                  ? "bg-green-50 border-green-300"
                  : application.status === "REJECTED"
                  ? "bg-red-50 border-red-300"
                  : "bg-blue-50 border-blue-200"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`font-bold text-lg ${
                    application.status === "ACCEPTED" ? "text-green-700"
                    : application.status === "REJECTED" ? "text-red-600"
                    : "text-blue-700"
                  }`}>
                    {application.status === "ACCEPTED" && "🎉 Application Accepted!"}
                    {application.status === "REJECTED" && "❌ Application Rejected"}
                    {application.status === "PENDING" && "⏳ Application Pending"}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {application.status === "ACCEPTED" && "Congratulations! The provider has accepted your application."}
                  {application.status === "REJECTED" && "Unfortunately your application was not accepted this time."}
                  {application.status === "PENDING" && "Your application has been submitted. Please wait for the provider's response."}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap gap-4 text-xs text-gray-500">
                  <span>Applied: {new Date(application.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  {application.status === "ACCEPTED" && application.acceptedAt && (
                    <span className="text-green-600 font-medium">
                      Accepted: {new Date(application.acceptedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  )}
                  {application.status === "REJECTED" && application.rejectedAt && (
                    <span className="text-red-500 font-medium">
                      Rejected: {new Date(application.rejectedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <>
                {applyError && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                    <span>⚠️</span><span>{applyError}</span>
                  </div>
                )}
                <button
                  onClick={() => onApply(job.id)}
                  disabled={applyLoading}
                  className={`w-full text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-3 transition-colors
                    ${applyLoading ? "bg-gray-300 cursor-not-allowed" : "bg-[#e68a1f] hover:bg-[#d47d1a] cursor-pointer"}`}
                >
                  {applyLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" />
                      Apply Now
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Job Card ─────────────────────────────────────────────────────────────────
const JobCard: React.FC<{
  job: IJob;
  onView: (job: IJob) => void;
  onToggleSave: (id: string) => void;
  isSaved: boolean;
  application: IJobApplication | null;
}> = ({ job, onView, onToggleSave, isSaved, application }) => {
  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="bg-[#557A95] text-white p-4 rounded-t-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg">{job.job_role}</h3>
            <p className="font-medium flex items-center mt-1 text-sm opacity-90">
              <Briefcase className="mr-2 h-4 w-4" />
              {formatJobType(job.job_type)}
            </p>
          </div>
          {/* Show application status badge in the card header */}
          {application && (
            <div className="mt-1">
              <ApplicationStatusBadge status={application.status} />
            </div>
          )}
        </div>
      </div>

      {/* Highlights */}
      <div className="flex p-3 bg-gray-50 justify-between items-center">
        <div className="flex items-center text-[#557A95] font-semibold">
          <DollarSign className="mr-1 h-5 w-5" />
          <span>${job.payment_rate}/hr</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#e68a1f] text-white px-3 py-1 rounded-full font-medium text-sm">
            <Briefcase className="mr-1 h-4 w-4" />
            <span>{formatJobType(job.job_type)}</span>
          </div>
          <button
            onClick={() => onToggleSave(job.id)}
            className={`p-2 rounded-md border cursor-pointer ${isSaved ? "bg-[#FFEBD6] border-[#FFB46A]" : "bg-white border-gray-200"} hover:opacity-90`}
          >
            <Bookmark className={`${isSaved ? "text-[#e68a1f] fill-[#e68a1f]" : "text-gray-400"} w-4 h-4`} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Shift */}
        <div className="flex items-start">
          <Clock className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Shift</p>
            <p className="text-gray-600 text-sm">
              {formatTime(job.shift_start)} – {formatTime(job.shift_end)}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-start">
          <Calendar className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Duration</p>
            <p className="text-gray-600 text-sm">
              {formatDate(job.start_date)} → {formatDate(job.end_date)}
            </p>
          </div>
        </div>

        {/* Certificates */}
        {job.certificates_needed.length > 0 && (
          <div className="flex items-start">
            <Users className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
            <div>
              <p className="font-semibold text-gray-700 text-sm">Certificates</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {job.certificates_needed.slice(0, 2).map((cert, i) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                    {cert}
                  </span>
                ))}
                {job.certificates_needed.length > 2 && (
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                    +{job.certificates_needed.length - 2} more
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Urgent / Filled badges */}
        <div className="flex gap-2 flex-wrap">
          {job.is_urgent && !job.is_filled && (
            <span className="bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded-full text-xs font-semibold">
              🔴 Urgent
            </span>
          )}
          {job.is_filled && (
            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs font-semibold">
              Position Filled
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-2">
        <p className="text-xs text-gray-400 mb-3">
          Posted: {formatDate(job.createdAt)}
        </p>
        <button
          onClick={() => onView(job)}
          className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-[#557A95] font-semibold py-2 rounded-md transition-colors cursor-pointer"
        >
          {application ? "View Status" : "View Details"}
        </button>
      </div>
    </div>
  );
};

// ─── Main Caregiver Dashboard ─────────────────────────────────────────────────
const CaregiverDashboard: React.FC = () => {
  const [jobs, setJobs]       = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const [query, setQuery]         = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<string[]>([]);
  const [salaryMax, setSalaryMax] = useState<number>(500);
  const [sortBy, setSortBy]       = useState<"latest" | "highest" | "lowest">("latest");
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>(readSavedJobs());

  // applications: map of jobId -> IJobApplication
  const [applications, setApplications] = useState<Record<string, IJobApplication>>({});
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  const { user } = useAuth();
  // Support both profile shapes
  const caregiverId: string = user?.caregiver?.id ?? user?.profile?.id ?? "";

  // ── Fetch all jobs ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch {
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // ── Fetch caregiver's existing applications on mount (persists after reload) ──
  useEffect(() => {
    if (!caregiverId) return;
    const fetchMyApplications = async () => {
      try {
        const data = await getApplicationsByCaregiver(caregiverId);
        // Build a jobId → application map
        const map: Record<string, IJobApplication> = {};
        data.forEach((app) => {
          map[app.job_id] = app;
        });
        setApplications(map);
      } catch {
        // Silently fail — not critical for the page to load
      }
    };
    fetchMyApplications();
  }, [caregiverId]);

  // Persist saved jobs
  useEffect(() => { writeSavedJobs(savedJobs); }, [savedJobs]);

  const toggleArray = (arr: string[], setter: (v: string[]) => void, value: string) => {
    arr.includes(value) ? setter(arr.filter((a) => a !== value)) : setter([...arr, value]);
  };

  const onToggleSave = (id: string) => {
    setSavedJobs((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const handleApply = async (jobId: string) => {
    if (!caregiverId) return setApplyError("Your caregiver profile was not found. Please log in again.");
    setApplyLoading(true);
    setApplyError(null);
    try {
      const application = await applyForJob({ caregiver_id: caregiverId, job_id: jobId });
      setApplications((prev) => ({ ...prev, [jobId]: application }));
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setApplyError(Array.isArray(msg) ? msg[0] : msg || "Failed to apply. Please try again.");
    } finally {
      setApplyLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = jobs.filter((j) => parseFloat(j.payment_rate) <= salaryMax);

    if (q) {
      out = out.filter((j) =>
        j.job_role.toLowerCase().includes(q) ||
        j.job_type.toLowerCase().includes(q)
      );
    }

    if (selectedSchedule.length > 0) {
      out = out.filter((j) => selectedSchedule.includes(j.job_type));
    }

    if (sortBy === "highest") out = [...out].sort((a, b) => parseFloat(b.payment_rate) - parseFloat(a.payment_rate));
    if (sortBy === "lowest")  out = [...out].sort((a, b) => parseFloat(a.payment_rate) - parseFloat(b.payment_rate));
    if (sortBy === "latest")  out = [...out].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return out;
  }, [jobs, query, selectedSchedule, salaryMax, sortBy]);

  return (
    <div className="min-h-screen bg-[#F3F6F9] p-6">

      {/* Search / Sort Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by role or job type..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#557A95] text-sm"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#557A95]"
          >
            <option value="latest">Sort: Latest</option>
            <option value="highest">Highest Pay</option>
            <option value="lowest">Lowest Pay</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span className="font-semibold text-gray-800">{filtered.length}</span>
            <span>Jobs</span>
          </div>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden md:inline text-sm">Filters</span>
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-6 py-4 mb-6 text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">

        {/* Sidebar */}
        <div className={`col-span-12 md:col-span-3 ${!showFilters ? "hidden md:block" : "block"}`}>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-[#557A95]">Filters</h3>
              <button className="text-gray-500 md:hidden cursor-pointer" onClick={() => setShowFilters(false)}>✕</button>
            </div>

            {/* Working Schedule */}
            <div className="mb-5">
              <h4 className="font-semibold text-gray-700 mb-2 text-sm">Working Schedule</h4>
              <div className="space-y-2">
                {FILTERS.workingSchedule.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSchedule.includes(item)}
                      onChange={() => toggleArray(selectedSchedule, setSelectedSchedule, item)}
                      className="h-4 w-4 text-[#557A95] rounded"
                    />
                    {formatJobType(item)}
                  </label>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div className="mb-5">
              <h4 className="font-semibold text-gray-700 mb-2 text-sm">Max Pay Rate</h4>
              <input
                type="range"
                min={0}
                max={500}
                step={10}
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full accent-[#557A95]"
              />
              <p className="text-sm mt-1 text-gray-600">Up to ${salaryMax}/hr</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { setSelectedSchedule([]); setSalaryMax(500); }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-md text-sm cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-[#557A95] hover:bg-[#476a80] text-white py-2 rounded-md text-sm cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Job Grid */}
        <div className="col-span-12 md:col-span-9">

          {/* Loading */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          )}

          {/* Cards */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onView={(j) => setSelectedJob(j)}
                  onToggleSave={onToggleSave}
                  isSaved={savedJobs.includes(job.id)}
                  application={applications[job.id] ?? null}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => { setSelectedJob(null); setApplyError(null); }}
          onToggleSave={onToggleSave}
          isSaved={savedJobs.includes(selectedJob.id)}
          application={applications[selectedJob.id] ?? null}
          onApply={handleApply}
          applyLoading={applyLoading}
          applyError={applyError}
        />
      )}
    </div>
  );
};

export default CaregiverDashboard;