import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  children: ReactNode;
  logo?: string;
}

export const AuthCard = ({ title, children, logo }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.01]">
          {/* Header with Logo */}
          <div className="bg-[#557a95] pt-6 pb-4 px-6 flex justify-center">
            <motion.img
              className="w-44 sm:w-52 object-contain"
              src={logo || "/logo.png"}
              alt="ExpressCare logo"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Body */}
          <div className="p-8">
            <h3 className="text-center font-bold text-2xl sm:text-3xl text-gray-800 mb-6">
              {title}
            </h3>
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable Input Field Component
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
}: AuthInputProps) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block font-medium mb-2" style={{ color: "#557a95" }}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`w-full ${icon ? "px-10" : "px-4"} py-3 border rounded-lg text-gray-700 focus:outline-none border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-100`}
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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Reusable Submit Button
interface AuthButtonProps {
  loading?: boolean;
  loadingText?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const AuthButton = ({
  loading = false,
  loadingText = "Loading...",
  children,
  type = "submit",
  onClick,
}: AuthButtonProps) => {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className="w-full py-3 rounded-lg flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-400 text-white font-medium shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? loadingText : children}
    </button>
  );
};