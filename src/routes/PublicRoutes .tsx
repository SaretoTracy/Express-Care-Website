import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { LandingPage } from "../pages/LandingPage";
import { CaregiverPage } from "../pages/CaregiverPage";
import { ProviderLanding } from "../pages/ProviderPage";
import { LoginPage } from "../pages/AuthPages/LoginPage";
import { SignupPage } from "../pages/AuthPages/SignupPage";


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
      </Route>
    </>
  );
};

export default PublicRoutes;
