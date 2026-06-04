import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import { LoginPage } from "../pages/AuthPages/LoginPage";
import { SignupPage } from "../pages/Mainwebpages/SignupPage";
import ComingSoon from "../pages/Mainwebpages/ComingSoon";
import { ProviderSignup } from "../pages/AuthPages/ProviderSignup";
import { CaregiverSignup } from "../pages/AuthPages/CaregverSignup";
import { CaregiverPage } from "../pages/Mainwebpages/CaregiverPage";
import { LandingPage } from "../pages/Mainwebpages/LandingPage";
import { ProviderPage } from "../pages/Mainwebpages/ProviderPage";

import ProviderHero from "../pages/ProviderDashboard/ProviderHero";

import StripePaymentPage from "../pages/ProviderDashboard/StripePaymentPage";
import CaregiverRequirementsUpload from "../pages/CaregiverDashboard/CaregiverRequirementUploadPage";
import { ForgotPasswordPage } from "../pages/AuthPages/ForgotPassword";
import { VerifyOTPPage } from "../pages/AuthPages/VerifyOtp";
import { ResetPasswordPage } from "../pages/AuthPages/ResetPassword";



const PublicRoutes = () => {
  return (
    <>
    
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="home" element={<LandingPage />} />
        <Route path="caregiver" element={<CaregiverPage />} />
        <Route path="provider" element={<ProviderPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="comingsoon" element={<ComingSoon />} />
        <Route path="provider/signup" element={<ProviderSignup />} />
        <Route path="caregiver/signup" element={<CaregiverSignup />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/payment" element={< StripePaymentPage />} />
        <Route path="/providerhero" element={< ProviderHero />} />
        <Route path="/requirements" element={<CaregiverRequirementsUpload />} />
        
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>
    </>
  );
};

export default PublicRoutes;
