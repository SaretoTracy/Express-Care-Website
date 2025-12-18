import React from "react";

import { User, Mail, Phone, MapPin } from "lucide-react";
import { useAuth } from "../../context/AuthContext";


// Example props interface — replace with your actual user type
interface IUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  state: string;
}

interface ProfilePageProps {
  user: IUserProfile;
}

export default function ProfilePage() {
  const { user } = useAuth();
const profile = user?.profile;
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-28 h-28 rounded-full bg-gray-300 overflow-hidden mb-4">
            {profile ?.photo ? (
              <img src={profile .photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-white bg-gray-500">
                {profile ?.firstName?.[0] || "U"}
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold text-[#557a95]">
            {profile  ? `${profile .firstName} ${profile .lastName}` : "profile  Name"}
          </h1>
          <p className="text-gray-600">Welcome to your Express Care profile</p>
        </div>

        {/* Profile Info */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-[#e68a1f]">
          <h2 className="text-xl font-semibold text-[#557a95]">Profile Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-medium">{profile ?.firstName || "-"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-medium">{profile ?.lastName || "-"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{profile ?.email || "-"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{profile ?.phoneNumber || "-"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">{profile ?.city || "-"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">State</p>
              <p className="font-medium">{profile ?.state || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
