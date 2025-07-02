import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RestrictRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    if (user?.roles?.includes("admin") || user?.roles?.includes("dashboard-viewer")) {
      return <Navigate to="/admin-Dashboard" replace />;
    } else if (user?.roles?.includes("user")) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default RestrictRoute;
