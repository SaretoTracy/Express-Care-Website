"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { IJob } from "../../Interfaces/IJobs";
import { getJobsByHome } from "../../services/authService";


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
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
};

const getStatusConfig = (job: IJob) => {
  if (job.is_filled)
    return { label: "Filled", badgeCls: "bg-gray-100 text-gray-500", dotCls: "bg-gray-400" };
  if (job.is_urgent)
    return { label: "Urgent", badgeCls: "bg-red-50 text-red-600 border border-red-200", dotCls: "bg-red-500 animate-pulse" };
  return { label: "Open", badgeCls: "bg-green-50 text-green-700 border border-green-200", dotCls: "bg-green-500" };
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
    <div className="flex justify-between items-start mb-5">
      <div className="space-y-2">
        <div className="h-5 w-36 bg-gray-200 rounded-lg" />
        <div className="h-4 w-24 bg-gray-100 rounded-lg" />
      </div>
      <div className="h-6 w-16 bg-gray-200 rounded-full" />
    </div>
    <div className="grid grid-cols-3 gap-3 mb-5">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-14 bg-gray-100 rounded-xl" />
      ))}
    </div>
    <div className="flex gap-3">
      <div className="h-9 w-32 bg-gray-200 rounded-xl" />
      <div className="h-9 w-24 bg-gray-100 rounded-xl" />
    </div>
  </div>
);

// ─── Job Card ─────────────────────────────────────────────────────────────────
const JobCard = ({ job, onView }: { job: IJob; onView: (id: string) => void }) => {
  const status = getStatusConfig(job);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-gray-800">{job.job_role}</h2>
            {job.is_urgent && !job.is_filled && (
              <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                🔴 Urgent
              </span>
            )}
          </div>
          <span className="text-sm text-gray-400">{formatJobType(job.job_type)}</span>
        </div>
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${status.badgeCls}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dotCls}`} />
          {status.label}
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-gray-50 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400 mb-0.5">Pay Rate</p>
          <p className="text-sm font-bold text-[#e68a1f]">${job.payment_rate}/hr</p>
        </div>
        <div className="bg-gray-50 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400 mb-0.5">Staff Needed</p>
          <p className="text-sm font-bold text-gray-700">{job.staff_needed} staff</p>
        </div>
        <div className="bg-gray-50 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400 mb-0.5">Shift</p>
          <p className="text-sm font-bold text-gray-700">
            {formatTime(job.shift_start)} – {formatTime(job.shift_end)}
          </p>
        </div>
      </div>

      {/* Dates */}
      <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
        <svg className="w-4 h-4 text-[#557a95]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{formatDate(job.start_date)} → {formatDate(job.end_date)}</span>
      </div>

      {/* Certificates */}
      {job.certificates_needed.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {job.certificates_needed.map((cert) => (
            <span
              key={cert}
              className="text-xs font-medium bg-[#557a95]/10 text-[#557a95] px-2.5 py-1 rounded-full"
            >
              {cert}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={() => onView(job.id)}
          className="flex-1 py-2.5 bg-gradient-to-r from-[#557a95] to-[#3d6080] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
        >
          View Applicants
        </button>
        <button className="px-4 py-2.5 border-2 border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:border-[#557a95] hover:text-[#557a95] transition-colors cursor-pointer">
          Edit
        </button>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function MyJobs() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const adultHomeId: string = user?.profile?.adultHomeId ?? "";
  const [jobs, setJobs]       = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobsByHome(adultHomeId);
        setJobs(data);
      } catch (err: any) {
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleViewApplicants = (jobId: string) => {
    navigate(`/provider/jobs/${jobId}/applicants`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Jobs</h1>
            <p className="text-gray-400 text-sm mt-1">
              {loading ? "Loading..." : `${jobs.length} job${jobs.length !== 1 ? "s" : ""} posted`}
            </p>
          </div>
          <button
            onClick={() => navigate("/provider/post-job")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#e68a1f] to-[#f0a84a] text-white text-sm font-bold rounded-xl shadow hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <span className="text-lg leading-none">+</span>
            Post a Job
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-6 py-4 mb-6 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid gap-5">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && jobs.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-14 text-center">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-lg font-bold text-gray-700 mb-2">No jobs posted yet</h2>
            <p className="text-gray-400 text-sm mb-6">Post your first job to start connecting with caregivers.</p>
            <button
              onClick={() => navigate("/provider/post-job")}
              className="px-6 py-3 bg-gradient-to-r from-[#e68a1f] to-[#f0a84a] text-white font-bold text-sm rounded-xl shadow hover:opacity-90 transition-opacity cursor-pointer"
            >
              Post a Job
            </button>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && !error && jobs.length > 0 && (
          <div className="grid gap-5">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onView={handleViewApplicants} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}