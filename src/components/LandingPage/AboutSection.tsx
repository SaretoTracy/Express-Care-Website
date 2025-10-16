import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Briefcase,
  Star,
  Award,
  UserCheck,
  Search,
  MessageSquare,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import landingSeven from "../../assets/images/landing-seven.png";
import landingEight from "../../assets/images/landing-eight.png";
import { YellowLink } from "../ButtonComponents/YellowLink";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AboutSection: React.FC<{ landingSeven: string; landingEight: string }> = ({
  landingSeven,
  landingEight,
}) => {
  const [activeTab, setActiveTab] = useState<"caregivers" | "providers">(
    "caregivers"
  );
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);

  const caregiverFeatures: FeatureProps[] = [
    {
      icon: <Star className="text-yellow-400 w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Showcase Your Skills",
      description:
        "We help caregivers grow their careers & showcase their qualifications to potential employers.",
    },
    {
      icon: <MessageSquare className="text-yellow-400 w-6 h-6 sm:w-7 sm:h-7" />,
      title: "No Cover Letters",
      description:
        "Say goodbye to cover letters - your profile is all you need. Your next job is one click away.",
    },
    {
      icon: <Briefcase className="text-yellow-400 w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Find Rewarding Work",
      description:
        "Find a job that is consistent, rewarding and reflective of your skill set.",
    },
    {
      icon: <Award className="text-yellow-400 w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Open Opportunities",
      description:
        "Open up a whole new world of opportunity and possibilities for your career growth.",
    },
  ];

  const providerFeatures: FeatureProps[] = [
    {
      icon: <Search className="text-yellow-400 w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Browse Qualified Profiles",
      description:
        "Browse through caregivers' profiles based on category and salary expectations.",
    },
    {
      icon: <UserCheck className="text-yellow-400 w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Find Qualified Candidates",
      description:
        "Find qualified candidates for your company with our verified caregiver database.",
    },
    {
      icon: <CheckCircle className="text-yellow-400 w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Efficient Matching",
      description:
        "Contact ONLY caregivers who already have what you are looking for instead of reviewing hundreds of applications.",
    },
  ];

  const activeFeatures =
    activeTab === "caregivers" ? caregiverFeatures : providerFeatures;
  const activeImage = activeTab === "caregivers" ? landingSeven : landingEight;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      id="about"
      className="bg-[#557A95] py-12 sm:py-16 px-4 sm:px-6 md:px-10 rounded-xl relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-yellow-400/5"></div>
        <div className="absolute bottom-20 left-10 w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-white/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-blue-400/5"></div>
      </div>

      {/* Title */}
      <motion.div
        className="text-center mb-10 sm:mb-12 relative z-10 px-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={itemVariants}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          Why Choose{" "}
          <span className="text-yellow-400">Express Care Team</span>
        </h2>
        <p className="text-white/80 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          We connect passionate caregivers with quality providers, creating
          perfect matches that benefit everyone.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="flex justify-center mb-10 sm:mb-12 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
      >
        <div className="bg-white/10 backdrop-blur-sm p-1 rounded-full inline-flex flex-wrap justify-center gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab("caregivers")}
            className={`py-2 px-4 sm:px-6 rounded-full flex items-center gap-2 text-sm sm:text-base transition-all ${
              activeTab === "caregivers"
                ? "bg-yellow-400 text-primary font-medium shadow-lg"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Heart size={16} />
            <span>Caregivers</span>
          </button>
          <button
            onClick={() => setActiveTab("providers")}
            className={`py-2 px-4 sm:px-6 rounded-full flex items-center gap-2 text-sm sm:text-base transition-all ${
              activeTab === "providers"
                ? "bg-yellow-400 text-primary font-medium shadow-lg"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Briefcase size={16} />
            <span>Providers</span>
          </button>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative mx-auto md:mx-0 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              <div className="absolute -top-3 -left-3 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-lg z-0 animate-pulse opacity-70"></div>
              <img
                src={activeImage}
                alt={
                  activeTab === "caregivers"
                    ? "Why caregivers love us"
                    : "Why providers choose us"
                }
                className="rounded-lg shadow-xl relative z-10 w-full object-cover h-64 sm:h-72 md:h-80"
              />
              <div
                className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full animate-pulse opacity-50"
                style={{ backgroundColor: "#FF9923" }}
              ></div>
            </div>

            <div className="absolute bottom-0 right-0 sm:-right-6 sm:bottom-10 bg-yellow-400 text-primary font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg text-xs sm:text-sm">
              {activeTab === "caregivers" ? "2,500+" : "850+"}{" "}
              {activeTab === "caregivers" ? "Caregivers" : "Providers"}
            </div>
          </motion.div>

          {/* Feature list */}
          <motion.div
            className="px-2 sm:px-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3
              className="text-yellow-400 font-bold text-xl sm:text-2xl mb-6"
              variants={itemVariants}
            >
              {activeTab === "caregivers"
                ? "Why Caregivers Love Us"
                : "Why Providers Choose Us"}
            </motion.h3>

            <motion.div className="space-y-5 sm:space-y-6">
              {activeFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 transition-all hover:-translate-y-1 ${
                    hoverFeature === index ? "shadow-lg bg-white/20" : ""
                  }`}
                  onMouseEnter={() => setHoverFeature(index)}
                  onMouseLeave={() => setHoverFeature(null)}
                  variants={itemVariants}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-dark/30 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-base sm:text-lg">
                        {feature.title}
                      </h4>
                      <p className="text-white/80 text-sm sm:text-base mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {hoverFeature === index && (
                    <motion.div
                      className="mt-3 text-yellow-400 flex items-center text-xs sm:text-sm font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <span>Learn more</span>
                      <ArrowRight size={14} className="ml-1" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center mt-14 sm:mt-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={itemVariants}
      >
        {activeTab === "caregivers" ? (
          <YellowLink btnPro="Get Started Today" linkTo="/caregiver" />
        ) : (
          <YellowLink btnPro="Post a Position" linkTo="/provider" />
        )}
      </motion.div>
    </section>
  );
};

const AboutSectionWithProps = () => (
  <AboutSection landingSeven={landingSeven} landingEight={landingEight} />
);

export default AboutSectionWithProps;
