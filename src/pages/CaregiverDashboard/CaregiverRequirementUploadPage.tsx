import { useState, useCallback, useRef } from "react";
import { uploadCaregiverRequirements } from "../../services/authService"; 
import type { ICareRequirements } from "../../Interfaces/ICareRequirements"; 
import { compressPdf } from "../../utils/pdfCompression"; 

// ─── Config ──────────────────────────────────────────────────────────────────────
interface FieldConfig {
  key: keyof ICareRequirements;
  label: string;
  description: string;
  required: boolean;
}

const REQUIRED_FIELDS: FieldConfig[] = [
  { key: "backgroundCheck",      label: "Background Check",      description: "Background check document",                 required: true },
  { key: "firstAid_cpr",         label: "First Aid & CPR",        description: "First Aid and CPR certificate",             required: true },
  { key: "figurePrint",          label: "Fingerprint Clearance",  description: "Fingerprint clearance document",            required: true },
  { key: "safetyOrientation",    label: "Safety Orientation",     description: "Safety orientation certificate",            required: true },
  { key: "tuberculosisStepDate", label: "Tuberculosis Step Date", description: "Tuberculosis step date document",           required: true },
  { key: "foodCard",             label: "Food Card",              description: "Food card certificate",                     required: true },
];

const OPTIONAL_FIELDS: FieldConfig[] = [
  { key: "longTermCare",                     label: "Long-Term Care",            description: "Long-term care training certificate",            required: false },
  { key: "nurseDelegation",                  label: "Nurse Delegation",          description: "Nurse delegation certificate",                   required: false },
  { key: "dementiaSpecialist",               label: "Dementia Specialist",       description: "Dementia specialist certificate",                required: false },
  { key: "mentalHealthSpeciality",           label: "Mental Health Specialty",   description: "Mental health specialty document",               required: false },
  { key: "administrationTrainingSpecialist", label: "Admin Training Specialist", description: "Administration training specialist certificate", required: false },
  { key: "continuingEducation",              label: "Continuing Education",      description: "Continuing education certificate",               required: false },
  { key: "developmentDisability",            label: "Development Disability",    description: "Development disability training certificate",    required: false },
  { key: "diabetesSpecialtyTraining",        label: "Diabetes Specialty",        description: "Diabetes specialty training certificate",        required: false },
];

// ─── Types ───────────────────────────────────────────────────────────────────────
interface FileState {
  file: File | null;
  status: "idle" | "compressing" | "ready" | "error";
  originalSize?: number;
  compressedSize?: number;
  error?: string;
}

type FilesState = Record<keyof ICareRequirements, FileState>;

const ALL_FIELDS = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS];

const initialFilesState = (): FilesState =>
  Object.fromEntries(ALL_FIELDS.map((f) => [f.key, { file: null, status: "idle" }])) as FilesState;

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ─── Main Component ───────────────────────────────────────────────────────────────
export default function CaregiverRequirementsUpload() {
  const [files, setFiles] = useState<FilesState>(initialFilesState());
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const updateFile = useCallback(
    (key: keyof ICareRequirements, update: Partial<FileState>) =>
      setFiles((prev) => ({ ...prev, [key]: { ...prev[key], ...update } })),
    []
  );

  const handleFileChange = useCallback(
    async (key: keyof ICareRequirements, file: File | null) => {
      if (!file) { updateFile(key, { file: null, status: "idle" }); return; }

      if (file.type !== "application/pdf") {
        updateFile(key, { file: null, status: "error", error: "Only PDF files are accepted." });
        return;
      }

      const originalSize = file.size;
      updateFile(key, { file, status: "compressing", originalSize, error: undefined });

      const compressed = await compressPdf(file);
      updateFile(key, { file: compressed, status: "ready", originalSize, compressedSize: compressed.size });
    },
    [updateFile]
  );

  const handleRemove = (key: keyof ICareRequirements) =>
    updateFile(key, { file: null, status: "idle", originalSize: undefined, compressedSize: undefined, error: undefined });

  const isFormValid = () =>
    REQUIRED_FIELDS.every((f) => files[f.key].file !== null && files[f.key].status === "ready");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setSubmitting(true);
    setSubmitStatus("idle");

    const formData = Object.fromEntries(
      ALL_FIELDS.map((f) => [f.key, files[f.key].file])
    ) as unknown as ICareRequirements;

    try {
      await uploadCaregiverRequirements(formData);
      setSubmitStatus("success");
      setSubmitMessage("All documents uploaded successfully!");
      setFiles(initialFilesState());
    } catch (err: any) {
      setSubmitStatus("error");
      setSubmitMessage(err?.message || "Upload failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const completedRequired = REQUIRED_FIELDS.filter((f) => files[f.key].status === "ready").length;
  const completedOptional = OPTIONAL_FIELDS.filter((f) => files[f.key].status === "ready").length;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 pb-20">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
              <path d="M6 4v2.5l1.5 1" strokeLinecap="round" />
            </svg>
            Caregiver Portal
          </span>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Requirements Upload</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Upload your certification and compliance documents. PDFs over 100 KB are automatically compressed.
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white border border-slate-200 rounded-xl px-6 py-4 mb-8 shadow-sm flex flex-wrap gap-6">
          {[
            { label: "Required", done: completedRequired, total: REQUIRED_FIELDS.length, color: "bg-indigo-500" },
            { label: "Optional", done: completedOptional, total: OPTIONAL_FIELDS.length, color: "bg-emerald-500" },
          ].map(({ label, done, total, color }, i) => (
            <div key={label} className="flex-1 min-w-[160px] flex gap-6">
              {i > 0 && <div className="w-px bg-slate-200 self-stretch mr-6" />}
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                  <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${(done / total) * 100}%` }} />
                </div>
                <p className="text-xs font-semibold text-slate-700 font-mono">{done} / {total} {label === "Required" ? "completed" : "uploaded"}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Required */}
          <FieldSection title="Required Documents" badge="Must Upload" badgeClass="bg-red-50 text-red-500" fields={REQUIRED_FIELDS} files={files} onFileChange={handleFileChange} onRemove={handleRemove} />

          {/* Optional */}
          <FieldSection title="Optional Documents" badge="If Applicable" badgeClass="bg-slate-100 text-slate-400" fields={OPTIONAL_FIELDS} files={files} onFileChange={handleFileChange} onRemove={handleRemove} />

          {/* Submit */}
          <div>
            <p className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
              <svg className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="7" cy="7" r="5.5" /><path d="M7 5v2.5M7 9h.01" strokeLinecap="round" />
              </svg>
              All {REQUIRED_FIELDS.length} required documents must be uploaded before submission.
            </p>
            <button
              type="submit"
              disabled={!isFormValid() || submitting}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200 disabled:shadow-none"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                  </svg>
                  Uploading Documents…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 2v10M5 6l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 13v2a1 1 0 001 1h12a1 1 0 001-1v-2" strokeLinecap="round" />
                  </svg>
                  Submit All Documents
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Toast */}
      {submitStatus !== "idle" && (
        <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-medium text-white shadow-xl max-w-sm ${submitStatus === "success" ? "bg-slate-900" : "bg-red-500"}`}>
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
            {submitStatus === "success"
              ? <path d="M3.5 9l4 4 7-7" strokeLinecap="round" strokeLinejoin="round" />
              : <><path d="M9 5v5M9 13h.01" strokeLinecap="round" /><circle cx="9" cy="9" r="7" /></>}
          </svg>
          {submitMessage}
        </div>
      )}
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────────
function FieldSection({ title, badge, badgeClass, fields, files, onFileChange, onRemove }: {
  title: string;
  badge: string;
  badgeClass: string;
  fields: FieldConfig[];
  files: FilesState;
  onFileChange: (key: keyof ICareRequirements, file: File | null) => void;
  onRemove: (key: keyof ICareRequirements) => void;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{title}</span>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>{badge}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map((field) => (
          <UploadCard key={field.key} field={field} state={files[field.key]} onFileChange={onFileChange} onRemove={onRemove} />
        ))}
      </div>
    </section>
  );
}

// ─── Upload Card ──────────────────────────────────────────────────────────────────
function UploadCard({ field, state, onFileChange, onRemove }: {
  field: FieldConfig;
  state: FileState;
  onFileChange: (key: keyof ICareRequirements, file: File | null) => void;
  onRemove: (key: keyof ICareRequirements) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const savedPercent =
    state.originalSize && state.compressedSize && state.originalSize > state.compressedSize
      ? Math.round((1 - state.compressedSize / state.originalSize) * 100)
      : 0;

  const cardStyle: Record<string, string> = {
    ready:       "border-emerald-300 bg-emerald-50",
    error:       "border-red-300 bg-red-50",
    compressing: "border-amber-300 bg-amber-50",
    idle:        dragOver ? "border-indigo-400 bg-indigo-50" : "border-slate-200 bg-white hover:border-indigo-200",
  };

  const iconStyle: Record<string, string> = {
    ready:       "bg-emerald-100 text-emerald-600",
    error:       "bg-red-100 text-red-500",
    compressing: "bg-amber-100 text-amber-600",
    idle:        "bg-indigo-50 text-indigo-500",
  };

  const StatusIcon = () => {
    if (state.status === "ready") return (
      <svg className="w-4 h-4" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
    if (state.status === "error") return (
      <svg className="w-4 h-4" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5v5M9 13h.01" strokeLinecap="round" /><circle cx="9" cy="9" r="7" />
      </svg>
    );
    if (state.status === "compressing") return (
      <svg className="w-4 h-4 animate-spin" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 2v4M9 12v4M2 9h4M12 9h4" strokeLinecap="round" />
      </svg>
    );
    return (
      <svg className="w-4 h-4" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M10 2H5a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V6L10 2z" strokeLinejoin="round" />
        <path d="M10 2v4h4" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <div
      className={`rounded-xl border-[1.5px] p-4 transition-all duration-200 ${cardStyle[state.status]}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) onFileChange(field.key, f); }}
    >
      {/* Label row */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${iconStyle[state.status]}`}>
          <StatusIcon />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            {field.required && <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />}
            <span className="text-sm font-semibold text-slate-800 truncate">{field.label}</span>
          </div>
          <p className="text-xs text-slate-400 truncate">{field.description}</p>
        </div>
      </div>

      {/* Idle / Error — drop zone */}
      {(state.status === "idle" || state.status === "error") && (
        <>
          <div
            className="relative border-[1.5px] border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-lg py-3 px-3 text-center cursor-pointer transition-colors"
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="absolute inset-0 opacity-0 w-full cursor-pointer"
              onChange={(e) => onFileChange(field.key, e.target.files?.[0] ?? null)}
              onClick={(e) => { (e.target as HTMLInputElement).value = ""; }}
            />
            <p className="text-xs text-slate-500">
              <span className="font-semibold text-indigo-500">Click to upload</span> or drag & drop
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">PDF only · max 100 KB after compression</p>
          </div>
          {state.status === "error" && state.error && (
            <p className="mt-2 text-xs text-red-500 bg-white/60 rounded-md px-2 py-1.5">{state.error}</p>
          )}
        </>
      )}

      {/* Compressing */}
      {state.status === "compressing" && (
        <div className="flex items-center gap-2 text-xs font-medium text-amber-700 bg-white/60 rounded-lg px-3 py-2.5">
          <svg className="w-3.5 h-3.5 animate-spin flex-shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 1v2M7 11v2M1 7h2M11 7h2" strokeLinecap="round" />
          </svg>
          Compressing PDF…
        </div>
      )}

      {/* Ready */}
      {state.status === "ready" && state.file && (
        <div className="flex items-center gap-2.5 bg-white/70 rounded-lg px-3 py-2.5 border border-emerald-200">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-800 truncate">{state.file.name}</p>
            {state.originalSize && state.compressedSize && (
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                {state.originalSize > state.compressedSize ? (
                  <>{formatSize(state.originalSize)} → {formatSize(state.compressedSize)}{savedPercent > 0 && <span className="text-emerald-600 font-semibold"> · {savedPercent}% saved</span>}</>
                ) : formatSize(state.compressedSize)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onRemove(field.key)}
            className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.5 3.5l-7 7M3.5 3.5l7 7" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}