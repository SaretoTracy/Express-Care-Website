import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Heart, Briefcase, Users } from "lucide-react";

const stats = [
  {
    icon: <Heart className="text-[#FF9923] w-8 h-8 sm:w-10 sm:h-10 mb-2" />,
    value: 2500,
    label: "Caregivers",
  },
  {
    icon: <Briefcase className="text-[#FF9923] w-8 h-8 sm:w-10 sm:h-10 mb-2" />,
    value: 850,
    label: "Providers",
  },
  {
    icon: <Users className="text-[#FF9923] w-8 h-8 sm:w-10 sm:h-10 mb-2" />,
    value: 1200,
    label: "Successful Matches",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Stats: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-10 sm:py-12 md:py-16 bg-gradient-to-b from-white via-[#f6faf8] to-[#e8f4ef]">
      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-full">
        <svg viewBox="0 0 1440 100" className="w-full" preserveAspectRatio="none">
          <path fill="#FF9923" d="M0,0 C720,100 720,0 1440,100 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Centered Content Wrapper */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Heading */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#072a15]">
            Trusted by Thousands
          </h2>
          <p className="text-gray-700 mt-2 max-w-md sm:max-w-xl mx-auto text-sm sm:text-base">
            Our community is growing every day — here’s what we’ve achieved so far.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-white border border-gray-100 rounded-2xl shadow-md px-6 sm:px-8 py-6 sm:py-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-[#FF9923]/30"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
            >
              {stat.icon}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FF9923]">
                <CountUp end={stat.value} duration={2} separator="," />
              </h3>
              <p className="mt-1 text-sm sm:text-base font-medium text-gray-600">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden translate-y-full">
        <svg viewBox="0 0 1440 100" className="w-full" preserveAspectRatio="none">
          <path fill="#072a15" d="M0,0 C720,100 720,0 1440,100 L1440,0 L0,0 Z" />
        </svg>
      </div>
    </section>
  );
};

export default Stats;
