import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  DollarSign,
  Clock,
  Calendar,
  Users,
  MapPin,
  FileText,
  Award,
  X,
  Plus,
  Building2,
  CheckCircle,
} from "lucide-react";

/* ----------------------------- form data types --------------------------- */
interface JobFormData {
  title: string;
  company: string;
  salary: string;
  employment: string;
  time: string;
  neededFor: string;
  payPeriod: string;
  residentSpecialty: string[];
  description: string;
  certificates: string[];
  location: string;
  status: string;
}

const INITIAL_FORM_DATA: JobFormData = {
  title: "",
  company: "",
  salary: "",
  employment: "Full-time",
  time: "",
  neededFor: "",
  payPeriod: "Weekly",
  residentSpecialty: [],
  description: "",
  certificates: [],
  location: "",
  status: "Draft",
};

/* --------------------------- employment options -------------------------- */
const EMPLOYMENT_OPTIONS = ["Full-time", "Part-time", "Contract", "Internship"];
const PAY_PERIOD_OPTIONS = ["Weekly", "Bi-weekly", "Monthly"];
const STATUS_OPTIONS = ["Draft", "Active", "Closed"];

const COMMON_SPECIALTIES = [
  "Mental Health",
  "Diabetes",
  "Dementia",
  "Alzheimer's",
  "Mobility Assistance",
  "Parkinson's",
  "Post-surgery care",
  "Palliative Care",
  "Pain Management",
  "Cognitive Stimulation",
];

const COMMON_CERTIFICATES = [
  "CPR/First Aid",
  "HCA",
  "CNA",
  "Nurse delegation",
  "Food handler card",
  "Blood Borne Pathogens",
  "Home Care Aide",
  "RN or LPN",
  "Hospice Certification",
  "Dementia Care Certification",
];

/* --------------------------- PostJobForm --------------------------------- */
const PostJobForm: React.FC<{ onClose?: () => void; onSubmit?: (data: JobFormData) => void }> = ({
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<JobFormData>(INITIAL_FORM_DATA);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Custom specialty/certificate inputs
  const [customSpecialty, setCustomSpecialty] = useState("");
  const [customCertificate, setCustomCertificate] = useState("");

  const updateField = <K extends keyof JobFormData>(field: K, value: JobFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: "residentSpecialty" | "certificates", item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const addCustomSpecialty = () => {
    if (customSpecialty.trim() && !formData.residentSpecialty.includes(customSpecialty.trim())) {
      setFormData((prev) => ({
        ...prev,
        residentSpecialty: [...prev.residentSpecialty, customSpecialty.trim()],
      }));
      setCustomSpecialty("");
    }
  };

  const addCustomCertificate = () => {
    if (customCertificate.trim() && !formData.certificates.includes(customCertificate.trim())) {
      setFormData((prev) => ({
        ...prev,
        certificates: [...prev.certificates, customCertificate.trim()],
      }));
      setCustomCertificate("");
    }
  };

  const removeSpecialty = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      residentSpecialty: prev.residentSpecialty.filter((i) => i !== item),
    }));
  };

  const removeCertificate = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((i) => i !== item),
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.title && formData.company && formData.location);
      case 2:
        return !!(formData.salary && formData.employment && formData.time);
      case 3:
        return !!(formData.description && formData.residentSpecialty.length > 0);
      case 4:
        return formData.certificates.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      if (onClose) onClose();
    }, 2000);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                step < currentStep
                  ? "bg-green-500 text-white"
                  : step === currentStep
                  ? "bg-[#557A95] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
            </div>
            <p className="text-xs mt-2 text-gray-600 hidden md:block">
              {step === 1 && "Basic Info"}
              {step === 2 && "Employment"}
              {step === 3 && "Details"}
              {step === 4 && "Requirements"}
              {step === 5 && "Review"}
            </p>
          </div>
          {step < 5 && (
            <div
              className={`flex-1 h-1 mx-2 ${
                step < currentStep ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Basic Information</h2>
        <p className="text-gray-600">Let's start with the essential details about the position</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Briefcase className="inline w-4 h-4 mr-2 text-[#557A95]" />
          Job Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="e.g., Health Care Assistant (HCA)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#557A95] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Building2 className="inline w-4 h-4 mr-2 text-[#557A95]" />
          Company/Facility Name *
        </label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => updateField("company", e.target.value)}
          placeholder="e.g., Serenity Gardens Adult Family Home"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#557A95] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <MapPin className="inline w-4 h-4 mr-2 text-[#557A95]" />
          Location *
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => updateField("location", e.target.value)}
          placeholder="e.g., Seattle, WA"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#557A95] focus:border-transparent"
        />
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Employment Details</h2>
        <p className="text-gray-600">Specify compensation and work schedule</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <DollarSign className="inline w-4 h-4 mr-2 text-[#557A95]" />
          Hourly Rate *
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={formData.salary}
            onChange={(e) => updateField("salary", e.target.value)}
            placeholder="50"
            className="w-full pl-8 pr-20 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#557A95] focus:border-transparent"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">/hour</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Briefcase className="inline w-4 h-4 mr-2 text-[#557A95]" />
          Employment Type *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {EMPLOYMENT_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField("employment", option)}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                formData.employment === option
                  ? "bg-[#557A95] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Clock className="inline w-4 h-4 mr-2 text-[#557A95]" />
          Work Schedule *
        </label>
        <input
          type="text"
          value={formData.time}
          onChange={(e) => updateField("time", e.target.value)}
          placeholder="e.g., 6am - 2pm or Flexible hours"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#557A95] focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Users className="inline w-4 h-4 mr-2 text-[#557A95]" />
            Needed For
          </label>
          <input
            type="text"
            value={formData.neededFor}
            onChange={(e) => updateField("neededFor", e.target.value)}
            placeholder="e.g., Main caregiver"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#557A95] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-2 text-[#557A95]" />
            Pay Period
          </label>
          <select
            value={formData.payPeriod}
            onChange={(e) => updateField("payPeriod", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#557A95] focus:border-transparent"
          >
            {PAY_PERIOD_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Details</h2>
        <p className="text-gray-600">Describe the role and resident care needs</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <FileText className="inline w-4 h-4 mr-2 text-[#557A95]" />
          Job Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Provide a detailed description of the role, responsibilities, and what makes this opportunity unique..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#557A95] focus:border-transparent resize-none"
        />
        <p className="text-sm text-gray-500 mt-1">{formData.description.length} characters</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Users className="inline w-4 h-4 mr-2 text-[#557A95]" />
          Resident Specialties * (Select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
          {COMMON_SPECIALTIES.map((specialty) => (
            <button
              key={specialty}
              type="button"
              onClick={() => toggleArrayItem("residentSpecialty", specialty)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                formData.residentSpecialty.includes(specialty)
                  ? "bg-[#557A95] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>

        {/* Add custom specialty */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customSpecialty}
            onChange={(e) => setCustomSpecialty(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSpecialty())}
            placeholder="Add custom specialty"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#557A95] focus:border-transparent"
          />
          <button
            type="button"
            onClick={addCustomSpecialty}
            className="bg-[#FF9923] hover:bg-[#e68a1f] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Selected specialties */}
        {formData.residentSpecialty.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Selected Specialties:</p>
            <div className="flex flex-wrap gap-2">
              {formData.residentSpecialty.map((item) => (
                <span
                  key={item}
                  className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 border border-gray-300 flex items-center gap-2"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeSpecialty(item)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Requirements</h2>
        <p className="text-gray-600">Specify required certifications and qualifications</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Award className="inline w-4 h-4 mr-2 text-[#557A95]" />
          Required Certificates * (Select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
          {COMMON_CERTIFICATES.map((cert) => (
            <button
              key={cert}
              type="button"
              onClick={() => toggleArrayItem("certificates", cert)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                formData.certificates.includes(cert)
                  ? "bg-[#FF9923] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cert}
            </button>
          ))}
        </div>

        {/* Add custom certificate */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customCertificate}
            onChange={(e) => setCustomCertificate(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomCertificate())}
            placeholder="Add custom certificate"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#557A95] focus:border-transparent"
          />
          <button
            type="button"
            onClick={addCustomCertificate}
            className="bg-[#FF9923] hover:bg-[#e68a1f] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Selected certificates */}
        {formData.certificates.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Required Certificates:</p>
            <div className="flex flex-wrap gap-2">
              {formData.certificates.map((item) => (
                <span
                  key={item}
                  className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 border border-gray-300 flex items-center gap-2"
                >
                  <Award className="w-3 h-3 text-[#FF9923]" />
                  {item}
                  <button
                    type="button"
                    onClick={() => removeCertificate(item)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderStep5 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Review & Publish</h2>
        <p className="text-gray-600">Review your job posting before publishing</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Preview Header */}
        <div className="bg-[#557A95] text-white p-5">
          <h3 className="text-xl font-bold">{formData.title || "Job Title"}</h3>
          <p className="opacity-90 mt-1">{formData.company || "Company Name"}</p>
        </div>

        {/* Preview Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#557A95] font-semibold">
              <DollarSign className="w-4 h-4" />
              <span>${formData.salary || "0"}/hour</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FF9923] text-white px-3 py-1 rounded-full font-medium text-sm">
              <Briefcase className="w-4 h-4" />
              <span>{formData.employment}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700">Schedule</p>
              <p className="text-gray-600">{formData.time || "Not specified"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Pay Period</p>
              <p className="text-gray-600">{formData.payPeriod}</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-700 mb-2">Description</p>
            <p className="text-gray-600 text-sm">{formData.description || "No description provided"}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700 mb-2">Resident Specialties</p>
            <div className="flex flex-wrap gap-2">
              {formData.residentSpecialty.length > 0 ? (
                formData.residentSpecialty.map((spec) => (
                  <span key={spec} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {spec}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">None selected</span>
              )}
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-700 mb-2">Required Certificates</p>
            <div className="flex flex-wrap gap-2">
              {formData.certificates.length > 0 ? (
                formData.certificates.map((cert) => (
                  <span key={cert} className="bg-[#FFF7EA] text-[#FF9923] px-3 py-1 rounded-full text-sm border border-[#FF9923]">
                    <Award className="w-3 h-3 inline mr-1" />
                    {cert}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">None selected</span>
              )}
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Location</p>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {formData.location || "Not specified"}
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Publishing Status</label>
        <div className="grid grid-cols-3 gap-3">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => updateField("status", status)}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                formData.status === status
                  ? status === "Active"
                    ? "bg-green-500 text-white shadow-md"
                    : status === "Draft"
                    ? "bg-yellow-500 text-white shadow-md"
                    : "bg-gray-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {formData.status === "Active" && "Job will be visible to caregivers immediately"}
          {formData.status === "Draft" && "Save as draft to publish later"}
          {formData.status === "Closed" && "Job will not be visible to caregivers"}
        </p>
      </div>
    </motion.div>
  );

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#F3F6F9] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-12 text-center max-w-md shadow-xl"
        >
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Success!</h2>
          <p className="text-gray-600 mb-2">Your job posting has been created</p>
          <p className="text-sm text-gray-500">
            Status: <span className="font-semibold text-[#557A95]">{formData.status}</span>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F6F9] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Post a New Job</h1>
              <p className="text-gray-600 mt-1">Find the perfect caregiver for your facility</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {renderStepIndicator()}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Previous
              </button>
            )}

            <div className="flex-1" />

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
                className={`px-6 py-3 font-semibold rounded-lg transition-colors ${
                  validateStep(currentStep)
                    ? "bg-[#557A95] hover:bg-[#476a80] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-[#FF9923] hover:bg-[#e68a1f] text-white font-semibold rounded-lg transition-colors shadow-md"
              >
                {formData.status === "Active" ? "Publish Job" : `Save as ${formData.status}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobForm;