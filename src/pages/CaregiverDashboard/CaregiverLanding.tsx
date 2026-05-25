import React, { useEffect, useMemo, useState } from "react";
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
import type { IJob } from "../../Interfaces/IJobs";
import { getAllJobs } from "../../services/authService";
import { ModalOverlay, ModalHeader, InfoRow, JobCardHeader, CertificateBadges, ErrorBanner, SkeletonCard } from "../../UI/Ui";
import { formatJobType, formatTime, formatDate } from "../../utils/Jobutils";

// ─── Saved Jobs (localStorage) ────────────────────────────────────────────────
const readSavedJobs = (): string[] => {
  try {
    const raw = localStorage.getItem("savedJobs");
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

const writeSavedJobs = (arr: string[]) => {
  try {
    localStorage.setItem("savedJobs", JSON.stringify(arr));
  } catch {}
};

// ─── Filter options ───────────────────────────────────────────────────────────
const SCHEDULE_FILTERS = ["FULL_TIME", "PART_TIME"];

// ─── Job Details Modal ────────────────────────────────────────────────────────
const JobDetailsModal: React.FC<{
  job: IJob | null;
  onClose: () => void;
  onToggleSave: (id: string) => void;
  isSaved: boolean;
}> = ({ job, onClose, onToggleSave, isSaved }) => {
  if (!job) return null;

  const saveAction = (
    <button
      onClick={() => onToggleSave(job.id)}
      className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-white hover:opacity-90 cursor-pointer"
    >
      <HeartIcon className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
      <span className="text-sm">{isSaved ? "Saved" : "Save"}</span>
    </button>
  );

  return (
    <ModalOverlay onClose={onClose} sheet>
      <ModalHeader
        id="job-details-title"
        title={job.job_role}
        subtitle={formatJobType(job.job_type)}
        onClose={onClose}
        actions={saveAction}
      />

      <div className="p-6 space-y-5 text-gray-700">
        {/* Pay + Type + badges */}
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
          <InfoRow
            icon={<Clock className="w-4 h-4" />}
            label="Shift"
            value={`${formatTime(job.shift_start)} – ${formatTime(job.shift_end)}`}
          />
          <InfoRow
            icon={<Calendar className="w-4 h-4" />}
            label="Dates"
            value={`${formatDate(job.start_date)} → ${formatDate(job.end_date)}`}
          />
        </div>

        {/* Staff Needed */}
        <InfoRow
          icon={<Users className="w-4 h-4" />}
          label="Staff Needed"
          value={`${job.staff_needed} position${job.staff_needed !== 1 ? "s" : ""}`}
        />

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

        <p className="text-xs text-gray-400">Posted: {formatDate(job.createdAt)}</p>

        {!job.is_filled && (
          <button className="w-full bg-[#e68a1f] hover:bg-[#d47d1a] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-3 cursor-pointer transition-colors">
            <Award className="w-4 h-4" />
            Apply Now
          </button>
        )}
      </div>
    </ModalOverlay>
  );
};

// ─── Job Card ─────────────────────────────────────────────────────────────────
const JobCard: React.FC<{
  job: IJob;
  onView: (job: IJob) => void;
  onToggleSave: (id: string) => void;
  isSaved: boolean;
}> = ({ job, onView, onToggleSave, isSaved }) => (
  <div className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-lg transition-shadow">
    <JobCardHeader
      jobRole={job.job_role}
      jobType={formatJobType(job.job_type)}
    />

    {/* Highlights row */}
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
          className={`p-2 rounded-md border cursor-pointer ${
            isSaved
              ? "bg-[#FFEBD6] border-[#FFB46A]"
              : "bg-white border-gray-200"
          } hover:opacity-90`}
        >
          <Bookmark
            className={`${
              isSaved
                ? "text-[#e68a1f] fill-[#e68a1f]"
                : "text-gray-400"
            } w-4 h-4`}
          />
        </button>
      </div>
    </div>

    <div className="p-4 space-y-3">
      <InfoRow
        icon={<Clock className="h-5 w-5" />}
        label="Shift"
        value={`${formatTime(job.shift_start)} – ${formatTime(job.shift_end)}`}
      />
      <InfoRow
        icon={<Calendar className="h-5 w-5" />}
        label="Duration"
        value={`${formatDate(job.start_date)} → ${formatDate(job.end_date)}`}
      />

      {job.certificates_needed.length > 0 && (
        <InfoRow
          icon={<Users className="h-5 w-5" />}
          label="Certificates"
          value={<CertificateBadges certs={job.certificates_needed} />}
        />
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

    <div className="px-4 pb-4 pt-2">
      <p className="text-xs text-gray-400 mb-3">
        Posted: {formatDate(job.createdAt)}
      </p>
      <button
        onClick={() => onView(job)}
        className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-[#557A95] font-semibold py-2 rounded-md transition-colors cursor-pointer"
      >
        View Details
      </button>
    </div>
  </div>
);

// ─── Main Caregiver Dashboard ─────────────────────────────────────────────────
const CaregiverDashboard: React.FC = () => {
  const [jobs, setJobs]       = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const [query, setQuery]               = useState("");
  const [showFilters, setShowFilters]   = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<string[]>([]);
  const [salaryMax, setSalaryMax]       = useState<number>(500);
  const [sortBy, setSortBy]             = useState<"latest" | "highest" | "lowest">("latest");
  const [selectedJob, setSelectedJob]   = useState<IJob | null>(null);

  // Lazy init avoids calling localStorage on every render
  const [savedJobs, setSavedJobs] = useState<string[]>(() => readSavedJobs());

  useEffect(() => {
    getAllJobs()
      .then(setJobs)
      .catch(() => setError("Failed to load jobs. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    writeSavedJobs(savedJobs);
  }, [savedJobs]);

  const toggleSchedule = (value: string) =>
    setSelectedSchedule((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );

  const onToggleSave = (id: string) =>
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = jobs.filter((j) => parseFloat(j.payment_rate) <= salaryMax);

    if (q) {
      out = out.filter(
        (j) =>
          j.job_role.toLowerCase().includes(q) ||
          j.job_type.toLowerCase().includes(q)
      );
    }

    if (selectedSchedule.length > 0) {
      out = out.filter((j) => selectedSchedule.includes(j.job_type));
    }

    if (sortBy === "highest")
      return [...out].sort(
        (a, b) => parseFloat(b.payment_rate) - parseFloat(a.payment_rate)
      );
    if (sortBy === "lowest")
      return [...out].sort(
        (a, b) => parseFloat(a.payment_rate) - parseFloat(b.payment_rate)
      );
    // latest (default)
    return [...out].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
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
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
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

      {error && <ErrorBanner message={error} />}

      <div className="grid grid-cols-12 gap-6">

        {/* Sidebar */}
        <div className={`col-span-12 md:col-span-3 ${!showFilters ? "hidden md:block" : "block"}`}>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-[#557A95]">Filters</h3>
              <button
                className="text-gray-500 md:hidden cursor-pointer"
                onClick={() => setShowFilters(false)}
              >
                ✕
              </button>
            </div>

            <div className="mb-5">
              <h4 className="font-semibold text-gray-700 mb-2 text-sm">Working Schedule</h4>
              <div className="space-y-2">
                {SCHEDULE_FILTERS.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSchedule.includes(item)}
                      onChange={() => toggleSchedule(item)}
                      className="h-4 w-4 text-[#557A95] rounded"
                    />
                    {formatJobType(item)}
                  </label>
                ))}
              </div>
            </div>

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
                onClick={() => {
                  setSelectedSchedule([]);
                  setSalaryMax(500);
                }}
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
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onView={setSelectedJob}
                  onToggleSave={onToggleSave}
                  isSaved={savedJobs.includes(job.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onToggleSave={onToggleSave}
          isSaved={savedJobs.includes(selectedJob.id)}
        />
      )}
    </div>
  );
};

export default CaregiverDashboard;