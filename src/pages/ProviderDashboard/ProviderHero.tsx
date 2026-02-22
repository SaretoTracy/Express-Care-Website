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
  MapPin,
  Search as SearchIcon,
  Edit,
  Trash2,
  Plus,
  Eye,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
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
    status: "Active",
    applicantCount: 12,
    bg: "bg-[#FFF2E6]",
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
    status: "Active",
    applicantCount: 8,
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
    status: "Active",
    applicantCount: 15,
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
    status: "Closed",
    applicantCount: 5,
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
    status: "Active",
    applicantCount: 20,
    bg: "bg-[#FFF7EA]",
  },
];

/* --------------------------- mock applicants data ------------------------ */
const mockApplicants = [
  {
    id: 101,
    jobId: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(206) 555-0123",
    experience: "5 years",
    certifications: ["CPR/First Aid", "HCA", "Nurse delegation"],
    appliedDate: "May 11, 2025",
    status: "New",
    notes: "Has experience with developmental disabilities",
  },
  {
    id: 102,
    jobId: 1,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "(425) 555-0456",
    experience: "3 years",
    certifications: ["CPR/First Aid", "HCA", "Food handler card"],
    appliedDate: "May 12, 2025",
    status: "Reviewed",
    notes: "Currently working at similar facility",
  },
  {
    id: 103,
    jobId: 1,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "(253) 555-0789",
    experience: "7 years",
    certifications: ["CPR/First Aid", "HCA", "Nurse delegation", "Food handler card"],
    appliedDate: "May 10, 2025",
    status: "Contacted",
    notes: "Excellent references from previous employers",
  },
  {
    id: 104,
    jobId: 2,
    name: "David Martinez",
    email: "d.martinez@email.com",
    phone: "(206) 555-0321",
    experience: "4 years",
    certifications: ["CNA", "CPR/First Aid"],
    appliedDate: "May 13, 2025",
    status: "New",
    notes: "Specialized in Alzheimer's care",
  },
  {
    id: 105,
    jobId: 3,
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    phone: "(425) 555-0654",
    experience: "6 years",
    certifications: ["Home Care Aide", "CPR/First Aid"],
    appliedDate: "May 9, 2025",
    status: "Reviewed",
    notes: "Experienced with post-surgery recovery care",
  },
];

/* ----------------------------- filter options ---------------------------- */
const FILTERS = {
  status: ["Active", "Closed", "Draft"],
  employmentType: ["Full-time", "Part-time", "Contract", "Internship"],
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

/* -------------------------- ApplicantsModal ------------------------------ */
type JobType = typeof mockJobs[number];
type ApplicantType = typeof mockApplicants[number];

const ApplicantsModal: React.FC<{
  job: JobType | null;
  applicants: ApplicantType[];
  onClose: () => void;
}> = ({ job, applicants, onClose }) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 640 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!job) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";
      case "Reviewed":
        return "bg-yellow-100 text-yellow-700";
      case "Contacted":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
          className={`w-full ${isMobile ? "max-w-full" : "max-w-4xl"} bg-white rounded-t-xl md:rounded-xl overflow-hidden max-h-[90vh] flex flex-col`}
          style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}
        >
          {/* Header */}
          <div className="bg-[#557A95] p-5 rounded-t-xl md:rounded-t-xl flex items-start justify-between text-white">
            <div>
              <h2 className="text-2xl font-bold">Applicants for {job.title}</h2>
              <p className="opacity-90 mt-1">{applicants.length} Total Applicants</p>
            </div>

            <button
              onClick={onClose}
              className="text-white text-2xl font-medium leading-none"
              aria-label="Close applicants"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1">
            {applicants.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">No applicants yet</p>
                <p className="text-sm mt-2">Check back later for new applications</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applicants.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{applicant.name}</h3>
                        <p className="text-sm text-gray-500">Applied: {applicant.appliedDate}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                        {applicant.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail className="w-4 h-4 text-[#557A95]" />
                        <a href={`mailto:${applicant.email}`} className="hover:underline">
                          {applicant.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone className="w-4 h-4 text-[#557A95]" />
                        <a href={`tel:${applicant.phone}`} className="hover:underline">
                          {applicant.phone}
                        </a>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Experience:</p>
                      <p className="text-sm text-gray-600">{applicant.experience}</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Certifications:</p>
                      <div className="flex flex-wrap gap-2">
                        {applicant.certifications.map((cert, i) => (
                          <span key={i} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs border border-green-200">
                            <CheckCircle className="w-3 h-3 inline mr-1" />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {applicant.notes && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Notes:</p>
                        <p className="text-sm text-gray-600">{applicant.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 bg-[#557A95] hover:bg-[#476a80] text-white font-medium py-2 rounded-md text-sm transition-colors">
                        Contact Applicant
                      </button>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-md text-sm transition-colors">
                        View Resume
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* -------------------------- DeleteConfirmModal --------------------------- */
const DeleteConfirmModal: React.FC<{
  job: JobType | null;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ job, onClose, onConfirm }) => {
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

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete "<strong>{job.title}</strong>"? This action cannot be undone.
            {job.applicantCount > 0 && (
              <span className="block mt-2 text-red-600 font-medium">
                Warning: This job has {job.applicantCount} applicants.
              </span>
            )}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ------------------------------- JobCard -------------------------------- */
const JobCard: React.FC<{
  job: JobType;
  onViewApplicants: (job: JobType) => void;
  onEdit: (job: JobType) => void;
  onDelete: (job: JobType) => void;
}> = ({ job, onViewApplicants, onEdit, onDelete }) => {
  const getStatusBadge = () => {
    switch (job.status) {
      case "Active":
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Active</span>;
      case "Closed":
        return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Closed</span>;
      case "Draft":
        return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">Draft</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="bg-[#557A95] text-white p-4 rounded-t-xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg">{job.title}</h3>
            <p className="font-medium flex items-center mt-1 text-sm">
              <Users className="mr-2 h-4 w-4" />
              {job.company}
            </p>
          </div>
          {getStatusBadge()}
        </div>
      </div>

      {/* Highlights */}
      <div className="flex p-3 bg-gray-50 justify-between items-center">
        <div className="flex items-center text-[#557A95] font-semibold">
          <DollarSign className="mr-1 h-5 w-5" />
          <span>{job.salary}</span>
        </div>

        <div className="flex items-center bg-[#FF9923] text-white px-3 py-1 rounded-full font-medium text-sm">
          <Briefcase className="mr-1 h-4 w-4" />
          <span>{job.employment}</span>
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
          <Users className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Resident Specialties</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.residentSpecialty.slice(0, 2).map((spec, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                  {spec}
                </span>
              ))}
              {job.residentSpecialty.length > 2 && (
                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                  +{job.residentSpecialty.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Applicant Count */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-900">{job.applicantCount} Applicants</span>
          </div>
          {job.applicantCount > 0 && (
            <button
              onClick={() => onViewApplicants(job)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-2">
        <div className="flex items-center text-gray-500 mb-3 text-sm">
          <MapPin className="mr-1 w-4 h-4" />
          <span>{job.location}</span>
          <span className="mx-2">•</span>
          <span>Posted: {job.postedDate}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onViewApplicants(job)}
            className="flex-1 bg-[#557A95] hover:bg-[#476a80] text-white font-semibold py-2 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Applicants
          </button>
          <button
            onClick={() => onEdit(job)}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-3 py-2 rounded-md transition-colors"
            aria-label="Edit job"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(job)}
            className="bg-white border border-red-300 hover:bg-red-50 text-red-600 font-medium px-3 py-2 rounded-md transition-colors"
            aria-label="Delete job"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* --------------------------- Main Dashboard ------------------------------ */
const ProviderHero: React.FC = () => {
  const [jobs, setJobs] = useState<JobType[]>(mockJobs);
  const [applicants] = useState<ApplicantType[]>(mockApplicants);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // checkbox filters
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([]);

  // sort
  const [sortBy, setSortBy] = useState<"latest" | "applicants" | "oldest">("latest");

  // modals
  const [selectedJobForApplicants, setSelectedJobForApplicants] = useState<JobType | null>(null);
  const [jobToDelete, setJobToDelete] = useState<JobType | null>(null);

  // toggle checkbox helpers
  const toggleArray = (arr: string[], setter: (v: string[]) => void, value: string) => {
    if (arr.includes(value)) setter(arr.filter((a) => a !== value));
    else setter([...arr, value]);
  };

  const handleEdit = (job: JobType) => {
    alert(`Edit job: ${job.title}\n(Edit form would open here)`);
  };

  const handleDeleteConfirm = () => {
    if (jobToDelete) {
      setJobs((prev) => prev.filter((j) => j.id !== jobToDelete.id));
      setJobToDelete(null);
    }
  };

  // determine filtered jobs
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = jobs;

    if (q) {
      out = out.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
      );
    }

    if (selectedStatus.length > 0) {
      out = out.filter((j) => selectedStatus.includes(j.status));
    }

    if (selectedEmploymentType.length > 0) {
      out = out.filter((j) => selectedEmploymentType.includes(j.employment));
    }

    // sorting
    if (sortBy === "applicants") {
      out = [...out].sort((a, b) => b.applicantCount - a.applicantCount);
    } else if (sortBy === "oldest") {
      out = [...out].reverse();
    }
    // "latest" is default order

    return out;
  }, [jobs, query, selectedStatus, selectedEmploymentType, sortBy]);

  const currentApplicants = useMemo(() => {
    if (!selectedJobForApplicants) return [];
    return applicants.filter((a) => a.jobId === selectedJobForApplicants.id);
  }, [selectedJobForApplicants, applicants]);

  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicantCount, 0);

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
          <p className="text-2xl font-bold text-gray-800">{jobs.filter((j) => j.status === "Active").length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Applicants</p>
          <p className="text-2xl font-bold text-gray-800">{totalApplicants}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-[#FF9923]">
          <p className="text-gray-600 text-sm">Avg per Job</p>
          <p className="text-2xl font-bold text-gray-800">{jobs.length > 0 ? Math.round(totalApplicants / jobs.length) : 0}</p>
        </div>
      </div>

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
            <option value="applicants">Most Applicants</option>
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
            className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50"
          >
            <SlidersHorizontal />
            <span className="hidden md:inline">Filters</span>
          </button>

          <button
            onClick={() => alert("Create new job posting\n(Form would open here)")}
            className="flex items-center gap-2 bg-[#FF9923] hover:bg-[#e68a1f] text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Post Job</span>
            <span className="md:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className={`col-span-12 md:col-span-3 ${!showFilters ? "hidden md:block" : "block"}`}>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-[#557A95]">Filters</h3>
              <button className="text-gray-500 md:hidden" onClick={() => setShowFilters(false)}>
                ✕
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Status</h4>
              <div className="space-y-2">
                {FILTERS.status.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedStatus.includes(item)}
                      onChange={() => toggleArray(selectedStatus, setSelectedStatus, item)}
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

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setSelectedStatus([]);
                  setSelectedEmploymentType([]);
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
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or create a new job posting</p>
              <button
                onClick={() => alert("Create new job posting")}
                className="bg-[#FF9923] hover:bg-[#e68a1f] text-white px-6 py-2 rounded-lg font-medium inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Post Your First Job
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onViewApplicants={(j) => setSelectedJobForApplicants(j)}
                  onEdit={handleEdit}
                  onDelete={(j) => setJobToDelete(j)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Applicants Modal */}
      {selectedJobForApplicants && (
        <ApplicantsModal
          job={selectedJobForApplicants}
          applicants={currentApplicants}
          onClose={() => setSelectedJobForApplicants(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {jobToDelete && (
        <DeleteConfirmModal
          job={jobToDelete}
          onClose={() => setJobToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ProviderHero;