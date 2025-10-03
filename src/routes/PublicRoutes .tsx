import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { LandingPage } from "../pages/LandingPage";


const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="home" element={<LandingPage />} />
       
      </Route>
    </>
  );
};

export default PublicRoutes;
