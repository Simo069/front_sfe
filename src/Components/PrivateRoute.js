

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly = false, userOnly = false }) => {
  const token = localStorage.getItem("access_token");
  const isAdmin = localStorage.getItem("role") === "true";
  const isUser = localStorage.getItem("role") === "false";

  if (!token) return <Navigate to="/login" />;

  if (adminOnly && !isAdmin) return <Navigate to="/unauthorized" />;

  if (userOnly && !isUser) return <Navigate to="/unauthorized" />;

  return children;
};

export default PrivateRoute;
