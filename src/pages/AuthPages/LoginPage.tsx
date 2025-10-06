

import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";

export const LoginPage = () => {
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
  
    const {
      register,
      handleSubmit,
    } = useForm();
  
    const handleLoginSubmit = () => {
      navigate("/comingsoon");
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-10">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(handleLoginSubmit)}
          className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.01]"
        >
          {/* Card Header with Logo */}
          <div className="bg-[#557a95] pt-6 pb-4 px-6">
            <div className="flex justify-center">
              <img 
                className="w-48 object-contain transition-all duration-300 hover:scale-105" 
                src={logo} 
                alt="logo" 
              />
            </div>
          </div>
          
          {/* Card Body */}
          <div className="p-8">
            <h3 className="text-center font-bold text-2xl text-gray-800 mb-6">
              Sign In
            </h3>
            
            {/* Email Field */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  className="w-full px-10 py-3 border rounded-lg text-gray-700 focus:outline-none border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-100"
                  placeholder="your@email.com"
                  {...register("email")}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-10 py-3 border rounded-lg text-gray-700 focus:outline-none border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-100"
                  placeholder="••••••••"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`w-full py-3 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isHovered 
                  ? "bg-gradient-to-r from-amber-500 to-yellow-400" 
                  : "bg-gradient-to-r from-yellow-400 to-amber-500"
              } text-white font-medium shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5`}
            >
              <LogIn size={18} className={`mr-2 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
