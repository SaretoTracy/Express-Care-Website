import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo.png";

export const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const yellow = "#FF9923";

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 py-3 transition-all duration-300 ${
          scrolled ? "shadow-md bg-[#557a95]" : "bg-[#557a95]"
        }`}
      >
        {/* Left: Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="ExpressCare Logo"
            className="w-[130px] md:w-[150px] transition-transform hover:scale-105"
          />
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex flex-1 justify-center items-center space-x-12 font-semibold text-yellow-400">
          <Link
            to="/"
            className="relative group text-lg tracking-wide"
          >
            <span className="group-hover:text-white transition-colors duration-300">
              Home
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/caregiver"
            className="relative group text-lg tracking-wide"
          >
            <span className="group-hover:text-white transition-colors duration-300">
              Caregiver
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/provider"
            className="relative group text-lg tracking-wide"
          >
            <span className="group-hover:text-white transition-colors duration-300">
              Provider
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Right: Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            to="/login"
            className="bg-white text-[#FF9923] px-4 py-2 rounded-md shadow hover:bg-blue-50 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-[#FF9923] text-white px-4 py-2 rounded-md shadow hover:bg-[#e68a1f] transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden text-yellow-400 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke={yellow}
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Animated Mobile Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#557a95]/95 flex flex-col items-center justify-center text-yellow-400 space-y-8 text-xl font-semibold"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-yellow-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Mobile Links */}
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-white transition">
              Home
            </Link>
            <Link to="/caregiver" onClick={() => setMenuOpen(false)} className="hover:text-white transition">
              Caregiver
            </Link>
            <Link to="/provider" onClick={() => setMenuOpen(false)} className="hover:text-white transition">
              Provider
            </Link>

            {/* Auth Buttons */}
            <div className="flex flex-col space-y-4 mt-6">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-white text-[#FF9923] px-6 py-2 rounded-md shadow hover:bg-blue-50 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="bg-[#FF9923] text-white px-6 py-2 rounded-md shadow hover:bg-[#e68a1f] transition"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};
