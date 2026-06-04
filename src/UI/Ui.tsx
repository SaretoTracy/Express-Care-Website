import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ─── ModalOverlay ─────────────────────────────────────────────────────────────
// Shared backdrop + spring-animated panel wrapper used by every modal.
// Pass `sheet` for mobile bottom-sheet style, default = centered dialog.
interface ModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
  /** Max width class, e.g. "max-w-2xl". Default: "max-w-3xl" */
  maxWidth?: string;
  /** If true, slides up from the bottom on mobile */
  sheet?: boolean;
  /** Extra classes applied to the inner panel */
  panelClassName?: string;
}

const sheetVariants = {
  hidden:  { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: "100%" },
};
const dialogVariants = {
  hidden:  { opacity: 0, scale: 0.95, y: -10 },
  visible: { opacity: 1, scale: 1,    y: 0    },
  exit:    { opacity: 0, scale: 0.95, y: -10  },
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  onClose,
  children,
  maxWidth = "max-w-3xl",
  sheet = false,
  panelClassName = "",
}) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={sheet ? sheetVariants : dialogVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`w-full ${maxWidth} bg-white rounded-t-xl md:rounded-xl overflow-y-auto max-h-[90vh] ${panelClassName}`}
        style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}
      >
        {children}
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// ─── ModalHeader ──────────────────────────────────────────────────────────────
// Gradient header used by every modal (blue gradient + orange accent bar).
interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  /** Extra content rendered in the right side of the header (e.g. a Save button) */
  actions?: React.ReactNode;
  id?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  onClose,
  actions,
  id,
}) => (
  <div className="relative bg-gradient-to-r from-[#557a95] to-[#3d6080] px-7 py-6 overflow-hidden flex-shrink-0">
    {/* Decorative blobs */}
    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
    <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#e68a1f]/20 pointer-events-none" />
    {/* Content */}
    <div className="relative z-10 flex items-start justify-between">
      <div>
        <h2 id={id} className="text-white text-xl font-bold leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/70 text-sm mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white cursor-pointer ml-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
    {/* Orange accent bar */}
    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#e68a1f] to-[#f0a84a]" />
  </div>
);

// ─── SkeletonCard ─────────────────────────────────────────────────────────────
// Generic pulsing placeholder card.
interface SkeletonCardProps {
  /** If true renders the extra action row at the bottom (provider style) */
  withActions?: boolean;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ withActions = false }) => (
  <div className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white animate-pulse">
    <div className="bg-gray-200 h-20 w-full" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
      {withActions ? (
        <div className="h-10 bg-gray-100 rounded-lg" />
      ) : (
        <div className="h-4 bg-gray-100 rounded w-2/3" />
      )}
    </div>
    <div className="px-4 pb-4">
      {withActions ? (
        <div className="flex gap-2">
          <div className="flex-1 h-9 bg-gray-200 rounded-md" />
          <div className="h-9 w-9 bg-gray-100 rounded-md" />
          <div className="h-9 w-9 bg-gray-100 rounded-md" />
        </div>
      ) : (
        <div className="h-9 bg-gray-200 rounded-md w-full" />
      )}
    </div>
  </div>
);

// ─── SpinnerIcon ──────────────────────────────────────────────────────────────
// Inline SVG spinner — avoids duplicating the same SVG across action buttons.
export const SpinnerIcon: React.FC<{ className?: string }> = ({
  className = "h-4 w-4",
}) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle
      className="opacity-25"
      cx="12" cy="12" r="10"
      stroke="currentColor" strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
);

// ─── InfoRow ──────────────────────────────────────────────────────────────────
// Icon + label + value row used in both job cards and modals.
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

export const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <span className="mt-0.5 text-[#557A95]">{icon}</span>
    <div>
      <p className="font-semibold text-gray-700 text-sm">{label}</p>
      <div className="text-gray-600 text-sm">{value}</div>
    </div>
  </div>
);

// ─── ErrorBanner ─────────────────────────────────────────────────────────────
export const ErrorBanner: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
    ⚠️ {message}
  </div>
);

// ─── CertificateBadges ────────────────────────────────────────────────────────
// Renders up to `limit` cert pills + an overflow count.
interface CertificateBadgesProps {
  certs: string[];
  limit?: number;
}

export const CertificateBadges: React.FC<CertificateBadgesProps> = ({
  certs,
  limit = 2,
}) => (
  <div className="flex flex-wrap gap-2 mt-1">
    {certs.slice(0, limit).map((cert, i) => (
      <span
        key={i}
        className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
      >
        {cert}
      </span>
    ))}
    {certs.length > limit && (
      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
        +{certs.length - limit} more
      </span>
    )}
  </div>
);

// ─── JobCardHeader ────────────────────────────────────────────────────────────
// Blue header strip shared by both caregiver and provider job cards.
interface JobCardHeaderProps {
  jobRole: string;
  jobType: string;
  badge?: React.ReactNode;
}

export const JobCardHeader: React.FC<JobCardHeaderProps> = ({
  jobRole,
  jobType,
  badge,
}) => (
  <div className="bg-[#557A95] text-white p-4 rounded-t-xl">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="font-bold text-lg">{jobRole}</h3>
        <p className="font-medium flex items-center mt-1 text-sm opacity-90">
          {jobType}
        </p>
      </div>
      {badge}
    </div>
  </div>
);