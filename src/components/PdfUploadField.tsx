import React, { useRef } from "react";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface PdfUploadFieldProps {
  name: string;
  label: string;
  required?: boolean;
  value: File | null;
  onChange: (file: File | null) => void;
}

export const PdfUploadField = ({
  name,
  label,
  required = false,
  value,
  onChange,
}: PdfUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onChange(file);
    } else {
      alert("Please upload a PDF file");
      onChange(null);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="block font-medium text-gray-700 text-sm">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Upload Area */}
      {!value ? (
        <div className="relative">
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
            id={name}
          />
          <label
            htmlFor={name}
            className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#e68a1f] hover:bg-orange-50 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-orange-50 rounded-full group-hover:bg-[#e68a1f] transition-colors duration-300">
                <Upload
                  size={24}
                  className="text-[#e68a1f] group-hover:text-white transition-colors duration-300"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  Click to upload PDF
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum file size: 5MB
                </p>
              </div>
            </div>
          </label>

          {/* Upload Button (Alternative Style) */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-2 w-full py-2.5 px-4 bg-gradient-to-r from-[#e68a1f] to-[#d47a15] text-white rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Upload size={18} />
            Choose PDF File
          </button>
        </div>
      ) : (
        // File Preview
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <FileText className="text-green-600" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {value.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatFileSize(value.size)}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <CheckCircle className="text-green-600" size={20} />
              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 hover:bg-red-100 rounded-full transition-colors duration-200 group"
                title="Remove file"
              >
                <X
                  size={18}
                  className="text-gray-500 group-hover:text-red-600 transition-colors duration-200"
                />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};