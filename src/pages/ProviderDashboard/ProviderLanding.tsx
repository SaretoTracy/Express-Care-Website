import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  DollarSign,
  Briefcase,
  Clock,
  SlidersHorizontal,
  Search as SearchIcon,
  Edit,
  Trash2,
  Plus,
  Eye,
  AlertCircle,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  User,
  X,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { IJob, IJobApplication, ICreateJob } from "../../Interfaces/IJobs";
import {
  updateJob,
  getJobsByHome,
  deleteJob,
  updateJobIsFilled,
  getApplicationsByJob,
  acceptApplication,
  rejectApplication,
  getCaregiverById,   // ← you may need to add this service call (see note below)
} from "../../services/authService";


// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatJobType = (type: string) =>
  type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (time: string) => {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
};

const getJobStatus = (job: IJob): "Active" | "Filled" | "Urgent" => {
  if (job.is_filled) return "Filled";
  if (job.is_urgent) return "Urgent";
  return "Active";
};

// ─── Caregiver detail type ─────────────────────────────────────────────────────
interface ICaregiverDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  state?: string;
  street?: string;
  zipcode?: string;
  gender?: string;
  dateOfBirth?: string;
}

// ─── Caregiver Detail Modal ───────────────────────────────────────────────────
const CaregiverDetailModal: React.FC<{
  caregiver: ICaregiverDetail | null;
  loading: boolean;
  onClose: () => void;
}> = ({ caregiver, loading, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#557a95] to-[#3d6080] px-7 py-6 overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
            <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-[#e68a1f]/20" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg leading-tight">
                    {loading ? "Loading..." : caregiver ? `${caregiver.firstName} ${caregiver.lastName}` : "Caregiver Details"}
                  </h2>
                  <p className="text-white/70 text-xs mt-0.5">Applicant Profile</p>
                </div>
              </div>
              <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#e68a1f] to-[#f0a84a]" />
          </div>

          {/* Body */}
          <div className="p-6">
            {loading && (
              <div className="space-y-4 animate-pulse">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-200 rounded-full" />
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-20 mb-1.5" />
                      <div className="h-4 bg-gray-100 rounded w-40" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !caregiver && (
              <p className="text-gray-500 text-center py-6">Could not load caregiver details.</p>
            )}

            {!loading && caregiver && (
              <div className="space-y-4">
                {/* Full Name */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-[#557a95]/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-[#557a95]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Full Name</p>
                    <p className="text-gray-800 font-semibold">{caregiver.firstName} {caregiver.lastName}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-[#557a95]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#557a95]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Email</p>
                    <p className="text-gray-800 font-semibold">{caregiver.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-[#557a95]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#557a95]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Phone Number</p>
                    <p className="text-gray-800 font-semibold">{caregiver.phoneNumber}</p>
                  </div>
                </div>

                {/* City */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-[#557a95]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#557a95]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Location</p>
                    <p className="text-gray-800 font-semibold">
                      {[caregiver.city, caregiver.state, caregiver.zipcode].filter(Boolean).join(", ")}
                    </p>
                    {caregiver.street && (
                      <p className="text-gray-500 text-xs mt-0.5">{caregiver.street}</p>
                    )}
                  </div>
                </div>

                {/* Gender + DOB (if available) */}
                {(caregiver.gender || caregiver.dateOfBirth) && (
                  <div className="grid grid-cols-2 gap-3">
                    {caregiver.gender && (
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-400 font-medium">Gender</p>
                        <p className="text-gray-800 font-semibold text-sm mt-0.5">{caregiver.gender}</p>
                      </div>
                    )}
                    {caregiver.dateOfBirth && (
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-400 font-medium">Date of Birth</p>
                        <p className="text-gray-800 font-semibold text-sm mt-0.5">
                          {new Date(caregiver.dateOfBirth).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-5">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


// ─── Applicants Modal ─────────────────────────────────────────────────────────
const ApplicantsModal: React.FC<{
  job: IJob;
  adultHomeId: string;
  onClose: () => void;
}> = ({ job, adultHomeId, onClose }) => {
  const [applications, setApplications] = useState<IJobApplication[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Caregiver detail modal state
  const [selectedCaregiver, setSelectedCaregiver] = useState<ICaregiverDetail | null>(null);
  const [caregiverLoading, setCaregiverLoading]   = useState(false);
  const [showCaregiverModal, setShowCaregiverModal] = useState(false);

  // Cache of caregiverId → detail so we don't re-fetch
  const [caregiverCache, setCaregiverCache] = useState<Record<string, ICaregiverDetail>>({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getApplicationsByJob(job.id);
        setApplications(data);
      } catch {
        setError("Failed to load applicants.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [job.id]);

  const handleAction = async (
    application: IJobApplication,
    action: "accept" | "reject"
  ) => {
    setActionLoading(application.id);
    try {
      const updated = action === "accept"
        ? await acceptApplication(application.id, adultHomeId, application.caregiver_id)
        : await rejectApplication(application.id, adultHomeId, application.caregiver_id);

      setApplications((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );
    } catch {
      // silently fail
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewApplicant = async (caregiverId: string) => {
    setShowCaregiverModal(true);

    // Use cache if available
    if (caregiverCache[caregiverId]) {
      setSelectedCaregiver(caregiverCache[caregiverId]);
      return;
    }

    setCaregiverLoading(true);
    setSelectedCaregiver(null);
    try {
      const detail = await getCaregiverById(caregiverId);
      setCaregiverCache((prev) => ({ ...prev, [caregiverId]: detail }));
      setSelectedCaregiver(detail);
    } catch {
      setSelectedCaregiver(null);
    } finally {
      setCaregiverLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "ACCEPTED": return { label: "Accepted", cls: "bg-green-100 text-green-700 border-green-200" };
      case "REJECTED": return { label: "Rejected", cls: "bg-red-100 text-red-600 border-red-200" };
      default:         return { label: "Pending",  cls: "bg-blue-100 text-blue-700 border-blue-200" };
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#557a95] to-[#3d6080] px-8 py-6 flex-shrink-0 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#e68a1f]/20" />
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <h2 className="text-white text-xl font-bold">Applicants for {job.job_role}</h2>
                  <p className="text-white/70 text-sm mt-0.5">
                    {loading ? "Loading..." : `${applications.length} application${applications.length !== 1 ? "s" : ""}`}
                  </p>
                </div>
                <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#e68a1f] to-[#f0a84a]" />
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 p-6">

              {/* Loading */}
              {loading && (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-5 animate-pulse">
                      <div className="flex justify-between mb-3">
                        <div className="h-5 w-32 bg-gray-200 rounded" />
                        <div className="h-5 w-16 bg-gray-200 rounded-full" />
                      </div>
                      <div className="h-4 w-48 bg-gray-100 rounded mb-2" />
                      <div className="h-4 w-36 bg-gray-100 rounded" />
                    </div>
                  ))}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                  ⚠️ {error}
                </div>
              )}

              {/* Empty */}
              {!loading && !error && applications.length === 0 && (
                <div className="text-center py-14">
                  <Users className="w-14 h-14 mx-auto mb-4 text-gray-200" />
                  <p className="text-gray-500 font-semibold">No applicants yet</p>
                  <p className="text-gray-400 text-sm mt-1">Check back later for new applications</p>
                </div>
              )}

              {/* Applicant Cards */}
              {!loading && !error && applications.length > 0 && (
                <div className="space-y-4">
                  {applications.map((app) => {
                    const status = getStatusConfig(app.status);
                    const isActioning = actionLoading === app.id;

                    return (
                      <div key={app.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            {/* Applied date */}
                            <p className="text-xs text-gray-400 mt-0.5">
                              Applied: {new Date(app.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                          </div>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${status.cls}`}>
                            {status.label}
                          </span>
                        </div>

                        {/* ── View Applicant Button ── */}
                        <button
                          onClick={() => handleViewApplicant(app.caregiver_id)}
                          className="w-full flex items-center justify-between bg-[#f0f5f9] hover:bg-[#e2ecf4] border border-[#c8dae8] rounded-xl px-4 py-3 transition-colors cursor-pointer group mb-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#557a95]/20 flex items-center justify-center">
                              <User className="w-4 h-4 text-[#557a95]" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold text-[#557a95]">View Applicant</p>
                              <p className="text-xs text-gray-400">See full caregiver details</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#557a95] group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        {/* Action Buttons — only show if still PENDING */}
                        {app.status === "PENDING" && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleAction(app, "accept")}
                              disabled={isActioning}
                              className="flex-1 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                              {isActioning ? (
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                </svg>
                              ) : <CheckCircle className="w-4 h-4" />}
                              Accept
                            </button>
                            <button
                              onClick={() => handleAction(app, "reject")}
                              disabled={isActioning}
                              className="flex-1 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-200 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                              {isActioning ? (
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                </svg>
                              ) : <AlertCircle className="w-4 h-4" />}
                              Reject
                            </button>
                          </div>
                        )}

                        {/* Accepted confirmation */}
                        {app.status === "ACCEPTED" && (
                          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-green-700">Application Accepted</p>
                              {app.acceptedAt && (
                                <p className="text-xs text-green-600">
                                  on {new Date(app.acceptedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Rejected confirmation */}
                        {app.status === "REJECTED" && (
                          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-red-600">Application Rejected</p>
                              {app.rejectedAt && (
                                <p className="text-xs text-red-500">
                                  on {new Date(app.rejectedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Caregiver Detail Popup — rendered on top of the applicants modal */}
      {showCaregiverModal && (
        <CaregiverDetailModal
          caregiver={selectedCaregiver}
          loading={caregiverLoading}
          onClose={() => { setShowCaregiverModal(false); setSelectedCaregiver(null); }}
        />
      )}
    </>
  );
};

// ─── Edit Job Modal ───────────────────────────────────────────────────────────
const CERTIFICATE_OPTIONS = [
  "CPR", "ICU", "BLS", "ACLS", "PALS",
  "First Aid", "Dementia Care", "Medication Administration",
];

const EditJobModal: React.FC<{
  job: IJob;
  adultHomeId: string;
  onClose: () => void;
  onSaved: (updated: IJob) => void;
}> = ({ job, adultHomeId, onClose, onSaved }) => {
  const [form, setForm] = useState<ICreateJob>({
    job_role: job.job_role,
    job_type: job.job_type,
    start_date: job.start_date.slice(0, 10),
    end_date: job.end_date.slice(0, 10),
    shift_start: job.shift_start,
    shift_end: job.shift_end,
    payment_rate: job.payment_rate,
    staff_needed: job.staff_needed,
    certificates_needed: job.certificates_needed,
    is_urgent: job.is_urgent,
    adult_home_id: adultHomeId,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputCls =
    "w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:border-[#557a95] transition-colors";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "staff_needed"
          ? Number(value)
          : value,
    }));
  };

  const handleCertToggle = (cert: string) => {
    setForm((prev) => ({
      ...prev,
      certificates_needed: prev.certificates_needed.includes(cert)
        ? prev.certificates_needed.filter((c) => c !== cert)
        : [...prev.certificates_needed, cert],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.job_role.trim()) return setError("Job role is required");
    if (!form.start_date || !form.end_date) return setError("Dates are required");
    if (form.start_date > form.end_date) return setError("End date must be after start date");
    if (!form.shift_start || !form.shift_end) return setError("Shift times are required");
    if (!form.payment_rate || isNaN(Number(form.payment_rate))) return setError("Valid payment rate is required");

    setLoading(true);
    try {
      const payload = {
        ...form,
        payment_rate: parseFloat(form.payment_rate).toFixed(2),
        staff_needed: Number(form.staff_needed),
      };
      const updated = await updateJob(job.id, adultHomeId, payload);
      onSaved(updated);
      onClose();
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setError(Array.isArray(msg) ? msg[0] : msg || "Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="relative bg-gradient-to-r from-[#557a95] to-[#3d6080] px-8 py-6 overflow-hidden flex-shrink-0">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#e68a1f]/20" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h2 className="text-white text-xl font-bold tracking-tight">Edit Job</h2>
                <p className="text-white/70 text-sm mt-0.5">Update the details for this posting</p>
              </div>
              <button onClick={onClose} className="text-white/80 hover:text-white text-2xl leading-none cursor-pointer">✕</button>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#e68a1f] to-[#f0a84a]" />
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Job Role <span className="text-[#e68a1f]">*</span></label>
                <input type="text" name="job_role" value={form.job_role} onChange={handleChange} placeholder="e.g. HCA, RN, CNA..." required className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Job Type <span className="text-[#e68a1f]">*</span></label>
                <select name="job_type" value={form.job_type} onChange={handleChange} className={inputCls}>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Start Date <span className="text-[#e68a1f]">*</span></label>
                <input type="date" name="start_date" value={form.start_date} onChange={handleChange} required className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">End Date <span className="text-[#e68a1f]">*</span></label>
                <input type="date" name="end_date" value={form.end_date} onChange={handleChange} required className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Shift Start <span className="text-[#e68a1f]">*</span></label>
                <input type="time" name="shift_start" value={form.shift_start} onChange={handleChange} required className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Shift End <span className="text-[#e68a1f]">*</span></label>
                <input type="time" name="shift_end" value={form.shift_end} onChange={handleChange} required className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Payment Rate ($/hr) <span className="text-[#e68a1f]">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm pointer-events-none">$</span>
                  <input type="number" name="payment_rate" value={form.payment_rate} onChange={handleChange} placeholder="0.00" min="0" step="0.01" required className={`${inputCls} pl-7`} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Staff Needed <span className="text-[#e68a1f]">*</span></label>
                <input type="number" name="staff_needed" value={form.staff_needed} onChange={handleChange} min="1" max="100" required className={inputCls} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Certificates Required</label>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATE_OPTIONS.map((cert) => {
                  const selected = form.certificates_needed.includes(cert);
                  return (
                    <button key={cert} type="button" onClick={() => handleCertToggle(cert)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-150 cursor-pointer
                        ${selected ? "bg-[#557a95] border-[#557a95] text-white shadow-md" : "bg-gray-100 border-gray-200 text-gray-600 hover:border-[#557a95] hover:text-[#557a95]"}`}
                    >
                      {selected && <span className="mr-1">✓</span>}
                      {cert}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border-2 border-gray-200">
              <button type="button"
                onClick={() => setForm((p) => ({ ...p, is_urgent: !p.is_urgent }))}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 cursor-pointer
                  ${form.is_urgent ? "bg-[#e68a1f]" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${form.is_urgent ? "translate-x-5" : "translate-x-0"}`} />
              </button>
              <div>
                <p className="text-sm font-semibold text-gray-700">Mark as Urgent</p>
                <p className="text-xs text-gray-400">This job will be highlighted to available staff</p>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                <span>⚠️</span><span>{error}</span>
              </div>
            )}

            <div className="flex gap-3 mt-1">
              <button type="button" onClick={onClose}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className={`flex-1 py-3 rounded-xl text-white font-bold text-sm transition-all duration-200
                  ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-[#e68a1f] to-[#f0a84a] hover:from-[#d47d1a] hover:to-[#e68a1f] shadow-lg cursor-pointer"}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Saving...
                  </span>
                ) : "Save Changes →"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
const DeleteConfirmModal: React.FC<{
  job: IJob | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ job, loading, error, onClose, onConfirm }) => {
  if (!job) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl p-6 max-w-md w-full"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Delete Job Posting?</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete{" "}
            <strong>"{job.job_role}"</strong>? This action cannot be undone.
          </p>
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">
              <span>⚠️</span><span>{error}</span>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={onClose} disabled={loading}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button onClick={onConfirm} disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Deleting...
                </>
              ) : "Delete"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Job Card ─────────────────────────────────────────────────────────────────
const JobCard: React.FC<{
  job: IJob;
  adultHomeId: string;
  onViewApplicants: (job: IJob) => void;
  onEdit: (job: IJob) => void;
  onDelete: (job: IJob) => void;
  onToggleFilled: (job: IJob, filled: boolean) => void;
}> = ({ job, adultHomeId, onViewApplicants, onEdit, onDelete, onToggleFilled }) => {
  const status = getJobStatus(job);

  const getStatusBadge = () => {
    switch (status) {
      case "Active":  return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Active</span>;
      case "Filled":  return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Filled</span>;
      case "Urgent":  return <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">🔴 Urgent</span>;
    }
  };

  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-lg transition-shadow">
      <div className="bg-[#557A95] text-white p-4 rounded-t-xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg">{job.job_role}</h3>
            <p className="font-medium flex items-center mt-1 text-sm opacity-90">
              <Briefcase className="mr-2 h-4 w-4" />
              {formatJobType(job.job_type)}
            </p>
          </div>
          {getStatusBadge()}
        </div>
      </div>

      <div className="flex p-3 bg-gray-50 justify-between items-center">
        <div className="flex items-center text-[#557A95] font-semibold">
          <DollarSign className="mr-1 h-5 w-5" />
          <span>${job.payment_rate}/hr</span>
        </div>
        <div className="flex items-center bg-[#e68a1f] text-white px-3 py-1 rounded-full font-medium text-sm">
          <Briefcase className="mr-1 h-4 w-4" />
          <span>{formatJobType(job.job_type)}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start">
          <Clock className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Shift</p>
            <p className="text-gray-600 text-sm">{formatTime(job.shift_start)} – {formatTime(job.shift_end)}</p>
          </div>
        </div>

        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Certificates Required</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.certificates_needed.length === 0 ? (
                <span className="text-gray-400 text-xs">None specified</span>
              ) : (
                <>
                  {job.certificates_needed.slice(0, 2).map((cert, i) => (
                    <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">{cert}</span>
                  ))}
                  {job.certificates_needed.length > 2 && (
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">+{job.certificates_needed.length - 2} more</span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-900">{job.staff_needed} Staff Needed</span>
          </div>
          <button
            onClick={() => onViewApplicants(job)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
        </div>

        <div className={`rounded-lg p-3 flex items-center justify-between border ${job.is_filled ? "bg-gray-50 border-gray-200" : "bg-green-50 border-green-200"}`}>
          <span className={`text-sm font-semibold ${job.is_filled ? "text-gray-500" : "text-green-700"}`}>
            {job.is_filled ? "Position Filled" : "Position Open"}
          </span>
          <button
            onClick={() => onToggleFilled(job, !job.is_filled)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 cursor-pointer ${job.is_filled ? "bg-gray-400" : "bg-green-500"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${job.is_filled ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2">
        <div className="flex items-center text-gray-500 mb-3 text-sm">
          <Clock className="mr-1 w-4 h-4" />
          <span>{formatDate(job.start_date)} → {formatDate(job.end_date)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onViewApplicants(job)}
            className="flex-1 bg-[#557A95] hover:bg-[#476a80] text-white font-semibold py-2 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            Applicants
          </button>
          <button onClick={() => onEdit(job)}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-3 py-2 rounded-md transition-colors cursor-pointer"
            aria-label="Edit job"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(job)}
            className="bg-white border border-red-300 hover:bg-red-50 text-red-600 font-medium px-3 py-2 rounded-md transition-colors cursor-pointer"
            aria-label="Delete job"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white animate-pulse">
    <div className="bg-gray-200 h-20 w-full" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
      <div className="h-10 bg-gray-100 rounded-lg" />
    </div>
    <div className="px-4 pb-4 flex gap-2">
      <div className="flex-1 h-9 bg-gray-200 rounded-md" />
      <div className="h-9 w-9 bg-gray-100 rounded-md" />
      <div className="h-9 w-9 bg-gray-100 rounded-md" />
    </div>
  </div>
);

// ─── Filter options ───────────────────────────────────────────────────────────
const FILTERS = {
  status: ["Active", "Filled", "Urgent"],
  employmentType: ["FULL_TIME", "PART_TIME", "CONTRACT"],
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const ProviderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const adultHomeId: string = user?.adultHomeRepresentative?.adultHomeId ?? user?.profile?.adultHomeId ?? "";

  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest");
  const [jobToDelete, setJobToDelete] = useState<IJob | null>(null);
  const [jobToEdit, setJobToEdit] = useState<IJob | null>(null);
  const [jobForApplicants, setJobForApplicants] = useState<IJob | null>(null);

  useEffect(() => {
    if (!adultHomeId) return;
    const fetchJobs = async () => {
      try {
        const data = await getJobsByHome(adultHomeId);
        setJobs(data);
      } catch {
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [adultHomeId]);

  const toggleArray = (arr: string[], setter: (v: string[]) => void, value: string) => {
    arr.includes(value) ? setter(arr.filter((a) => a !== value)) : setter([...arr, value]);
  };

  const handleJobSaved = (updated: IJob) => {
    setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
  };

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDeleteConfirm = async () => {
    if (!jobToDelete) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      await deleteJob(jobToDelete.id);
      setJobs((prev) => prev.filter((j) => j.id !== jobToDelete.id));
      setJobToDelete(null);
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setDeleteError(Array.isArray(msg) ? msg[0] : msg || "Failed to delete job. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggleFilled = async (job: IJob, filled: boolean) => {
    setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, is_filled: filled } : j)));
    try {
      await updateJobIsFilled(job.id, adultHomeId, filled);
    } catch {
      setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, is_filled: !filled } : j)));
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = [...jobs];
    if (q) out = out.filter((j) => j.job_role.toLowerCase().includes(q));
    if (selectedStatus.length > 0) out = out.filter((j) => selectedStatus.includes(getJobStatus(j)));
    if (selectedEmploymentType.length > 0) out = out.filter((j) => selectedEmploymentType.includes(j.job_type));
    if (sortBy === "oldest") out = out.reverse();
    return out;
  }, [jobs, query, selectedStatus, selectedEmploymentType, sortBy]);

  const activeJobs = jobs.filter((j) => !j.is_filled).length;
  const urgentJobs = jobs.filter((j) => j.is_urgent && !j.is_filled).length;
  const totalStaffNeeded = jobs.reduce((sum, j) => sum + j.staff_needed, 0);

  return (
    <div className="min-h-screen bg-[#F3F6F9] p-6">

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-[#557A95]">
          <p className="text-gray-600 text-sm">Total Jobs</p>
          <p className="text-2xl font-bold text-gray-800">{jobs.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Active Jobs</p>
          <p className="text-2xl font-bold text-gray-800">{activeJobs}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Staff Needed</p>
          <p className="text-2xl font-bold text-gray-800">{totalStaffNeeded}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-[#e68a1f]">
          <p className="text-gray-600 text-sm">Urgent Jobs</p>
          <p className="text-2xl font-bold text-gray-800">{urgentJobs}</p>
        </div>
      </div>

      {/* Search / Sort / Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by job role..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#557A95] text-sm"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#557A95]"
          >
            <option value="latest">Sort: Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-gray-800 font-semibold">{filtered.length}</span>
            <span>Jobs</span>
          </div>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden md:inline text-sm">Filters</span>
          </button>
          <button
            onClick={() => navigate("/provider/post-job")}
            className="flex items-center gap-2 bg-[#e68a1f] hover:bg-[#d47d1a] text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline text-sm">Post Job</span>
            <span className="md:hidden text-sm">New</span>
          </button>
        </div>
      </div>

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
              <button className="text-gray-500 md:hidden" onClick={() => setShowFilters(false)}>✕</button>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2 text-sm">Status</h4>
              <div className="space-y-2">
                {FILTERS.status.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                    <input type="checkbox" checked={selectedStatus.includes(item)}
                      onChange={() => toggleArray(selectedStatus, setSelectedStatus, item)}
                      className="h-4 w-4 text-[#557A95] rounded"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2 text-sm">Employment Type</h4>
              <div className="space-y-2">
                {FILTERS.employmentType.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                    <input type="checkbox" checked={selectedEmploymentType.includes(item)}
                      onChange={() => toggleArray(selectedEmploymentType, setSelectedEmploymentType, item)}
                      className="h-4 w-4 text-[#557A95] rounded"
                    />
                    {formatJobType(item)}
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => { setSelectedStatus([]); setSelectedEmploymentType([]); }}
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

        {/* Job Cards Grid */}
        <div className="col-span-12 md:col-span-9">
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or post a new job</p>
              <button
                onClick={() => navigate("/provider/post-job")}
                className="bg-[#e68a1f] hover:bg-[#d47d1a] text-white px-6 py-2 rounded-lg font-medium inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Post Your First Job
              </button>
            </div>
          )}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  adultHomeId={adultHomeId}
                  onViewApplicants={(j) => setJobForApplicants(j)}
                  onEdit={(j) => setJobToEdit(j)}
                  onDelete={(j) => setJobToDelete(j)}
                  onToggleFilled={handleToggleFilled}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {jobForApplicants && (
        <ApplicantsModal
          job={jobForApplicants}
          adultHomeId={adultHomeId}
          onClose={() => setJobForApplicants(null)}
        />
      )}
      {jobToEdit && (
        <EditJobModal
          job={jobToEdit}
          adultHomeId={adultHomeId}
          onClose={() => setJobToEdit(null)}
          onSaved={handleJobSaved}
        />
      )}
      {jobToDelete && (
        <DeleteConfirmModal
          job={jobToDelete}
          loading={deleteLoading}
          error={deleteError}
          onClose={() => { setJobToDelete(null); setDeleteError(null); }}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ProviderDashboard;