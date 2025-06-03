
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

//   if (token) {
//     return <Navigate to="/" />; // Rediriger vers une page par défaut (formulaire utilisateur)
//   }

if (token) {
    const isAdmin = localStorage.getItem("role") === "true";
    return <Navigate to={isAdmin ? "/admin-Dashboard" : "/"} />;
  }

  return children;
};

export default PublicRoute;
