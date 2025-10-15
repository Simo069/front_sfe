// import { Navigate } from "react-router-dom";

// const PublicRoute = ({ children }) => {
//   const token = localStorage.getItem("access_token");

//   if (token) {
//     const isAdmin = localStorage.getItem("role") === "true";
//     return <Navigate to={isAdmin ? "/admin-Dashboard" : "/"} />;
//   }

// Components/PublicRoute.js
//   return children;
// };

// export default PublicRoute;
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role"); // "admin", "dashboard-viewer", "user", etc.

  if (token) {
    if (role === "admin" || role === "dashboard-viewer") {
      return <Navigate to="/admin-Dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PublicRoute;