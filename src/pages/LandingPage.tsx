import React from "react";
import Stats from "../components/LandingPage/Stats";
import AboutSection from "../components/LandingPage/AboutSection";
import Services from "../components/LandingPage/Services";
import SliderLanding from "../components/LandingPage/SliderLanding";


export const LandingPage: React.FC<{}> = () => {

  return (
    <>
      <SliderLanding />
      <Stats />
      <AboutSection />
      <Services/>
     
   
    </>
  );
};
