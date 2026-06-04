import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  logo?: string;
}

export const AuthCard = ({ title, subtitle, children, logo }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-10 px-4">
      {/* Subtle decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #557a95 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div
            className="pt-8 pb-6 px-8 flex flex-col items-center gap-3"
            style={{ background: "linear-gradient(135deg, #557a95 0%, #3d5a70 100%)" }}
          >
            <motion.img
              className="w-40 sm:w-48 object-contain"
              src={logo || "/logo.png"}
              alt="ExpressCare logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            />
            {/* Subtle divider */}
            <div className="w-12 h-0.5 rounded-full opacity-40 bg-white mt-1" />
          </div>

          {/* Body */}
          <div className="px-8 pt-7 pb-8">
            <div className="mb-7 text-center">
              <h3 className="font-bold text-2xl sm:text-3xl text-gray-800 tracking-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
              )}
            </div>
            {children}
          </div>
        </div>

        {/* Footer hint */}
        <p className="text-center text-xs text-gray-400 mt-4">
          ExpressCare &mdash; Secure Healthcare Platform
        </p>
      </motion.div>
    </div>
  );
};

// ─── Input ────────────────────────────────────────────────────────────────────

interface AuthInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  error?: string;
  register?: any;
  name: string;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
  /** Pass for uncontrolled usage without react-hook-form */
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthInput = ({
  label,
  type = "text",
  placeholder,
  icon,
  error,
  register,
  name,
  rightIcon,
  onRightIconClick,
  value,
  onChange,
}: AuthInputProps) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block text-sm font-semibold mb-1.5 tracking-wide"
        style={{ color: "#557a95" }}
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`
            w-full ${icon ? "pl-10" : "pl-4"} ${rightIcon ? "pr-10" : "pr-4"}
            py-3 border rounded-xl text-gray-700 text-sm bg-gray-50
            focus:bg-white focus:outline-none transition-all duration-200
            ${error
              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-50"
            }
          `}
          placeholder={placeholder}
          {...(register && register(name))}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {rightIcon}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// ─── Button ───────────────────────────────────────────────────────────────────

interface AuthButtonProps {
  loading?: boolean;
  loadingText?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "outline";
}

export const AuthButton = ({
  loading = false,
  loadingText = "Loading...",
  children,
  type = "submit",
  onClick,
  variant = "primary",
}: AuthButtonProps) => {
  if (variant === "outline") {
    return (
      <button
        type={type}
        disabled={loading}
        onClick={onClick}
        className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold border-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ borderColor: "#557a95", color: "#557a95" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#f0f4f7";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        {loading ? loadingText : children}
      </button>
    );
  }

  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        color: "white",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
      }}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

// ─── Step indicator (for multi-step auth flows) ───────────────────────────────

interface AuthStepsProps {
  steps: string[];
  current: number; // 0-indexed
}

export const AuthSteps = ({ steps, current }: AuthStepsProps) => {
  return (
    <div className="flex items-center justify-center gap-0 mb-6">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < current
                  ? "bg-green-500 text-white"
                  : i === current
                  ? "text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              style={
                i === current
                  ? { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  : {}
              }
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              className={`text-xs mt-1 font-medium ${
                i === current ? "text-amber-500" : "text-gray-400"
              }`}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-12 h-0.5 mx-1 mb-4 rounded-full transition-all duration-300 ${
                i < current ? "bg-green-400" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};