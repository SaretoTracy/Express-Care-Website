import { useAuth } from "../../context/AuthContext";

export default function CaregiverProfilePage() {
  const { user } = useAuth();
  const profile = user?.profile as any;

  if (!profile) {
    return <p className="p-6">No caregiver profile found.</p>;
  }

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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#557a95]">
          Welcome, {profile.firstName || "Caregiver"}
        </h1>
        <p className="text-gray-600 mt-2">
          Your caregiver profile information
        </p>
      </div>

      {/* Progress Bar */}
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

      {/* Profile Information Display */}
      <div className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.label} className="space-y-1">
            <p className="text-sm text-gray-500">{field.label}</p>
            <p className="font-medium text-gray-800">
              {field.value || "Not provided"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}