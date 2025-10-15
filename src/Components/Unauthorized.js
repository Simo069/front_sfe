import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  const isAdmin = localStorage.getItem("role") === "true";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Unauthorized Access
        </h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 transition"
          >
            Go to Login
          </Link>
          {isAdmin ? (
            <>
              <Link
                to="/admin-dashboard"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                dashboard Admin
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Home
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
