import { NavLink } from "react-router-dom";
import { Home, Users, CreditCard, Settings, LogOut, Menu, X, BarChart2, Building, FileCheck, Briefcase } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useState } from "react";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItemClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md text-white transition-all ${
      isActive
       ? "bg-gradient-to-r from-[#FF9923] to-[#FF9923]/80 font-semibold"
    : "hover:bg-gray-800 text-[#FF9923]"
    }`;

  const navLinks = (
    <>
      <NavLink to="/admin" className={navItemClasses} onClick={() => setIsOpen(false)}>
        <Home size={20} /> Dashboard
      </NavLink>
      <NavLink to="/admin/caregivers" className={navItemClasses} onClick={() => setIsOpen(false)}>
        <Users size={20} /> Caregivers
      </NavLink>
      <NavLink to="/admin/providers" className={navItemClasses} onClick={() => setIsOpen(false)}>
        <Building size={20} /> Providers
      </NavLink>
      <NavLink to="/admin/verifications" className={navItemClasses} onClick={() => setIsOpen(false)}>
        <FileCheck  size={20} /> Verifications
      </NavLink>
      <NavLink to="/admin/jobposting" className={navItemClasses} onClick={() => setIsOpen(false)}>
        <Briefcase size={20} /> Job posting
      </NavLink>
      <NavLink to="/admin/subscription" className={navItemClasses} onClick={() => setIsOpen(false)}>
        <CreditCard size={20} /> Subscriptions
      </NavLink>
      <NavLink to="/admin/reports" className={navItemClasses} onClick={() => setIsOpen(false)}>
        <BarChart2 size={20} /> Reports
      </NavLink>
      <NavLink to="/settings" className={navItemClasses} onClick={() => setIsOpen(false)}>
        <Settings size={20} /> Settings
      </NavLink>
    </>
  );


  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-[#557A95] px-4 py-3 shadow-md">
        <img src={logo} alt="Express Care Logo" className="w-14 h-14" />
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
        </button>
      </div>

      {/* AdminNavbar */}
      <aside
        className={`fixed z-50 md:relative top-0 left-0  bg-[#557A95] w-64 h-full md:min-h-screen flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <div className="hidden md:flex justify-center p-6">
            <img src={logo} alt="FlexPesa Logo" className="w-20 h-20 object-contain" />
          </div>
          <nav className="flex flex-col gap-2 px-4">{navLinks}</nav>
        </div>

        {/* Log Out */}
        <div className="px-4 pb-6">
          <button 
          className="flex items-center gap-3 text-blue-400 hover:text-white px-4 py-2 rounded-md hover:bg-gray-800 w-full transition-all">
            <LogOut size={20} /> Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
