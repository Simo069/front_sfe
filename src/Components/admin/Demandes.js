// import React from "react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { SlArrowDown } from "react-icons/sl";
// import { SlArrowUp } from "react-icons/sl";
// import axios from "axios";

// export default function Demandes() {
//   const [demandes, setDemandes] = useState([]);
//   const [errorBack, setErrorBack] = useState("");
//   const [successBack, setSuccessBack] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState("");
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [status, setStatus] = useState("");
//   const [searchText, setSearchText] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [totalPages, setTotalPage] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const statusOptions = [
//     { value: "", label: "toute" },
//     { value: "EN_ATTENTE", label: "EN_ATTENTE" },
//     { value: "APPROUVEE", label: "APPROUVEE" },
//     { value: "REJETEE", label: "REJETEE" },
//     // { value: "Rejected", label: "Rejected" },
//   ];
//   console.log(localStorage.getItem("token"))

//   const handleSearch = (e) => {
//     setSearchText(e.target.value);
//     setCurrentPage(1);
//     console.log("serch text", searchText);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const changeStatus = async (item, newStatus) => {
//     try {
//       setStatus(newStatus);
//       const responce = await fetch(
//         `http://localhost:8000/api/update_demande_status/${item.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//           body: JSON.stringify({
//             status: newStatus,
//           }),
//         }
//       );
//       if (!responce.ok) {
//         setErrorBack(
//           "error lors de changement de status veuillez le refaire apres "
//         );
//         return;
//       }
//       setSuccessBack("le status est change ave succes");
//       getDemandes();
//     } catch (e) {
//       console.error("error chnage status : ", e);
//     }
//   };
//   const toggleRow = (item) => {
//     setExpandedRow((prev) => (prev === item.id ? null : item.id));
//     setStatus(item.status);
//   };

//   const handleSelect = (value) => {
//     setSelected(value);
//     // getDemandes(value); // Call parent filter logic
//     setIsOpen(false);
//     // getDemandesest();
//   };
//   const getDemandes = async (selected = "All") => {
//     try {
//       const response = await fetch(
//         `http://localhost:8000/api/get_demandes?status=${selected}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       );
//       const data = await response.json();
//       console.log("data", data);
//       if (!response.ok) {
//         setErrorBack("No data found or error lors de recuperation des donnees");
//       }

//       setDemandes(data.demandes);
//     } catch (error) {
//       console.error("error", error);
//     }
//   };
//   // useEffect(() => {
//   //   getDemandes();
//   // }, []);

//   const getDemandesest = async () => {
//     try {
//       const params = {
//         page: currentPage,
//       };
//       if (selected) params.status = selected;
//       if (searchText.trim()) params.search = searchText.trim();
//       const response = await axios.get(
//         `${process.env.REACT_APP_BACK_URL}/api/demandes/all-demandes`,
//         {
//           params: params,
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       console.log( "response",response);
//       setDemandes(response.data.demandes);
//       setTotalPage(response.data.pagination.totalPages);
//       setTotal(response.data.pagination.total);
//       console.log( "response.data.demandes",response.data.demandes);
//     } catch (error) {
//       console.error("error demades ", error);
//       setErrorBack("failed to fetch demandes ");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getDemandesest();
//   }, [selected, searchText, currentPage]);
//   return (
//     <div className="p-4 min-h-[90vh] flex flex-col content  ">
//       <div className="mt-20 text-lg font-bold self-center mb-8">
//         Demnades D'acces
//       </div>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16 ">
//         <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 ">
//           <div className="  inline-block text-left">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//               type="button"
//             >
//               <svg
//                 className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
//               </svg>
//               {selected ==="" ? "toute" : selected}
//               <svg
//                 className="w-2.5 h-2.5 ms-2.5"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 10 6"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m1 1 4 4 4-4"
//                 />
//               </svg>
//             </button>

//             {isOpen && (
//               <div className="absolute -left-12 ml-16 z-20 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
//                 <div className="py-1 ">
//                   {statusOptions.map(
//                     (option) => (
//                       <button
//                         key={option}
//                         onClick={() => handleSelect(option.value)}
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 w-full text-left"
//                       >
//                         {option.label}
//                       </button>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//           <label htmlFor="table-search" className="sr-only">
//             Search
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
//               <svg
//                 className="w-5 h-5 text-gray-500 dark:text-gray-400"
//                 aria-hidden="true"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <input
//               type="text"
//               id="table-search"
//               value={searchText}
//               className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Search for items"
//               onChange={handleSearch}
//             />
//           </div>
//         </div>
//         {errorBack || demandes.length === 0 ? (
//           <>
//             <div className="flex justify-center">
//               <img src="/noData.png" />
//             </div>
//           </>
//         ) : (
//           <>
//             <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                 <tr>
//                   <th scope="col" className="px-6 py-3">
//                     Nom/Prenom
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Direction
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Directeur Bu
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     SpocData
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     SpocDt
//                   </th>
//                   {/* <th scope="col" className="px-6 py-3">
//                     InterneExterne
//                   </th> */}
//                   <th scope="col" className="px-6 py-3">
//                     Environnement
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Schema
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Finalite access
//                   </th>
//                   {/* <th scope="col" className="px-6 py-3">
//                     Details usage
//                   </th> */}
//                   {/* <th scope="col" className="px-6 py-3">
//                     Duree acces
//                   </th> */}
//                   {/* <th scope="col" className="px-6 py-3">
//                     Extraction
//                   </th> */}
//                   <th scope="col" className="px-6 py-3">
//                     Demandeur
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Bussiness owner
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Date
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Status
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Details
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {demandes.map((item, index) => (
//                   <React.Fragment key={item.id}>
//                     <tr
//                       key={index}
//                       className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
//                     >
//                       {/* <th
//                       scope="row"
//                       className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                     >
//                       {item.firstname}
//                     </th> */}

//                       <td className="px-6 py-4">
//                         {item.lastName} {item.firstName}
//                       </td>
//                       <td className="px-6 py-4">{item.direction}</td>
//                       <td className="px-6 py-4">{item.directionBu}</td>
//                       <td className="px-6 py-4">{item.spocData}</td>
//                       <td className="px-6 py-4">{item.spocDt}</td>
//                       {/* <td className="px-6 py-4">{item.interneExterne}</td> */}
//                       <td className="px-6 py-4">{item.environnement}</td>
//                       <td className="px-6 py-4">
//                         {/* {item.schema} */}
//                         <div className="flex flex-row gap-2 ">
//                           {item.schema.map((item) => (
//                             <>
//                               <spn>{item},</spn>
//                             </>
//                           ))}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">{item.finaliteAccess}</td>
//                       {/* <td className="px-6 py-4">{item.Details_usage}</td> */}
//                       {/* <td className="px-6 py-4">{item.Duree_acces}</td> */}
//                       {/* <td className="px-6 py-4">{item.extraction}</td> */}
//                       <td className="px-6 py-4">{item.demandeur}</td>
//                       <td className="px-6 py-4">{item.businessOwner}</td>
//                       <td className="px-6 py-4 min-w-32">
//                         {new Date(item.createdAt).toLocaleString("en-US", {
//                           dateStyle: "medium",
//                           // timeStyle: "short",
//                         })}
//                       </td>

//                       <td className={`px-6 py-4 font-semibold `}>
//                         <span
//                           className={`font-semibold py-2 px-3 rounded-lg text-white ${
//                             item.status === "EN_ATTENTE"
//                               ? "bg-yellow-500 "
//                               : item.status === "APPROUVEE"
//                               ? "bg-green-500"
//                               : item.status === "REJETEE"
//                               ? "bg-red-500"
//                               : "bg-blue-500"
//                           }`}
//                         >
//                           {item.status}
//                         </span>
//                       </td>
//                       <td
//                         className="flex justify-center pt-6  "
//                         onClick={() => toggleRow(item)}
//                       >
//                         {item.id === expandedRow ? (
//                           <SlArrowUp />
//                         ) : (
//                           <SlArrowDown />
//                         )}
//                       </td>
//                     </tr>
//                     {expandedRow === item.id && (
//                       <tr className="bg-violet-50 border-t border-violet-200">
//                         <td colSpan="12" className="p-6">
//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700">
//                             {/* Présentation du demandeur */}
//                             <div>
//                               <h4 className="font-semibold text-lg text-violet-800 mb-4">
//                                 Présentation du demandeur
//                               </h4>
//                               <p className="my-3">
//                                 <span className="font-medium">Direction :</span>{" "}
//                                 {item.direction}
//                               </p>
//                               <p className="my-3">
//                                 <span className="font-medium">
//                                   Nom/Prenom :
//                                 </span>{" "}
//                                 {item.lastName} {item.firstName}
//                               </p>
//                               <p className="my-3">
//                                 <span className="font-medium">
//                                   Directeur Bu :
//                                 </span>{" "}
//                                 {item.directionBu}
//                               </p>
//                               <p className="my-3">
//                                 <span className="font-medium">Spoc Data :</span>{" "}
//                                 {item.spocData}
//                               </p>
//                               <p className="my-3">
//                                 <span className="font-medium">Spoc Dt :</span>{" "}
//                                 {item.spocDt}
//                               </p>
//                             </div>

//                             {/* Détails de la demande d'accès */}
//                             <div>
//                               <h4 className="font-semibold text-lg text-violet-800 mb-4">
//                                 Détails de la demande d'accès
//                               </h4>
//                               <p className="my-3">
//                                 <span className="font-medium">
//                                   Environnement :
//                                 </span>{" "}
//                                 {item.environnement}
//                               </p>
//                               <p className="my-3 flex flex-row gap-1">
//                                 <span className="font-medium">
//                                   SchemaTables / Dashboard :
//                                 </span>{" "}
//                                 {/* {item.schema} */}
//                                 <div className="flex flex-row gap-2 ">
//                                   {item.schema.map((item) => (
//                                     <>
//                                       <spn>{item},</spn>
//                                     </>
//                                   ))}
//                                 </div>
//                               </p>
//                               <p className="my-3">
//                                 <span className="font-medium">
//                                   Finalité de l'accès :
//                                 </span>{" "}
//                                 {item.finaliteAccess}
//                               </p>
//                               <p className="my-3">
//                                 <span className="font-medium">
//                                   Détails d'usage :
//                                 </span>{" "}
//                                 {item.detailsUsage}
//                               </p>
//                               <p className="my-3">
//                                 <span className="font-medium">
//                                   Durée d'accès :
//                                 </span>{" "}
//                                 {item.dureeAcces}
//                               </p>
//                               <p className="my-3">
//                                 <span className="font-medium">
//                                   Extractions ? :
//                                 </span>{" "}
//                                 {item.extraction}
//                               </p>
//                             </div>

//                             {/* Avis */}
//                             <div>
//                               <h4 className="font-semibold text-lg text-violet-800 mb-4">
//                                 Avis
//                               </h4>
//                               <p className="my-3">
//                                 <span className="font-medium">
//                                   Business Owner :
//                                 </span>{" "}
//                                 {item.businessOwner}
//                               </p>
//                               <p className="my-3">
//                                 <span className="font-medium">Demandeur :</span>{" "}
//                                 {item.demandeur}
//                               </p>
//                               <p className="my-3">
//                                 <span className="font-medium">
//                                   Statut de la demande :
//                                 </span>
//                                 {isEditing ? (
//                                   // <select
//                                   //   value={status}
//                                   //   className={`border p-1 rounded text-white font-semibold   ${status === "Pending" ? "bg-yellow-500" : status === "Accepted" ? "bg-green-500" : status === "Rejected" ? "bg-red-500" : "bg-blue-300" } `}
//                                   //   onChange={(e) =>
//                                   //     setStatus(e.target.value)
//                                   //   }
//                                   //   onBlur={()=>setIsEditing(false)}
//                                   // >
//                                   //   {statusOptions.map((opt) => (
//                                   //     <option
//                                   //       key={opt.value}
//                                   //       value={opt.value}
//                                   //     >
//                                   //       {opt.label}
//                                   //     </option>
//                                   //   ))}
//                                   // </select>
//                                   <select
//                                     value={status}
//                                     className={`border p-1 rounded-lg text-white font-semibold ${
//                                       status === "Pending"
//                                         ? "bg-yellow-500"
//                                         : status === "Accepted"
//                                         ? "bg-green-500"
//                                         : status === "Rejected"
//                                         ? "bg-red-500"
//                                         : "bg-blue-500"
//                                     }`}
//                                     onChange={(e) => {
//                                       const newStatus = e.target.value;
//                                       setStatus(newStatus);
//                                       changeStatus(item, newStatus);
//                                       // If you need to save the status change to a database or parent component
//                                       // add the necessary function call here, for example:
//                                       // handleStatusChange(newStatus);
//                                     }}
//                                     onBlur={() => setIsEditing(false)}
//                                   >
//                                     {statusOptions.map((opt) => (
//                                       <option key={opt.value} value={opt.value}>
//                                         {opt.label}
//                                       </option>
//                                     ))}
//                                   </select>
//                                 ) : (
//                                   <span
//                                     className={`px-6 py-4 font-semibold cursor-pointer ${
//                                       item.status === "Pending"
//                                         ? "text-yellow-500"
//                                         : item.status === "Accepted"
//                                         ? "text-green-500"
//                                         : status === "Rejected"
//                                         ? "text-red-500"
//                                         : "text-blue-500"
//                                     }`}
//                                     onClick={() => setIsEditing(true)}
//                                   >
//                                     {status}
//                                   </span>
//                                 )}
//                               </p>
//                               <p>
//                                 <span className="font-meduim">date :</span>
//                                 {new Date(item.createdAt).toLocaleString(
//                                   "en-US",
//                                   {
//                                     dateStyle: "medium",
//                                     // timeStyle: "short",
//                                   }
//                                 )}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>
//             {/* Pagination */}
//             <div className="px-6 py-4 border-t border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div className="text-sm text-gray-700">
//                   Showing {demandes.length > 0 ? (currentPage - 1) * 10 + 1 : 0}{" "}
//                   to {Math.min(currentPage * 5, total)} of {total} results
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                   >
//                     Previous
//                   </button>
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                     (page) => (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`px-3 py-1 border rounded-md text-sm font-semibold ${
//                           currentPage === page
//                             ? "bg-violet-500 text-white border-violbg-violet-500"
//                             : "border-gray-300 hover:bg-gray-50"
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     )
//                   )}
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
import React from "react";
import {
  User,
  Building,
  FileText,
  MessageSquare,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Paperclip,
  Download,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";



const ExpandedDemandeRow = ({ demande, onDownloadAttachment }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      EN_ATTENTE: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "En Attente",
      },
      APPROUVEE: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Approuvée",
      },
      REJETEE: { bg: "bg-red-100", text: "text-red-800", label: "Rejetée" },
    };

    const config = statusConfig[status] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: status,
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const getValidationIcon = (status) => {
    switch (status) {
      case "APPROUVEE":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "REJETEE":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <tr className="bg-gradient-to-r from-violet-50 to-blue-50 border-t border-violet-200">
      <td colSpan="13" className="p-0">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-violet-200 pb-4">
            <h3 className="text-xl font-bold text-violet-800 flex items-center">
              <FileText className="h-6 w-6 mr-3" />
              Détails de la demande d'accès
            </h3>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">ID:</span>
              <code className="text-xs bg-white px-3 py-1 rounded-full border text-gray-800 font-mono">
                {demande.id?.substring(0, 8)}...
              </code>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Section 1: Informations du demandeur */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Informations du demandeur
              </h4>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    Nom complet
                  </span>
                  <span className="text-gray-900 font-medium">
                    {demande.firstName} {demande.lastName}
                  </span>
                </div>

                {demande.user && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 mb-1">
                      Email
                    </span>
                    <span className="text-gray-900">{demande.user.email}</span>
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    Direction
                  </span>
                  <span className="text-gray-900">{demande.direction}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    Direction BU
                  </span>
                  <span className="text-gray-900">{demande.directionBu}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    Business Owner
                  </span>
                  <span className="text-gray-900">{demande.businessOwner}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    Demandeur
                  </span>
                  <span className="text-gray-900">{demande.demandeur}</span>
                </div>

                {demande.interneExterne && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 mb-1">
                      Type
                    </span>
                    <span
                      className={`inline-flex w-fit px-2 py-1 rounded-full text-xs font-medium ${
                        demande.interneExterne === "Interne"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {demande.interneExterne}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Détails de l'accès */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2 text-green-600" />
                Détails de l'accès demandé
              </h4>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    Environnement
                  </span>
                  <span className="text-gray-900 font-medium">
                    {demande.environnement}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    Schémas demandés
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {demande.schema &&
                      demande.schema.map((schema, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                        >
                          {schema}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    Finalité de l'accès
                  </span>
                  <span className="text-gray-900">
                    {demande.finaliteAccess}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    Extraction autorisée
                  </span>
                  <span
                    className={`inline-flex w-fit px-2 py-1 rounded-full text-xs font-medium ${
                      demande.extraction === "Oui"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {demande.extraction}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    Durée d'accès
                  </span>
                  <span className="text-gray-900">{demande.dureeAcces}</span>
                </div>

                {demande.dateDebut && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 mb-1">
                      Date début
                    </span>
                    <span className="text-gray-900">
                      {new Date(demande.dateDebut).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                )}

                {demande.dateFin && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 mb-1">
                      Date fin
                    </span>
                    <span className="text-gray-900">
                      {new Date(demande.dateFin).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Informations système et statut */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                Informations système
              </h4>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    Statut actuel
                  </span>
                  {getStatusBadge(demande.status)}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    Date de création
                  </span>
                  <span className="text-gray-900">
                    {new Date(demande.createdAt).toLocaleString("fr-FR")}
                  </span>
                </div>

                {demande.updatedAt && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 mb-1">
                      Dernière mise à jour
                    </span>
                    <span className="text-gray-900">
                      {new Date(demande.updatedAt).toLocaleString("fr-FR")}
                    </span>
                  </div>
                )}

                {demande.spocData && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 mb-1">
                      SPOC Data
                    </span>
                    <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                      <span className="text-green-800 text-sm">
                        {demande.spocData}
                      </span>
                    </div>
                  </div>
                )}

                {demande.spocDt && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 mb-1">
                      SPOC DT
                    </span>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                      <span className="text-blue-800 text-sm">
                        {demande.spocDt}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section Justifications */}
          {(demande.detailsUsage || demande.finaliteAccess) && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-indigo-600" />
                Justifications et usage
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {demande.finaliteAccess && (
                  <div>
                    <span className="text-sm font-medium text-gray-500 block mb-2">
                      Finalité de l'accès
                    </span>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {demande.finaliteAccess}
                      </p>
                    </div>
                  </div>
                )}

                {demande.detailsUsage && (
                  <div>
                    <span className="text-sm font-medium text-gray-500 block mb-2">
                      Détails d'usage
                    </span>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {demande.detailsUsage}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section Pièces jointes */}
          {demande.attachmentName && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center">
                <Paperclip className="h-5 w-5 mr-2 text-gray-600" />
                Pièces jointes
              </h4>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-gray-500" />
                  <span className="text-sm text-gray-700 font-medium">
                    {demande.attachmentName}
                  </span>
                </div>
                {demande.attachmentPath && onDownloadAttachment && (
                  <button
                    onClick={() =>
                      onDownloadAttachment({
                        name: demande.attachmentName,
                        path: demande.attachmentPath,
                      })
                    }
                    className="flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Download className="h-4 w-4" />
                    Télécharger
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Section Commentaire de rejet */}
          {demande.commentaireRejet && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                Commentaire de rejet
              </h4>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                <p className="text-red-800 text-sm leading-relaxed">
                  {demande.commentaireRejet}
                </p>
              </div>
            </div>
          )}

          {/* Section Historique des validations */}
          {demande.validations && demande.validations.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-6 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Historique des validations
              </h4>
              <div className="space-y-4">
                {demande.validations.map((validation, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 mr-4 mt-1">
                      {getValidationIcon(validation.status)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Étape {validation.ordre} -{" "}
                            {validation.role || "Validateur"}
                          </p>
                          {validation.validateur && (
                            <p className="text-sm text-gray-600">
                              {validation.validateur.firstName}{" "}
                              {validation.validateur.lastName}
                              {validation.validateur.email && (
                                <span className="text-gray-500 ml-1">
                                  ({validation.validateur.email})
                                </span>
                              )}
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          {validation.dateAction ? (
                            <p className="text-xs text-gray-500">
                              {new Date(validation.dateAction).toLocaleString(
                                "fr-FR"
                              )}
                            </p>
                          ) : (
                            <span className="text-xs text-yellow-600 font-medium">
                              En attente
                            </span>
                          )}
                        </div>
                      </div>

                      {validation.commentaire && (
                        <div className="mt-2 p-3 bg-white rounded border">
                          <p className="text-xs text-gray-700">
                            <span className="font-medium">Commentaire:</span>{" "}
                            {validation.commentaire}
                          </p>
                        </div>
                      )}

                      {!validation.validateur &&
                        validation.status === "EN_ATTENTE" && (
                          <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                            <p className="text-xs text-yellow-700 italic">
                              En attente de validation
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

// Example usage component
const Demandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [errorBack, setErrorBack] = useState("");
  const [successBack, setSuccessBack] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

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

      setDemandes(response.data.demandes);
      setTotalPage(response.data.pagination.totalPages);
      setTotal(response.data.pagination.total);

      console.log("response.data.demandes", response);
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
  const handleSelect = (value) => {
    setSelected(value);
    // getDemandes(value); // Call parent filter logic
    setIsOpen(false);
    // getDemandesest();
  };
  // Example demande data structure
  const examledemandes = {
    id: "12345678-1234-1234-1234-123456789012",
    firstName: "Jean",
    lastName: "Dupont",
    direction: "Direction Informatique",
    directionBu: "BU Digital",
    businessOwner: "Marie Martin",
    demandeur: "Jean Dupont",
    interneExterne: "Interne",
    environnement: "Production",
    schema: ["USER_DATA", "ANALYTICS", "REPORTING"],
    finaliteAccess:
      "Analyse des données clients pour optimiser les campagnes marketing",
    detailsUsage:
      "Consultation des données agrégées pour création de tableaux de bord",
    dureeAcces: "6 mois",
    extraction: "Non",
    dateDebut: "2024-01-15",
    dateFin: "2024-07-15",
    status: "EN_ATTENTE",
    createdAt: "2024-01-10T10:30:00Z",
    updatedAt: "2024-01-12T14:20:00Z",
    spocData: "Validation en cours par l'équipe Data",
    spocDt: "Validation technique approuvée",
    attachmentName: "justification_acces.pdf",
    attachmentPath: "/uploads/justification_acces.pdf",
    user: {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@company.com",
      username: "jdupont",
    },
    validations: [
      {
        ordre: 1,
        role: "Manager",
        status: "APPROUVEE",
        validatedAt: "2024-01-11T09:15:00Z",
        commentaire: "Demande justifiée et conforme aux besoins métier",
        validateur: {
          firstName: "Pierre",
          lastName: "Durand",
          email: "pierre.durand@company.com",
        },
      },
      {
        ordre: 2,
        role: "SPOC Data",
        status: "EN_ATTENTE",
        validatedAt: null,
        commentaire: null,
        validateur: null,
      },
      {
        ordre: 3,
        role: "SPOC DT",
        status: "EN_ATTENTE",
        validatedAt: null,
        commentaire: null,
        validateur: null,
      },
    ],
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleDownloadAttachment = (attachment) => {
    console.log("Downloading:", attachment);
    // Implement download logic here
  };

  const toggleRow = (demandeId) => {
    setExpandedRow((prev) => (prev === demandeId ? null : demandeId));
  };

  return (
    <div className="pt-28 px-8 min-h-[60vh]">
      <div className="shadow-lg rounded-lg overflow-x-auto">
        {/* Titre */}
        <h2 className="text-xl font-bold mb-8">Demandes d'accès</h2>
        {/* Filtres et recherche */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 pb-4">
          {/* Filtre par statut */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              {selected || "Toute"}
              <svg
                className="w-2.5 h-2.5 ml-2.5"
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

            {/* Dropdown des statuts */}
            {isOpen && (
              <div className="absolute z-20 mt-2 w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
                <div className="py-1">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Champ de recherche */}
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              id="table-search"
              value={searchText}
              onChange={handleSearch}
              placeholder="Rechercher une demande"
              className="w-full sm:w-80 p-2 ps-10 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Tableau des demandes */}
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Nom/Prénom</th>
              <th className="px-6 py-3">Direction</th>
              <th className="px-6 py-3">Environnement</th>
              <th className="px-6 py-3">Statut</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <React.Fragment key={demande.id}>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {demande.firstName} {demande.lastName}
                  </td>
                  <td className="px-6 py-4">{demande.direction}</td>
                  <td className="px-6 py-4">{demande.environnement}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`
      px-3 py-1 rounded-full text-xs font-medium
      ${
        demande.status === "REJETEE"
          ? "bg-red-100 text-red-800"
          : demande.status === "APPROUVEE"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      }
    `}
                    >
                      {demande.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(demande.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleRow(demande.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {expandedRow === demande.id ? "Masquer" : "Détails"}
                    </button>
                  </td>
                </tr>

                {expandedRow === demande.id && (
                  <ExpandedDemandeRow
                    demande={demande}
                    onDownloadAttachment={handleDownloadAttachment}
                  />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {demandes.length > 0 ? (currentPage - 1) * 10 + 1 : 0} to{" "}
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
  );
};

export default Demandes;
