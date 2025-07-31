import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import axios from "axios";
import {
  FileText,
  CheckSquare,
  Clock,
  Users,
  Edit,
  Trash2,
  X,
  Plus,
  Check,
} from "lucide-react";

const Departements = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [errorBack, setErrorBack] = useState("");
  const [successBack, setSuccessBack] = useState("");
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

 

  const [departments, setDepartments] = useState([]);

  const filteredData = departments;

  
  //   const totalManagers = departements.length;
  const totalManagers = 0;
  //   const averageEmployees = Math.round(totalEmployees / departments.length);

  const averageEmployees = 0;
  const totalEmployees = 0;

  const getDepartements = async () => {
   
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/departement/get-departements`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.data;
      console.log("data", data);
      setDepartments(data.departements);
    } catch (error) {
      setErrorBack(Response.message || "Veuillez ressayez plus tard");
    }
  };

  useEffect(() => {
    getDepartements();
  }, []);

  // Fonctions pour l'édition dans les champs du tableau meme
  const handleStartEdit = (department) => {
    setEditingId(department.id);
    setEditFormData({
      nom: department.nom,
      description: department.description,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleSaveEdit = async () => {
    if (!editFormData.nom && !editFormData.description) {
      setErrorBack("Veuillez remplir au moins une champ");
      setTimeout(() => {
        setErrorBack("");
      }, 2000);
      return;
    }
    console.log("editforndata", editFormData);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/api/departement/departements/${editingId}`,
        {
          nom: editFormData.nom,
          description: editFormData.description,
        }
      );
      if (response.data.success) {
        await getDepartements();
        setEditingId(null);
        setEditFormData({});
        setSuccessBack(response.data.message);
      } else {
        setErrorBack(response.data.message || "Erreur lors de la mise à jour");
      }

      setEditingId(null);
      setEditFormData({});
      setTimeout(() => {
        setSuccessBack("");
        setErrorBack("");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      setErrorBack("Erreur serveur");
    }
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenModal = () => {
    setFormData({
      name: "",
      manager: "",
      employees: "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      description: "",
    });
    getDepartements();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      setErrorBack("Le nom de departement est obligatoire !!");
      setShowModal(false);
      setTimeout(() => {
        setErrorBack("");
      }, 2000);
      return;
    }

    try {
      console.log("formdataADFAS", formData);
      const responce = await fetch(
        `${process.env.REACT_APP_BACK_URL}/api/departement/add-departement`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await responce.json();
      console.log("responce", responce);
      console.log("data", data);
      setShowModal(false);
      if (data.success) {
        setSuccessBack(data.message);
        setTimeout(() => {
          setSuccessBack("");
        }, 2000);
        await getDepartements();
      } else if (!data.success) {
        setErrorBack(data.message);
        setTimeout(() => {
          setErrorBack("");
        }, 2000);
      }
    } catch (error) {
      setErrorBack(error);
      setTimeout(() => {
        setErrorBack("");
      }, 2000);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible.",
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
            `${process.env.REACT_APP_BACK_URL}/api/departement/delete-departements/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.data.success) {
            Swal.fire(
              "Supprimé !",
              "Le département a été supprimé.",
              "success"
            );
            await getDepartements();
          } else {
            Swal.fire(
              "Erreur",
              response.data.message || "Erreur de suppression",
              "error"
            );
          }
        } catch (error) {
          console.error("Erreur suppression:", error);
          Swal.fire(
            "Erreur serveur",
            "Impossible de supprimer le département",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="bg-white min-h-screen p-6 content ">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des Départements
        </h1>
        <p className="text-gray-600">
          Visualisation et gestion des départements de l'entreprise
        </p>
      </div>

      
      {errorBack && (
        <>
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorBack}
          </div>
        </>
      )}
      {successBack && (
        <>
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 "
            role="alert"
          >
            {successBack}
          </div>
        </>
      )}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Liste des Départements
          </h3>
          <button
            onClick={handleOpenModal}
            className="bg-violet-500 hover:bg-violet-500 hover:scale-105 transform duration-75 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Ajouter Département
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom du Département
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manager
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date de création
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {departments.map((dept) => (
                <tr
                  key={dept.id}
                  className={`${
                    editingId === dept.id ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {editingId === dept.id ? (
                      <input
                        type="text"
                        value={editFormData.nom || ""}
                        onChange={(e) =>
                          handleEditInputChange("nom", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nom du département"
                      />
                    ) : (
                      dept.nom
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {editingId === dept.id ? (
                      <input
                        type="text"
                        value={editFormData.description || ""}
                        onChange={(e) =>
                          handleEditInputChange("description", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nom du manager"
                      />
                    ) : (
                      dept.description
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {dept.manager ? dept.manager : "null"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {dept.createdAt}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex justify-center space-x-2">
                      {editingId === dept.id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50 transition-colors"
                            title="Sauvegarder"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50 transition-colors"
                            title="Annuler"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStartEdit(dept)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                            title="Modifier"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(dept.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal pour ajouter un département */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 text-center">
                Ajouter un département
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            x
            <div className="space-y-4 mt-12">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1 self-start">
                  Nom du département
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Ex: Ressources Humaines"
                />
              </div>

              <div className="flex flex-col ">
                <label className="block text-sm font-medium text-gray-700 mb-1 self-start">
                  description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Ex: Ahmed Benali"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
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

export default Departements;
