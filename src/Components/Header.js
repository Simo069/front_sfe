import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
 
  const { isAuthenticated, logout   , isUser , isAdmin , isManager } = useAuth();
  const navigate = useNavigate();
  // const isAdmin = localStorage.getItem("role") === "true";
  const username = localStorage.getItem("username");
  const logOut = () => {
    setIsOpen(false);
    logout();
    navigate("/login");
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-lg ">
        {isAdmin() ? (
          <>
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <Link to="/" className="flex items-center">
                {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            /> */}
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  SFE
                </span>
              </Link>
              <div className="flex items-center lg:order-2">
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    className="text-violet-900 dark:text-white hover:bg-violet-800 hover:text-white duration-700  focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-200 focus:outline-none dark:focus:ring-gray-200"
                  >
                    Log in
                  </Link>
                ) : (
                  // <Link
                  //     to="/login"
                  //     onClick={logOut}
                  //     className="text-violet-900 dark:text-white hover:bg-violet-800 hover:text-white duration-700  focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-200 focus:outline-none dark:focus:ring-gray-200"
                  //   >
                  //     log out
                  //   </Link>

                  <>
                    <div
                      className="relative inline-block text-left"
                      onMouseEnter={() => setIsOpen(true)}
                      onMouseLeave={() => setIsOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-full bg-violet-300 cursor-pointer flex items-center justify-center text-white font-bold">
                        {username ? (
                          <>
                            <p>{username.split("")[0].toUpperCase()}</p>
                          </>
                        ) : (
                          "U"
                        )}
                      </div>
                      {isOpen && (
                        <>
                          <div className="absolute right-0 mt-0 w-48 bg-white border rounded shadow-md z-50">
                            <Link
                              to="#profile"
                              className="block px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                            <button
                              onClick={logOut}
                              className="w-full text-left block px-4 py-2 text-red-500 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                            >
                              logout
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
                {!isAuthenticated && (
                  <Link
                    to="/register"
                    className="text-white bg-violet-500 transition duration-700 ease-in-out transform hover:scale-105 focus:ring-1 focus:ring-primary-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    Get started
                  </Link>
                )}
              </div>

              <div
                className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                id="mobile-menu-2"
              >
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    <Link
                      to="/admin-Dashboard"
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                      aria-current="page"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin-Dashboard/demandes"
                      className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-white"
                    >
                      Demandes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin-Dashboard/managers"
                      className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-white"
                    >
                      Managers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin-Dashboard/users"
                      className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-white"
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin-Dashboard/departements"
                      className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-white"
                    >
                      Departements
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) :  isUser() ?  (
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            /> */}
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                SFE
              </span>
            </Link>
            <div className="flex items-center lg:order-2">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="text-violet-900 dark:text-white hover:bg-violet-800 hover:text-white duration-700  focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-200 focus:outline-none dark:focus:ring-gray-200"
                >
                  Log in
                </Link>
              ) : (
                // <Link
                //     to="/login"
                //     onClick={logOut}
                //     className="text-violet-900 dark:text-white hover:bg-violet-800 hover:text-white duration-700  focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-200 focus:outline-none dark:focus:ring-gray-200"
                //   >
                //     log out
                //   </Link>
                <>
                  <div
                    className="relative inline-block text-left"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-violet-300 cursor-pointer flex items-center justify-center text-white font-bold">
                      {username ? (
                        <>
                          <p>{username.split("")[0].toUpperCase()}</p>
                        </>
                      ) : (
                        "U"
                      )}
                    </div>
                    {isOpen && (
                      <>
                        <div className="absolute right-0 mt-0 w-48 bg-white border rounded shadow-md z-50">
                          <Link
                            to="#profile"
                            className="block px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                          >
                            Profile
                          </Link>
                          <button
                            onClick={logOut}
                            className="w-full text-left block px-4 py-2 text-red-500 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                          >
                            logout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="text-white bg-violet-500 transition duration-700 ease-in-out transform hover:scale-105 focus:ring-1 focus:ring-primary-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Get started
                </Link>
              )}
            </div>

            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/demande"
                    className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-white"
                  >
                    Demande
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )  : isManager() ? <>          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link to="/" className="flex items-center">
          {/* <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        /> */}
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            SFE
          </span>
        </Link>
        <div className="flex items-center lg:order-2">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="text-violet-900 dark:text-white hover:bg-violet-800 hover:text-white duration-700  focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-200 focus:outline-none dark:focus:ring-gray-200"
            >
              Log in
            </Link>
          ) : (
            // <Link
            //     to="/login"
            //     onClick={logOut}
            //     className="text-violet-900 dark:text-white hover:bg-violet-800 hover:text-white duration-700  focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-200 focus:outline-none dark:focus:ring-gray-200"
            //   >
            //     log out
            //   </Link>
            <>
              <div
                className="relative inline-block text-left"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-violet-300 cursor-pointer flex items-center justify-center text-white font-bold">
                  {username ? (
                    <>
                      <p>{username.split("")[0].toUpperCase()}</p>
                    </>
                  ) : (
                    "U"
                  )}
                </div>
                {isOpen && (
                  <>
                    <div className="absolute right-0 mt-0 w-48 bg-white border rounded shadow-md z-50">
                      <Link
                        to="#profile"
                        className="block px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logOut}
                        className="w-full text-left block px-4 py-2 text-red-500 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                      >
                        logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          {!isAuthenticated && (
            <Link
              to="/register"
              className="text-white bg-violet-500 transition duration-700 ease-in-out transform hover:scale-105 focus:ring-1 focus:ring-primary-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Get started
            </Link>
          )}
        </div>

        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link
                to="/"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/demande"
                className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-white"
              >
                Demande
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div></> : 
      
      <>
      
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            /> */}
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                SFE
              </span>
            </Link>
            <div className="flex items-center lg:order-2">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="text-violet-900 dark:text-white hover:bg-violet-800 hover:text-white duration-700  focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-200 focus:outline-none dark:focus:ring-gray-200"
                >
                  Log in
                </Link>
              ) : (
                // <Link
                //     to="/login"
                //     onClick={logOut}
                //     className="text-violet-900 dark:text-white hover:bg-violet-800 hover:text-white duration-700  focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-200 focus:outline-none dark:focus:ring-gray-200"
                //   >
                //     log out
                //   </Link>
                <>
                  <div
                    className="relative inline-block text-left"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-violet-300 cursor-pointer flex items-center justify-center text-white font-bold">
                      {username ? (
                        <>
                          <p>{username.split("")[0].toUpperCase()}</p>
                        </>
                      ) : (
                        "U"
                      )}
                    </div>
                    {isOpen && (
                      <>
                        <div className="absolute right-0 mt-0 w-48 bg-white border rounded shadow-md z-50">
                          <Link
                            to="#profile"
                            className="block px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                          >
                            Profile
                          </Link>
                          <button
                            onClick={logOut}
                            className="w-full text-left block px-4 py-2 text-red-500 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                          >
                            logout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="text-white bg-violet-500 transition duration-700 ease-in-out transform hover:scale-105 focus:ring-1 focus:ring-primary-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Get started
                </Link>
              )}
            </div>

            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/demande"
                    className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-white"
                  >
                    Demande
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
      </>
      } 
        
      </nav>
    </header>
  );
}

export default Header;
