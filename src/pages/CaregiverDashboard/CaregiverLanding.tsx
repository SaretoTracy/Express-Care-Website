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
  MapPin,
  Search as SearchIcon,
  Bookmark
} from "lucide-react";

/* ----------------------------- mock job data ----------------------------- */
const mockJobs = [
  {
    id: 1,
    title: "Health Care Assistant (HCA)",
    company: "Serenity Gardens Adult Family Home",
    salary: "$50/hour",
    salaryNumber: 50,
    employment: "Full-time",
    time: "6am - 2pm",
    employmentDetails: {
      neededFor: "Main caregiver",
      payPeriod: "Weekly",
    },
    residentSpecialty: ["Mental Health", "Diabetes", "Dementia"],
    description:
      "This is an Adult Family Home with six residents. We take mainly Developmental disabilities ages 18-35 years old. No behaviors",
    certificates: ["CPR/First Aid", "HCA", "Nurse delegation", "Food handler card"],
    location: "Seattle, WA",
    postedDate: "May 10, 2025",
    bg: "bg-[#FFF2E6]", // faint pastel
  },
  {
    id: 2,
    title: "Certified Nursing Assistant",
    company: "Evergreen Care Center",
    salary: "$45/hour",
    salaryNumber: 45,
    employment: "Part-time",
    time: "2pm - 10pm",
    employmentDetails: {
      neededFor: "Senior care specialist",
      payPeriod: "Bi-weekly",
    },
    residentSpecialty: ["Alzheimer's", "Mobility Assistance"],
    description:
      "Join our team at Evergreen Care Center providing compassionate care to seniors in our assisted living facility",
    certificates: ["CNA", "CPR/First Aid", "Blood Borne Pathogens"],
    location: "Bellevue, WA",
    postedDate: "May 12, 2025",
    bg: "bg-[#E9FFF8]",
  },
  {
    id: 3,
    title: "In-Home Caregiver",
    company: "HomeWell Care Services",
    salary: "$30/hour",
    salaryNumber: 30,
    employment: "Contract",
    time: "Flexible hours",
    employmentDetails: {
      neededFor: "Elderly care",
      payPeriod: "Weekly",
    },
    residentSpecialty: ["Parkinson's", "Post-surgery care"],
    description:
      "Provide in-home care services for elderly clients needing assistance with daily activities and medication management",
    certificates: ["Home Care Aide", "CPR/First Aid"],
    location: "Tacoma, WA",
    postedDate: "May 8, 2025",
    bg: "bg-[#F0F7FF]",
  },
  {
    id: 4,
    title: "Hospice Care Specialist",
    company: "Gentle Transitions",
    salary: "$55/hour",
    salaryNumber: 55,
    employment: "Full-time",
    time: "12-hour shifts",
    employmentDetails: {
      neededFor: "End-of-life care",
      payPeriod: "Bi-weekly",
    },
    residentSpecialty: ["Palliative Care", "Pain Management"],
    description:
      "Providing compassionate end-of-life care and family support in our dedicated hospice center",
    certificates: ["RN or LPN", "Hospice Certification", "CPR"],
    location: "Redmond, WA",
    postedDate: "May 14, 2025",
    bg: "bg-[#FFF0F8]",
  },
  {
    id: 5,
    title: "Memory Care Specialist",
    company: "Sunrise Senior Living",
    salary: "$42/hour",
    salaryNumber: 42,
    employment: "Full-time",
    time: "Day shifts",
    employmentDetails: {
      neededFor: "Memory care unit",
      payPeriod: "Weekly",
    },
    residentSpecialty: ["Dementia", "Alzheimer's", "Cognitive Stimulation"],
    description:
      "Work with residents in our specialized memory care unit providing specialized support and therapeutic activities",
    certificates: ["Dementia Care Certification", "HCA", "CPR/First Aid"],
    location: "Kirkland, WA",
    postedDate: "May 9, 2025",
    bg: "bg-[#FFF7EA]",
  },
];

/* ----------------------------- filter options ---------------------------- */
const FILTERS = {
  workingSchedule: ["Full-time", "Part-time", "Internship", "Contract"],
  employmentType: ["Full day", "Flexible schedule", "Shift work"],
  distance: ["Remote", "Within 5 miles", "Within 15 miles", "Within 30 miles"],
};

/* ---------------------------- animation variants ------------------------- */
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

/* ------------------------------ helper utils ----------------------------- */
const readSavedJobs = (): number[] => {
  try {
    const raw = localStorage.getItem("savedJobs");
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
};

const saveSavedJobs = (arr: number[]) => {
  try {
    localStorage.setItem("savedJobs", JSON.stringify(arr));
  } catch {}
};

/* ----------------------------- JobDetailsModal --------------------------- */
type JobType = typeof mockJobs[number];

const JobDetailsModal: React.FC<{
  job: JobType | null;
  onClose: () => void;
  onToggleSave: (id: number) => void;
  isSaved: boolean;
}> = ({ job, onClose, onToggleSave, isSaved }) => {
  const [isMobile, setIsMobile] = useState<boolean>(
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
          <div className="bg-[#557A95] p-5 rounded-t-xl md:rounded-t-xl flex items-start justify-between text-white">
            <div>
              <h2 className="text-2xl font-bold">{job.title}</h2>
              <p className="opacity-90 mt-1">{job.company}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSave(job.id)}
                aria-label={isSaved ? "Unsave" : "Save job"}
                className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-white hover:opacity-90"
              >
                <HeartIcon className="w-4 h-4" />
                <span className="text-sm">{isSaved ? "Saved" : "Save"}</span>
              </button>

              <button
                onClick={onClose}
                className="text-white text-2xl font-medium leading-none"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5 text-gray-700">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[#557A95] font-semibold">
                <DollarSign className="w-4 h-4" />
                <span>{job.salary}</span>
              </div>

              <div className="flex items-center gap-2 bg-[#FF9923] text-white px-3 py-1 rounded-full font-medium text-sm">
                <Briefcase className="w-4 h-4" />
                <span>{job.employment}</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">Description</h4>
              <p className="text-gray-600 mt-2">{job.description}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">Certificates Needed</h4>
              <ul className="mt-2 space-y-1 text-gray-700">
                {job.certificates.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FF9923]" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">Resident Specialties</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {job.residentSpecialty.map((s, i) => (
                  <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Posted:</strong> {job.postedDate}</p>
              </div>
              <div>
                <p><strong>Shift / Time:</strong> {job.time}</p>
                <p><strong>Pay period:</strong> {job.employmentDetails.payPeriod}</p>
              </div>
            </div>

            <div className="pt-2">
              <button className="w-full bg-[#FF9923] hover:bg-[#e68a1f] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-3">
                <Award className="w-4 h-4" />
                Apply Now
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ------------------------------- JobCard -------------------------------- */
const JobCard: React.FC<{
  job: JobType;
  onView: (job: JobType) => void;
  onToggleSave: (id: number) => void;
  isSaved: boolean;
}> = ({ job, onView, onToggleSave, isSaved }) => {
  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="bg-[#557A95] text-white p-4 rounded-t-xl">
        <h3 className="font-bold text-lg">{job.title}</h3>
        <p className="font-medium flex items-center mt-1 text-sm">
          <Users className="mr-2 h-4 w-4" />
          {job.company}
        </p>
      </div>

      {/* Highlights */}
      <div className="flex p-3 bg-gray-50 justify-between items-center">
        <div className="flex items-center text-[#557A95] font-semibold">
          <DollarSign className="mr-1 h-5 w-5" />
          <span>{job.salary}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#FF9923] text-white px-3 py-1 rounded-full font-medium text-sm">
            <Briefcase className="mr-1 h-4 w-4" />
            <span>{job.employment}</span>
          </div>

          <button
            onClick={() => onToggleSave(job.id)}
            aria-label={isSaved ? "Unsave job" : "Save job"}
            className={`p-2 rounded-md border ${isSaved ? "bg-[#FFEBD6] border-[#FFB46A]" : "bg-white border-gray-200"} hover:opacity-90`}
          >
            <Bookmark className={`${isSaved ? "text-[#FF9923]" : "text-gray-600"} w-4 h-4`} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="flex items-start">
          <Clock className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Time</p>
            <p className="text-gray-600 text-sm">{job.time}</p>
          </div>
        </div>

        <div className="flex items-start">
          <Calendar className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Employment</p>
            <p className="text-gray-600 text-sm">Needed for: {job.employmentDetails.neededFor}</p>
            <p className="text-gray-600 text-sm">Pay period: {job.employmentDetails.payPeriod}</p>
          </div>
        </div>

        <div className="flex items-start">
          <Users className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Resident Specialties</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.residentSpecialty.map((spec, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-sm text-gray-700">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-2">
        <div className="flex items-center text-gray-500 mb-3 text-sm">
          <MapPin className="mr-1" />
          <span>{job.location}</span>
          <span className="mx-2">•</span>
          <span>Posted: {job.postedDate}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onView(job)}
            className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-[#557A95] font-semibold py-2 rounded-md transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

/* --------------------------- Main Dashboard ------------------------------ */
const CaregiverDashboard: React.FC = () => {
  const [jobs] = useState<JobType[]>(mockJobs);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // checkbox filters
  const [selectedSchedule, setSelectedSchedule] = useState<string[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([]);
  const [selectedDistance, setSelectedDistance] = useState<string[]>([]);

  // salary filter (max)
  const [salaryMax, setSalaryMax] = useState<number>(100); // default $100/hr cap

  // sort
  const [sortBy, setSortBy] = useState<"latest" | "highest" | "lowest">("latest");

  // modal
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);

  // saved jobs
  const [savedJobs, setSavedJobs] = useState<number[]>(readSavedJobs());

  useEffect(() => {
    saveSavedJobs(savedJobs);
  }, [savedJobs]);

  // toggle checkbox helpers
  const toggleArray = (arr: string[], setter: (v: string[]) => void, value: string) => {
    if (arr.includes(value)) setter(arr.filter((a) => a !== value));
    else setter([...arr, value]);
  };

  const onToggleSave = (id: number) => {
    setSavedJobs((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  // determine if a job matches filters
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let out = jobs.filter((j) => j.salaryNumber <= salaryMax);

    if (q) {
      out = out.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
      );
    }

    if (selectedSchedule.length > 0) {
      out = out.filter((j) => selectedSchedule.some((s) => j.employment.includes(s) || j.employment.toLowerCase().includes(s.toLowerCase())));
    }

    if (selectedEmploymentType.length > 0) {
      out = out.filter((j) =>
        selectedEmploymentType.some((s) => j.employmentDetails.payPeriod.toLowerCase().includes(s.toLowerCase()))
      );
    }

    if (selectedDistance.length > 0) {
      // mock: treat "Remote" as location includes 'Remote'
      out = out.filter((j) =>
        selectedDistance.some((d) => (d === "Remote" ? j.location.toLowerCase().includes("remote") : true))
      );
    }

    // sorting
    if (sortBy === "highest") out = out.sort((a, b) => b.salaryNumber - a.salaryNumber);
    if (sortBy === "lowest") out = out.sort((a, b) => a.salaryNumber - b.salaryNumber);
    if (sortBy === "latest") out = out; // assume mockJobs already in latest order

    return out;
  }, [jobs, query, selectedSchedule, selectedEmploymentType, selectedDistance, salaryMax, sortBy]);

  return (
    <div className="min-h-screen bg-[#F3F6F9] p-6">
      {/* Top search/filter bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, company or location"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#557A95]"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-200 rounded-lg px-3 py-2"
          >
            <option value="latest">Sort: Latest</option>
            <option value="highest">Highest pay</option>
            <option value="lowest">Lowest pay</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-gray-800 font-semibold">{filtered.length}</span>
            <span>Jobs</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              <SlidersHorizontal />
              <span className="hidden md:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className={`col-span-12 md:col-span-3 ${!showFilters ? "hidden md:block" : "block"} `}>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-[#557A95]">Filters</h3>
              <button className="text-gray-500 md:hidden" onClick={() => setShowFilters(false)}>✕</button>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Working schedule</h4>
              <div className="space-y-2">
                {FILTERS.workingSchedule.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedSchedule.includes(item)}
                      onChange={() => toggleArray(selectedSchedule, setSelectedSchedule, item)}
                      className="h-4 w-4 text-[#557A95] rounded"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Employment type</h4>
              <div className="space-y-2">
                {FILTERS.employmentType.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedEmploymentType.includes(item)}
                      onChange={() => toggleArray(selectedEmploymentType, setSelectedEmploymentType, item)}
                      className="h-4 w-4 text-[#557A95] rounded"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Distance</h4>
              <div className="space-y-2">
                {FILTERS.distance.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedDistance.includes(item)}
                      onChange={() => toggleArray(selectedDistance, setSelectedDistance, item)}
                      className="h-4 w-4 text-[#557A95] rounded"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-gray-700 mb-2">Salary max ($/hr)</h4>
              <input
                type="range"
                min={0}
                max={100}
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-sm mt-1 text-gray-600">Up to ${salaryMax}/hr</div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setSelectedSchedule([]);
                  setSelectedEmploymentType([]);
                  setSelectedDistance([]);
                  setSalaryMax(100);
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-md"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-[#557A95] hover:bg-[#476a80] text-white py-2 rounded-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Job Grid */}
        <div className="col-span-12 md:col-span-9">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onView={(j) => setSelectedJob(j)}
                onToggleSave={onToggleSave}
                isSaved={savedJobs.includes(job.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
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
