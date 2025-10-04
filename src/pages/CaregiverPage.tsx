import React from "react";
import { YellowLink } from "../components/ButtonComponents/YellowLink";
import caregivers from "../assets/images/caregiver1.jpg";

export const CaregiverPage: React.FC<{}> = () => {
   const yellowColor = "#FF9923";
  const bgColor = "#557a95"
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              <span className="text-yellow-500 block mb-2">Build Your Career</span>
              <span>As A Professional Caregiver</span>
            </h1>
            
            <p className="text-xl font-medium text-blue-600">
              Looking for meaningful work that makes a difference?
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <p className="text-gray-700 text-lg leading-relaxed">
                We connect skilled caregivers like you with reputable agencies offering 
                competitive positions. Create your profile, showcase your expertise, and 
                find the perfect caregiving opportunity.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <YellowLink btnPro={"Create Profile"} linkTo={"/caregiver/signup"} />
             
            </div>
          </div>
          
          {/* Image with Decorative Elements */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 opacity-20 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400 opacity-20 rounded-full"></div>
            
            <img 
              src={caregivers} 
              alt="Professional caregiver helping patient" 
              className="w-full rounded-xl shadow-lg relative z-10" 
            />
            
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white py-3 px-4 rounded-lg shadow-md hidden md:block">
              <p className="font-bold text-blue-600">Join 500+ caregivers</p>
              <p className="text-sm text-gray-600">who found jobs last month</p>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Why Create Your Caregiver Profile?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Access Top Agencies",
                description: "Connect with vetted and reputable caregiving agencies seeking qualified professionals.",
                icon: "📋"
              },
              {
                title: "Showcase Your Skills",
                description: "Highlight your certifications, experience, and specialties to stand out.",
                icon: "🌟"
              },
              {
                title: "Flexible Opportunities",
                description: "Find positions that match your availability, location, and career goals.",
                icon: "🕒"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200 border border-gray-100">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-lg text-blue-700 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className=" rounded-xl p-8 text-center shadow-lg"
         style={{ 
          backgroundColor: bgColor,
         
        }}>
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Caregiving Journey?</h2>
          <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
            Create your profile today and get matched with caregiving opportunities that value your skills and compassion.
          </p>
          <YellowLink 
            btnPro={"Sign Up Now"} 
            linkTo={"/caregiver/signup"} 
          />
        </div>
      </div>
    </div>
  );
};