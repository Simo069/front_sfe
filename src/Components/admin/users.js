import React, { useEffect, useState } from "react";
import { User, Mail, Clock, Trash2 } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
const Users = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [errorBack, setErrorBack] = useState("");


  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
    console.log("serch text", searchText);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [users, setUsers] = useState([]);


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
            await getUsers(); // Recharge la liste
          } else {
            Swal.fire("Erreur", response.data.message, "error");
          }
        } catch (error) {
          console.error("Erreur suppression :", error);
          Swal.fire("Erreur", error.response?.data?.message || "Erreur serveur", "error");
        }
      }
    });
  };

  const getUsers = async () => {
    try {
      const params = {
        page: currentPage,
      };
      if (searchText) {
        params.search = searchText.trim();
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/users/all-users`,
        {
          params: params,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.data;
      setUsers(data.users);
      setTotal(data.total);
      setTotalPage(data.totalPages);
      setCurrentPage(data.page);
      console.log("response users ", data);
    } catch (error) {
      console.error("error demades ", error);
      setErrorBack("failed to fetch demandes ");
    }
  };

  useEffect(() => {
    getUsers();
  }, [searchText, currentPage]);

  return (
    <div className="bg-white min-h-screen p-6 content">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des Utilisateurs
        </h1>
        <p className="text-gray-600">
          Visualisation et analyse des utilisateurs de l'entreprise
        </p>
      </div>

      <div className="bg-white mt-12 rounded-xl shadow-lg overflow-hidden border">
        <div className="flex justify-end mx-8 my-4">
          <div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                value={searchText}
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto border shadow-md">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prenom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Demandes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière Connexion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 text-center">
                    <div className="flex items-center">
                      <User size={16} className="mr-2 text-gray-400" />
                      {user.firstName}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 text-center">
                    <div className="flex items-center">
                      <User size={16} className="mr-2 text-gray-400" />
                      {user.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                    <div className="flex items-center">
                      
                      {user.email}
                    </div>
                  </td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-800 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100">
                      {user.demandesCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-gray-400" />
                      {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {users.length > 0 ? (currentPage - 1) * 10 + 1 : 0} to{" "}
                {Math.min(currentPage * 5, total)} of {total} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 border rounded-md text-sm font-semibold ${
                        currentPage === page
                          ? "bg-violet-500 text-white border-violbg-violet-500"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
