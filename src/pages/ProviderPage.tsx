import React from "react";
import { motion } from "framer-motion";
import { YellowLink } from "../components/ButtonComponents/YellowLink";
import care5 from "../assets/care5.jpg";

export const ProviderLanding: React.FC = () => {
  const bgColor = "#557a95";

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen py-12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          
          {/* Left Image */}
          <motion.div
            className="relative order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7 }}
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-400 opacity-20 rounded-full"></div>
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 opacity-20 rounded-full"
              style={{ backgroundColor: bgColor }}
            ></div>

            <img
              src={care5}
              alt="Healthcare agency professionals"
              className="w-full rounded-xl shadow-lg relative z-10"
            />

            {/* Floating stat bubble */}
            <motion.div
              className="absolute -left-3 top-1/3 transform -translate-y-1/2 bg-white py-3 px-4 rounded-lg shadow-md hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-bold text-blue-600">200+ Agencies</p>
              <p className="text-sm text-gray-600">found quality staff</p>
            </motion.div>
          </motion.div>

          {/* Right Text */}
          <motion.div
            className="space-y-6 order-1 md:order-2"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7 }}
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug text-center md:text-left">
              <span className="text-yellow-500 block mb-2">Streamline Your Hiring</span>
              <span>Find Qualified Caregivers</span>
            </h1>

            <p className="text-lg md:text-xl font-medium text-blue-600 text-center md:text-left">
              We handle recruitment so you can focus on patient care.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Our platform connects your agency with certified caregivers who match your
                requirements. Post positions, review applicants, and hire with confidence—all in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <YellowLink btnPro={"Create Agency Account"} linkTo={"/provider/signup"} />
            </div>
          </motion.div>
        </div>

        {/* Steps Section */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7 }}
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Simple 4-Step Hiring Process
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Create Profile",
                description: "Set up your agency profile with credentials and verification",
                color: "bg-yellow-100 text-yellow-600",
              },
              {
                step: "2",
                title: "Post Position",
                description: "Specify requirements, hours, and qualifications needed",
                color: "bg-blue-100 text-blue-600",
              },
              {
                step: "3",
                title: "Review Candidates",
                description: "Browse applications from qualified caregivers",
                color: "bg-green-100 text-green-600",
              },
              {
                step: "4",
                title: "Connect & Hire",
                description: "Interview and hire the perfect match for your team",
                color: "bg-purple-100 text-purple-600",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 border border-gray-100 relative"
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className={`absolute -top-3 -left-3 w-10 h-10 ${step.color} rounded-full flex items-center justify-center font-bold`}
                >
                  {step.step}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mt-2 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7 }}
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Why Choose Our Platform?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                color: "text-blue-500",
                title: "Verified Candidates",
                desc: "Access pre-screened caregivers with verified credentials and background checks.",
                gradient: "from-blue-50 to-blue-100",
              },
              {
                color: "text-yellow-500",
                title: "Time-Saving",
                desc: "Reduce your hiring timeline from weeks to days with our streamlined process.",
                gradient: "from-yellow-50 to-yellow-100",
              },
              {
                color: "text-green-500",
                title: "Better Matches",
                desc: "Our intelligent algorithm suggests candidates that fit your specific needs.",
                gradient: "from-green-50 to-green-100",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${card.gradient} p-6 rounded-lg shadow-sm hover:shadow-md transition`}
                whileHover={{ scale: 1.03 }}
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <svg
                    className={`w-8 h-8 ${card.color}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m1-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-700 text-sm md:text-base">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="rounded-xl p-8 text-center shadow-lg"
          style={{ backgroundColor: bgColor }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Find Your Next Great Hire?
          </h2>
          <p className="text-white text-base md:text-lg mb-6 max-w-2xl mx-auto">
            Join hundreds of healthcare agencies who've streamlined their recruitment
            process and found quality caregivers through our platform.
          </p>
          <YellowLink btnPro={"Get Started Now"} linkTo={"/provider/signup"} />
        </motion.div>
      </div>
    </div>
  );
};
