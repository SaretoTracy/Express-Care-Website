import { Upload, FileText } from "lucide-react";

interface PdfUploadFieldProps {
  label: string;
  required?: boolean;
  value?: File | null;
  onChange: (file: File | null) => void;
  name: string;
}

export const PdfUploadField = ({
  label,
  required,
  value,
  onChange,
  name,
}: PdfUploadFieldProps) => {
  return (
    <div className="border border-gray-700 bg-gray-900/40 hover:bg-gray-900/60 p-4 rounded-xl transition">
      <label className="text-sm font-medium flex items-center gap-2">
        <FileText className="w-4 h-4 text-purple-400" />
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>

      <div className="mt-3 flex items-center justify-between">
        <input
          type="file"
          id={name}
          accept="application/pdf"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />

        <label
          htmlFor={name}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm cursor-pointer flex items-center gap-2 transition"
        >
          <Upload className="w-4 h-4" /> Upload PDF
        </label>

        {value && (
          <span className="text-xs text-green-400 truncate max-w-[150px]">
            {value.name}
          </span>
        )}
      </div>
    </div>
  );
};
