

// export default UserProfileManager;
import React, { useState, useEffect } from "react";
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle,
  Settings,
  Shield,
  UserCircle,
} from "lucide-react";
import axios from "axios";

const UserProfileManager = () => {
  // États
  const [profil, setProfil] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    roles: [],
    departement: null,
    createdAt: "",
    lastLogin: "",
  });
  const [formProfil, setFormProfil] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formMdp, setFormMdp] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formReset, setFormReset] = useState({ email: "" });
  const [ongletActif, setOngletActif] = useState("profil");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Chargement du profil
  useEffect(() => {
    chargerProfil();
  }, []);

  const api = async (endpoint, options = {}) => {
    const token = localStorage.getItem("accessToken");
    const resp = await fetch(`/api/auth${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    });
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.message || "Erreur inconnue");
    }
    return resp.json();
  };

  const chargerProfil = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/users/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      //   console.log("profile data",response);
      if (data.success) {
        setProfil(data.user);
        setFormProfil({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          email: data.user.email || "",
        });
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (e) {
      setMessage({ type: "error", text: e.message });
    } finally {
      setLoading(false);
    }
  };

  //  Mise à jour du profil
  const majProfil = async () => {
    if (!formProfil.firstName || !formProfil.lastName || !formProfil.email) {
      setMessage({ type: "error", text: "Tous les champs sont requis." });
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2000);
      return;
    }
    try {
      console.log("formProfil", formProfil);
      setLoading(true);
      setMessage({ type: "", text: "" });
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/api/users/profile`,
        {
          firstName: formProfil.firstName,
          lastName: formProfil.lastName,
          email: formProfil.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;
      console.log("modify profile", data);

      if (data.success) {
        setProfil(data.user);
        setMessage({
          type: "success",
          text: data.message || "Profil mis à jour !",
        });
      }
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2000);
    } catch (e) {
      setMessage({ type: "error", text: e.message });
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  //  Changement de mot de passe
  const changemdp = async () => {
    if (formMdp.newPassword !== formMdp.confirmPassword) {
      setMessage({
        type: "error",
        text: "Les mots de passe ne correspondent pas.",
      });
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2000);
      return;
    }
    if (formMdp.newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "Le nouveau mot de passe doit comporter au moins 8 caractères.",
      });
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2000);
      return;
    }
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/api/users/change-password`,
        {
          currentPassword: formMdp.currentPassword,
          newPassword: formMdp.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        setFormMdp({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setMessage({ type: "success", text: "Mot de passe changé !" });
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 2000);
      } else {
        setMessage({ type: "error", text: data.message });
      }
      console.log("response change password", response);
    } catch (e) {
      setMessage({ type: "error", text: e.message });
    } finally {
      setLoading(false);
    }
  };

  //  Réinitialisation du mot de passe
  // const resetMdp = async () => {
  //   if (!formReset.email) {
  //     setMessage({ type: "error", text: "Merci d’indiquer un email." });
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     setMessage({ type: "", text: "" });
  //     const res = await api("/reset-password", {
  //       method: "POST",
  //       body: JSON.stringify({ email: formReset.email }),
  //     });
  //     if (res.success) {
  //       setFormReset({ email: "" });
  //       setMessage({
  //         type: "success",
  //         text: "Email de réinitialisation envoyé !",
  //       });
  //     }
  //   } catch (e) {
  //     setMessage({ type: "error", text: e.message });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const resetMdp = async () => {
  if (!formReset.email) { setMessage({ type: "error", text: "Merci d’indiquer un email." }); return; }
  try {
    setLoading(true);
    setMessage({ type: "", text: "" });
    // Appel à /api/auth/forgot-password (ton backend)
    const resp = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/auth/forgot-password`, { email: formReset.email });
    setFormReset({ email: "" });
    setMessage({ type: "success", text: resp.data.message || "Email de réinitialisation envoyé !" });
  } catch (err) {
    setMessage({ type: "error", text: err.response?.data?.message || err.message });
  } finally {
    setLoading(false);
  }
};


  const formatDate = (ds) => {
    if (!ds) return "Jamais";
    return new Date(ds).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const initials = (fn, ln) => {
    return `${fn?.charAt(0) || ""}${ln?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* 🧭 En‑tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full text-white text-2xl font-bold mb-4 shadow-lg">
            {profil.firstName && profil.lastName ? (
              initials(profil.firstName, profil.lastName)
            ) : (
              <UserCircle className="w-10 h-10" />
            )}
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Réglages du compte
          </h1>
          <p className="text-gray-600 text-lg">
            Gérez vos informations personnelles et la sécurité
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-8 p-4 rounded-xl shadow-lg ${
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 🧷 Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <nav className="space-y-2">
                {[
                  {
                    id: "profil",
                    label: "Profil",
                    icon: User,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    id: "password",
                    label: "Sécurité",
                    icon: Lock,
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    id: "reset",
                    label: "Réinit. mot de passe",
                    icon: Mail,
                    color: "from-orange-500 to-red-500",
                  },
                ].map(({ id, label, icon: Icon, color }) => (
                  <button
                    key={id}
                    onClick={() => setOngletActif(id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      ongletActif === id
                        ? `bg-gradient-to-r ${color} text-white shadow-lg transform scale-105`
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* 📋 Contenu */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* -- Onglet Profil -- */}
              {ongletActif === "profil" && (
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Informations personnelles
                      </h2>
                      <p className="text-gray-600">
                        Mettez à jour votre profil
                      </p>
                    </div>
                  </div>

                  {/* Vue générale */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">
                      Aperçu du compte
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        ["Nom d’user", profil.lastName],
                        ["email", profil.email],
                        ["Membre depuis", formatDate(profil.createdAt)],
                        ["Dernière connexion", formatDate(profil.lastLogin)],
                      ].map(([label, value], i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center space-x-3 "
                        >
                          <div className="flex items-center gap-2 self-start">
                            <div
                              className={`w-2 h-2 rounded-full   ${
                                i % 4 === 0
                                  ? "bg-blue-500"
                                  : i % 4 === 1
                                  ? "bg-green-500"
                                  : i % 4 === 2
                                  ? "bg-purple-500"
                                  : "bg-orange-500"
                              }`}
                            ></div>
                            <div>
                              <span className="text-sm font-medium text-gray-500 self-start left-0">
                                {label}{" "}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-900 font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formulaire */}
                  <div className="space-y-6 ">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Vos infos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {["firstName", "lastName"].map((field, idx) => (
                        <div key={field} className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700 mb-2 self-start">
                            {field === "firstName" ? "Prénom" : "Nom"}
                          </label>
                          <input
                            type="text"
                            value={formProfil[field]}
                            onChange={(e) =>
                              setFormProfil((prev) => ({
                                ...prev,
                                [field]: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder={
                              field === "firstName"
                                ? "Votre prénom"
                                : "Votre nom"
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-700 mb-2 self-start">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formProfil.email}
                        onChange={(e) =>
                          setFormProfil((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 focus:bg-white"
                        placeholder="Votre adresse email"
                      />
                    </div>
                    <button
                      onClick={majProfil}
                      disabled={loading}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 disabled:from-gray-400 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all hover:scale-105"
                    >
                      <Save className="w-5 h-5" />
                      <span>{loading ? "En cours..." : "Mettre à jour"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* -- Onglet Sécurité -- */}
              {ongletActif === "password" && (
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Sécurité du compte
                      </h2>
                      <p className="text-gray-600">
                        Changez votre mot de passe
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {[
                      {
                        label: "Mot de passe actuel",
                        name: "currentPassword",
                        value: formMdp.currentPassword,
                        show: showCurrent,
                        toggle: () => setShowCurrent(!showCurrent),
                      },
                      {
                        label: "Nouveau mot de passe",
                        name: "newPassword",
                        value: formMdp.newPassword,
                        show: showNew,
                        toggle: () => setShowNew(!showNew),
                        note: true,
                      },
                    ].map((f, i) => (
                      <div key={i} className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-2 self-start">
                          {f.label}
                        </label>
                        <div className="relative">
                          <input
                            type={f.show ? "text" : "password"}
                            value={f.value}
                            onChange={(e) =>
                              setFormMdp((prev) => ({
                                ...prev,
                                [f.name]: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder={`Entrez ${f.label.toLowerCase()}`}
                          />
                          <button
                            type="button"
                            onClick={f.toggle}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {f.show ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {f.note && (
                          <p className="mt-2 text-sm text-gray-500 flex items-center space-x-1">
                            <Settings className="w-4 h-4" />
                            <span>Minimum 8 caractères</span>
                          </p>
                        )}
                      </div>
                    ))}
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-700 mb-2 self-start">
                        Confirmer mot de passe
                      </label>
                      <input
                        type="password"
                        value={formMdp.confirmPassword}
                        onChange={(e) =>
                          setFormMdp((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-gray-50 focus:bg-white"
                        placeholder="Confirmez le nouveau mdp"
                      />
                    </div>
                    <button
                      onClick={changemdp}
                      disabled={loading}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 disabled:from-gray-400 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all hover:scale-105"
                    >
                      <Lock className="w-5 h-5" />
                      <span>{loading ? "En cours..." : "Changer le mdp"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* -- Onglet Réinit mot de passe -- */}
              {ongletActif === "reset" && (
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Récupération mot de passe
                      </h2>
                      <p className="text-gray-600">
                        Envoyez un mail de réinitialisation
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 mb-6">
                    <p className="text-orange-800 text-sm leading-relaxed">
                      <strong>Instructions :</strong> Entre l'adresse email pour
                      recevoir un lien sécurisé.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formReset.email}
                        onChange={(e) =>
                          setFormReset({ email: e.target.value })
                        }
                        placeholder="Adresse pour le reset"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-gray-50 focus:bg-white"
                      />
                    </div>
                    <button
                      onClick={resetMdp}
                      disabled={loading}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 disabled:from-gray-400 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all hover:scale-105"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{loading ? "En cours..." : "Envoyer email"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileManager;
