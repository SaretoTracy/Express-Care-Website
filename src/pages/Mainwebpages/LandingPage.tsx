import React from "react";
import AboutSection from "../../components/LandingPage/AboutSection";
import Services from "../../components/LandingPage/Services";
import SliderLanding from "../../components/LandingPage/SliderLanding";
import Stats from "../../components/LandingPage/Stats";



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
