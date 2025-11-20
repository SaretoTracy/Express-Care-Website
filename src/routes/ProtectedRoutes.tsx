import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CaregiverLanding from "../pages/CaregiverDashboard/CaregiverLanding";
import ProviderLanding from "../pages/ProviderDashboard/ProviderLanding";
import AdminLanding from "../pages/AdminDashboard/AdminLanding";



export default function ProtectedRoutes() {
  return (
    <>
      {/* Caregiver Routes */}
      <Route element={<PrivateRoute allowedRoles={["caregiver"]} />}>
        <Route path="/caregiver/dashboard" element={<CaregiverLanding />} />
      </Route>

      {/* Provider Routes */}
      <Route element={<PrivateRoute allowedRoles={["provider"]} />}>
        <Route path="/provider/dashboard" element={<ProviderLanding />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminLanding />} />
      </Route>
    </>
  );
}
