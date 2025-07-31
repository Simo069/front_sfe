import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    const isAdmin = localStorage.getItem("role") === "true";
    return <Navigate to={isAdmin ? "/admin-Dashboard" : "/"} />;
  }

  return children;
};

export default PublicRoute;
