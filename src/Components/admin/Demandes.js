import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import axios from "axios";

export default function Demandes() {
  const [demandes, setDemandes] = useState([]);
  const [errorBack, setErrorBack] = useState("");
  const [successBack, setSuccessBack] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All");
  const [expandedRow, setExpandedRow] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const statusOptions = [
    { value: "", label: "toute" },
    { value: "EN_ATTENTE", label: "EN_ATTENTE" },
    { value: "APPROUVEE", label: "APPROUVEE" },
    { value: "REJETEE", label: "REJETEE" },
    // { value: "Rejected", label: "Rejected" },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
    console.log("serch text", searchText);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const changeStatus = async (item, newStatus) => {
    try {
      setStatus(newStatus);
      const responce = await fetch(
        `http://localhost:8000/api/update_demande_status/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );
      if (!responce.ok) {
        setErrorBack(
          "error lors de changement de status veuillez le refaire apres "
        );
        return;
      }
      setSuccessBack("le status est change ave succes");
      getDemandes();
    } catch (e) {
      console.error("error chnage status : ", e);
    }
  };
  const toggleRow = (item) => {
    setExpandedRow((prev) => (prev === item.id ? null : item.id));
    setStatus(item.status);
  };

  const handleSelect = (value) => {
    setSelected(value);
    // getDemandes(value); // Call parent filter logic
    setIsOpen(false);
    // getDemandesest();
  };
  const getDemandes = async (selected = "All") => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/get_demandes?status=${selected}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      console.log("data", data);
      if (!response.ok) {
        setErrorBack("No data found or error lors de recuperation des donnees");
      }

      setDemandes(data.demandes);
    } catch (error) {
      console.error("error", error);
    }
  };
  // useEffect(() => {
  //   getDemandes();
  // }, []);

  const getDemandesest = async () => {
    try {
      const params = {
        page: currentPage,
      };
      if (selected) params.status = selected;
      if (searchText.trim()) params.search = searchText.trim();
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/demandes/all-demandes`,
        {
          params: params,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log( "response",response);
      setDemandes(response.data.demandes);
      setTotalPage(response.data.pagination.totalPages);
      setTotal(response.data.pagination.total);
      console.log( "response.data.demandes",response.data.demandes);
    } catch (error) {
      console.error("error demades ", error);
      setErrorBack("failed to fetch demandes ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDemandesest();
  }, [selected, searchText, currentPage]);
  return (
    <div className="p-4 min-h-[90vh] flex flex-col content  ">
      <div className="mt-20 text-lg font-bold self-center mb-8">
        Demnades D'acces
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16 ">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 ">
          <div className="  inline-block text-left">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              {selected ==="" ? "toute" : selected}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute -left-12 ml-16 z-20 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                <div className="py-1 ">
                  {statusOptions.map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => handleSelect(option.value)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 w-full text-left"
                      >
                        {option.label}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
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
        {errorBack || demandes.length === 0 ? (
          <>
            <div className="flex justify-center">
              <img src="/noData.png" />
            </div>
          </>
        ) : (
          <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nom/Prenom
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Direction
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Directeur Bu
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SpocData
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SpocDt
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    InterneExterne
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Environnement
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Schema
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Finalite access
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Details usage
                  </th> */}
                  {/* <th scope="col" className="px-6 py-3">
                    Duree acces
                  </th> */}
                  {/* <th scope="col" className="px-6 py-3">
                    Extraction
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Demandeur
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bussiness owner
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {demandes.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      {/* <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.firstname}
                    </th> */}

                      <td className="px-6 py-4">
                        {item.lastName} {item.firstName}
                      </td>
                      <td className="px-6 py-4">{item.direction}</td>
                      <td className="px-6 py-4">{item.directionBu}</td>
                      <td className="px-6 py-4">{item.spocData}</td>
                      <td className="px-6 py-4">{item.spocDt}</td>
                      {/* <td className="px-6 py-4">{item.interneExterne}</td> */}
                      <td className="px-6 py-4">{item.environnement}</td>
                      <td className="px-6 py-4">
                        {/* {item.schema} */}
                        <div className="flex flex-row gap-2 ">
                          {item.schema.map((item) => (
                            <>
                              <spn>{item},</spn>
                            </>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">{item.finaliteAccess}</td>
                      {/* <td className="px-6 py-4">{item.Details_usage}</td> */}
                      {/* <td className="px-6 py-4">{item.Duree_acces}</td> */}
                      {/* <td className="px-6 py-4">{item.extraction}</td> */}
                      <td className="px-6 py-4">{item.demandeur}</td>
                      <td className="px-6 py-4">{item.businessOwner}</td>
                      <td className="px-6 py-4 min-w-32">
                        {new Date(item.createdAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          // timeStyle: "short",
                        })}
                      </td>

                      <td className={`px-6 py-4 font-semibold `}>
                        <span
                          className={`font-semibold py-2 px-3 rounded-lg text-white ${
                            item.status === "Pending"
                              ? "bg-yellow-500 "
                              : item.status === "Accepted"
                              ? "bg-green-500"
                              : item.status === "Rejected"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td
                        className="flex justify-center pt-6  "
                        onClick={() => toggleRow(item)}
                      >
                        {item.id === expandedRow ? (
                          <SlArrowUp />
                        ) : (
                          <SlArrowDown />
                        )}
                      </td>
                    </tr>
                    {expandedRow === item.id && (
                      <tr className="bg-violet-50 border-t border-violet-200">
                        <td colSpan="12" className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700">
                            {/* Présentation du demandeur */}
                            <div>
                              <h4 className="font-semibold text-lg text-violet-800 mb-4">
                                Présentation du demandeur
                              </h4>
                              <p className="my-3">
                                <span className="font-medium">Direction :</span>{" "}
                                {item.direction}
                              </p>
                              <p className="my-3">
                                <span className="font-medium">
                                  Nom/Prenom :
                                </span>{" "}
                                {item.lastName} {item.firstName}
                              </p>
                              <p className="my-3">
                                <span className="font-medium">
                                  Directeur Bu :
                                </span>{" "}
                                {item.directionBu}
                              </p>
                              <p className="my-3">
                                <span className="font-medium">Spoc Data :</span>{" "}
                                {item.spocData}
                              </p>
                              <p className="my-3">
                                <span className="font-medium">Spoc Dt :</span>{" "}
                                {item.spocDt}
                              </p>
                            </div>

                            {/* Détails de la demande d'accès */}
                            <div>
                              <h4 className="font-semibold text-lg text-violet-800 mb-4">
                                Détails de la demande d'accès
                              </h4>
                              <p className="my-3">
                                <span className="font-medium">
                                  Environnement :
                                </span>{" "}
                                {item.environnement}
                              </p>
                              <p className="my-3 flex flex-row gap-1">
                                <span className="font-medium">
                                  SchemaTables / Dashboard :
                                </span>{" "}
                                {/* {item.schema} */}
                                <div className="flex flex-row gap-2 ">
                                  {item.schema.map((item) => (
                                    <>
                                      <spn>{item},</spn>
                                    </>
                                  ))}
                                </div>
                              </p>
                              <p className="my-3">
                                <span className="font-medium">
                                  Finalité de l'accès :
                                </span>{" "}
                                {item.finaliteAccess}
                              </p>
                              <p className="my-3">
                                <span className="font-medium">
                                  Détails d'usage :
                                </span>{" "}
                                {item.detailsUsage}
                              </p>
                              <p className="my-3">
                                <span className="font-medium">
                                  Durée d'accès :
                                </span>{" "}
                                {item.dureeAcces}
                              </p>
                              <p className="my-3">
                                <span className="font-medium">
                                  Extractions ? :
                                </span>{" "}
                                {item.extraction}
                              </p>
                            </div>

                            {/* Avis */}
                            <div>
                              <h4 className="font-semibold text-lg text-violet-800 mb-4">
                                Avis
                              </h4>
                              <p className="my-3">
                                <span className="font-medium">
                                  Business Owner :
                                </span>{" "}
                                {item.businessOwner}
                              </p>
                              <p className="my-3">
                                <span className="font-medium">Demandeur :</span>{" "}
                                {item.demandeur}
                              </p>
                              <p className="my-3">
                                <span className="font-medium">
                                  Statut de la demande :
                                </span>
                                {isEditing ? (
                                  // <select
                                  //   value={status}
                                  //   className={`border p-1 rounded text-white font-semibold   ${status === "Pending" ? "bg-yellow-500" : status === "Accepted" ? "bg-green-500" : status === "Rejected" ? "bg-red-500" : "bg-blue-300" } `}
                                  //   onChange={(e) =>
                                  //     setStatus(e.target.value)
                                  //   }
                                  //   onBlur={()=>setIsEditing(false)}
                                  // >
                                  //   {statusOptions.map((opt) => (
                                  //     <option
                                  //       key={opt.value}
                                  //       value={opt.value}
                                  //     >
                                  //       {opt.label}
                                  //     </option>
                                  //   ))}
                                  // </select>
                                  <select
                                    value={status}
                                    className={`border p-1 rounded-lg text-white font-semibold ${
                                      status === "Pending"
                                        ? "bg-yellow-500"
                                        : status === "Accepted"
                                        ? "bg-green-500"
                                        : status === "Rejected"
                                        ? "bg-red-500"
                                        : "bg-blue-500"
                                    }`}
                                    onChange={(e) => {
                                      const newStatus = e.target.value;
                                      setStatus(newStatus);
                                      changeStatus(item, newStatus);
                                      // If you need to save the status change to a database or parent component
                                      // add the necessary function call here, for example:
                                      // handleStatusChange(newStatus);
                                    }}
                                    onBlur={() => setIsEditing(false)}
                                  >
                                    {statusOptions.map((opt) => (
                                      <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <span
                                    className={`px-6 py-4 font-semibold cursor-pointer ${
                                      item.status === "Pending"
                                        ? "text-yellow-500"
                                        : item.status === "Accepted"
                                        ? "text-green-500"
                                        : status === "Rejected"
                                        ? "text-red-500"
                                        : "text-blue-500"
                                    }`}
                                    onClick={() => setIsEditing(true)}
                                  >
                                    {status}
                                  </span>
                                )}
                              </p>
                              <p>
                                <span className="font-meduim">date :</span>
                                {new Date(item.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    dateStyle: "medium",
                                    // timeStyle: "short",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {demandes.length > 0 ? (currentPage - 1) * 5 + 1 : 0}{" "}
                  to {Math.min(currentPage * 5, total)} of {total} results
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
          </>
        )}
      </div>
    </div>
  );
}
