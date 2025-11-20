import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CaregiverLanding from "../pages/CaregiverDashboard/CaregiverLanding";
import ProviderLanding from "../pages/ProviderDashboard/ProviderLanding";
import AdminLanding from "../pages/AdminDashboard/AdminLanding";

export default function ProtectedRoutes() {
  return (
    <>
      {/* Caregiver Routes */}
      <Route element={<PrivateRoute allowedRoles={["CAREGIVER"]} />}>
        <Route path="/caregiver/dashboard" element={<CaregiverLanding />} />
      </Route>

      {/* Provider (Home Representative) Routes */}
      <Route element={<PrivateRoute allowedRoles={["HOMEREPRESENTATIVE"]} />}>
        <Route path="/provider/dashboard" element={<ProviderLanding />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin/dashboard" element={<AdminLanding />} />
      </Route>
    </>
  );
}
