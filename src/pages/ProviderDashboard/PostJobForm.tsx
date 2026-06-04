"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { ICreateJob } from "../../Interfaces/IJobs";
import { createJob } from "../../services/authService";
import {
  Briefcase,
  FileText,
  Calendar,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";

const CERTIFICATE_OPTIONS = [
  "CPR", "ICU", "BLS", "ACLS", "PALS",
  "First Aid", "Dementia Care", "Medication Administration",
];

interface PostJobFormProps {
  onSuccess?: () => void;
}

export default function PostJobForm({ onSuccess }: PostJobFormProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

 
  const adultHomeId: string =
    user?.adultHomeRepresentative?.adultHomeId ??
    user?.profile?.adultHomeId ??
    "";

  const [form, setForm] = useState<ICreateJob>({
    job_role: "",
    job_type: "FULL_TIME",
    start_date: "",
    end_date: "",
    shift_start: "",
    shift_end: "",
    payment_rate: "",
    staff_needed: 1,
    certificates_needed: [],
    is_urgent: false,
    adult_home_id: adultHomeId,
    job_description: "",
  });

 
  useEffect(() => {
    if (adultHomeId) {
      setForm((prev) => ({ ...prev, adult_home_id: adultHomeId }));
    }
  }, [adultHomeId]);

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
    setSuccess(false);

    if (!form.job_role.trim())
      return setError("Job role is required");
    if (!form.job_description.trim())
      return setError("Job description is required");
    if (!form.start_date || !form.end_date)
      return setError("Start and end dates are required");
    if (form.start_date > form.end_date)
      return setError("End date must be after start date");
    if (!form.shift_start || !form.shift_end)
      return setError("Shift times are required");
    if (!form.payment_rate || isNaN(Number(form.payment_rate)))
      return setError("Valid payment rate is required");
    if (!adultHomeId)
      return setError(
        "Your account is not linked to a facility. Please contact support."
      );

    setLoading(true);
    try {
      const payload: ICreateJob = {
        ...form,
        payment_rate: parseFloat(form.payment_rate).toFixed(2),
        staff_needed: Number(form.staff_needed),
        adult_home_id: adultHomeId,
      };

      await createJob(payload);
      setSuccess(true);
      onSuccess?.();

      // Reset form
      setForm({
        job_role: "",
        job_type: "FULL_TIME",
        start_date: "",
        end_date: "",
        shift_start: "",
        shift_end: "",
        payment_rate: "",
        staff_needed: 1,
        certificates_needed: [],
        is_urgent: false,
        adult_home_id: adultHomeId,
        job_description: "",
      });

      setTimeout(() => navigate("/provider/dashboard"), 1800);
    } catch (err: any) {
     
      const status = err?.response?.status;
      if (status === 401) {
        setError("Your session has expired. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }
      const msg = err?.response?.data?.message;
      setError(
        Array.isArray(msg)
          ? msg[0]
          : msg || "Failed to post job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:border-[#557a95] transition-colors";

  
  if (user && !adultHomeId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a2a3a] via-[#2c4a6a] to-[#1a2a3a] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Facility Not Linked</h2>
          <p className="text-sm text-gray-500 mb-6">
            Your account is not linked to a facility. Please contact support to resolve this.
          </p>
          <button
            onClick={() => navigate("/provider/dashboard")}
            className="flex items-center gap-2 mx-auto text-[#557a95] font-semibold hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2a3a] via-[#2c4a6a] to-[#1a2a3a] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div className="relative bg-gradient-to-r from-[#557a95] to-[#3d6080] px-8 py-7 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#e68a1f]/20" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <button
                type="button"
                onClick={() => navigate("/provider/dashboard")}
                className="flex items-center gap-1 text-white/60 hover:text-white text-xs mb-2 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Back to Dashboard
              </button>
              <h1 className="text-white text-2xl font-bold tracking-tight">
                Post a Job
              </h1>
              <p className="text-white/70 text-sm mt-1">
                Find the right staff for your facility
              </p>
            </div>
            {form.is_urgent && (
              <span className="bg-[#e68a1f] text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                🔴 URGENT
              </span>
            )}
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#e68a1f] to-[#f0a84a]" />
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="px-8 py-7 flex flex-col gap-5">

          {/* Section: Role */}
          <div className="flex items-center gap-2 text-[#557a95] font-semibold text-sm border-b border-gray-100 pb-2">
            <Briefcase className="w-4 h-4" />
            Role Details
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Job Role <span className="text-[#e68a1f]">*</span>
              </label>
              <input
                type="text"
                name="job_role"
                value={form.job_role}
                onChange={handleChange}
                placeholder="e.g. HCA, RN, CNA..."
                required
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Job Type <span className="text-[#e68a1f]">*</span>
              </label>
              <select
                name="job_type"
                value={form.job_type}
                onChange={handleChange}
                className={inputCls}
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>
          </div>

          {/* Job Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-gray-400" />
              Job Description <span className="text-[#e68a1f]">*</span>
            </label>
            <textarea
              name="job_description"
              value={form.job_description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={4}
              required
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Section: Schedule */}
          <div className="flex items-center gap-2 text-[#557a95] font-semibold text-sm border-b border-gray-100 pb-2 mt-1">
            <Calendar className="w-4 h-4" />
            Schedule
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Start Date <span className="text-[#e68a1f]">*</span>
              </label>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                End Date <span className="text-[#e68a1f]">*</span>
              </label>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                Shift Start <span className="text-[#e68a1f]">*</span>
              </label>
              <input
                type="time"
                name="shift_start"
                value={form.shift_start}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                Shift End <span className="text-[#e68a1f]">*</span>
              </label>
              <input
                type="time"
                name="shift_end"
                value={form.shift_end}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </div>
          </div>

          {/* Section: Compensation */}
          <div className="flex items-center gap-2 text-[#557a95] font-semibold text-sm border-b border-gray-100 pb-2 mt-1">
            <DollarSign className="w-4 h-4" />
            Compensation & Staffing
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Payment Rate ($/hr) <span className="text-[#e68a1f]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  name="payment_rate"
                  value={form.payment_rate}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                  className={`${inputCls} pl-7`}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                Staff Needed <span className="text-[#e68a1f]">*</span>
              </label>
              <input
                type="number"
                name="staff_needed"
                value={form.staff_needed}
                onChange={handleChange}
                min="1"
                max="100"
                required
                className={inputCls}
              />
            </div>
          </div>

          {/* Certificates */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Certificates Required
            </label>
            <div className="flex flex-wrap gap-2">
              {CERTIFICATE_OPTIONS.map((cert) => {
                const selected = form.certificates_needed.includes(cert);
                return (
                  <button
                    key={cert}
                    type="button"
                    onClick={() => handleCertToggle(cert)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-150 cursor-pointer
                      ${selected
                        ? "bg-[#557a95] border-[#557a95] text-white shadow-md"
                        : "bg-gray-100 border-gray-200 text-gray-600 hover:border-[#557a95] hover:text-[#557a95]"
                      }`}
                  >
                    {selected && <span className="mr-1">✓</span>}
                    {cert}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Urgent Toggle */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border-2 border-gray-200">
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, is_urgent: !p.is_urgent }))}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0
                ${form.is_urgent ? "bg-[#e68a1f]" : "bg-gray-300"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200
                  ${form.is_urgent ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
            <div>
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#e68a1f]" />
                Mark as Urgent
              </p>
              <p className="text-xs text-gray-400">
                This job will be highlighted to available staff
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Job posted successfully! Redirecting to dashboard...</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || success}
            className={`mt-1 py-3.5 rounded-xl text-white font-bold text-base tracking-wide transition-all duration-200
              ${loading || success
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-[#e68a1f] to-[#f0a84a] hover:from-[#d47d1a] hover:to-[#e68a1f] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Posting Job...
              </span>
            ) : success ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Posted!
              </span>
            ) : (
              "Post Job →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}