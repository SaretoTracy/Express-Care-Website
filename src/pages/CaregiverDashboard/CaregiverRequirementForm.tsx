import React, { useState } from "react";
import { PdfUploadField } from "../../components/PdfUploadField";
import { StepsHeader } from "../../components/StepsHeader";
import { careRequirementFields } from "../../data/caregiverRequirementFields";
import { uploadCaregiverRequirements } from "../../services/authService";
import { compressPdf } from "../../utils/compressPdf";
import { CaregiverHero } from "./CaregiverHero";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  Upload, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Shield
} from "lucide-react";
import { toast } from "react-toastify";

export default function CaregiverRequirementForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState<Record<string, File | null>>({});

  const handleFileChange = async (name: string, file: File | null) => {
    if (!file) {
      setForm((prev) => ({ ...prev, [name]: null }));
      return;
    }

    // File size validation (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error("File must be less than 5MB.");
      return;
    }

    // Compress
    const compressedFile = await compressPdf(file);

    // Additional forced limit check
    if (compressedFile.size > MAX_SIZE) {
      toast.error("Even after compression, file is too large.");
      return;
    }

    setForm((prev) => ({ ...prev, [name]: compressedFile }));
    toast.success(`${name} uploaded successfully!`);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) fd.append(key, value);
      });

      const res = await uploadCaregiverRequirements(fd);
      if (res) {
        setSuccessMsg("Uploaded successfully!");
        toast.success("All documents submitted successfully! 🎉");
      }
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Split mandatory & optional
  const requiredFields = careRequirementFields.filter((f) => f.required);
  const optionalFields = careRequirementFields.filter((f) => !f.required);

  // Check if required fields are filled
  const requiredFieldsFilled = requiredFields.every((field) => form[field.name]);
  
  // Count uploaded files
  const uploadedCount = Object.values(form).filter(Boolean).length;
  const totalRequired = requiredFields.length;
  const totalOptional = optionalFields.length;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen p-4 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <CaregiverHero />

        {/* Main Form Section */}
        <motion.div 
          className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#557a95] to-[#4a6a7f] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1 flex items-center">
                  Welcome back, Tracy 
                  <Sparkles className="ml-2 text-[#e68a1f]" size={24} />
                </h1>
                <p className="text-blue-100 text-sm">
                  Complete your profile by uploading required documents
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <FileText size={20} />
                <span className="font-semibold">{uploadedCount} / {totalRequired + totalOptional}</span>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="px-6 pt-6 pb-4 bg-gray-50 border-b border-gray-200">
            <StepsHeader current={currentStep} />
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>Progress</span>
                <span className="font-semibold">{Math.round((uploadedCount / (totalRequired + totalOptional)) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#557a95] to-[#e68a1f]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(uploadedCount / (totalRequired + totalOptional)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* STEP 0 - REQUIRED DOCUMENTS */}
              {currentStep === 0 && (
                <motion.div 
                  key="step0"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Info Banner */}
                  <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <Shield className="text-[#e68a1f] flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">
                        Required Documents
                      </h3>
                      <p className="text-xs text-gray-600">
                        These documents are mandatory to complete your caregiver profile. All files must be PDF format and under 5MB.
                      </p>
                    </div>
                  </div>

                  {/* Required Fields */}
                  <div className="space-y-4">
                    {requiredFields.map((field, index) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <PdfUploadField
                          name={field.name}
                          label={field.label}
                          required={true}
                          value={form[field.name]}
                          onChange={(file) => handleFileChange(field.name, file)}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setCurrentStep(1)}
                      disabled={!requiredFieldsFilled}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                        requiredFieldsFilled
                          ? "bg-gradient-to-r from-[#557a95] to-[#4a6a7f] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      Continue
                      <ArrowRight size={18} />
                    </button>
                  </div>

                  {!requiredFieldsFilled && (
                    <p className="text-center text-sm text-red-500">
                      Please upload all required documents to continue
                    </p>
                  )}
                </motion.div>
              )}

              {/* STEP 1 - OPTIONAL DOCUMENTS */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Info Banner */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Upload className="text-[#557a95] flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">
                        Optional Documents
                      </h3>
                      <p className="text-xs text-gray-600">
                        These documents are optional but recommended to strengthen your profile and increase opportunities.
                      </p>
                    </div>
                  </div>

                  {/* Optional Fields */}
                  <div className="space-y-4">
                    {optionalFields.map((field, index) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <PdfUploadField
                          name={field.name}
                          label={field.label}
                          value={form[field.name]}
                          onChange={(file) => handleFileChange(field.name, file)}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setCurrentStep(0)}
                      className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                    >
                      <ArrowLeft size={18} />
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 py-3 px-6 bg-gradient-to-r from-[#557a95] to-[#4a6a7f] rounded-lg font-semibold text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Review & Submit
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 - REVIEW & SUBMIT */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Success Message */}
                  {successMsg ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="text-green-600" size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        All Set! 🎉
                      </h3>
                      <p className="text-gray-600">
                        Your documents have been submitted successfully.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      {/* Review Section */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="text-green-600" size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">Ready to Submit</h3>
                            <p className="text-sm text-gray-600">
                              Review your uploaded documents before final submission
                            </p>
                          </div>
                        </div>

                        {/* Document Summary */}
                        <div className="bg-white rounded-lg p-4 space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Required Documents</span>
                            <span className="font-semibold text-green-600">
                              {requiredFields.filter(f => form[f.name]).length} / {totalRequired}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Optional Documents</span>
                            <span className="font-semibold text-blue-600">
                              {optionalFields.filter(f => form[f.name]).length} / {totalOptional}
                            </span>
                          </div>
                          <div className="border-t border-gray-200 pt-2 mt-2">
                            <div className="flex justify-between items-center font-semibold">
                              <span className="text-gray-700">Total Documents</span>
                              <span className="text-[#557a95]">{uploadedCount}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                        >
                          <ArrowLeft size={18} />
                          Back
                        </button>
                        <button
                          disabled={loading}
                          onClick={handleSubmit}
                          className="flex-1 py-3 px-6 bg-gradient-to-r from-[#e68a1f] to-[#d47a15] rounded-lg font-semibold text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Upload size={18} />
                              </motion.div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <CheckCircle size={18} />
                              Submit Documents
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}