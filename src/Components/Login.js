


import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorBack, setErrorBack] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Email est obligatoire";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.username)) {
      newErrors.username = "Format d'email invalide";
    }

    if (!formData.password) {
      newErrors.password = "Mot de passe est obligatoire";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const result = await login(formData.username, formData.password);
      
      if (!result.success) {
        setErrorBack(result.message);
        setTimeout(() => setErrorBack(""), 4000);
        return;
      }

      const roles = result.roles || [];
      setSuccess(result.message || "Connexion réussie!");
      setFormData({ username: "", password: "" });

      setTimeout(() => {
        if (roles.includes("user")) {
          navigate("/");
        } else if (roles.includes("admin")) {
          navigate("/admin-Dashboard");
        } else if (roles.includes("manager")) {
          navigate("/manager-dashboard");
        }
        setSuccess("");
      }, 1500);

    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
      setErrorBack("Une erreur réseau est survenue. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const newErrors = { ...errors };

    if (formData.username && /^\S+@\S+\.\S+$/.test(formData.username) && errors.username) {
      delete newErrors.username;
    }
    if (formData.password && formData.password.length >= 6 && errors.password) {
      delete newErrors.password;
    }

    setErrors(newErrors);
  }, [formData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-violet-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Alert Messages */}
        {errorBack && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-slideDown">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200">Erreur de connexion</p>
                <p className="text-sm text-red-700 dark:text-red-300">{errorBack}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl animate-slideDown">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Connexion réussie</p>
                <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg mb-4">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
              SFE
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Connectez-vous à votre compte</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Adresse email
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm
                    ${errors.username 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 dark:border-gray-600 focus:border-violet-500 focus:ring-violet-500/20'
                    }
                    focus:outline-none focus:ring-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm flex items-center animate-fadeIn">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-300 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm
                    ${errors.password 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 dark:border-gray-600 focus:border-violet-500 focus:ring-violet-500/20'
                    }
                    focus:outline-none focus:ring-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm flex items-center animate-fadeIn">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </button>

            {/* Register Link */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Vous n'avez pas de compte ?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-violet-600 hover:text-purple-600 dark:text-violet-400 dark:hover:text-purple-400 transition-colors duration-200"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 SFE. Tous droits réservés.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Login;