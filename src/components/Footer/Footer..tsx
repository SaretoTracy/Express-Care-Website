import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo2.png";
import { 
  Facebook, 
  Linkedin, 
  Home, 
  Mail, 
  Phone, 
  ArrowRight, 
  Heart
} from "lucide-react";

export const Footer = () => {
  const [hovered, setHovered] = useState({
    getHired: false,
    findCaregivers: false,
    socials: { facebook: false, linkedin: false }
  });

  return (
    <footer className="bg-blue-500 text-white relative overflow-hidden">
      {/* Wave decoration at the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 text-white"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <div className="p-5 grid md:grid-cols-3 grid-cols-1 container mx-auto mt-10">
        {/* About Section */}
        <section className="mb-8 transition-all duration-300 hover:scale-105 transform">
          <h3 className="text-yellow-400 font-bold text-3xl mb-4 flex items-center">
            <span className="relative">
              ABOUT
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-yellow-400 transition-all duration-500 group-hover:w-full"></span>
            </span>
          </h3>
          <p className="text-gray-100 mb-4 leading-relaxed transition-opacity duration-300 hover:opacity-90">
            Millions of people are searching for jobs, salary information,
            company reviews, and interview questions. WorkLinks makes it
            possible for caregivers to be considered for employment.
          </p>
          <div className="mt-4 transform transition hover:rotate-2 duration-300 inline-block">
            <img src={logo} alt="logo" className="max-h-16" />
          </div>
        </section>

        {/* Services Section */}
        <section className="md:justify-self-center pl-4 md:pl-0 mb-8 transition-all duration-300 hover:scale-105 transform">
          <h3 className="text-yellow-400 font-bold text-3xl mb-4">SERVICES</h3>
          <ul className="flex flex-col space-y-3 font-medium text-lg">
            <li 
              className="flex items-center group"
              onMouseEnter={() => setHovered(prev => ({...prev, getHired: true}))}
              onMouseLeave={() => setHovered(prev => ({...prev, getHired: false}))}
            >
              <ArrowRight 
                className={`mr-2 transition-all duration-300 ${hovered.getHired ? 'text-yellow-400 translate-x-1' : 'text-white'}`} 
                size={18} 
              />
              <Link to="/caregiver" className="relative overflow-hidden group-hover:text-yellow-400 transition-colors duration-300">
                Get Hired
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li 
              className="flex items-center group" 
              onMouseEnter={() => setHovered(prev => ({...prev, findCaregivers: true}))}
              onMouseLeave={() => setHovered(prev => ({...prev, findCaregivers: false}))}
            >
              <ArrowRight 
                className={`mr-2 transition-all duration-300 ${hovered.findCaregivers ? 'text-yellow-400 translate-x-1' : 'text-white'}`} 
                size={18} 
              />
              <Link to="/provider" className="relative overflow-hidden group-hover:text-yellow-400 transition-colors duration-300">
                Find Caregivers
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </section>

        {/* Contacts Section */}
        <section className="mb-8 transition-all duration-300 hover:scale-105 transform">
          <h3 className="text-yellow-400 font-bold text-3xl mb-4">CONTACTS</h3>
          <ul className="space-y-4">
            <li className="flex items-center group hover:text-yellow-400 transition-colors duration-300">
              <div className="bg-blue-600 p-2 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors duration-300">
                <Home size={18} className="text-white" />
              </div>
              <span>Washington, D.C</span>
            </li>
            <li className="flex items-center group hover:text-yellow-400 transition-colors duration-300">
              <div className="bg-blue-600 p-2 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors duration-300">
                <Mail size={18} className="text-white" />
              </div>
              <span>info@expresscareteam.com</span>
            </li>
            <li className="flex items-center group hover:text-yellow-400 transition-colors duration-300">
              <div className="bg-blue-600 p-2 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors duration-300">
                <Phone size={18} className="text-white" />
              </div>
              <span>+1 (555) 691186</span>
            </li>
          </ul>
        </section>
      </div>

      {/* Divider */}
      <div className="container mx-auto h-1 bg-yellow-400 mb-3 transform transition-transform duration-300 hover:scale-x-105"></div>

      {/* Copyright Section */}
      <div className="container mx-auto grid md:grid-cols-2 px-4 py-4">
        <section className="flex items-center">
          <small className="flex items-center flex-wrap">
            Copyright &copy; <span className="text-yellow-400 mx-1">2025</span> 
            All Rights Reserved by 
            <span className="flex items-center mx-1 text-yellow-400">
              <Heart size={14} className="mx-1 animate-pulse text-red-400" /> 
              Express Care Team
            </span>
          </small>
        </section>
        
        {/* Social Icons */}
        <section className="flex md:justify-end justify-center my-3 md:my-0 text-yellow-400 text-xl space-x-4">
          <div 
            className="hover:scale-125 transition-transform duration-300 cursor-pointer"
            onMouseEnter={() => setHovered(prev => ({...prev, socials: {...prev.socials, facebook: true}}))}
            onMouseLeave={() => setHovered(prev => ({...prev, socials: {...prev.socials, facebook: false}}))}
          >
            <Facebook 
              size={24} 
              className={`transition-all duration-300 ${hovered.socials.facebook ? 'text-blue-300' : 'text-yellow-400'}`}
            />
          </div>
          <div 
            className="hover:scale-125 transition-transform duration-300 cursor-pointer"
            onMouseEnter={() => setHovered(prev => ({...prev, socials: {...prev.socials, linkedin: true}}))}
            onMouseLeave={() => setHovered(prev => ({...prev, socials: {...prev.socials, linkedin: false}}))}
          >
            <Linkedin 
              size={24} 
              className={`transition-all duration-300 ${hovered.socials.linkedin ? 'text-blue-300' : 'text-yellow-400'}`}
            />
          </div>
        </section>
      </div>
    </footer>
  );
};