import React, { useState } from "react";

import { BsSearch } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { 
  Users, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Calendar, 
  FileCheck, 
  Award,
  Filter,
  SlidersHorizontal
} from "lucide-react";

// Mock job data as if fetched from API
const mockJobs = [
  {
    id: 1,
    title: "Health Care Assistant (HCA)",
    company: "Serenity Gardens Adult Family Home",
    salary: "$50/hour",
    employment: "Full-time",
    time: "6am-2pm",
    employmentDetails: {
      neededFor: "Main caregiver",
      payPeriod: "Weekly"
    },
    residentSpecialty: ["Mental Health", "Diabetes", "Dementia"],
    description: "This is an Adult Family Home with six residents. We take mainly Developmental disabilities ages 18-35 years old. No behaviors",
    certificates: ["CPR/First Aid", "HCA", "Nurse delegation", "Food handler card"],
    location: "Seattle, WA",
    postedDate: "May 10, 2025"
  },
  {
    id: 2,
    title: "Certified Nursing Assistant",
    company: "Evergreen Care Center",
    salary: "$45/hour",
    employment: "Part-time",
    time: "2pm-10pm",
    employmentDetails: {
      neededFor: "Senior care specialist",
      payPeriod: "Bi-weekly"
    },
    residentSpecialty: ["Alzheimer's", "Mobility Assistance"],
    description: "Join our team at Evergreen Care Center providing compassionate care to seniors in our assisted living facility",
    certificates: ["CNA", "CPR/First Aid", "Blood Borne Pathogens"],
    location: "Bellevue, WA",
    postedDate: "May 12, 2025"
  },
  {
    id: 3,
    title: "In-Home Caregiver",
    company: "HomeWell Care Services",
    salary: "$30/hour",
    employment: "Contract",
    time: "Flexible hours",
    employmentDetails: {
      neededFor: "Elderly care",
      payPeriod: "Weekly"
    },
    residentSpecialty: ["Parkinson's", "Post-surgery care"],
    description: "Provide in-home care services for elderly clients needing assistance with daily activities and medication management",
    certificates: ["Home Care Aide", "CPR/First Aid"],
    location: "Tacoma, WA",
    postedDate: "May 8, 2025"
  },
  {
    id: 4,
    title: "Hospice Care Specialist",
    company: "Gentle Transitions",
    salary: "$55/hour",
    employment: "Full-time",
    time: "12-hour shifts",
    employmentDetails: {
      neededFor: "End-of-life care",
      payPeriod: "Bi-weekly"
    },
    residentSpecialty: ["Palliative Care", "Pain Management"],
    description: "Providing compassionate end-of-life care and family support in our dedicated hospice center",
    certificates: ["RN or LPN", "Hospice Certification", "CPR"],
    location: "Redmond, WA",
    postedDate: "May 14, 2025"
  },
  {
    id: 5,
    title: "Memory Care Specialist",
    company: "Sunrise Senior Living",
    salary: "$42/hour",
    employment: "Full-time",
    time: "Day shifts",
    employmentDetails: {
      neededFor: "Memory care unit",
      payPeriod: "Weekly"
    },
    residentSpecialty: ["Dementia", "Alzheimer's", "Cognitive Stimulation"],
    description: "Work with residents in our specialized memory care unit providing specialized support and therapeutic activities",
    certificates: ["Dementia Care Certification", "HCA", "CPR/First Aid"],
    location: "Kirkland, WA",
    postedDate: "May 9, 2025"
  }
];

// Filter options
const filters = {
  workingSchedule: ["Full time", "Part time", "Internship", "Contract"],
  employmentType: ["Full day", "Flexible schedule", "Shift work"],
  distance: ["Remote", "Within 5 miles", "Within 15 miles", "Within 30 miles"]
};

const JobCard = ({ job }) => {
  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
      {/* Header with colored background */}
      <div className="bg-[#557A95] text-white p-4">
        <h3 className="font-bold text-xl">{job.title}</h3>
        <p className="font-medium flex items-center mt-1">
          <Users className="mr-2 h-4 w-4" />
          {job.company}
        </p>
      </div>
      
      {/* Job highlights */}
      <div className="flex p-4 bg-gray-50 justify-between">
        <div className="flex items-center text-[#557A95] font-semibold">
          <DollarSign className="mr-1 h-5 w-5" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center bg-[#FF9923] text-white px-3 py-1 rounded-full font-medium text-sm">
          <Briefcase className="mr-1 h-4 w-4" />
          <span>{job.employment}</span>
        </div>
      </div>
      
      {/* Job details */}
      <div className="p-4 space-y-3">
        <div className="flex items-start">
          <Clock className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700">Time</p>
            <p className="text-gray-600">{job.time}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Calendar className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700">Employment Details</p>
            <p className="text-gray-600">Needed for: {job.employmentDetails.neededFor}</p>
            <p className="text-gray-600">Pay period: {job.employmentDetails.payPeriod}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Users className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700">Resident Speciality</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {job.residentSpecialty.map((specialty, idx) => (
                <span key={idx} className="bg-gray-100 px-2 py-0.5 rounded-full text-sm text-gray-700">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-start">
          <Briefcase className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700">Description</p>
            <p className="text-gray-600">{job.description}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <FileCheck className="h-5 w-5 mr-2 mt-0.5 text-[#557A95]" />
          <div>
            <p className="font-semibold text-gray-700">Certificates Needed</p>
            <ul className="text-gray-600 space-y-1 mt-1">
              {job.certificates.map((cert, idx) => (
                <li key={idx} className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FF9923] mr-2"></div>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer with location and apply button */}
      <div className="px-4 pb-4 pt-2">
        <div className="flex items-center text-gray-500 mb-3">
          <GoLocation className="mr-1" />
          <span>{job.location}</span>
          <span className="mx-2">•</span>
          <span>Posted: {job.postedDate}</span>
        </div>
        <button className="w-full bg-[#FF9923] hover:bg-[#e68a1f] text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center justify-center">
          <Award className="mr-2 h-5 w-5" />
          Apply Now
        </button>
      </div>
    </div>
  );
};

export const CareLandingPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Search Section with background */}
     
      
      {/* Main Content */}
      <div className="container mx-auto py-6 px-4">
        {/* Stats and Filter Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-[#FF9923] font-bold text-xl">
              Express care team helps you
            </h3>
            <p className="text-gray-600">get connected with over 100k Providers</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-gray-600 font-medium">{mockJobs.length} Jobs</p>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={18} />
              <span className="hidden md:inline">Filters</span>
            </button>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Conditionally shown on mobile */}
          {showFilters && (
            <div className="md:w-64 bg-white p-4 rounded-lg shadow-md border border-gray-200 h-fit">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="md:hidden text-gray-500"
                >
                  ✕
                </button>
              </div>
              
              {/* Working Schedule */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-gray-700">Working schedule</h4>
                {filters.workingSchedule.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`schedule-${index}`}
                      className="h-4 w-4 text-[#FF9923] rounded focus:ring-[#FF9923]"
                    />
                    <label htmlFor={`schedule-${index}`} className="ml-2 text-gray-600">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
              
              {/* Employment Type */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-gray-700">Employment type</h4>
                {filters.employmentType.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`employment-${index}`}
                      className="h-4 w-4 text-[#FF9923] rounded focus:ring-[#FF9923]"
                    />
                    <label htmlFor={`employment-${index}`} className="ml-2 text-gray-600">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
              
              {/* Distance */}
              <div>
                <h4 className="font-semibold mb-2 text-gray-700">Distance</h4>
                {filters.distance.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`distance-${index}`}
                      className="h-4 w-4 text-[#FF9923] rounded focus:ring-[#FF9923]"
                    />
                    <label htmlFor={`distance-${index}`} className="ml-2 text-gray-600">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
              
              {/* Clear/Apply Filter Buttons */}
              <div className="mt-6 flex gap-2">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors">
                  Clear
                </button>
                <button className="flex-1 bg-[#557A95] hover:bg-[#476a80] text-white py-2 px-4 rounded-md transition-colors">
                  Apply
                </button>
              </div>
            </div>
          )}
          
          {/* Job Cards Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mockJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareLandingPage;