import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Users, Mail, Trash2, X, Plus } from "lucide-react";

const DashboardViewers = () => {
  const [dashboardViewers, setDashboardViewers] = useState([]);
  const [errorBack, setErrorBack] = useState("");
  const [successBack, setSuccessBack] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const getDashboardViewers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/users/get-dashboard-viewrs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDashboardViewers(response.data.users);
    } catch (error) {
      console.error("Erreur dashboard viewers :", error);
    }
  };

  useEffect(() => {
    getDashboardViewers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setErrorBack("Veuillez remplir tous les champs");
      setTimeout(() => setErrorBack(""), 2000);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/api/users/add-dashboard-viewer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setSuccessBack(response.data.message || "Ajouté avec succès");
        getDashboardViewers();
        setShowModal(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setTimeout(() => setSuccessBack(""), 2000);
      } else {
        setErrorBack(response.data.message || "Erreur serveur");
        setTimeout(() => setErrorBack(""), 2000);
      }
    } catch (error) {
      setErrorBack(
        error.response?.data?.message || "Erreur lors de la création"
      );
      setTimeout(() => setErrorBack(""), 2000);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action supprimera définitivement ce viewer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${process.env.REACT_APP_BACK_URL}/api/users/delete-user/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.data.success) {
            Swal.fire("Supprimé !", response.data.message, "success");
            await getDashboardViewers();
          } else {
            Swal.fire("Erreur", response.data.message, "error");
          }
        } catch (error) {
          console.error("Erreur suppression :", error);
          Swal.fire(
            "Erreur",
            error.response?.data?.message || "Erreur serveur",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 content">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des Dashboard Viewers
        </h1>
        <p className="text-gray-600">
          Visualisation et gestion des utilisateurs ayant accès au tableau de
          bord
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-end items-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-violet-500 hover:bg-violet-600 hover:scale-105 transform duration-150 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Ajouter Viewer
          </button>
        </div>

        {errorBack && (
          <div className="p-4 text-sm text-red-800 bg-red-100 rounded">
            {errorBack}
          </div>
        )}
        {successBack && (
          <div className="p-4 text-sm text-green-800 bg-green-100 rounded">
            {successBack}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prénom
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  date creation
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {dashboardViewers.map((viewer) => (
                <tr key={viewer.id}>
                  <td className="px-6 py-4">{viewer.firstName}</td>
                  <td className="px-6 py-4">{viewer.lastName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      {viewer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">{viewer.createdAt}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(viewer.id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Ajouter un Dashboard Viewer
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardViewers;
