// src/pages/ComingSoon.tsx
import React from "react";
import { motion } from "framer-motion";
import { Wrench, Rocket, Sparkles } from "lucide-react";

const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 text-center px-6 relative overflow-hidden">
      {/* Animated Icon */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="mb-6"
      >
        <Wrench className="w-16 h-16 text-indigo-600" />
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-800"
      >
        We’re Still Building!
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl"
      >
        Exciting features are on the way 🚀.  
        Stay tuned for updates and improvements. 
      </motion.p>

      {/* Animated button placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8"
      >
        
      </motion.div>

      {/* Floating sparkles animation */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 text-indigo-400 opacity-70"
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>
    </div>
  );
};

export default ComingSoon;
