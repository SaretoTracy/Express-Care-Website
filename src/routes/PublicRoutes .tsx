import { Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";


export default function PublicRoutes() {
  return (
    <>
      <Route path="/" element={<LandingPage />} />
   
    </>
  );
}
