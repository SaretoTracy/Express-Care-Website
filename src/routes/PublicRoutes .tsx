import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import { LoginPage } from "../pages/AuthPages/LoginPage";
import { SignupPage } from "../pages/Mainwebpages/SignupPage";
import ComingSoon from "../pages/Mainwebpages/ComingSoon";
import { ProviderSignup } from "../pages/AuthPages/ProviderSignup";
import { CaregiverSignup } from "../pages/AuthPages/CaregverSignup";
import { CaregiverPage } from "../pages/Mainwebpages/CaregiverPage";
import { LandingPage } from "../pages/Mainwebpages/LandingPage";
import ProviderLanding from "../pages/ProviderPages/ProviderLanding";


const PublicRoutes = () => {
  return (
    <>
    
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="home" element={<LandingPage />} />
        <Route path="caregiver" element={<CaregiverPage />} />
        <Route path="provider" element={<ProviderLanding />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="comingsoon" element={<ComingSoon />} />
        <Route path="provider/signup" element={<ProviderSignup />} />
        <Route path="caregiver/signup" element={<CaregiverSignup />} />
      </Route>
    </>
  );
};

export default PublicRoutes;
