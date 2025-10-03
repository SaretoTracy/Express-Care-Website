import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { LandingPage } from "../pages/LandingPage";
import { CaregiverPage } from "../pages/CaregiverPage";


const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="home" element={<LandingPage />} />
        <Route path="caregiver" element={<CaregiverPage />} />
      </Route>
    </>
  );
};

export default PublicRoutes;
