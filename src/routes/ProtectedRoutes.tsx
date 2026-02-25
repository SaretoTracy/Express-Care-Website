import { Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CaregiverLanding from "../pages/CaregiverDashboard/CaregiverLanding";
import ProviderLanding from "../pages/ProviderDashboard/ProviderLanding";
import AdminLanding from "../pages/AdminDashboard/AdminLanding";
import AdminPlaceholder from "../pages/AdminDashboard/AdminPlaceholder";
import AdminLayout from "../layouts/AdminLayout";
import CaregiverLayout from "../layouts/CaregiverLayout";
import ProviderLayout from "../layouts/ProviderLayout";
import CaregiverRequirementForm from "../pages/CaregiverDashboard/CaregiverRequirementUploadPage";
import ProfilePage from "../pages/CaregiverDashboard/ProfilePage";
import PostJobForm from "../pages/ProviderDashboard/PostJobForm";

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
          <Route path="/provider/postjob" element={< PostJobForm />} />
        </Route>
      </Route>

      {/* Admin */}
      <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminLanding />} />
          <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/caregivers" element={<AdminPlaceholder title="Caregivers" description="Manage and review caregiver accounts and profiles." />} />
          <Route path="/admin/providers" element={<AdminPlaceholder title="Providers" description="Manage care providers and organizations." />} />
          <Route path="/admin/verifications" element={<AdminPlaceholder title="Verifications" description="Review pending document and profile verifications." />} />
          <Route path="/admin/jobposting" element={<AdminPlaceholder title="Job postings" description="View and moderate job listings." />} />
          <Route path="/admin/subscription" element={<AdminPlaceholder title="Subscriptions" description="Manage provider subscriptions and billing." />} />
          <Route path="/admin/reports" element={<AdminPlaceholder title="Reports" description="Analytics and platform reports." />} />
          <Route path="/admin/settings" element={<AdminPlaceholder title="Settings" description="Admin and platform settings." />} />
        </Route>
      </Route>
    </>
  );
}
