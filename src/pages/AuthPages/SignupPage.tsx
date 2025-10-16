import React from "react";
import { FaUserCircle, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
import { YellowLink } from "../../components/ButtonComponents/YellowLink";

export const SignupPage: React.FC = () => {
  const blueColor = "#557a95";

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

  return (
    <div className="my-10 px-4 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <motion.h3
        className="text-center text-2xl sm:text-3xl font-bold mb-10"
        style={{ color: blueColor }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Create Your Account
      </motion.h3>

      {/* Cards Container */}
      <div className="grid gap-6 md:gap-10 md:grid-cols-2 max-w-5xl mx-auto">
        {/* Caregiver Card */}
        <motion.div
          className="border border-gray-200 rounded-xl p-6 sm:p-8 bg-white shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <div className="flex justify-center mb-4">
            <FaUserCircle className="text-yellow-400 text-[70px] sm:text-[90px]" />
          </div>

          <h5
            className="font-bold text-xl text-center mb-2"
            style={{ color: blueColor }}
          >
            Caregiver
          </h5>
          <p
            className="text-center mb-6 text-sm sm:text-base leading-relaxed"
            style={{ color: blueColor }}
          >
            Looking for your dream job? <br /> Create a unique career profile
            with Express Care Team.
          </p>

          <div className="flex justify-center">
            <YellowLink
              btnPro="Sign up as caregiver"
              linkTo="/caregiver/signup"
            />
          </div>
        </motion.div>

        {/* Provider Card */}
        <motion.div
          className="border border-gray-200 rounded-xl p-6 sm:p-8 bg-white shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          <div className="flex justify-center mb-4">
            <FaBriefcase className="text-yellow-400 text-[70px] sm:text-[90px]" />
          </div>

          <h5
            className="font-bold text-xl text-center mb-2"
            style={{ color: blueColor }}
          >
            Provider
          </h5>
          <p
            className="text-center mb-6 text-sm sm:text-base leading-relaxed"
            style={{ color: blueColor }}
          >
            Looking for quality candidates? <br /> Advertise and search with
            Express Care Team.
          </p>

          <div className="flex justify-center">
            <YellowLink
              btnPro="Sign up as provider"
              linkTo="/provider/signup"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
