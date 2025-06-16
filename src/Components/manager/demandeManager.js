// import React, { useState, useEffect } from "react";
// import {
//   CheckCircle,
//   XCircle,
//   Clock,
//   User,
//   Calendar,
//   MessageSquare,
//   AlertTriangle,
//   Eye,
//   Filter,
// } from "lucide-react";
// import axios from "axios";

// export default function DemandeManager() {
//   const [demandes, setDemandes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDemande, setSelectedDemande] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [action, setAction] = useState("");
//   const [commentaire, setCommentaire] = useState("");
//   const [spocData, setSpocData] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Simuler les données des demandes (remplacer par votre API)
//   useEffect(() => {
//     fetchDemandes();
//   }, []);

//   const fetchDemandes = async () => {
//     try {
//       setLoading(true);
//       // Remplacer par votre appel API
//       const mockData = [
//         {
//           id: "1",
//           demandeur: "Jean Dupont",
//           direction: "IT",
//           businessOwner: "Marie Martin",
//           typeAcces: "Lecture",
//           justification:
//             "Besoin d'accès aux données clients pour le projet CRM",
//           dateCreation: "2024-01-15",
//           status: "EN_ATTENTE",
//           validations: [
//             { ordre: 1, status: "EN_ATTENTE", validateur: null },
//             { ordre: 2, status: "EN_ATTENTE", validateur: null },
//           ],
//           user: {
//             firstName: "Jean",
//             lastName: "Dupont",
//             email: "jean.dupont@company.com",
//           },
//         },
//         {
//           id: "2",
//           demandeur: "Sophie Bernard",
//           direction: "Marketing",
//           businessOwner: "Pierre Durand",
//           typeAcces: "Écriture",
//           justification: "Mise à jour des campagnes marketing",
//           dateCreation: "2024-01-14",
//           status: "EN_COURS_VALIDATION",
//           validations: [
//             {
//               ordre: 1,
//               status: "APPROUVEE",
//               validateur: { firstName: "Admin", lastName: "System" },
//             },
//             { ordre: 2, status: "EN_ATTENTE", validateur: null },
//           ],
//           user: {
//             firstName: "Sophie",
//             lastName: "Bernard",
//             email: "sophie.bernard@company.com",
//           },
//         },
//       ];
//       const responce = await axios.get(
//         `${process.env.REACT_APP_BACK_URL}/api/demandes/a-valider`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       const data = await responce.data;
//       console.log("data deamdea a vlider pour une manager", data.demandes);
//       setDemandes(data.demandes);
//     } catch (error) {
//       console.error("Erreur lors du chargement des demandes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const styles = {
//       EN_ATTENTE: "bg-yellow-100 text-yellow-800 border-yellow-200",
//       EN_COURS_VALIDATION: "bg-blue-100 text-blue-800 border-blue-200",
//       APPROUVEE: "bg-green-100 text-green-800 border-green-200",
//       REJETEE: "bg-red-100 text-red-800 border-red-200",
//     };

//     const labels = {
//       EN_ATTENTE: "En attente",
//       EN_COURS_VALIDATION: "En cours",
//       APPROUVEE: "Approuvée",
//       REJETEE: "Rejetée",
//     };

//     return (
//       <span
//         className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
//       >
//         {labels[status]}
//       </span>
//     );
//   };

//   const openValidationModal = (demande, actionType) => {
//     setSelectedDemande(demande);
//     setAction(actionType);
//     setCommentaire("");
//     setSpocData("");
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedDemande(null);
//     setAction("");
//     setCommentaire("");
//     setSpocData("");
//   };

//   const handleValidation = async () => {
//     if (!selectedDemande || !action) return;

//     // Validation des champs obligatoires
//     if (action === "REJETEE" && !commentaire.trim()) {
//       alert("Un commentaire est obligatoire pour rejeter une demande");
//       return;
//     }

//     if (
//       selectedDemande.direction === "IT" &&
//       action === "APPROUVEE" &&
//       !spocData.trim()
//     ) {
//       alert(
//         "Le champ SPOC Data est obligatoire pour les demandes du département IT"
//       );
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const payload = {
//         action,
//         commentaire: commentaire.trim(),
//         spocData: spocData.trim(),
//       };

//       // Remplacer par votre appel API
//       const response = await fetch(
//         `/api/demandes/valider/${selectedDemande.id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Adapter selon votre auth
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await response.json();

//       if (result.success) {
//         alert(result.message);
//         fetchDemandes(); // Recharger les données
//         closeModal();
//       } else {
//         alert(result.message || "Erreur lors de la validation");
//       }
//     } catch (error) {
//       console.error("Erreur:", error);
//       alert("Erreur lors de la validation de la demande");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const filteredDemandes = demandes.filter((demande) => {
//     const matchesStatus =
//       filterStatus === "all" || demande.status === filterStatus;
//     const matchesSearch =
//       searchTerm === "" ||
//       demande.demandeur.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       demande.direction.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       demande.businessOwner.toLowerCase().includes(searchTerm.toLowerCase());

//     return matchesStatus && matchesSearch;
//   });

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen pt-28 p-6 bg-gray-50 ">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">
//               Validation des Demandes d'Accès
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Gérez et validez les demandes d'accès aux données
//             </p>
//           </div>
//           {/* Filtres */}
//           <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <input
//                   type="text"
//                   placeholder="Rechercher par demandeur, direction, business owner..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <Filter className="h-5 w-5 text-gray-500" />
//                 <select
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">Tous les statuts</option>
//                   <option value="EN_ATTENTE">En attente</option>
//                   <option value="EN_COURS_VALIDATION">En cours</option>
//                   <option value="APPROUVEE">Approuvées</option>
//                   <option value="REJETEE">Rejetées</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Liste des demandes */}
//         <div className="space-y-4">
//           {filteredDemandes.length === 0 ? (
//             <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//               <div className="text-gray-500">
//                 <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                 <p>Aucune demande trouvée</p>
//               </div>
//             </div>
//           ) : (
//             filteredDemandes.map((demande) => (
//               <div
//                 key={demande.id}
//                 className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
//               >
//                 <div className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-3">
//                         <h3 className="text-lg font-semibold text-gray-900">
//                           {demande.user.firstName} {demande.user.lastName}
//                         </h3>
//                         {getStatusBadge(demande.status)}
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                         <div className="flex items-center text-sm text-gray-600">
//                           <User className="h-4 w-4 mr-2" />
//                           <span className="font-medium">Direction:</span>
//                           <span className="ml-1">{demande.direction}</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <User className="h-4 w-4 mr-2" />
//                           <span className="font-medium">Business Owner:</span>
//                           <span className="ml-1">{demande.businessOwner}</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <Calendar className="h-4 w-4 mr-2" />
//                           <span className="font-medium">Date:</span>
//                           <span className="ml-1">{demande.createdAt}</span>
//                         </div>
//                       </div>

//                       <div className="text-sm text-gray-600 mb-4">
//                         {
//                             demande.justification && <>
//                             <span className="font-medium">Justification:</span>
//                             <p className="mt-1">{demande.justification}</p>
//                             </>
//                         }

//                       </div>

//                       {/* Progression des validations */}
//                       <div className="flex items-center gap-2 mb-4">
//                         <span className="text-sm font-medium text-gray-700">
//                           Validations:
//                         </span>
//                         {demande.validations.map((validation, index) => (
//                           <div key={index} className="flex items-center">
//                             {validation.status === "APPROUVEE" ? (
//                               <CheckCircle className="h-5 w-5 text-green-500" />
//                             ) : validation.status === "REJETEE" ? (
//                               <XCircle className="h-5 w-5 text-red-500" />
//                             ) : (
//                               <Clock className="h-5 w-5 text-yellow-500" />
//                             )}
//                             <span className="text-xs ml-1 mr-3">
//                               Étape {validation.ordre}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     {demande.status === "EN_ATTENTE" ||
//                     demande.status === "EN_COURS_VALIDATION" ? (
//                       <div className="flex gap-2 ml-4">
//                         <button
//                           onClick={() =>
//                             openValidationModal(demande, "APPROUVEE")
//                           }
//                           className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
//                         >
//                           <CheckCircle className="h-4 w-4" />
//                           Approuver
//                         </button>
//                         <button
//                           onClick={() =>
//                             openValidationModal(demande, "REJETEE")
//                           }
//                           className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
//                         >
//                           <XCircle className="h-4 w-4" />
//                           Rejeter
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="ml-4">
//                         <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium cursor-not-allowed">
//                           <Eye className="h-4 w-4" />
//                           Voir détails
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//         {/* Modal de validation */}
//         {showModal && selectedDemande && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg max-w-md w-full p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 {action === "APPROUVEE" ? (
//                   <CheckCircle className="h-6 w-6 text-green-600" />
//                 ) : (
//                   <XCircle className="h-6 w-6 text-red-600" />
//                 )}
//                 <h3 className="text-lg font-semibold">
//                   {action === "APPROUVEE"
//                     ? "Approuver la demande"
//                     : "Rejeter la demande"}
//                 </h3>
//               </div>

//               <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                 <p className="text-sm text-gray-600">
//                   <strong>Demandeur:</strong> {selectedDemande.user.firstName}{" "}
//                   {selectedDemande.user.lastName}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Direction:</strong> {selectedDemande.direction}
//                 </p>
//               </div>

//               {/* Champ SPOC Data pour les demandes IT */}
//               {selectedDemande.direction === "IT" && action === "APPROUVEE" && (
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     SPOC Data <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Entrez les informations SPOC Data"
//                     value={spocData}
//                     onChange={(e) => setSpocData(e.target.value)}
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Ce champ est obligatoire pour les demandes du département IT
//                   </p>
//                 </div>
//               )}

//               {/* Commentaire */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Commentaire
//                   {action === "REJETEE" && (
//                     <span className="text-red-500">*</span>
//                   )}
//                 </label>
//                 <textarea
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   rows="4"
//                   placeholder={
//                     action === "REJETEE"
//                       ? "Veuillez expliquer la raison du rejet..."
//                       : "Commentaire optionnel..."
//                   }
//                   value={commentaire}
//                   onChange={(e) => setCommentaire(e.target.value)}
//                 />
//                 {action === "REJETEE" && (
//                   <div className="flex items-center mt-2 text-amber-600">
//                     <AlertTriangle className="h-4 w-4 mr-1" />
//                     <p className="text-xs">
//                       Un commentaire est obligatoire pour le rejet
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Actions */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={closeModal}
//                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//                   disabled={isSubmitting}
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   onClick={handleValidation}
//                   disabled={isSubmitting}
//                   className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors ${
//                     action === "APPROUVEE"
//                       ? "bg-green-600 hover:bg-green-700"
//                       : "bg-red-600 hover:bg-red-700"
//                   } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
//                 >
//                   {isSubmitting
//                     ? "Traitement..."
//                     : action === "APPROUVEE"
//                     ? "Approuver"
//                     : "Rejeter"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   CheckCircle,
//   XCircle,
//   Clock,
//   User,
//   Calendar,
//   MessageSquare,
//   AlertTriangle,
//   Eye,
//   Filter,
//   ChevronDown,
//   ChevronUp,
//   Mail,
//   Building,
//   FileText,
//   Paperclip,
//   Download,
// } from "lucide-react";
// import axios from "axios";

// export default function DemandeManager() {
//   const [demandes, setDemandes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDemande, setSelectedDemande] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [action, setAction] = useState("");
//   const [commentaire, setCommentaire] = useState("");
//   const [spocData, setSpocData] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [expandedDemandes, setExpandedDemandes] = useState(new Set());

//   // Simuler les données des demandes (remplacer par votre API)
//   useEffect(() => {
//     fetchDemandes();
//   }, []);

//   const fetchDemandes = async () => {
//     try {
//       setLoading(true);
//       // Remplacer par votre appel API
//       const mockData = [
//         {
//           id: "1",
//           demandeur: "Jean Dupont",
//           direction: "IT",
//           businessOwner: "Marie Martin",
//           typeAcces: "Lecture",
//           justification:
//             "Besoin d'accès aux données clients pour le projet CRM",
//           dateCreation: "2024-01-15",
//           status: "EN_ATTENTE",
//           validations: [
//             { ordre: 1, status: "EN_ATTENTE", validateur: null },
//             { ordre: 2, status: "EN_ATTENTE", validateur: null },
//           ],
//           user: {
//             firstName: "Jean",
//             lastName: "Dupont",
//             email: "jean.dupont@company.com",
//           },
//         },
//         {
//           id: "2",
//           demandeur: "Sophie Bernard",
//           direction: "Marketing",
//           businessOwner: "Pierre Durand",
//           typeAcces: "Écriture",
//           justification: "Mise à jour des campagnes marketing",
//           dateCreation: "2024-01-14",
//           status: "EN_COURS_VALIDATION",
//           validations: [
//             {
//               ordre: 1,
//               status: "APPROUVEE",
//               validateur: { firstName: "Admin", lastName: "System" },
//             },
//             { ordre: 2, status: "EN_ATTENTE", validateur: null },
//           ],
//           user: {
//             firstName: "Sophie",
//             lastName: "Bernard",
//             email: "sophie.bernard@company.com",
//           },
//         },
//       ];
//       const responce = await axios.get(
//         `${process.env.REACT_APP_BACK_URL}/api/demandes/a-valider`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       const data = await responce.data;
//       console.log("data deamdea a vlider pour une manager", data.demandes);
//       setDemandes(data.demandes);
//     } catch (error) {
//       console.error("Erreur lors du chargement des demandes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleExpand = (demandeId) => {
//     const newExpanded = new Set(expandedDemandes);
//     if (newExpanded.has(demandeId)) {
//       newExpanded.delete(demandeId);
//     } else {
//       newExpanded.add(demandeId);
//     }
//     setExpandedDemandes(newExpanded);
//   };

//   const getStatusBadge = (status) => {
//     const styles = {
//       EN_ATTENTE: "bg-yellow-100 text-yellow-800 border-yellow-200",
//       EN_COURS_VALIDATION: "bg-blue-100 text-blue-800 border-blue-200",
//       APPROUVEE: "bg-green-100 text-green-800 border-green-200",
//       REJETEE: "bg-red-100 text-red-800 border-red-200",
//     };

//     const labels = {
//       EN_ATTENTE: "En attente",
//       EN_COURS_VALIDATION: "En cours",
//       APPROUVEE: "Approuvée",
//       REJETEE: "Rejetée",
//     };

//     return (
//       <span
//         className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
//       >
//         {labels[status]}
//       </span>
//     );
//   };

//   const openValidationModal = (demande, actionType) => {
//     setSelectedDemande(demande);
//     setAction(actionType);
//     setCommentaire("");
//     setSpocData("");
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedDemande(null);
//     setAction("");
//     setCommentaire("");
//     setSpocData("");
//   };

//   const handleValidation = async () => {
//     if (!selectedDemande || !action) return;

//     // Validation des champs obligatoires
//     if (action === "REJETEE" && !commentaire.trim()) {
//       alert("Un commentaire est obligatoire pour rejeter une demande");
//       return;
//     }

//     if (
//       selectedDemande.direction === "IT" &&
//       action === "APPROUVEE" &&
//       !spocData.trim()
//     ) {
//       alert(
//         "Le champ SPOC Data est obligatoire pour les demandes du département IT"
//       );
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const payload = {
//         action,
//         commentaire: commentaire.trim(),
//         spocData: spocData.trim(),
//       };

//       // Remplacer par votre appel API
//       const response = await fetch(
//         `/api/demandes/valider/${selectedDemande.id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Adapter selon votre auth
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await response.json();

//       if (result.success) {
//         alert(result.message);
//         fetchDemandes(); // Recharger les données
//         closeModal();
//       } else {
//         alert(result.message || "Erreur lors de la validation");
//       }
//     } catch (error) {
//       console.error("Erreur:", error);
//       alert("Erreur lors de la validation de la demande");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDownloadAttachment = (attachment) => {
//     // Logique pour télécharger la pièce jointe
//     // Remplacer par votre logique de téléchargement
//     console.log("Téléchargement de:", attachment);
//     // window.open(attachment.url, '_blank');
//   };

//   const filteredDemandes = demandes.filter((demande) => {
//     const matchesStatus =
//       filterStatus === "all" || demande.status === filterStatus;
//     const matchesSearch =
//       searchTerm === "" ||
//       demande.demandeur.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       demande.direction.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       demande.businessOwner.toLowerCase().includes(searchTerm.toLowerCase());

//     return matchesStatus && matchesSearch;
//   });

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen pt-28 p-6 bg-gray-50 ">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">
//               Validation des Demandes d'Accès
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Gérez et validez les demandes d'accès aux données
//             </p>
//           </div>
//           {/* Filtres */}
//           <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <input
//                   type="text"
//                   placeholder="Rechercher par demandeur, direction, business owner..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <Filter className="h-5 w-5 text-gray-500" />
//                 <select
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">Tous les statuts</option>
//                   <option value="EN_ATTENTE">En attente</option>
//                   <option value="EN_COURS_VALIDATION">En cours</option>
//                   <option value="APPROUVEE">Approuvées</option>
//                   <option value="REJETEE">Rejetées</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Liste des demandes */}
//         <div className="space-y-4">
//           {filteredDemandes.length === 0 ? (
//             <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//               <div className="text-gray-500">
//                 <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                 <p>Aucune demande trouvée</p>
//               </div>
//             </div>
//           ) : (
//             filteredDemandes.map((demande) => (
//               <div
//                 key={demande.id}
//                 className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
//               >
//                 <div className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-3">
//                         <h3 className="text-lg font-semibold text-gray-900">
//                           {demande.user.firstName} {demande.user.lastName}
//                         </h3>
//                         {getStatusBadge(demande.status)}
//                         <button
//                           onClick={() => toggleExpand(demande.id)}
//                           className="ml-auto flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
//                         >
//                           {expandedDemandes.has(demande.id) ? (
//                             <>
//                               <ChevronUp className="h-4 w-4" />
//                               Réduire
//                             </>
//                           ) : (
//                             <>
//                               <ChevronDown className="h-4 w-4" />
//                               Détails
//                             </>
//                           )}
//                         </button>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                         <div className="flex items-center text-sm text-gray-600">
//                           <User className="h-4 w-4 mr-2" />
//                           <span className="font-medium">Direction:</span>
//                           <span className="ml-1">{demande.direction}</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <User className="h-4 w-4 mr-2" />
//                           <span className="font-medium">Business Owner:</span>
//                           <span className="ml-1">{demande.businessOwner}</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <Calendar className="h-4 w-4 mr-2" />
//                           <span className="font-medium">Date:</span>
//                           <span className="ml-1">{demande.createdAt}</span>
//                         </div>
//                       </div>

//                       {/* Détails étendus */}
//                       {expandedDemandes.has(demande.id) && (
//                         <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
//                           <h4 className="font-semibold text-gray-900 mb-3">
//                             Informations détaillées
//                           </h4>

//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                             <div className="flex items-center text-sm text-gray-600">
//                               <Mail className="h-4 w-4 mr-2" />
//                               <span className="font-medium">Email:</span>
//                               <span className="ml-1">{demande.user.email}</span>
//                             </div>
//                             <div className="flex items-center text-sm text-gray-600">
//                               <Building className="h-4 w-4 mr-2" />
//                               <span className="font-medium">Type d'accès:</span>
//                               <span className="ml-1">{demande.typeAcces}</span>
//                             </div>
//                           </div>

//                           {demande.justification && (
//                             <div className="mb-4">
//                               <div className="flex items-start text-sm text-gray-600">
//                                 <FileText className="h-4 w-4 mr-2 mt-0.5" />
//                                 <div>
//                                   <span className="font-medium">Justification:</span>
//                                   <p className="mt-1 text-gray-700">
//                                     {demande.justification}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           {/* Pièces jointes */}
//                           {demande.attachments && demande.attachments.length > 0 && (
//                             <div className="mb-4">
//                               <div className="flex items-center text-sm text-gray-600 mb-2">
//                                 <Paperclip className="h-4 w-4 mr-2" />
//                                 <span className="font-medium">Pièces jointes:</span>
//                               </div>
//                               <div className="space-y-2">
//                                 {demande.attachments.map((attachment, index) => (
//                                   <div
//                                     key={index}
//                                     className="flex items-center justify-between p-2 bg-white rounded border"
//                                   >
//                                     <div className="flex items-center">
//                                       <FileText className="h-4 w-4 mr-2 text-gray-500" />
//                                       <span className="text-sm text-gray-700">
//                                         {attachment.name || `Fichier ${index + 1}`}
//                                       </span>
//                                       {attachment.size && (
//                                         <span className="text-xs text-gray-500 ml-2">
//                                           ({attachment.size})
//                                         </span>
//                                       )}
//                                     </div>
//                                     <button
//                                       onClick={() => handleDownloadAttachment(attachment)}
//                                       className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
//                                     >
//                                       <Download className="h-3 w-3" />
//                                       Télécharger
//                                     </button>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                           {/* Historique des validations détaillé */}
//                           <div>
//                             <h5 className="font-medium text-gray-700 mb-2">
//                               Historique des validations:
//                             </h5>
//                             <div className="space-y-2">
//                               {demande.validations.map((validation, index) => (
//                                 <div
//                                   key={index}
//                                   className="flex items-center justify-between p-2 bg-white rounded border"
//                                 >
//                                   <div className="flex items-center">
//                                     {validation.status === "APPROUVEE" ? (
//                                       <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                                     ) : validation.status === "REJETEE" ? (
//                                       <XCircle className="h-4 w-4 text-red-500 mr-2" />
//                                     ) : (
//                                       <Clock className="h-4 w-4 text-yellow-500 mr-2" />
//                                     )}
//                                     <span className="text-sm text-gray-700">
//                                       Étape {validation.ordre}
//                                     </span>
//                                   </div>
//                                   <div className="text-right">
//                                     {validation.validateur ? (
//                                       <div className="text-sm text-gray-600">
//                                         <div>
//                                           {validation.validateur.firstName}{" "}
//                                           {validation.validateur.lastName}
//                                         </div>
//                                         {validation.date && (
//                                           <div className="text-xs text-gray-500">
//                                             {validation.date}
//                                           </div>
//                                         )}
//                                       </div>
//                                     ) : (
//                                       <span className="text-sm text-gray-500">
//                                         En attente
//                                       </span>
//                                     )}
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       {!expandedDemandes.has(demande.id) && (
//                         <div className="text-sm text-gray-600 mb-4">
//                           {demande.justification && (
//                             <>
//                               <span className="font-medium">Justification:</span>
//                               <p className="mt-1">{demande.justification}</p>
//                             </>
//                           )}
//                         </div>
//                       )}

//                       {/* Progression des validations (version compacte) */}
//                       {!expandedDemandes.has(demande.id) && (
//                         <div className="flex items-center gap-2 mb-4">
//                           <span className="text-sm font-medium text-gray-700">
//                             Validations:
//                           </span>
//                           {demande.validations.map((validation, index) => (
//                             <div key={index} className="flex items-center">
//                               {validation.status === "APPROUVEE" ? (
//                                 <CheckCircle className="h-5 w-5 text-green-500" />
//                               ) : validation.status === "REJETEE" ? (
//                                 <XCircle className="h-5 w-5 text-red-500" />
//                               ) : (
//                                 <Clock className="h-5 w-5 text-yellow-500" />
//                               )}
//                               <span className="text-xs ml-1 mr-3">
//                                 Étape {validation.ordre}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>

//                     {/* Actions */}
//                     {demande.status === "EN_ATTENTE" ||
//                     demande.status === "EN_COURS_VALIDATION" ? (
//                       <div className="flex gap-2 ml-4">
//                         <button
//                           onClick={() =>
//                             openValidationModal(demande, "APPROUVEE")
//                           }
//                           className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
//                         >
//                           <CheckCircle className="h-4 w-4" />
//                           Approuver
//                         </button>
//                         <button
//                           onClick={() =>
//                             openValidationModal(demande, "REJETEE")
//                           }
//                           className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
//                         >
//                           <XCircle className="h-4 w-4" />
//                           Rejeter
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="ml-4">
//                         <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium cursor-not-allowed">
//                           <Eye className="h-4 w-4" />
//                           Voir détails
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//         {/* Modal de validation */}
//         {showModal && selectedDemande && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg max-w-md w-full p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 {action === "APPROUVEE" ? (
//                   <CheckCircle className="h-6 w-6 text-green-600" />
//                 ) : (
//                   <XCircle className="h-6 w-6 text-red-600" />
//                 )}
//                 <h3 className="text-lg font-semibold">
//                   {action === "APPROUVEE"
//                     ? "Approuver la demande"
//                     : "Rejeter la demande"}
//                 </h3>
//               </div>

//               <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                 <p className="text-sm text-gray-600">
//                   <strong>Demandeur:</strong> {selectedDemande.user.firstName}{" "}
//                   {selectedDemande.user.lastName}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Direction:</strong> {selectedDemande.direction}
//                 </p>
//               </div>

//               {/* Champ SPOC Data pour les demandes IT */}
//               {selectedDemande.direction === "IT" && action === "APPROUVEE" && (
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     SPOC Data <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Entrez les informations SPOC Data"
//                     value={spocData}
//                     onChange={(e) => setSpocData(e.target.value)}
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Ce champ est obligatoire pour les demandes du département IT
//                   </p>
//                 </div>
//               )}

//               {/* Commentaire */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Commentaire
//                   {action === "REJETEE" && (
//                     <span className="text-red-500">*</span>
//                   )}
//                 </label>
//                 <textarea
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   rows="4"
//                   placeholder={
//                     action === "REJETEE"
//                       ? "Veuillez expliquer la raison du rejet..."
//                       : "Commentaire optionnel..."
//                   }
//                   value={commentaire}
//                   onChange={(e) => setCommentaire(e.target.value)}
//                 />
//                 {action === "REJETEE" && (
//                   <div className="flex items-center mt-2 text-amber-600">
//                     <AlertTriangle className="h-4 w-4 mr-1" />
//                     <p className="text-xs">
//                       Un commentaire est obligatoire pour le rejet
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Actions */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={closeModal}
//                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//                   disabled={isSubmitting}
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   onClick={handleValidation}
//                   disabled={isSubmitting}
//                   className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors ${
//                     action === "APPROUVEE"
//                       ? "bg-green-600 hover:bg-green-700"
//                       : "bg-red-600 hover:bg-red-700"
//                   } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
//                 >
//                   {isSubmitting
//                     ? "Traitement..."
//                     : action === "APPROUVEE"
//                     ? "Approuver"
//                     : "Rejeter"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  MessageSquare,
  AlertTriangle,
  Eye,
  Filter,
  ChevronDown,
  ChevronUp,
  Mail,
  Building,
  FileText,
  Paperclip,
  Download,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";


export default function DemandeManager() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [spocData, setSpocData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDemandes, setExpandedDemandes] = useState(new Set());
  const [errorBack, setErrorBack] = useState("");
  const [successBack, setSuccessBack] = useState("");

  const { user } = useAuth();
  // Simuler les données des demandes (remplacer par votre API)

  const [downloadLoading, setDownloadLoading] = useState(false);
    const [error, setError] = useState("");
  
    // Function to handle file download
    const handleDownloadAttachment = async (demande , file) => {
      setDownloadLoading(true);
      setError("");
  
      try {
        const response = await fetch(
          `http://localhost:3001/api/demandes/file/${demande.id}?download=true`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur lors du téléchargement");
        }
  
        // Create blob from response
        const blob = await response.blob();
  
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
  
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Erreur de téléchargement:", error);
        setError(error.message || "Erreur lors du téléchargement du fichier");
      } finally {
        setDownloadLoading(false);
      }
    };
  
    // Function to handle file preview
    const handlePreviewAttachment = (demande) => {
      const previewUrl = `http://localhost:3001/api/demandes/file/${demande.id}`;
  
      // Add authorization header by opening in new window with fetch
      fetch(previewUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          window.open(url, "_blank");
          // Note: URL will be revoked when the new window is closed
        })
        .catch((error) => {
          console.error("Erreur de prévisualisation:", error);
          setError("Erreur lors de la prévisualisation du fichier");
        });
    };
  
    // Function to get file extension
    const getFileExtension = (filename) => {
      return filename ? filename.split(".").pop().toLowerCase() : "";
    };
  
    // Function to check if file can be previewed
    const canPreviewFile = (filename) => {
      const extension = getFileExtension(filename);
      const previewableExtensions = ["pdf", "png", "jpg", "jpeg", "gif", "txt"];
      return previewableExtensions.includes(extension);
    };
  
    // Function to get file icon based on extension
    const getFileIcon = (filename) => {
      const extension = getFileExtension(filename);
  
      switch (extension) {
        case "pdf":
          return <FileText className="h-5 w-5 mr-3 text-red-500" />;
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
          return <FileText className="h-5 w-5 mr-3 text-green-500" />;
        case "doc":
        case "docx":
          return <FileText className="h-5 w-5 mr-3 text-blue-500" />;
        default:
          return <FileText className="h-5 w-5 mr-3 text-gray-500" />;
      }
    };
  


    // #####################################################################
  const fetchDemandes = async () => {
  
    const params= {};
    if(searchTerm){
        params.search = searchTerm.trim();
    }
    if(filterStatus){
        params.filterStatus= filterStatus.trim();
    }
    try {
      setLoading(true);

      const responce = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/demandes/a-valider`,
        {
          params, 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await responce.data;
      console.log("data deamdea a vlider pour une manager", data.demandes);
      setDemandes(data.demandes);
    } catch (error) {
      console.error("Erreur lors du chargement des demandes:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (demandeId) => {
    const newExpanded = new Set(expandedDemandes);
    if (newExpanded.has(demandeId)) {
      newExpanded.delete(demandeId);
    } else {
      newExpanded.add(demandeId);
    }
    setExpandedDemandes(newExpanded);
  };

  useEffect(() => {
    fetchDemandes();
  }, [filterStatus, searchTerm]);

  const getStatusBadge = (status) => {
    const styles = {
      EN_ATTENTE: "bg-yellow-100 text-yellow-800 border-yellow-200",
      EN_COURS_VALIDATION: "bg-blue-100 text-blue-800 border-blue-200",
      APPROUVEE: "bg-green-100 text-green-800 border-green-200",
      REJETEE: "bg-red-100 text-red-800 border-red-200",
    };

    const labels = {
      EN_ATTENTE: "En attente",
      EN_COURS_VALIDATION: "En cours",
      APPROUVEE: "Approuvée",
      REJETEE: "Rejetée",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const openValidationModal = (demande, actionType) => {
    setSelectedDemande(demande);
    setAction(actionType);
    setCommentaire("");
    setSpocData("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDemande(null);
    setAction("");
    setCommentaire("");
    setSpocData("");
  };

  const handleValidation = async () => {
    if (!selectedDemande || !action) return;

    // Validation des champs obligatoires
    if (action === "REJETEE" && !commentaire.trim()) {
      setErrorBack("Un commentaire est obligatoire pour rejeter une demande");
      closeModal();
      setTimeout(() => {
        setErrorBack("");
      }, 2000);
      return;
    }

    if (
      selectedDemande.direction === "IT" &&
      action === "APPROUVEE" &&
      !spocData.trim()
    ) {
      setErrorBack(
        "Le champ SPOC Data est obligatoire pour les demandes du département IT"
      );
      setTimeout(() => {
        setErrorBack("");
      }, 2000);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        action,
        commentaire: commentaire.trim(),
        spocData: spocData.trim(),
      };

      // Remplacer par votre appel API
      const response = await fetch(
        `${process.env.REACT_APP_BACK_URL}/api/demandes/valider/${selectedDemande.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adapter selon votre auth
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSuccessBack(result.message);
        fetchDemandes(); // Recharger les données
        closeModal();
        setTimeout(() => {
          setSuccessBack("");
        }, 2000);
      } else {
        closeModal();
        setErrorBack(result.message || "Erreur lors de la validation");
        setTimeout(() => {
          setErrorBack("");
        }, 2000);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setErrorBack("Erreur lors de la validation de la demande");
      setTimeout(() => {
        setErrorBack("");
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleDownloadAttachment = (attachment) => {
  //   // Logique pour télécharger la pièce jointe
  //   // Remplacer par votre logique de téléchargement
  //   console.log("Téléchargement de:", attachment);
  //   // window.open(attachment.url, '_blank');
  // };

//   const filteredDemandes = demandes.filter((demande) => {
//     const matchesStatus =
//       filterStatus === "all" || demande.status === filterStatus;
//     const matchesSearch =
//       searchTerm === "" ||
//       demande.demandeur.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       demande.direction.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       demande.businessOwner.toLowerCase().includes(searchTerm.toLowerCase());

//     return matchesStatus && matchesSearch;
//   });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pt-28 p-6 bg-gray-50 ">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Validation des Demandes d'Accès
            </h1>
            <p className="text-gray-600 mt-2">
              Gérez et validez les demandes d'accès aux données
            </p>
          </div>
          {/* Filtres */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Rechercher par demandeur, direction, business owner..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Tous les statuts</option>
                  <option value="EN_ATTENTE">En attente</option>
                  <option value="APPROUVEE">Approuvées</option>
                  <option value="REJETEE">Rejetées</option>
                </select>
              </div>
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
        {/* Liste des demandes */}
        <div className="space-y-4">
          {demandes.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucune demande trouvée</p>
              </div>
            </div>
          ) : (
            demandes.map((demande) => (
              <div
                key={demande.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {demande.user.firstName} {demande.user.lastName}
                        </h3>
                        {getStatusBadge(demande.status)}
                        <button
                          onClick={() => toggleExpand(demande.id)}
                          className="ml-auto flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          {expandedDemandes.has(demande.id) ? (
                            <>
                              <ChevronUp className="h-4 w-4" />
                              Réduire
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              Détails
                            </>
                          )}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          <span className="font-medium">Direction:</span>
                          <span className="ml-1">{demande.direction}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          <span className="font-medium">Business Owner:</span>
                          <span className="ml-1">{demande.businessOwner}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="font-medium">Date:</span>
                          <span className="ml-1">{demande.createdAt}</span>
                        </div>
                      </div>

                      {/* Détails étendus */}
                      {expandedDemandes.has(demande.id) && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <FileText className="h-5 w-5 mr-2" />
                            Informations détaillées de la demande
                          </h4>

                          {/* Section Informations du demandeur */}
                          <div className="mb-6">
                            <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              Informations du demandeur
                            </h5>
                            <div className="bg-white p-4 rounded-lg border grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Nom complet:
                                </span>
                                <span className="text-gray-900">
                                  {demande.firstName} {demande.lastName}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Email:
                                </span>
                                <span className="text-gray-900">
                                  {demande.user.email}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Direction:
                                </span>
                                <span className="text-gray-900">
                                  {demande.direction}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Direction BU:
                                </span>
                                <span className="text-gray-900">
                                  {demande.directionBu}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Business Owner:
                                </span>
                                <span className="text-gray-900">
                                  {demande.businessOwner}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Type:
                                </span>
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    demande.interneExterne === "Interne"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-orange-100 text-orange-800"
                                  }`}
                                >
                                  {demande.interneExterne}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Section Détails de l'accès */}
                          <div className="mb-6">
                            <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                              <Building className="h-4 w-4 mr-2" />
                              Détails de l'accès demandé
                            </h5>
                            <div className="bg-white p-4 rounded-lg border space-y-3">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Environnement:
                                </span>
                                <span className="text-gray-900">
                                  {demande.environnement}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Schémas demandés:
                                </span>
                                <div className="flex gap-1">
                                  {demande.schema &&
                                    demande.schema.map((schema, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                                      >
                                        {schema}
                                      </span>
                                    ))}
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Extraction autorisée:
                                </span>
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    demande.extraction === "Oui"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {demande.extraction}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Durée d'accès:
                                </span>
                                <span className="text-gray-900">
                                  {demande.dureeAcces}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Date début:
                                </span>
                                <span className="text-gray-900">
                                  {new Date(
                                    demande.dateDebut
                                  ).toLocaleDateString("fr-FR")}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Date fin:
                                </span>
                                <span className="text-gray-900">
                                  {new Date(demande.dateFin).toLocaleDateString(
                                    "fr-FR"
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Section Justifications */}
                          <div className="mb-6">
                            <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Justifications et usage
                            </h5>
                            <div className="bg-white p-4 rounded-lg border space-y-3">
                              <div>
                                <span className="font-medium text-gray-600 block mb-1">
                                  Finalité de l'accès:
                                </span>
                                <p className="text-gray-900 bg-gray-50 p-2 rounded text-sm">
                                  {demande.finaliteAccess || "Non spécifiée"}
                                </p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600 block mb-1">
                                  Détails d'usage:
                                </span>
                                <p className="text-gray-900 bg-gray-50 p-2 rounded text-sm">
                                  {demande.detailsUsage || "Non spécifiés"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Section Pièces jointes */}
                          {/* <div className="mb-6">
                            <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                              <Paperclip className="h-4 w-4 mr-2" />
                              Pièces jointes
                            </h5>
                            <div className="bg-white p-4 rounded-lg border">
                              {demande.attachmentName ? (
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                                  <div className="flex items-center">
                                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="text-sm text-gray-700">
                                      {demande.attachmentName}
                                    </span>
                                  </div>
                                  {demande.attachmentPath && (
                                    <button
                                      onClick={() =>
                                        handleDownloadAttachment({
                                          name: demande.attachmentName,
                                          path: demande.attachmentPath,
                                        })
                                      }
                                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                      <Download className="h-3 w-3" />
                                      Télécharger
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className="text-center py-4 text-gray-500">
                                  <Paperclip className="h-8 w-8 mx-auto mb-2 opacity-30" />
                                  <p className="text-sm">Aucune pièce jointe</p>
                                </div>
                              )}
                            </div>
                          </div> */}

{demande.attachmentName && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center">
                <Paperclip className="h-5 w-5 mr-2 text-gray-600" />
                Pièces jointes
              </h4>

              {/* Error message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="flex items-center">
                  {getFileIcon(demande.attachmentName)}
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-700 font-medium">
                      {demande.attachmentName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {getFileExtension(demande.attachmentName).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Preview button - only show for previewable files */}
                  {canPreviewFile(demande.attachmentName) && (
                    <button
                      onClick={() =>
                        handlePreviewAttachment(demande)
                      }
                      className="flex items-center gap-2 px-3 py-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Eye className="h-4 w-4" />
                      Aperçu
                    </button>
                  )}

                  {/* Download button */}
                  {demande.attachmentPath && (
                    <button
                      onClick={() =>
                        handleDownloadAttachment(
                          demande,{
                          name: demande.attachmentName,
                          path: demande.attachmentPath,
                          
                        })
                      }
                      disabled={downloadLoading}
                      className="flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloadLoading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      {downloadLoading ? "Téléchargement..." : "Télécharger"}
                    </button>
                  )}
                </div>
              </div>

              {/* File info */}
              <div className="mt-3 text-xs text-gray-500">
                <span>Fichier attaché à cette demande</span>
              </div>
            </div>
          )}

                          {/* Section Informations de validation */}
                          {(demande.spocData ||
                            demande.spocDt ||
                            demande.commentaireRejet) && (
                            <div className="mb-6">
                              <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Informations de validation
                              </h5>
                              <div className="bg-white p-4 rounded-lg border space-y-3">
                                {demande.spocData && (
                                  <div>
                                    <span className="font-medium text-gray-600 block mb-1">
                                      SPOC Data:
                                    </span>
                                    <p className="text-gray-900 bg-green-50 p-2 rounded text-sm border-l-4 border-green-400">
                                      {demande.spocData}
                                    </p>
                                  </div>
                                )}
                                {demande.spocDt && (
                                  <div>
                                    <span className="font-medium text-gray-600 block mb-1">
                                      SPOC DT:
                                    </span>
                                    <p className="text-gray-900 bg-blue-50 p-2 rounded text-sm border-l-4 border-blue-400">
                                      {demande.spocDt}
                                    </p>
                                  </div>
                                )}
                                {demande.commentaireRejet && (
                                  <div>
                                    <span className="font-medium text-gray-600 block mb-1">
                                      Commentaire de rejet:
                                    </span>
                                    <p className="text-gray-900 bg-red-50 p-2 rounded text-sm border-l-4 border-red-400">
                                      {demande.commentaireRejet}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Section Dates système */}
                          <div className="mb-6">
                            <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              Informations système
                            </h5>
                            <div className="bg-white p-4 rounded-lg border grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  ID de la demande:
                                </span>
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-800">
                                  {demande.id.substring(0, 8)}...
                                </code>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Date de création:
                                </span>
                                <span className="text-gray-900">
                                  {new Date(demande.createdAt).toLocaleString(
                                    "fr-FR"
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Dernière mise à jour:
                                </span>
                                <span className="text-gray-900">
                                  {new Date(demande.updatedAt).toLocaleString(
                                    "fr-FR"
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">
                                  Statut actuel:
                                </span>
                                {getStatusBadge(demande.status)}
                              </div>
                            </div>
                          </div>

                          {/* Historique des validations détaillé */}
                          <div>
                            <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Historique des validations
                            </h5>
                            <div className="bg-white rounded-lg border">
                              {demande.validations &&
                              demande.validations.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                  {demande.validations.map(
                                    (validation, index) => (
                                      <div key={index} className="p-4">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center">
                                            {validation.status ===
                                            "APPROUVEE" ? (
                                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                            ) : validation.status ===
                                              "REJETEE" ? (
                                              <XCircle className="h-5 w-5 text-red-500 mr-3" />
                                            ) : (
                                              <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                                            )}
                                            <div>
                                              <p className="text-sm font-medium text-gray-900">
                                                Étape {validation.ordre}
                                              </p>
                                              <p className="text-xs text-gray-500">
                                                {validation.role ||
                                                  "Validateur"}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            {validation.validateur ? (
                                              <div>
                                                <p className="text-sm text-gray-900">
                                                  {
                                                    validation.validateur
                                                      .firstName
                                                  }{" "}
                                                  {
                                                    validation.validateur
                                                      .lastName
                                                  }
                                                </p>
                                                {validation.validatedAt && (
                                                  <p className="text-xs text-gray-500">
                                                    {new Date(
                                                      validation.validatedAt
                                                    ).toLocaleString("fr-FR")}
                                                  </p>
                                                )}
                                              </div>
                                            ) : (
                                              <span className="text-sm text-gray-500 italic">
                                                En attente de validation
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        {validation.commentaire && (
                                          <div className="mt-2 ml-8">
                                            <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                                              <strong>Commentaire:</strong>{" "}
                                              {validation.commentaire}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              ) : (
                                <div className="p-4 text-center text-gray-500">
                                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-30" />
                                  <p className="text-sm">
                                    Aucune validation disponible
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {!expandedDemandes.has(demande.id) && (
                        <div className="text-sm text-gray-600 mb-4">
                          {demande.justification && (
                            <>
                              <span className="font-medium">
                                Justification:
                              </span>
                              <p className="mt-1">{demande.justification}</p>
                            </>
                          )}
                        </div>
                      )}

                      {/* Progression des validations (version compacte) */}
                      {!expandedDemandes.has(demande.id) && (
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-sm font-medium text-gray-700">
                            Validations:
                          </span>
                          {demande.validations.map((validation, index) => (
                            <div key={index} className="flex items-center">
                              {validation.status === "APPROUVEE" ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : validation.status === "REJETEE" ? (
                                <XCircle className="h-5 w-5 text-red-500" />
                              ) : (
                                <Clock className="h-5 w-5 text-yellow-500" />
                              )}
                              <span className="text-xs ml-1 mr-3">
                                Étape {validation.ordre}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {demande.status === "EN_ATTENTE" ||
                    demande.status === "EN_COURS_VALIDATION" ? (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() =>
                            openValidationModal(demande, "APPROUVEE")
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approuver
                        </button>
                        <button
                          onClick={() =>
                            openValidationModal(demande, "REJETEE")
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          <XCircle className="h-4 w-4" />
                          Rejeter
                        </button>
                      </div>
                    ) : (
                      <div className="ml-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium cursor-not-allowed">
                          <Eye className="h-4 w-4" />
                          Voir détails
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Modal de validation */}
        {showModal && selectedDemande && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                {action === "APPROUVEE" ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
                <h3 className="text-lg font-semibold">
                  {action === "APPROUVEE"
                    ? "Approuver la demande"
                    : "Rejeter la demande"}
                </h3>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Demandeur:</strong> {selectedDemande.user.firstName}{" "}
                  {selectedDemande.user.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Direction:</strong> {selectedDemande.direction}
                </p>
              </div>

              {/* Champ SPOC Data pour les demandes IT */}
              {user.departement.nom === "test1" && action === "APPROUVEE" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SPOC Data <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Entrez les informations SPOC Data"
                    value={spocData}
                    onChange={(e) => setSpocData(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ce champ est obligatoire pour les demandes du département IT
                  </p>
                </div>
              )}

              {/* Commentaire */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commentaire
                  {action === "REJETEE" && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder={
                    action === "REJETEE"
                      ? "Veuillez expliquer la raison du rejet..."
                      : "Commentaire optionnel..."
                  }
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                />
                {action === "REJETEE" && (
                  <div className="flex items-center mt-2 text-amber-600">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <p className="text-xs">
                      Un commentaire est obligatoire pour le rejet
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
                <button
                  onClick={handleValidation}
                  disabled={isSubmitting}
                  className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors ${
                    action === "APPROUVEE"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting
                    ? "Traitement..."
                    : action === "APPROUVEE"
                    ? "Approuver"
                    : "Rejeter"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
