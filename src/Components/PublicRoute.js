
// import { Navigate } from "react-router-dom";

// export default function PublicRoute({children}){
//     const token = localStorage.getItem("access_token");
//     const isAdmin = localStorage.getItem("role");

//     if(token && isAdmin ==="true"){
//         return <Navigate to="/admin-dashboard"/>
//     }else if(token){
//         return <Navigate to="/"/>
//     }
//     return children;
// }

// Components/PublicRoute.js
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
