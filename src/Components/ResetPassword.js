import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Shield,
  KeyRound,
} from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setMessage({
        type: "error",
        text: "Les mots de passe ne correspondent pas",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return;
    }

    if (newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "Le mot de passe doit contenir au moins 8 caractères",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/api/auth/reset-password`,
        { token, newPassword }
      );
      setMessage({
        type: "success",
        text: response.data.message || "Mot de passe réinitialisé avec succès !",
      });
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Erreur lors de la réinitialisation",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Calculer la force du mot de passe
  const calculatePasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength: 33, label: "Faible", color: "bg-red-500" };
    if (strength <= 3) return { strength: 66, label: "Moyen", color: "bg-yellow-500" };
    return { strength: 100, label: "Forte", color: "bg-green-500" };
  };

  const passwordStrength = calculatePasswordStrength(newPassword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 pt-24">
      <div className="max-w-md w-full">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full text-white mb-4 shadow-lg">
            <KeyRound className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Nouveau mot de passe
          </h1>
          <p className="text-gray-600 text-lg">
            Créez un mot de passe sécurisé
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl shadow-lg ${
              message.type === "success"
                ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-l-4 border-green-500"
                : "bg-gradient-to-r from-red-50 to-pink-50 text-red-800 border-l-4 border-red-500"
            }`}
          >
            <div className="flex items-center space-x-3">
              {message.type === "success" ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Réinitialisation
                </h2>
                <p className="text-gray-600">Définissez votre nouveau mot de passe</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nouveau mot de passe */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2 self-start">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-gray-50 focus:bg-white"
                    placeholder="Entrez votre nouveau mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNew ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500 flex items-center space-x-1">
                  <Lock className="w-4 h-4" />
                  <span>Minimum 8 caractères</span>
                </p>
              </div>

              {/* Confirmer mot de passe */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2 self-start">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-gray-50 focus:bg-white"
                    placeholder="Confirmez votre nouveau mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Info de sécurité */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                <p className="text-purple-800 text-sm leading-relaxed">
                  <strong>Conseil :</strong> Utilisez un mot de passe fort avec des lettres, chiffres et caractères spéciaux.
                </p>
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 disabled:from-gray-400 disabled:to-gray-400 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all hover:scale-105 disabled:hover:scale-100"
              >
                <Lock className="w-5 h-5" />
                <span>{loading ? "En cours..." : "Réinitialiser le mot de passe"}</span>
              </button>
            </form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ResetPassword;



