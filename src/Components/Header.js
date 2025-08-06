

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// function Header() {
//   const { isAuthenticated, logout, isUser, isAdmin, isManager, user } =
//     useAuth();
//   const navigate = useNavigate();
//   const username = user?.lastName;
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const logOut = () => {
//     setIsOpen(false);
//     logout();
//     navigate("/login");
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && !event.target.closest(".dropdown-container")) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isOpen]);

//   const NavLink = ({ to, children, className = "" }) => (
//     <Link
//       to={to}
//       className={`relative py-2 px-4 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 hover:text-violet-600 dark:hover:text-violet-400 group ${className}`}
//     >
//       {children}
//       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
//     </Link>
//   );

//   const UserAvatar = () => (
//     <div
//       className="dropdown-container relative"
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 cursor-pointer flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
//         {username ? username.charAt(0).toUpperCase() : "U"}
//       </div>

//       {isOpen && (
//         <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 animate-fadeIn">
//           <div className="p-4 border-b border-gray-100 dark:border-gray-700">
//             <p className="text-sm font-semibold text-gray-900 dark:text-white">
//               {username || "User"}
//             </p>
//             <p className="text-xs text-gray-500 dark:text-gray-400">
//               {isAdmin() ? "Administrator" : isManager() ? "Manager" : "User"}
//             </p>
//           </div>
//           <div className="py-2">
//             <Link
//               to="/profile"
//               className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-gray-700 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
//             >
//               <svg
//                 className="w-4 h-4 mr-3"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               Profile
//             </Link>
//             <button
//               onClick={logOut}
//               className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
//             >
//               <svg
//                 className="w-4 h-4 mr-3"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderNavigation = () => {
//     if (isAdmin()) {
//       return (
//         <ul className="flex flex-col lg:flex-row lg:space-x-2 mt-4 lg:mt-0">
//           <li>
//             <NavLink to="/admin-Dashboard">Dashboard</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin-Dashboard/demandes">Demandes</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin-Dashboard/managers">Managers</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin-Dashboard/users">Users</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin-Dashboard/departements">Departements</NavLink>
//           </li>
//         </ul>
//       );
//     }
//     if (isManager()) {
//       return (
//         <ul className="flex flex-col lg:flex-row lg:space-x-2 mt-4 lg:mt-0">
//           <li>
//             <NavLink to="/manager-dashboard">Dashboard</NavLink>
//           </li>
//           <li>
//             <NavLink to="/profile">Profile</NavLink>
//           </li>
//         </ul>
//       );
//     }

//     return (
//       <ul className="flex flex-col lg:flex-row lg:space-x-2 mt-4 lg:mt-0">
//         <li>
//           <NavLink to="/">Home</NavLink>
//         </li>
//         <li>
//           <NavLink to="/demande">Demande</NavLink>
//         </li>
//         <li>
//           <NavLink to="/">Contact</NavLink>
//         </li>
//       </ul>
//     );
//   };

//   return (
//     <header className="fixed w-full top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
//       <nav className="px-4 lg:px-6 py-4">
//         <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
//           {/* Logo */}
//           <Link to="/" className="flex items-center group">
//             <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
//               <span className="text-white font-bold text-sm">S</span>
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
//               SFE
//             </span>
//           </Link>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="lg:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
//           >
//             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>

//           {/* Right side - Auth buttons/User menu */}
//           <div className="flex items-center lg:order-2 space-x-3">
//             {!isAuthenticated ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 font-medium px-4 py-2 rounded-lg transition-colors duration-300"
//                 >
//                   Log in
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//                 >
//                   Get started
//                 </Link>
//               </>
//             ) : (
//               <UserAvatar />
//             )}
//           </div>

//           {/* Navigation */}
//           <div
//             className={`${
//               isMobileMenuOpen ? "block" : "hidden"
//             } lg:flex lg:w-auto lg:order-1 w-full lg:w-auto`}
//           >
//             <div className="lg:hidden py-4">{renderNavigation()}</div>
//             <div className="hidden lg:block">{renderNavigation()}</div>
//           </div>
//         </div>
//       </nav>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//       `}</style>
//     </header>
//   );
// }

// export default Header;




import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { isAuthenticated, logout, isUser, isAdmin, isManager, isDashboardViewer, user } =
    useAuth();
  const navigate = useNavigate();
  const username = user?.lastName;
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logOut = () => {
    setIsOpen(false);
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".dropdown-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const NavLink = ({ to, children, className = "" }) => (
    <Link
      to={to}
      className={`relative py-2 px-4 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 hover:text-violet-600 dark:hover:text-violet-400 group ${className}`}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  const UserAvatar = () => (
    <div
      className="dropdown-container relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 cursor-pointer flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        {username ? username.charAt(0).toUpperCase() : "U"}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 animate-fadeIn">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {username || "User"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isAdmin() ? "Administrator" : isManager() ? "Manager": isDashboardViewer() ? "Dashboard Viewer" : "User"}
            </p>
          </div>
          <div className="py-2">
            <Link
              to="/profile"
              className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-gray-700 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Profile
            </Link>
            <button
              onClick={logOut}
              className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderNavigation = () => {
    if (isAdmin()) {
      return (
        <ul className="flex flex-col lg:flex-row lg:space-x-2 mt-4 lg:mt-0">
          <li>
            <NavLink to="/admin-Dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin-Dashboard/demandes">Demandes</NavLink>
          </li>
          <li>
            <NavLink to="/admin-Dashboard/managers">Managers</NavLink>
          </li>
          <li>
            <NavLink to="/admin-Dashboard/users">Users</NavLink>
          </li>
          <li>
            <NavLink to="/admin-Dashboard/Dashboard-Viewers">Dashboard-Viewers</NavLink>
          </li>
          <li>
            <NavLink to="/admin-Dashboard/departements">Departements</NavLink>
          </li>
        </ul>
      );
    }
    if (isManager()) {
      return (
        <ul className="flex flex-col lg:flex-row lg:space-x-2 mt-4 lg:mt-0">
          <li>
            <NavLink to="/manager-dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      );
    }

    if (isDashboardViewer()) {
      return (
        <ul className="flex flex-col lg:flex-row lg:space-x-2 mt-4 lg:mt-0">
          <li>
            <NavLink to="/admin-Dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      );
    }

    return (
      <ul className="flex flex-col lg:flex-row lg:space-x-2 mt-4 lg:mt-0">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/demande">Demande</NavLink>
        </li>
        <li>
          <NavLink to="/">Contact</NavLink>
        </li>
      </ul>
    );
  };

  return (
    <header className="fixed w-full top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
      <nav className="px-4 lg:px-6 py-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              SFE
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Right side - Auth buttons/User menu */}
          <div className="flex items-center lg:order-2 space-x-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 font-medium px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Get started
                </Link>
              </>
            ) : (
              <UserAvatar />
            )}
          </div>

          {/* Navigation */}
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } lg:flex lg:w-auto lg:order-1 w-full lg:w-auto`}
          >
            <div className="lg:hidden py-4">{renderNavigation()}</div>
            <div className="hidden lg:block">{renderNavigation()}</div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
}

export default Header;