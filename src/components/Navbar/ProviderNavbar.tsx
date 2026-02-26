import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Bell, User, LogOut, Menu, X } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/AuthContext";

export const ProviderNavbar: React.FC = () => {
  const { logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 py-3 transition-all duration-300 ${
          scrolled ? "shadow-lg bg-[#557a95]" : "bg-[#557a95]"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="ExpressCare Logo"
            className="w-[130px] md:w-[150px] transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center items-center space-x-12 font-semibold text-yellow-400">
          <Link
            to="provider/dashboard"
            className="relative group text-lg tracking-wide flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span className="group-hover:text-white transition-colors duration-300">
              Home
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="provider/postjob"
            className="relative group text-lg tracking-wide flex items-center gap-2"
          >
            <Bell className="w-5 h-5" />
            <span className="group-hover:text-white transition-colors duration-300">
              Notifications
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/provider/profile"
            className="relative group text-lg tracking-wide flex items-center gap-2"
          >
            <User className="w-5 h-5" />
            <span className="group-hover:text-white transition-colors duration-300">
              Profile
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Desktop Logout */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={handleLogout}
            className="bg-white text-[#FF9923] px-4 py-2 rounded-md shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden text-yellow-400 focus:outline-none hover:text-white transition-colors"
        >
          <Menu className="w-8 h-8" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#557a95]/95 backdrop-blur-sm flex flex-col items-center justify-center text-yellow-400 space-y-8 text-xl font-semibold"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-yellow-400 transition"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Mobile Links */}
            <Link
              to="/caregiver/dashboard"
              onClick={() => setMenuOpen(false)}
              className="hover:text-white transition flex items-center gap-3"
            >
              <Home className="w-6 h-6" />
              Home
            </Link>

            <Link
              to="/caregiver/notification"
              onClick={() => setMenuOpen(false)}
              className="hover:text-white transition flex items-center gap-3"
            >
              <Bell className="w-6 h-6" />
              Notifications
            </Link>

            <Link
              to="/caregiver/profile"
              onClick={() => setMenuOpen(false)}
              className="hover:text-white transition flex items-center gap-3"
            >
              <User className="w-6 h-6" />
              Profile
            </Link>

            {/* Mobile Logout */}
            <button
              onClick={handleLogout}
              className="bg-white text-[#FF9923] px-6 py-2 rounded-md shadow-md hover:shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2 justify-center"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};