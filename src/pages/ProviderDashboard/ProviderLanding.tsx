import { useState } from "react";

interface Job {
  id: number;
  title: string;
  location: string;
  rate: string;
  type: string;
  applicants: number;
  status: "Open" | "Closed";
}

export default function MyJobs() {
  // 🔹 For now, empty (since posting not implemented yet)
  const [jobs] = useState<Job[]>([]);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10">
      {/* Main Container (NOT full width) */}
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-2xl font-semibold mb-6">My Jobs</h1>

        {/* ✅ If No Jobs Posted */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">
            <p className="text-gray-600 text-lg">
              You haven’t posted a job yet.
            </p>
            <p className="text-gray-500 mt-2">
              Post a job to connect with a caregiver.
            </p>
          </div>
        ) : (
          /* ✅ If Jobs Exist → Render Dummy UI Card Design */
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold">{job.title}</h2>
                    <p className="text-gray-500 mt-1">{job.location}</p>
                  </div>

                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Rate: {job.rate}</span>
                  <span>Type: {job.type}</span>
                  <span>{job.applicants} Applicants</span>
                </div>

                <div className="mt-5 flex gap-3">
                  <button className="px-4 py-2 bg-black text-white rounded-lg text-sm">
                    View Applicants
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                    Edit Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}