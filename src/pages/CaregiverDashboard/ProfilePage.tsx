import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

type VerificationStatus =
  | "not_started"
  | "pending"
  | "approved"
  | "rejected";

export default function CaregiverProfilePage() {
  const { user } = useAuth();
  const profile = user?.profile as any;

  if (!profile) {
    return <p className="p-6">No caregiver profile found.</p>;
  }

  const verificationStatus: VerificationStatus =
    profile.verificationStatus || "not_started";

  const fields = [
    { label: "First Name", value: profile.firstName },
    { label: "Last Name", value: profile.lastName },
    { label: "Email", value: profile.email },
    { label: "Phone Number", value: profile.phoneNumber },
    { label: "City", value: profile.city },
    { label: "State", value: profile.state },
    { label: "Gender", value: profile.gender },
    { label: "Date of Birth", value: profile.dateOfBirth },
  ];

  const completionPercent = Math.round(
    (fields.filter((f) => f.value).length / fields.length) * 100
  );

  // ─────────────────────────────────────────────
  // Verification UI Config
  // ─────────────────────────────────────────────
  const getVerificationConfig = () => {
    switch (verificationStatus) {
      case "approved":
        return {
          title: "Verified Caregiver",
          description:
            "Your documents have been approved. You can now apply for jobs.",
          container:
            "bg-green-50 border-green-200 text-green-700",
          badge: "bg-green-600 text-white",
        };
      case "pending":
        return {
          title: "Verification Pending",
          description:
            "Your documents are currently under review.",
          container:
            "bg-yellow-50 border-yellow-200 text-yellow-700",
          badge: "bg-yellow-500 text-white",
        };
      case "rejected":
        return {
          title: "Verification Rejected",
          description:
            "Some documents were rejected. Please re-upload the required files.",
          container:
            "bg-red-50 border-red-200 text-red-700",
          badge: "bg-red-600 text-white",
        };
      default:
        return {
          title: "Verification Required",
          description:
            "Upload required documents to get verified and unlock job applications.",
          container:
            "bg-gray-50 border-gray-200 text-gray-700",
          badge: "bg-gray-500 text-white",
        };
    }
  };

  const verification = getVerificationConfig();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">

      {/* ───────────────── Header ───────────────── */}
      <div>
        <h1 className="text-3xl font-bold text-[#557a95] flex items-center gap-3">
          Welcome, {profile.firstName || "Caregiver"}

          {verificationStatus === "approved" && (
            <span className="flex items-center gap-1 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
              ✔ Verified
            </span>
          )}
        </h1>

        <p className="text-gray-600 mt-2">
          Your caregiver profile information
        </p>
      </div>

      {/* ───────────────── Verification Card ───────────────── */}
      <div
        className={`rounded-xl border p-6 ${verification.container}`}
      >
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-semibold">
              {verification.title}
            </h2>
            <p className="text-sm mt-1">
              {verification.description}
            </p>
          </div>

          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${verification.badge}`}
          >
            {verificationStatus === "approved"
              ? "Verified"
              : verificationStatus === "pending"
              ? "Under Review"
              : verificationStatus === "rejected"
              ? "Action Needed"
              : "Not Verified"}
          </span>
        </div>

        {(verificationStatus === "not_started" ||
          verificationStatus === "rejected") && (
          <div className="mt-4">
            <Link
              to="/caregiver/requirements"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
            >
              Upload Documents
            </Link>
          </div>
        )}
      </div>

      {/* ───────────────── Profile Completion ───────────────── */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700">
            Profile Completion
          </span>
          <span className="font-semibold text-[#e68a1f]">
            {completionPercent}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 bg-[#e68a1f] transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* ───────────────── Profile Info ───────────────── */}
      <div className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.label} className="space-y-1">
            <p className="text-sm text-gray-500">
              {field.label}
            </p>
            <p className="font-medium text-gray-800">
              {field.value || "Not provided"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}