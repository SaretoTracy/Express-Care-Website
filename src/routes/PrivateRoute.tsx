import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  // Get user from localStorage
  const userString = localStorage.getItem("user");
  if (!userString) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userString);

  // Detect role
  let role = "";
  if (user?.caregiver) role = "CAREGIVER";
  else if (user?.adultHomeRepresentative) role = "HOMEREPRESENTATIVE";
  else if (user?.roles && user.roles.length > 0) role = user.roles[0]?.name.toUpperCase() || "";

  // Check if user's role is allowed
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // redirect if not authorized
  }

  return <Outlet />;
};

export default PrivateRoute;
