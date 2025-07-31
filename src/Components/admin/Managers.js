import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Users,
  User,
  Phone,
  Mail,
  Edit,
  Trash2,
  X,
  Plus,
  Check,
  Building,
  AlertCircle,
} from "lucide-react";

const Managers = () => {
  const [errorBack, setErrorBack] = useState("");
  const [successBack, setSuccessBack] = useState("");
  const [departements, setDepartements] = useState([]);
  const [selected, setSelected] = useState("");
  const [managers, setManagers] = useState([]);
  const [errors, setErrors] = useState({});

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
      setDepartements(data.departements);
    } catch (error) {
      console.error(error);
      setErrorBack(Response.message || "Veuillez ressayez plus tard");
      setTimeout(() => {
        setErrorBack("");
      }, 2000);
    }
  };

  const getManagers = async () => {
    try {
      const params = {
        departementId: selected,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/users/managers`,

        {
          params: {
            departementId: selected,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      console.log("data manager", data);
      setManagers(data.managers);
    } catch (error) {
      console.error(error);
      setErrorBack(Response.message || "Veuillez ressayez plus tard");
      setTimeout(() => {
        setErrorBack("");
      }, 2000);
    }
  };
  useEffect(() => {
    getDepartements();
    getManagers();
    console.log(selected);
  }, [selected]);
  const [filters, setFilters] = useState({
    department: "Tous",
    status: "Tous",
  });

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    departemetId: "",
    orders: [],
  });

  const filteredData = managers.filter((manager) => {
    return (
      filters.department === "Tous" || manager.department === filters.department
    );
  });

  // Calculs pour les statistiques
  const totalManagers = managers.length;
  const averageExperience = Math.round(
    managers.reduce((sum, manager) => sum + parseInt(manager.experience), 0) /
      managers.length
  );
  const departmentsWithManagers = [
    ...new Set(managers.map((m) => m.department)),
  ].length;

  // Fonctions pour l'édition inline
  const handleStartEdit = (manager) => {
    setEditingId(manager.id);
    setEditFormData({
      department: manager.departement.id,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleSaveEdit = async () => {
    if (!editFormData.department) {
      setErrorBack("Veuillez choisir un département");
      setTimeout(() => setErrorBack(""), 2000);
      return;
    }

    Swal.fire({
      title: "Êtes-vous sûr de vouloir changer le département ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, modifier",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACK_URL}/api/users/managers/${editingId}/departement`,
          { departementId: editFormData.department },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) { 
          Swal.fire(
            "Modifié !",
            "Le département a été modifié avec succès.",
            "success"
          );
          await getManagers();
        } else {
          Swal.fire(
            "Erreur",
            response.data.message || "Erreur de modification",
            "error"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la modification :",
          error.response?.data || error.message
        );
        Swal.fire(
          "Erreur",
          error.response?.data?.message ||
            "Erreur inattendue lors de la modification",
          "error"
        );
      }

      setEditingId(null);
      setEditFormData({});
    });
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
      email: "",
      phone: "",
      department: "",
      experience: "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      experience: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "Le prénom est obligatoire";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Le nom est obligatoire";
    }
    if (!formData.email) {
      newErrors.email = "L'email est obligatoire";
    }
    if (!formData.departemetId) {
      newErrors.departemetId = "departemet est obligatoire";
    }
    if (!formData.orders) {
      newErrors.orders = "departemet est obligatoire";
    }
    if (!formData.password) {
      newErrors.password = "mot de passe est obligatoire";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    // console.log("formdata managers", formData);
    // return;
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.departemetId ||
      !formData.password ||
      !formData.orders
    ) {
      setErrorBack("Veuillez remplir tous les champs");
      setTimeout(() => {
        setErrorBack("");
      }, 2000);
      return;
    }
    setShowModal(!showModal);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/api/users/add-manager`,
        {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          departemetId: formData.departemetId,
          orders : formData.orders
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setSuccessBack(response.data.message);
        setTimeout(() => {
          setSuccessBack("");
        }, 2000);
      } else {
        setErrorBack(
          response.data.message || "Veuillez ressayez plus tard svp !!"
        );
        setTimeout(() => {
          setErrorBack("");
        }, 2000);
      }
    } catch (error) {
      setShowModal(!showModal);
      console.error("Erreur création manager:", error);
      const errorMessage =
        error.response?.data?.message || "Erreur lors de la création";
      setErrorBack(errorMessage);
      setTimeout(() => {
        setErrorBack("");
      }, 2000);
    }
  };

  useEffect(() => {
    const newErrors = { ...errors };
    if (formData.firstName && errors.firstName) {
      delete newErrors.firstName;
    }
    if (formData.lastName && errors.lastName) {
      delete newErrors.lastName;
    }
    if (formData.email && errors.email) {
      delete newErrors.email;
    }
    if (formData.password && errors.password) {
      delete newErrors.password;
    }
    if (formData.departemetId && errors.departemetId) {
      delete newErrors.departemetId;
    }
    if (formData.orders && errors.orders) {
      delete newErrors.orders;
    }
    setErrors(newErrors);
  }, [formData]);

  const handleDelete = (managerId) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action supprimera définitivement le manager.",
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
            `${process.env.REACT_APP_BACK_URL}/api/users/delete-user/${managerId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.data.success) {
            Swal.fire("Supprimé !", response.data.message, "success");
            await getManagers(); // Recharge la liste
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

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };
  return (
    <div className="bg-gray-100 min-h-screen p-6 content">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des Managers
        </h1>
        <p className="text-gray-600">
          Visualisation et gestion des managers de l'entreprise
        </p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="bg-blue-100 p-4 rounded-full mr-6">
            <Users size={28} className="text-blue-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total des managers</p>
            <p className="text-3xl font-bold">{totalManagers}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="bg-green-100 p-4 rounded-full mr-6">
            <Building size={28} className="text-green-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Départements couverts</p>
            <p className="text-3xl font-bold">{departmentsWithManagers}</p>
          </div>
        </div>
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
      <div className="bg-white rounded-xl shadow-lg overflow-hidden ">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="w-64">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tous les départements</option>
              {departements.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.nom}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleOpenModal}
            className="bg-violet-500 hover:bg-violet-600  hover:scale-105 transform duration-150 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Ajouter Manager
          </button>
        </div>

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
                  Département
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date de création
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {managers.map((manager) => (
                <tr
                  key={manager.id}
                  className={`${
                    editingId === manager.id ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {manager.firstName}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {manager.lastName}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center justify-center">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      {manager.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {editingId === manager.id ? (
                      <select
                        value={editFormData.department || ""}
                        onChange={(e) =>
                          handleEditInputChange("department", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-violet-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="">Sélectionner...</option>
                        {departements.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.nom}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-800">
                        {manager?.departement?.nom}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {manager.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      {editingId === manager.id ? (
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
                            onClick={() => handleStartEdit(manager)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                            title="Modifier"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(manager.id)}
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

      {/* Modal pour ajouter un manager */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Ajouter un manager
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="block text-sm  text-gray-700 mb-1 self-start font-semibold">
                  prenom
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder=""
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs flex items-center animate-slideDown mt-2">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="block text-sm  text-gray-700 mb-1 self-start font-semibold">
                  nom
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder=""
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs flex items-center animate-slideDown mt-2">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.lastName}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1 self-start font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder=""
                />
                {errors.email && (
                  <p className="text-red-500 text-xs flex items-center animate-slideDown mt-2">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="block text-sm self-start font-semibold text-gray-700 mb-1">
                  Département
                </label>
                <select
                  name="departemetId"
                  value={formData.departemetId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                >
                  <option value="">Sélectionner un département</option>
                  {departements.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.nom}
                    </option>
                  ))}
                </select>
                {errors.departemetId && (
                  <p className="text-red-500 text-xs flex items-center animate-slideDown mt-2">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.departemetId}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="block text-sm self-start font-semibold text-gray-700 mb-1">
                  Ordre
                </label>
                <div className="flex flex-col gap-2 pl-2">
                  {[1, 2, 3, 4].map((order) => (
                    <label
                      key={order}
                      className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={(formData.orders || []).includes(order)}
                          onChange={() => {
                            const currentOrders = formData.orders || [];
                            const newOrders = currentOrders.includes(order)
                              ? currentOrders.filter((o) => o !== order)
                              : [...currentOrders, order];
                            setFormData({ ...formData, orders: newOrders });
                          }}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center ${
                            (formData.orders || []).includes(order)
                              ? "bg-violet-500 border-violet-500"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {(formData.orders || []).includes(order) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      Ordre {order}
                    </label>
                  ))}
                  {errors.orders && (
                  <p className="text-red-500 text-xs flex items-center animate-slideDown mt-2">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.orders}
                  </p>
                )}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm self-start font-semibold text-gray-700 mb-1">
                  mot de passe
                </label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder=""
                />
                {errors.password && (
                  <p className="text-red-500 text-xs flex items-center animate-slideDown">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.password}
                  </p>
                )}
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

export default Managers;
