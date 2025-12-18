import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CaregiverLanding from "../pages/CaregiverDashboard/CaregiverLanding";
import ProviderLanding from "../pages/ProviderDashboard/ProviderLanding";
import AdminLanding from "../pages/AdminDashboard/AdminLanding";
import AdminLayout from "../layouts/AdminLayout";
import CaregiverLayout from "../layouts/CaregiverLayout";
import ProviderLayout from "../layouts/ProviderLayout";
import CaregiverRequirementForm from "../pages/CaregiverDashboard/CaregiverRequirementForm";
import ProfilePage from "../pages/CaregiverDashboard/ProfilePage";

export default function ProtectedRoutes() {
  return (
  
    <>
      {/* Caregiver */}
      <Route element={<PrivateRoute allowedRoles={["CAREGIVER"]} />}>
        <Route element={<CaregiverLayout />}>
          <Route path="/caregiver/dashboard" element={<CaregiverLanding />} />
          <Route path="/caregiver/requirements" element={<CaregiverRequirementForm />} />
          <Route path="/caregiver/profile" element={<ProfilePage  />} />
        </Route>
      </Route>

      {/* Home Representative */}
      <Route element={<PrivateRoute allowedRoles={["HOMEREPRESENTATIVE"]} />}>
        <Route element={<ProviderLayout />}>
          <Route path="/provider/dashboard" element={<ProviderLanding />} />
        </Route>
      </Route>

      {/* Admin */}
      <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminLanding />} />
        </Route>
      </Route>
    </>
  );
}
