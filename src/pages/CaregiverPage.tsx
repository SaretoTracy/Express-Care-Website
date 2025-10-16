import React from "react";
import { YellowLink } from "../components/ButtonComponents/YellowLink";
import caregivers from "../assets/images/caregiver1.jpg";

export const CaregiverPage: React.FC = () => {
  const bgColor = "#557a95";

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================== HERO SECTION ===================== */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          {/* TEXT CONTENT */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-snug">
              <span className="text-yellow-500 block mb-2">Build Your Career</span>
              <span>As A Professional Caregiver</span>
            </h1>

            <p className="text-lg md:text-xl font-medium text-blue-600">
              Looking for meaningful work that makes a difference?
            </p>

            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                We connect skilled caregivers like you with reputable agencies offering 
                competitive positions. Create your profile, showcase your expertise, and 
                find the perfect caregiving opportunity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2">
              <YellowLink btnPro="Create Profile" linkTo="/caregiver/signup" />
            </div>
          </div>

          {/* IMAGE & BADGE */}
          <div className="relative">
            {/* Decorative circles */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 opacity-20 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400 opacity-20 rounded-full"></div>

            {/* Image */}
            <img
              src={caregivers}
              alt="Professional caregiver helping patient"
              className="w-full rounded-2xl shadow-lg relative z-10 object-cover"
            />

            {/* Floating Badge (only visible on md & up) */}
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white py-3 px-5 rounded-lg shadow-lg hidden md:block">
              <p className="font-bold text-blue-600">Join 500+ caregivers</p>
              <p className="text-sm text-gray-600">who found jobs last month</p>
            </div>
          </div>
        </div>

        {/* ===================== BENEFITS SECTION ===================== */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
            Why Create Your Caregiver Profile?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Access Top Agencies",
                description:
                  "Connect with vetted and reputable caregiving agencies seeking qualified professionals.",
                icon: "📋",
              },
              {
                title: "Showcase Your Skills",
                description:
                  "Highlight your certifications, experience, and specialties to stand out.",
                icon: "🌟",
              },
              {
                title: "Flexible Opportunities",
                description:
                  "Find positions that match your availability, location, and career goals.",
                icon: "🕒",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-gray-100 text-center"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-lg md:text-xl text-blue-700 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== CALL TO ACTION ===================== */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center shadow-lg"
          style={{ backgroundColor: bgColor }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Your Caregiving Journey?
          </h2>
          <p className="text-white text-base md:text-lg mb-6 max-w-2xl mx-auto">
            Create your profile today and get matched with caregiving opportunities that
            value your skills and compassion.
          </p>
          <YellowLink btnPro="Sign Up Now" linkTo="/caregiver/signup" />
        </div>
      </div>
    </div>
  );
};
