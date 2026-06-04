import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BriefcaseBusiness, User, LogOut, Menu, X } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  {
    to: "/provider/dashboard",
    label: "Home",
    icon: Home,
  },
  {
    to: "/provider/postjob",
    label: "Post Job",
    icon: BriefcaseBusiness,
  },
  {
    to: "/provider/profile",
    label: "Profile",
    icon: User,
  },
];

export const ProviderNavbar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setMenuOpen(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 py-3 transition-all duration-300 ${
          scrolled
            ? "shadow-xl bg-[#557a95]"
            : "bg-[#557a95]"
        }`}
      >
        {/* Logo */}
        <Link to="/provider/dashboard" className="flex items-center space-x-2">
          <motion.img
            src={logo}
            alt="ExpressCare Logo"
            className="w-[130px] md:w-[150px]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center items-center space-x-10 font-semibold">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                className="relative group flex items-center gap-2"
              >
                <motion.div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-yellow-400/20 text-white"
                      : "text-yellow-400 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div
                    animate={active ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span className="text-base tracking-wide">{label}</span>
                </motion.div>

                {/* Active underline */}
                <motion.span
                  className="absolute left-0 -bottom-1 h-[2px] bg-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: active ? "100%" : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop Logout */}
        <div className="hidden lg:flex items-center">
          <motion.button
            onClick={handleLogout}
            className="bg-white text-[#FF9923] px-4 py-2 rounded-lg shadow-md flex items-center gap-2 font-semibold hover:bg-orange-50 transition-colors duration-200"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden text-yellow-400 focus:outline-none"
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="w-8 h-8" />
        </motion.button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#557a95]/95 backdrop-blur-sm flex flex-col items-center justify-center space-y-6"
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-yellow-400 transition"
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Mobile Links */}
            {navLinks.map(({ to, label, icon: Icon }, i) => {
              const active = isActive(to);
              return (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <Link
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 text-xl font-semibold px-6 py-3 rounded-xl transition-all duration-200 ${
                      active
                        ? "bg-yellow-400/20 text-white"
                        : "text-yellow-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    {label}
                    {active && (
                      <motion.span
                        layoutId="mobile-active"
                        className="ml-2 w-2 h-2 rounded-full bg-yellow-400"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}

            {/* Mobile Logout */}
            <motion.button
              onClick={handleLogout}
              className="mt-4 bg-white text-[#FF9923] px-8 py-3 rounded-xl shadow-md flex items-center gap-2 font-semibold hover:bg-orange-50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              whileTap={{ scale: 0.96 }}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};