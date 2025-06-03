// // components/PrivateRoute.jsx
// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const PrivateRoute = ({ children, requiredRole }) => {
//   const { isAuthenticated, role } = useContext(AuthContext);

//   if (!isAuthenticated) return <Navigate to="/login" />;
//   if (requiredRole && role !== false) return <Navigate to="/unauthorized" />;

//   return children;
// };

// export default PrivateRoute;
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children, adminOnly = false }) => {
//   const token = localStorage.getItem("access_token");
//   const isAdmin = localStorage.getItem("is_staff") !== true;

//   if (!token) return <Navigate to="/login" />;

//   if (adminOnly && !isAdmin) return <Navigate to="/unauthorized" />;

//   return children;
// };

// export default PrivateRoute;

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
