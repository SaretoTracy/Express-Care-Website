import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  allowedRoles: Array<"CAREGIVER" | "HOMEREPRESENTATIVE" | "ADMIN">;
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role comes directly from normalized user
  const role = user.role;

  // Not authorized
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
