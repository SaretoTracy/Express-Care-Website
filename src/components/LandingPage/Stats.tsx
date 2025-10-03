import React from "react";
import CountUp from "react-countup";
import { Heart, Briefcase, Users } from "lucide-react";

const stats = [
  {
    icon: <Heart className="text-[#FF9923] w-8 h-8 mb-2" />,
    value: 2500,
    label: "Caregivers",
  },
  {
    icon: <Briefcase className="text-[#FF9923] w-8 h-8 mb-2" />,
    value: 850,
    label: "Providers",
  },
  {
    icon: <Users className="text-[#072a15] w-8 h-8 mb-2" />,
    value: 1200,
    label: "Successful Matches",
  },
];

const Stats: React.FC = () => {
  return (
    <section className="relative bg-white py-16">
      {/* Top wave divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-full">
        <svg viewBox="0 0 1440 100" className="w-full" preserveAspectRatio="none">
          <path fill="#4e7492" d="M0,0 C720,100 720,0 1440,100 L1440,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* Text heading */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Trusted by Thousands</h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Our community is growing every day — here’s what we’ve achieved so far.
        </p>
      </div>

      {/* Stats grid */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white border border-gray-100 rounded-xl shadow-md px-8 py-6 transition hover:scale-105 hover:shadow-lg"
          >
            {stat.icon}
            <h3 className="text-3xl font-bold text-[#FF9923]">
              <CountUp end={stat.value} duration={2} separator="," />
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden translate-y-full">
        <svg viewBox="0 0 1440 100" className="w-full" preserveAspectRatio="none">
          <path fill="#4e7492" d="M0,0 C720,100 720,0 1440,100 L1440,0 L0,0 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Stats;
