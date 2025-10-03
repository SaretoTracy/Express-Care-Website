import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { LandingPage } from "../pages/LandingPage";
import { CaregiverPage } from "../pages/CaregiverPage";
import { ProviderLanding } from "../pages/ProviderPage";


const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="home" element={<LandingPage />} />
        <Route path="caregiver" element={<CaregiverPage />} />
        <Route path="provider" element={<ProviderLanding />} />
      </Route>
    </>
  );
};

export default PublicRoutes;
