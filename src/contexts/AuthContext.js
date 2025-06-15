// // // src/context/AuthContext.js
// // import { createContext, useState, useEffect } from "react";

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(
// //     !!localStorage.getItem("access_token")
// //   );

// //   const login = (accessToken, refreshToken) => {
// //     localStorage.setItem("access_token", accessToken);
// //     localStorage.setItem("refresh_token", refreshToken);
// //     setIsAuthenticated(true);
// //   };

// //   const logout = () => {
// //     localStorage.removeItem("access_token");
// //     localStorage.removeItem("refresh_token");
// //     setIsAuthenticated(false);
// //   };

// //   useEffect(() => {
// //     const handleStorageChange = () => {
// //       setIsAuthenticated(!!localStorage.getItem("access_token"));
// //     };
// //     window.addEventListener("storage", handleStorageChange);
// //     return () => window.removeEventListener("storage", handleStorageChange);
// //   }, []);

// //   return (
// //     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // context/AuthContext.js
// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));
//   const [role, setRole] = useState(localStorage.getItem("role"));

//   const login = (accessToken, refreshToken, userRole , username) => {
//     localStorage.setItem("access_token", accessToken);
//     localStorage.setItem("refresh_token", refreshToken);
//     localStorage.setItem("role", userRole);
//     localStorage.setItem("username", username);
//     setIsAuthenticated(true);
//     setRole(userRole);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setIsAuthenticated(false);
//     setRole(null);
//   };
  
//   return (
//     <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Configure axios interceptor
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Verify token on app load
  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/auth/verify');
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password
      });

      if (response.data.success) {
        const { user, tokens } = response.data;
        setUser(user);
        setToken(tokens.access_token);
        localStorage.setItem('token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
        return { success: true,  roles : user.roles };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', userData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };
  const hasRole = (role) => {
    return user?.roles?.includes(role) || false;
  };

  const hasAnyRole = (roles) => {
    if (!Array.isArray(roles)) return false;
    return roles.some((role) => user?.roles?.includes(role));
  };

  const isAdmin = () => hasRole("admin");
  const isManager = () => hasRole("manager");
  const isUser = () => hasRole("user");

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  // const value = {
  //   user,
  //   login,
  //   register,
  //   logout,
  //   loading,
  //   isAuthenticated: !!user
  // };
  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    hasRole,
    hasAnyRole,
    isAdmin,
    isManager,
    isUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};