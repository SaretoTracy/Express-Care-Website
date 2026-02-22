import { useAuth } from "../../context/AuthContext";
import { CheckCircle, Circle } from "lucide-react";

const REQUIRED_FIELDS = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "gender", label: "Gender" },
  { key: "dateOfBirth", label: "Date of Birth" },
];

export default function CaregiverProfilePage() {
  const { user } = useAuth();
  const profile = user?.profile as any;

  if (!profile) {
    return <p className="p-6">No caregiver profile found.</p>;
  }

  const completedCount = REQUIRED_FIELDS.filter(
    (field) => Boolean(profile[field.key])
  ).length;

  const completionPercent = Math.round(
    (completedCount / REQUIRED_FIELDS.length) * 100
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#557a95] mb-2">
        Welcome, {profile.firstName}
      </h1>
      <p className="text-gray-600 mb-6">
        Complete your caregiver profile to unlock more job opportunities.
      </p>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
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

      {/* Checklist */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#557a95] mb-4">
          Profile Checklist
        </h2>

        <ul className="space-y-3">
          {REQUIRED_FIELDS.map((field) => {
            const isComplete = Boolean(profile[field.key]);
            return (
              <li
                key={field.key}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {isComplete ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <Circle className="text-gray-400" size={20} />
                  )}
                  <span
                    className={
                      isComplete ? "text-gray-800" : "text-gray-500"
                    }
                  >
                    {field.label}
                  </span>
                </div>
                <span
                  className={
                    isComplete
                      ? "text-green-600 text-sm"
                      : "text-red-500 text-sm"
                  }
                >
                  {isComplete ? "Completed" : "Required"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
