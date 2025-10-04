import React from "react";
import { YellowLink } from "../components/ButtonComponents/YellowLink";
import care5 from "/care5.jpg";

export const ProviderLanding: React.FC<{}> = () => {
  const yellowColor = "#FF9923";
  const bgColor = "#557a95";
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
         
          <div className="relative order-2 md:order-1">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-400 opacity-20 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-20 rounded-full"
             style={{ 
              backgroundColor: bgColor,
             
            }}></div>
            
            <img 
              src={care5} 
              alt="Healthcare agency professionals" 
              className="w-full rounded-xl shadow-lg relative z-10"
            />
            
            <div className="absolute -left-3 top-1/3 transform -translate-y-1/2 bg-white py-3 px-4 rounded-lg shadow-md hidden md:block">
              <p className="font-bold text-blue-600">200+ Agencies</p>
              <p className="text-sm text-gray-600">found quality staff</p>
            </div>
          </div>
          
          {/* Text Content - Right side on desktop */}
          <div className="space-y-6 order-1 md:order-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              <span className="text-yellow-500 block mb-2">Streamline Your Hiring</span>
              <span>Find Qualified Caregivers</span>
            </h1>
            
            <p className="text-xl font-medium text-blue-600">
              We handle the recruitment process so you can focus on patient care
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <p className="text-gray-700 text-lg leading-relaxed">
                Our platform connects your agency with certified caregivers who match your 
                specific requirements. Post positions, review applicants, and hire with 
                confidence—all in one place.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <YellowLink btnPro={"Create Agency Account"} linkTo={"/provider/signup"} />
            
            </div>
          </div>
        </div>
        
        {/* Process Steps Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Simple 4-Step Hiring Process</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Create Profile",
                description: "Set up your agency profile with credentials and verification",
                color: "bg-yellow-100 text-yellow-600"
              },
              {
                step: "2",
                title: "Post Position",
                description: "Specify requirements, hours, and qualifications needed",
                color: "bg-blue-100 text-blue-600"
              },
              {
                step: "3",
                title: "Review Candidates",
                description: "Browse applications from qualified caregivers",
                color: "bg-green-100 text-green-600"
              },
              {
                step: "4",
                title: "Connect & Hire",
                description: "Interview and hire the perfect match for your team",
                color: "bg-purple-100 text-purple-600"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200 border border-gray-100 relative">
                <div className={`absolute -top-3 -left-3 w-10 h-10 ${step.color} rounded-full flex items-center justify-center font-bold`}>
                  {step.step}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mt-2 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Why Choose Our Platform?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Candidates</h3>
              <p>Access pre-screened caregivers with verified credentials and background checks.</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-sm">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
              <p>Reduce your hiring timeline from weeks to days with our streamlined process.</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-sm">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Better Matches</h3>
              <p>Our intelligent matching algorithm suggests candidates based on your specific needs.</p>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className=" rounded-xl p-8 text-center shadow-lg"
         style={{ 
          backgroundColor: bgColor,
         
        }}>
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Find Your Next Great Hire?</h2>
          <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
            Join hundreds of healthcare agencies who've streamlined their recruitment process and found quality caregivers through our platform.
          </p>
          <YellowLink 
            btnPro={"Get Started Now"} 
            linkTo={"/provider/signup"} 
          />
          
          </div>
      </div>
    </div>
  );
};