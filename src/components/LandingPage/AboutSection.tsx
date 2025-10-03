import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Briefcase, 
  Star, 
  Award, 
  UserCheck, 
  Search, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight
} from 'lucide-react';

import landingSeven from "../../assets/images/landing-seven.png";
import landingEight from "../../assets/images/landing-eight.png";
import { YellowLink } from '../ButtonComponents/YellowLink';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Import YellowLink if not already in scope
// You may need to adjust the import path to match your project structure
// import YellowLink from "../components/YellowLink";

const AboutSection: React.FC<{
  landingSeven: string;
  landingEight: string;
}> = ({ landingSeven, landingEight }) => {
  const [activeTab, setActiveTab] = useState<'caregivers' | 'providers'>('caregivers');
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);

  const caregiverFeatures: FeatureProps[] = [
    {
      icon: <Star className="text-yellow-400" />,
      title: "Showcase Your Skills",
      description: "We help caregivers grow their careers & showcase their qualifications to potential employers."
    },
    {
      icon: <MessageSquare className="text-yellow-400" />,
      title: "No Cover Letters",
      description: "Say goodbye to cover letters - your profile is all you need. Your next job is one click away."
    },
    {
      icon: <Briefcase className="text-yellow-400" />,
      title: "Find Rewarding Work",
      description: "Find a job that is consistent, rewarding and reflective of your skill set."
    },
    {
      icon: <Award className="text-yellow-400" />,
      title: "Open Opportunities",
      description: "Open up a whole new world of opportunity and possibilities for your career growth."
    }
  ];

  const providerFeatures: FeatureProps[] = [
    {
      icon: <Search className="text-yellow-400" />,
      title: "Browse Qualified Profiles",
      description: "Browse through caregivers' profiles based on category and salary expectations."
    },
    {
      icon: <UserCheck className="text-yellow-400" />,
      title: "Find Qualified Candidates",
      description: "Find qualified candidates for your company with our verified caregiver database."
    },
    {
      icon: <CheckCircle className="text-yellow-400" />,
      title: "Efficient Matching",
      description: "Contact ONLY caregivers who already have what you are looking for instead of reviewing hundreds of applications."
    }
  ];

  const activeFeatures = activeTab === 'caregivers' ? caregiverFeatures : providerFeatures;
  const activeImage = activeTab === 'caregivers' ? landingSeven : landingEight;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div id='about' className="bg-gradient-to-b from-primary to-primary-dark py-16 px-4 sm:px-6 lg:px-8 rounded-xl overflow-hidden relative" style={{ backgroundColor: '#557A95' }}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-yellow-400/5"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-white/5"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-400/5"></div>
      </div>

      {/* Section Title */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl font-bold text-white">Why Choose <span className="text-yellow-400">Express Care Team</span></h2>
        <p className="text-white/80 mt-2 max-w-2xl mx-auto">We connect passionate caregivers with quality providers, creating perfect matches that benefit everyone</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-white/10 backdrop-blur-sm p-1 rounded-full inline-flex">
          <button
            onClick={() => setActiveTab('caregivers')}
            className={`py-2 px-6 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'caregivers' 
                ? 'bg-yellow-400 text-primary font-medium shadow-lg' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Heart size={18} />
            <span>For Caregivers</span>
          </button>
          <button
            onClick={() => setActiveTab('providers')}
            className={`py-2 px-6 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'providers' 
                ? 'bg-yellow-400 text-primary font-medium shadow-lg' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Briefcase size={18} />
            <span>For Providers</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          key={activeTab}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Left Side - Image with floating accent */}
          <motion.div 
            className="relative mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400 rounded-lg z-0 animate-pulse opacity-70"></div>
              <img
                src={activeImage}
                alt={activeTab === 'caregivers' ? "Why caregivers love us" : "Why providers choose us"}
                className="rounded-lg shadow-xl relative z-10 w-full max-w-md object-cover object-center h-80"
              />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent rounded-full z-0 animate-pulse opacity-50" style={{ backgroundColor: '#FF9923' }}></div>
            </div>
            
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-primary font-bold py-3 px-5 rounded-lg shadow-lg">
              {activeTab === 'caregivers' ? '2,500+' : '850+'} {activeTab === 'caregivers' ? 'Caregivers' : 'Providers'}
            </div>
          </motion.div>
          
          {/* Right Side - Feature List */}
          <div>
            <motion.h3 
              className="text-yellow-400 font-bold text-2xl mb-6"
              variants={itemVariants}
            >
              {activeTab === 'caregivers' ? 'Why Caregivers Love Us' : 'Why Providers Choose Us'}
            </motion.h3>
            
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
            >
              {activeFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm rounded-lg p-5 transition-all transform hover:-translate-y-1 ${hoverFeature === index ? 'shadow-lg bg-white/20' : ''}`}
                  onMouseEnter={() => setHoverFeature(index)}
                  onMouseLeave={() => setHoverFeature(null)}
                  variants={itemVariants}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-dark/30 rounded-lg flex items-center justify-center mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-lg">{feature.title}</h4>
                      <p className="text-white/80 mt-1">{feature.description}</p>
                    </div>
                  </div>
                  
                  {hoverFeature === index && (
                    <motion.div 
                      className="mt-4 text-yellow-400 flex items-center text-sm font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <span>Learn more</span> 
                      <ArrowRight size={16} className="ml-1" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-16 relative z-10">
        {activeTab === 'caregivers' ? (
          <YellowLink
            btnPro={"Get Started Today"}
            linkTo={"/caregiver"}
          />
        ) : (
          <YellowLink
            btnPro={"Post a position"}
            linkTo={"/provider"}
          />
        )}
        
      
      </div>
    </div>
  );
};


const AboutSectionWithProps = () => {
  return <AboutSection landingSeven={landingSeven} landingEight={landingEight} />;
};

export default AboutSectionWithProps;