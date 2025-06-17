// import { useState, useEffect, useDebugValue } from "react";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Step1({ formData, setFormData, onNext }) {
//   const [error, serError] = useState("");
//   const [errors, setErrors] = useState([]);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.direction) {
//       newErrors.direction = "direction est obligatoire";
//     }
//     if (!formData.firstName) {
//       newErrors.firstName = "prenom est obligatoire ";
//     }
//     if (!formData.lastName) {
//       newErrors.lastName = "nom est obligatoire ";
//     }

//     if (!formData.directionBu) {
//       newErrors.directionBu = "direction Bu est obligatoire";
//     }
//     if (!formData.interneExterne) {
//       newErrors.interneExterne = "ce champ est obligatoire";
//     }
//     if (!formData.attachment) {
//       newErrors.attachment = "ce champ de attachement est obligatoire";
//     }

//     return newErrors;
//   };

//   useEffect(() => {
//     const newErrors = { ...errors };

//     if (formData.direction && newErrors.direction) {
//       delete newErrors.direction;
//     }
//     if (formData.firstName && newErrors.firstName) {
//       delete newErrors.firstName;
//     }
//     if (formData.lastName && newErrors.lastName) {
//       delete newErrors.lastName;
//     }
//     if (formData.directionBu && newErrors.directionBu) {
//       delete newErrors.directionBu;
//     }
//     if (formData.interneExterne && newErrors.interneExterne) {
//       delete newErrors.interneExterne;
//     }
//     if (formData.attachment && newErrors.attachment) {
//       delete newErrors.attachment;
//     }
//     setErrors(newErrors);
//   }, [formData]);

//   const handleNext = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     // if (!formData.direction || !formData.firstname || !formData.lastname) {
//     //   serError("Tous les champs marques sont obligatoires.");
//     //   return;
//     // }
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     onNext();
//     console.log("formdata::", formData);
//   };
//   useEffect(() => {
//     if (formData.direction && formData.nom && formData.prenom) {
//       serError("");
//     }
//   }, [formData]);

//   return (
//     <>
//       <div className="flex flex-col min-h-[65vh] justify-center">
//         <h2 className="text-2xl font-bold md:text-start text-gray-600  font-mono">
//           Présentation du demandeur
//         </h2>
//         <hr className="border-t border-black my-8" />
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
//           {/* Nom */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Nom
//             </label>
//             <input
//               type="text"
//               placeholder="Nom"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.lastName}
//               onChange={(e) =>
//                 setFormData({ ...formData, lastName: e.target.value })
//               }
//             />
//             {errors.lastName && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.lastName}*
//               </p>
//             )}
//           </div>

//           {/* Prénom */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Prénom
//             </label>
//             <input
//               type="text"
//               placeholder="Prénom"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.firstName}
//               onChange={(e) =>
//                 setFormData({ ...formData, firstName: e.target.value })
//               }
//             />
//             {errors.firstName && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.firstName}*
//               </p>
//             )}
//           </div>
//           {/* Direction */}
//           <div className="flex flex-col ">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Direction
//             </label>
//             <input
//               type="text"
//               placeholder="Direction"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.direction}
//               onChange={(e) =>
//                 setFormData({ ...formData, direction: e.target.value })
//               }
//             />
//             {errors.direction && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.direction}*
//               </p>
//             )}
//           </div>
//           {/* Directeur BU */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Directeur BU
//             </label>
//             <input
//               type="text"
//               placeholder="Directeur BU"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.directionBu}
//               onChange={(e) =>
//                 setFormData({ ...formData, directionBu: e.target.value })
//               }
//             />
//             {errors.directionBu && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.directionBu}*
//               </p>
//             )}
//           </div>

//           {/* Interne / Externe */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Interne / Externe
//             </label>
//             <select
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.interneExterne}
//               onChange={(e) =>
//                 setFormData({ ...formData, interneExterne: e.target.value })
//               }
//             >
//               <option value="">Choisir</option>
//               <option value="Interne">Interne</option>
//               <option value="Externe">Externe</option>
//             </select>
//             {errors.interneExterne && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.interneExterne}*
//               </p>
//             )}
//           </div>
//           {/* Pièce jointe */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Pièce jointe
//             </label>
//             <input
//               type="file"
//               onChange={(e) => {
//                 // e.target.files est une FileList, on récupère le 1er fichier
//                 setFormData({ ...formData, attachment: e.target.files[0] });
//               }}
//             />
//             {/* Optionnel : afficher le nom du fichier sélectionné */}
//             {formData.attachment && (
//               <p className="text-gray-600 text-sm mt-1">
//                 Fichier sélectionné : {formData.attachment.name}
//               </p>
//             )}

// {errors.attachment && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.attachment}*
//               </p>
//             )}
//           </div>

//           {/* SPOC Data */}
//           {/* <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               SPOC Data
//             </label>
//             <input
//               type="text"
//               placeholder="SPOC Data"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.spocData}
//               onChange={(e) =>
//                 setFormData({ ...formData, spocData: e.target.value })
//               }
//             />
//           </div> */}

//           {/* SPOC DT */}
//           {/* <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               SPOC DT
//             </label>
//             <input
//               type="text"
//               placeholder="SPOC DT"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.spocDt}
//               onChange={(e) =>
//                 setFormData({ ...formData, spocDt: e.target.value })
//               }
//             />
//           </div> */}
//         </div>

//         {error && <p className="text-red-500">{error}</p>}

//         <button
//           onClick={handleNext}
//           className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-end"
//         >
//           Suivant
//         </button>
//       </div>
//     </>
//   );
// }

// function Step2({ formData, setFormData, onNext, onPrev }) {
//   const [error, setError] = useState("");
//   const [errors, setErrors] = useState({});
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.environnement) {
//       newErrors.environnement = "champ environnement est obligatoire";
//     }
//     if (!formData.schema || formData.schema.length === 0) {
//       newErrors.schema = "champ schema est obligatoire";
//     }
//     if (!formData.finalite_access) {
//       newErrors.finalite_access = "champ finalite access est obligatoire";
//     }
//     if (!formData.Details_usage) {
//       newErrors.Details_usage = "champ Details usage est obligatoire";
//     }
//     if (!formData.Duree_acces) {
//       newErrors.Duree_acces = "champ Duree acces est obligatoire";
//     }
//     if (!formData.extraction) {
//       newErrors.extraction = "champ extraction est obligatoire";
//     }

//     if (!formData.date_debut) {
//       newErrors.date_debut = "champ date_debut est obligatoire";
//     }

//     if (!formData.date_fin) {
//       newErrors.date_fin = "champ date_fin est obligatoire";
//     }
//     // Validation date début < date fin
//     if (formData.date_debut && formData.date_fin) {
//       const debut = new Date(formData.date_debut);
//       const fin = new Date(formData.date_fin);

//       if (debut > fin) {
//         newErrors.date_fin =
//           "La date de fin doit être supérieure ou égale à la date de début.";
//       }
//     }
//     return newErrors;
//   };

//   useEffect(() => {
//     const newErrors = { ...errors };
//     if (formData.environnement && newErrors.environnement) {
//       delete newErrors.environnement;
//     }
//     if (formData.schema && newErrors.schema) {
//       delete newErrors.schema;
//     }
//     if (formData.finalite_access && newErrors.finalite_access) {
//       delete newErrors.finalite_access;
//     }
//     if (formData.Details_usage && newErrors.Details_usage) {
//       delete newErrors.Details_usage;
//     }
//     if (formData.Duree_acces && newErrors.Duree_acces) {
//       delete newErrors.Duree_acces;
//     }
//     if (formData.extraction && newErrors.extraction) {
//       delete newErrors.extraction;
//     }
//     if (formData.date_debut && newErrors.date_debut) {
//       delete newErrors.date_debut;
//     }

//     if (formData.date_fin && newErrors.date_fin) {
//       delete newErrors.date_fin;
//     }
//     setErrors(newErrors);
//   }, [formData]);

//   const handleNext = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();

//     // if (!formData.environnement || !formData.schema) {
//     //   setError("Tous les champs marques sont obligatoires.");
//     //   return;
//     // }
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     onNext();
//     console.log("formdata::", formData);
//   };

//   useEffect(() => {
//     if (formData.environnement && formData.schema) {
//       setError("");
//     }
//   }, [formData]);

//   return (
//     <>
//       <div className="flex flex-col min-h-[65vh] justify-center">
//         <h2 className="text-2xl font-bold md:text-start text-gray-600  font-mono">
//           Détails de la demande d'accés
//         </h2>
//         <hr className="border-t border-black my-8" />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Environnement
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="Environnement"
//               value={formData.environnement}
//               onChange={(e) =>
//                 setFormData({ ...formData, environnement: e.target.value })
//               }
//             />
//             {errors.environnement && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.environnement}*
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Schéma / Table /Dashboard
//             </label>
//             <div className="flex flex-col gap-2">
//               {["Schema", "Table", "Dashboard"].map((item) => (
//                 <>
//                   <label className="flex text-center gap-2 text-gray-700">
//                     <input
//                       value={item}
//                       type="checkbox"
//                       checked={formData.schema.includes(item)}
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setFormData({
//                             ...formData,
//                             schema: [...formData.schema, item],
//                           });
//                         } else {
//                           setFormData({
//                             ...formData,
//                             schema: formData.schema.filter((i) => i !== item),
//                           });
//                         }
//                       }}
//                       className="accent-violet-500"
//                     />
//                     {item}
//                   </label>
//                 </>
//               ))}
//               {errors.schema && (
//                 <p className="text-red-500 text-sm mt-2 self-start ">
//                   {errors.schema}*
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Finalité de l'accès
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="Finalité de l'accès"
//               value={formData.finalite_access}
//               onChange={(e) =>
//                 setFormData({ ...formData, finalite_access: e.target.value })
//               }
//             />
//             {errors.finalite_access && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.finalite_access}*
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Détails d'usage
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="Détails d'usage"
//               value={formData.Details_usage}
//               onChange={(e) =>
//                 setFormData({ ...formData, Details_usage: e.target.value })
//               }
//             />
//             {errors.Details_usage && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.Details_usage}*
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Durée d'accès
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder=" Durée d'accès"
//               value={formData.Duree_acces}
//               onChange={(e) =>
//                 setFormData({ ...formData, Duree_acces: e.target.value })
//               }
//             />
//             {errors.Duree_acces && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.Duree_acces}*
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Besoin de faire des extractions
//             </label>
//             <select
//               value={formData.extraction}
//               onChange={(e) =>
//                 setFormData({ ...formData, extraction: e.target.value })
//               }
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//             >
//               <option value="">Choisir</option>
//               <option value="Oui">Oui</option>
//               <option value="Non">Non</option>
//             </select>
//             {errors.extraction && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.extraction}*
//               </p>
//             )}
//           </div>
//           {/* ✅ Date début */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Date début
//             </label>
//             <input
//               type="date"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.date_debut || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, date_debut: e.target.value })
//               }
//             />
//             {errors.date_debut && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.date_debut}*
//               </p>
//             )}
//           </div>

//           {/* ✅ Date fin */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Date fin
//             </label>
//             <input
//               type="date"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.date_fin || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, date_fin: e.target.value })
//               }
//             />
//             {errors.date_fin && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.date_fin}*
//               </p>
//             )}
//           </div>
//         </div>
//         {error && <p className="text-red-500">{error}</p>}
//         <div className="flex justify-between items-center">
//           <button
//             onClick={onPrev}
//             className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-start"
//           >
//             Previous
//           </button>
//           <button
//             onClick={handleNext}
//             className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-end"
//           >
//             Suivant
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// function Step3({ formData, setFormData, onNext, onPrev }) {
//   const [error, setError] = useState("");
//   const [errorBack, setErrorBack] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const [errors, setErrors] = useState({});
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.demandeur) {
//       newErrors.demandeur = "demandeur est obligatoire";
//     }

//     if (!formData.bussiness_owner) {
//       newErrors.bussiness_owner = "bussiness_owner est obligatoire";
//     }
//     return newErrors;
//   };

//   useEffect(() => {
//     const newErrors = { ...errors };

//     if (formData.demandeur && newErrors.demandeur) {
//       delete newErrors.demandeur;
//     }

//     if (formData.bussiness_owner && newErrors.bussiness_owner) {
//       delete newErrors.bussiness_owner;
//     }
//     setErrors(newErrors);
//   }, [formData]);

// // Frontend - Corrected version
// const handleNext = async () => {
//   try {
//     // Create FormData object to handle file upload
//     const formDataToSend = new FormData();

//     // Append all form fields
//     formDataToSend.append('demandeur', formData.demandeur);
//     formDataToSend.append('firstName', formData.firstName);
//     formDataToSend.append('lastName', formData.lastName);
//     formDataToSend.append('Details_usage', formData.Details_usage);
//     formDataToSend.append('Duree_acces', formData.Duree_acces);
//     formDataToSend.append('bussiness_owner', formData.bussiness_owner);
//     formDataToSend.append('date_debut', formData.date_debut);
//     formDataToSend.append('date_fin', formData.date_fin);
//     formDataToSend.append('direction', formData.direction);
//     formDataToSend.append('directionBu', formData.directionBu);
//     formDataToSend.append('environnement', formData.environnement);
//     formDataToSend.append('extraction', formData.extraction);
//     formDataToSend.append('finalite_access', formData.finalite_access);
//     formDataToSend.append('interneExterne', formData.interneExterne);

//     // Handle schema array - convert to JSON string
//     formDataToSend.append('schema', JSON.stringify(formData.schema));

//     // Handle file attachment
//     if (formData.attachment && formData.attachment instanceof File) {
//       formDataToSend.append('attachment', formData.attachment);
//     }

//     const response = await fetch(`http://localhost:3001/api/demandes/create`, {
//       method: "POST",
//       headers: {
//         // Remove Content-Type header - let browser set it with boundary for FormData
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: formDataToSend, // Use FormData instead of JSON.stringify
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       setErrorBack(data.message || data.detail);
//       setTimeout(() => {
//         setErrorBack("");
//         navigate("/");
//       }, 2000);
//       console.log("data : ", data);
//       return;
//     }

//     setSuccess(data.message || data.detail);
//     setFormData({});
//     onNext();
//     setTimeout(() => {
//       setSuccess("");
//     }, 2000);
//   } catch (error) {
//     console.error("Erreur lors de l'inscription :", error);
//     setErrorBack("Une erreur réseau est survenue. Veuillez réessayer.");
//   }
// };
//   return (
//     <>
//       <div className="flex flex-col min-h-[50vh] justify-center">
//         {errorBack && (
//           <div
//             className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//             role="alert"
//           >
//             <span className="font-medium">Error alert!</span> {errorBack}
//           </div>
//         )}
//         {success && (
//           <div
//             className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
//             role="alert"
//           >
//             <span className="font-medium">Success alert!</span> {success}
//           </div>
//         )}
//         <div>
//           <h2 className="text-2xl font-bold md:text-start text-gray-600  font-mono">
//             Avis & Visa
//           </h2>
//           <hr className="border-t border-black my-8" />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Demandeur
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="demandeur"
//               value={formData.demandeur}
//               onChange={(e) =>
//                 setFormData({ ...formData, demandeur: e.target.value })
//               }
//             />
//             {errors.demandeur && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.demandeur}*
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Business Owner
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="business_owner "
//               value={formData.bussiness_owner}
//               onChange={(e) =>
//                 setFormData({ ...formData, bussiness_owner: e.target.value })
//               }
//             />
//             {errors.bussiness_owner && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.bussiness_owner}*
//               </p>
//             )}
//           </div>
//         </div>
//         {error && <p className="text-red-500">{error}</p>}
//         <div className="flex justify-between items-center justify-center">
//           <button
//             onClick={onPrev}
//             className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-start"
//           >
//             Previous
//           </button>
//           <button
//             onClick={handleNext}
//             className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-end"
//           >
//             soummetre
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// function Validate() {
//   const navigate = useNavigate();
//   return (
//     <div className="relative flex flex-col min-h-[60vh] justify-center items-center text-center px-4">
//       {/* Image */}
//       <div className="w-40 h-40 mb-6 animate-fade-in">
//         <img
//           src="/images/image_validate.png" // depuis /public
//           alt="Validation"
//           className="w-full h-full object-contain"
//         />
//       </div>

//       {/* Titre */}
//       <h2 className="text-2xl font-bold text-violet-600 mb-2">
//         Demande validée !
//       </h2>

//       {/* Texte */}
//       <p className="text-gray-500">
//         Vous pouvez maintenant voir le statut de votre demande.
//       </p>
//       <div className="absolute bottom-4 right-4">
//         <button
//           className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300"
//           onClick={() => {
//             navigate("/");
//           }}
//         >
//           Voir la demande
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function Formulaire() {
//   const [step, setStep] = useState(0);
//   const [formData, setFormData] = useState({
//     schema: [],
//   });
//   const steps = [1, 2, 3, 4];
//   return (
//     <>
//       <div className="p-4 max-w-5xl mx-auto content ">
//         <div>
//           <h2 className="text-2xl font-bold md:text-start text-gray-600  font-mono">
//             Demande D'acces
//           </h2>
//           <div className="flex justify-between mt-16 items-center">
//             {steps.map((stp, index) => {
//               return (
//                 <>
//                   <div
//                     key={index}
//                     className={`${
//                       step >= index
//                         ? "bg-violet-500 text-white"
//                         : "bg-gray-300 text-violet-500"
//                     }  rounded-full w-16 h-16  flex  text-center items-center justify-center border`}
//                   >
//                     <p className=" font-bold  text-center">{stp}</p>
//                   </div>
//                   {index < steps.length - 1 && (
//                     <div className="flex-1 border-black border-t bg-gray-600 mx-2"></div>
//                   )}
//                 </>
//               );
//             })}
//           </div>
//         </div>

//         {step === 0 && (
//           <Step1
//             formData={formData}
//             setFormData={setFormData}
//             onNext={() => setStep(step + 1)}
//           />
//         )}

//         {step === 1 && (
//           <Step2
//             formData={formData}
//             setFormData={setFormData}
//             onNext={() => setStep(step + 1)}
//             onPrev={() => setStep(step - 1)}
//           />
//         )}
//         {step === 2 && (
//           <Step3
//             formData={formData}
//             setFormData={setFormData}
//             onNext={() => setStep(step + 1)}
//             onPrev={() => setStep(step - 1)}
//           />
//         )}
//         {step === 3 && <Validate />}
//       </div>
//     </>
//   );
// }

// import { useState, useEffect, useDebugValue } from "react";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Step1({ formData, setFormData, onNext, prediction, loadingPrediction}) {
//   const [error, serError] = useState("");
//   const [errors, setErrors] = useState([]);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.direction) {
//       newErrors.direction = "direction est obligatoire";
//     }
//     if (!formData.firstName) {
//       newErrors.firstName = "prenom est obligatoire ";
//     }
//     if (!formData.lastName) {
//       newErrors.lastName = "nom est obligatoire ";
//     }

//     if (!formData.directionBu) {
//       newErrors.directionBu = "direction Bu est obligatoire";
//     }
//     if (!formData.interneExterne) {
//       newErrors.interneExterne = "ce champ est obligatoire";
//     }
//     if (!formData.attachment) {
//       newErrors.attachment = "ce champ de attachement est obligatoire";
//     }

//     return newErrors;
//   };

//   useEffect(() => {
//     const newErrors = { ...errors };

//     if (formData.direction && newErrors.direction) {
//       delete newErrors.direction;
//     }
//     if (formData.firstName && newErrors.firstName) {
//       delete newErrors.firstName;
//     }
//     if (formData.lastName && newErrors.lastName) {
//       delete newErrors.lastName;
//     }
//     if (formData.directionBu && newErrors.directionBu) {
//       delete newErrors.directionBu;
//     }
//     if (formData.interneExterne && newErrors.interneExterne) {
//       delete newErrors.interneExterne;
//     }
//     if (formData.attachment && newErrors.attachment) {
//       delete newErrors.attachment;
//     }
//     setErrors(newErrors);
//   }, [formData]);

//   const handleNext = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     onNext();
//     console.log("formdata::", formData);
//   };
//   useEffect(() => {
//     if (formData.direction && formData.nom && formData.prenom) {
//       serError("");
//     }
//   }, [formData]);

//   return (
//     <>
//       <div className="flex flex-col min-h-[65vh] justify-center">
//         <h2 className="text-2xl font-bold md:text-start text-gray-600  font-mono">
//           Présentation du demandeur
//         </h2>
//         <hr className="border-t border-black my-8" />

//        {loadingPrediction && (
//   <div style={{ color: 'blue', marginBottom: '10px' }}>
//     Chargement de la prédiction...
//   </div>
// )}

// {!loadingPrediction && prediction && (
//   <div
//     style={{
//       padding: '10px',
//       marginBottom: '10px',
//       borderRadius: '5px',
//       backgroundColor: prediction.risk > 0.5 ? '#f8d7da' : '#d4edda',
//       color: prediction.risk > 0.5 ? '#721c24' : '#155724',
//     }}
//   >
//     {prediction.risk > 0.5
//       ? `⚠️ Risque de rejet élevé (${(prediction.risk * 100).toFixed(1)}%)`
//       : `✔️ Risque faible (${(prediction.risk * 100).toFixed(1)}%)`}
//     <br />
//     Causes probables : {(prediction.causes || []).length > 0
//       ? prediction.causes.join(', ')
//       : "Aucune cause détectée"}
//   </div>
// )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
//           {/* Nom */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Nom
//             </label>
//             <input
//               type="text"
//               placeholder="Nom"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.lastName}
//               onChange={(e) =>
//                 setFormData({ ...formData, lastName: e.target.value })
//               }
//             />
//             {errors.lastName && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.lastName}*
//               </p>
//             )}
//           </div>

//           {/* Prénom */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Prénom
//             </label>
//             <input
//               type="text"
//               placeholder="Prénom"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.firstName}
//               onChange={(e) =>
//                 setFormData({ ...formData, firstName: e.target.value })
//               }
//             />
//             {errors.firstName && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.firstName}*
//               </p>
//             )}
//           </div>
//           {/* Direction */}
//           <div className="flex flex-col ">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Direction
//             </label>
//             <input
//               type="text"
//               placeholder="Direction"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.direction}
//               onChange={(e) =>
//                 setFormData({ ...formData, direction: e.target.value })
//               }
//             />
//             {errors.direction && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.direction}*
//               </p>
//             )}
//           </div>
//           {/* Directeur BU */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Directeur BU
//             </label>
//             <input
//               type="text"
//               placeholder="Directeur BU"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.directionBu}
//               onChange={(e) =>
//                 setFormData({ ...formData, directionBu: e.target.value })
//               }
//             />
//             {errors.directionBu && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.directionBu}*
//               </p>
//             )}
//           </div>

//           {/* Interne / Externe */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Interne / Externe
//             </label>
//             <select
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.interneExterne}
//               onChange={(e) =>
//                 setFormData({ ...formData, interneExterne: e.target.value })
//               }
//             >
//               <option value="">Choisir</option>
//               <option value="Interne">Interne</option>
//               <option value="Externe">Externe</option>
//             </select>
//             {errors.interneExterne && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.interneExterne}*
//               </p>
//             )}
//           </div>
//           {/* Pièce jointe */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Pièce jointe
//             </label>
//             <input
//               type="file"
//               onChange={(e) => {

//                 setFormData({ ...formData, attachment: e.target.files[0] });
//               }}
//             />

//             {formData.attachment && (
//               <p className="text-gray-600 text-sm mt-1">
//                 Fichier sélectionné : {formData.attachment.name}
//               </p>
//             )}

// {errors.attachment && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.attachment}*
//               </p>
//             )}
//           </div>
//         </div>

//         {error && <p className="text-red-500">{error}</p>}

//         <button
//           onClick={handleNext}
//           className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-end"
//         >
//           Suivant
//         </button>
//       </div>
//     </>
//   );
// }

// function Step2({ formData, setFormData, onNext, onPrev, prediction, loadingPrediction }) {
//   const [error, setError] = useState("");
//   const [errors, setErrors] = useState({});
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.environnement) {
//       newErrors.environnement = "champ environnement est obligatoire";
//     }
//     if (!formData.schema || formData.schema.length === 0) {
//       newErrors.schema = "champ schema est obligatoire";
//     }
//     if (!formData.finalite_access) {
//       newErrors.finalite_access = "champ finalite access est obligatoire";
//     }
//     if (!formData.Details_usage) {
//       newErrors.Details_usage = "champ Details usage est obligatoire";
//     }
//     if (!formData.Duree_acces) {
//       newErrors.Duree_acces = "champ Duree acces est obligatoire";
//     }
//     if (!formData.extraction) {
//       newErrors.extraction = "champ extraction est obligatoire";
//     }

//     if (!formData.date_debut) {
//       newErrors.date_debut = "champ date_debut est obligatoire";
//     }

//     if (!formData.date_fin) {
//       newErrors.date_fin = "champ date_fin est obligatoire";
//     }
//     // Validation date début < date fin
//     if (formData.date_debut && formData.date_fin) {
//       const debut = new Date(formData.date_debut);
//       const fin = new Date(formData.date_fin);

//       if (debut > fin) {
//         newErrors.date_fin =
//           "La date de fin doit être supérieure ou égale à la date de début.";
//       }
//     }
//     return newErrors;
//   };

//   useEffect(() => {
//     const newErrors = { ...errors };
//     if (formData.environnement && newErrors.environnement) {
//       delete newErrors.environnement;
//     }
//     if (formData.schema && newErrors.schema) {
//       delete newErrors.schema;
//     }
//     if (formData.finalite_access && newErrors.finalite_access) {
//       delete newErrors.finalite_access;
//     }
//     if (formData.Details_usage && newErrors.Details_usage) {
//       delete newErrors.Details_usage;
//     }
//     if (formData.Duree_acces && newErrors.Duree_acces) {
//       delete newErrors.Duree_acces;
//     }
//     if (formData.extraction && newErrors.extraction) {
//       delete newErrors.extraction;
//     }
//     if (formData.date_debut && newErrors.date_debut) {
//       delete newErrors.date_debut;
//     }

//     if (formData.date_fin && newErrors.date_fin) {
//       delete newErrors.date_fin;
//     }
//     setErrors(newErrors);
//   }, [formData]);

//   const handleNext = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     onNext();
//     console.log("formdata::", formData);
//   };

//   useEffect(() => {
//     if (formData.environnement && formData.schema) {
//       setError("");
//     }
//   }, [formData]);

//   return (
//     <>
//       <div className="flex flex-col min-h-[65vh] justify-center">
//         <h2 className="text-2xl font-bold md:text-start text-gray-600  font-mono">
//           Détails de la demande d'accés
//         </h2>
//         <hr className="border-t border-black my-8" />

// {loadingPrediction && (
//   <div style={{ color: 'blue', marginBottom: '10px' }}>
//     Chargement de la prédiction...
//   </div>
// )}

// {!loadingPrediction && prediction && (
//   <div
//     style={{
//       padding: '10px',
//       marginBottom: '10px',
//       borderRadius: '5px',
//       backgroundColor: prediction.risk > 0.5 ? '#f8d7da' : '#d4edda',
//       color: prediction.risk > 0.5 ? '#721c24' : '#155724',
//     }}
//   >
//     {prediction.risk > 0.5
//       ? `⚠️ Risque de rejet élevé (${(prediction.risk * 100).toFixed(1)}%)`
//       : `✔️ Risque faible (${(prediction.risk * 100).toFixed(1)}%)`}
//     <br />
//     Causes probables : {(prediction.causes || []).length > 0
//       ? prediction.causes.join(', ')
//       : "Aucune cause détectée"}
//   </div>
// )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Environnement
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="Environnement"
//               value={formData.environnement}
//               onChange={(e) =>
//                 setFormData({ ...formData, environnement: e.target.value })
//               }
//             />
//             {errors.environnement && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.environnement}*
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Schéma / Table /Dashboard
//             </label>
//             <div className="flex flex-col gap-2">
//               {["Schema", "Table", "Dashboard"].map((item) => (
//                 <>
//                   <label className="flex text-center gap-2 text-gray-700">
//                     <input
//                       value={item}
//                       type="checkbox"
//                       checked={formData.schema.includes(item)}
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setFormData({
//                             ...formData,
//                             schema: [...formData.schema, item],
//                           });
//                         } else {
//                           setFormData({
//                             ...formData,
//                             schema: formData.schema.filter((i) => i !== item),
//                           });
//                         }
//                       }}
//                       className="accent-violet-500"
//                     />
//                     {item}
//                   </label>
//                 </>
//               ))}
//               {errors.schema && (
//                 <p className="text-red-500 text-sm mt-2 self-start ">
//                   {errors.schema}*
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Finalité de l'accès
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="Finalité de l'accès"
//               value={formData.finalite_access}
//               onChange={(e) =>
//                 setFormData({ ...formData, finalite_access: e.target.value })
//               }
//             />
//             {errors.finalite_access && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.finalite_access}*
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Détails d'usage
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="Détails d'usage"
//               value={formData.Details_usage}
//               onChange={(e) =>
//                 setFormData({ ...formData, Details_usage: e.target.value })
//               }
//             />
//             {errors.Details_usage && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.Details_usage}*
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Durée d'accès
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder=" Durée d'accès"
//               value={formData.Duree_acces}
//               onChange={(e) =>
//                 setFormData({ ...formData, Duree_acces: e.target.value })
//               }
//             />
//             {errors.Duree_acces && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.Duree_acces}*
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Besoin de faire des extractions
//             </label>
//             <select
//               value={formData.extraction}
//               onChange={(e) =>
//                 setFormData({ ...formData, extraction: e.target.value })
//               }
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//             >
//               <option value="">Choisir</option>
//               <option value="Oui">Oui</option>
//               <option value="Non">Non</option>
//             </select>
//             {errors.extraction && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.extraction}*
//               </p>
//             )}
//           </div>
//           {/* ✅ Date début */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Date début
//             </label>
//             <input
//               type="date"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.date_debut || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, date_debut: e.target.value })
//               }
//             />
//             {errors.date_debut && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.date_debut}*
//               </p>
//             )}
//           </div>

//           {/* ✅ Date fin */}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Date fin
//             </label>
//             <input
//               type="date"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               value={formData.date_fin || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, date_fin: e.target.value })
//               }
//             />
//             {errors.date_fin && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.date_fin}*
//               </p>
//             )}
//           </div>
//         </div>
//         {error && <p className="text-red-500">{error}</p>}
//         <div className="flex justify-between items-center">
//           <button
//             onClick={onPrev}
//             className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-start"
//           >
//             Previous
//           </button>
//           <button
//             onClick={handleNext}
//             className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-end"
//           >
//             Suivant
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  Upload,
  AlertTriangle,
  CheckCircle,
  User,
  Database,
  FileText,
  Shield,
  Building2,
  Loader2,
  Send
} from "lucide-react";
import { 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  Sparkles,
  Home,
  Calendar,
  Users,
  Award
} from 'lucide-react';

function Step1({
  formData,
  setFormData,
  onNext,
  prediction,
  loadingPrediction,
}) {
  const [error, serError] = useState("");
  const [errors, setErrors] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!formData.direction) {
      newErrors.direction = "Direction est obligatoire";
    }
    if (!formData.firstName) {
      newErrors.firstName = "Prénom est obligatoire";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Nom est obligatoire";
    }
    if (!formData.directionBu) {
      newErrors.directionBu = "Direction BU est obligatoire";
    }
    if (!formData.interneExterne) {
      newErrors.interneExterne = "Ce champ est obligatoire";
    }
    if (!formData.attachment) {
      newErrors.attachment = "Pièce jointe est obligatoire";
    }
    return newErrors;
  };

  useEffect(() => {
    const newErrors = { ...errors };

    if (formData.direction && newErrors.direction) {
      delete newErrors.direction;
    }
    if (formData.firstName && newErrors.firstName) {
      delete newErrors.firstName;
    }
    if (formData.lastName && newErrors.lastName) {
      delete newErrors.lastName;
    }
    if (formData.directionBu && newErrors.directionBu) {
      delete newErrors.directionBu;
    }
    if (formData.interneExterne && newErrors.interneExterne) {
      delete newErrors.interneExterne;
    }
    if (formData.attachment && newErrors.attachment) {
      delete newErrors.attachment;
    }
    setErrors(newErrors);
  }, [formData]);

  const handleNext = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onNext();
    console.log("formdata::", formData);
  };

  useEffect(() => {
    if (formData.direction && formData.nom && formData.prenom) {
      serError("");
    }
  }, [formData]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-violet-100 rounded-xl">
          <User className="w-6 h-6 text-violet-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Présentation du demandeur
          </h2>
          <p className="text-gray-600">
            Renseignez vos informations personnelles
          </p>
        </div>
      </div>

      {/* Prediction Display */}
      {loadingPrediction && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-blue-700 font-medium">
            Analyse de la demande en cours...
          </span>
        </div>
      )}

      {!loadingPrediction && prediction && (
        <div
          className={`mb-6 p-4 rounded-xl border ${
            prediction.risk > 0.5
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            {prediction.risk > 0.5 ? (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            <span
              className={`font-semibold ${
                prediction.risk > 0.5 ? "text-red-800" : "text-green-800"
              }`}
            >
              {prediction.risk > 0.5
                ? `Risque de rejet élevé (${(prediction.risk * 100).toFixed(
                    1
                  )}%)`
                : `Risque faible (${(prediction.risk * 100).toFixed(1)}%)`}
            </span>
          </div>
          <p
            className={`text-sm ${
              prediction.risk > 0.5 ? "text-red-700" : "text-green-700"
            }`}
          >
            Causes probables :{" "}
            {(prediction.causes || []).length > 0
              ? prediction.causes.join(", ")
              : "Aucune cause détectée"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Votre nom"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.lastName
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Prénom */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Votre prénom"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.firstName
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Direction */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Direction <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Votre direction"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.direction
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.direction}
            onChange={(e) =>
              setFormData({ ...formData, direction: e.target.value })
            }
          />
          {errors.direction && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.direction}
            </p>
          )}
        </div>

        {/* Directeur BU */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Directeur BU <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nom du directeur BU"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.directionBu
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.directionBu}
            onChange={(e) =>
              setFormData({ ...formData, directionBu: e.target.value })
            }
          />
          {errors.directionBu && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.directionBu}
            </p>
          )}
        </div>

        {/* Interne / Externe */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Statut <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.interneExterne
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.interneExterne}
            onChange={(e) =>
              setFormData({ ...formData, interneExterne: e.target.value })
            }
          >
            <option value="">Sélectionner le statut</option>
            <option value="Interne">Interne</option>
            <option value="Externe">Externe</option>
          </select>
          {errors.interneExterne && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.interneExterne}
            </p>
          )}
        </div>

        {/* Pièce jointe */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Pièce jointe <span className="text-red-500">*</span>
          </label>
          <div
            className={`relative w-full px-4 py-3 rounded-xl border-2 border-dashed transition-all duration-200 ${
              errors.attachment
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-violet-400 hover:bg-violet-50"
            }`}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                // e.target.files est une FileList, on récupère le 1er fichier
                setFormData({ ...formData, attachment: e.target.files[0] });
              }}
              
            />
            <div className="flex items-center gap-3 text-gray-600">
              <Upload className="w-5 h-5" />
              <span className="text-sm">
                {formData.attachment
                  ? formData.attachment.name
                  : "Cliquer pour sélectionner un fichier"}
              </span>
            </div>
          </div>
          {errors.attachment && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.attachment}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </p>
        </div>
      )}

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          Suivant
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function Step2({
  formData,
  setFormData,
  onNext,
  onPrev,
  prediction,
  loadingPrediction,
}) {
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.environnement) {
      newErrors.environnement = "Environnement est obligatoire";
    }
    if (!formData.schema || formData.schema.length === 0) {
      newErrors.schema = "Au moins un choix est obligatoire";
    }
    if (!formData.finalite_access) {
      newErrors.finalite_access = "Finalité d'accès est obligatoire";
    }
    if (!formData.Details_usage) {
      newErrors.Details_usage = "Détails d'usage sont obligatoires";
    }
    if (!formData.Duree_acces) {
      newErrors.Duree_acces = "Durée d'accès est obligatoire";
    }
    if (!formData.extraction) {
      newErrors.extraction = "Ce champ est obligatoire";
    }
    if (!formData.date_debut) {
      newErrors.date_debut = "Date de début est obligatoire";
    }
    if (!formData.date_fin) {
      newErrors.date_fin = "Date de fin est obligatoire";
    }

    if (formData.date_debut && formData.date_fin) {
      const debut = new Date(formData.date_debut);
      const fin = new Date(formData.date_fin);
      if (debut > fin) {
        newErrors.date_fin =
          "La date de fin doit être supérieure à la date de début";
      }
    }
    return newErrors;
  };

  useEffect(() => {
    const newErrors = { ...errors };
    Object.keys(formData).forEach((key) => {
      if (formData[key] && newErrors[key]) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  }, [formData]);

  const handleNext = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onNext();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-xl">
          <Database className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Détails de la demande d'accès
          </h2>
          <p className="text-gray-600">
            Spécifiez les détails techniques de votre demande
          </p>
        </div>
      </div>

      {/* Prediction Display */}
      {loadingPrediction && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-blue-700 font-medium">
            Analyse de la demande en cours...
          </span>
        </div>
      )}

      {!loadingPrediction && prediction && (
        <div
          className={`mb-6 p-4 rounded-xl border ${
            prediction.risk > 0.5
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            {prediction.risk > 0.5 ? (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            <span
              className={`font-semibold ${
                prediction.risk > 0.5 ? "text-red-800" : "text-green-800"
              }`}
            >
              {prediction.risk > 0.5
                ? `Risque de rejet élevé (${(prediction.risk * 100).toFixed(
                    1
                  )}%)`
                : `Risque faible (${(prediction.risk * 100).toFixed(1)}%)`}
            </span>
          </div>
          <p
            className={`text-sm ${
              prediction.risk > 0.5 ? "text-red-700" : "text-green-700"
            }`}
          >
            Causes probables :{" "}
            {(prediction.causes || []).length > 0
              ? prediction.causes.join(", ")
              : "Aucune cause détectée"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Environnement */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Environnement <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Environnement cible"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.environnement
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.environnement}
            onChange={(e) =>
              setFormData({ ...formData, environnement: e.target.value })
            }
          />
          {errors.environnement && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.environnement}
            </p>
          )}
        </div>

        {/* Schema / Table / Dashboard */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Type d'accès <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3 p-4 border-2 border-gray-200 rounded-xl">
            {["Schema", "Table", "Dashboard"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={formData.schema?.includes(item) || false}
                  onChange={(e) => {
                    const currentSchema = formData.schema || [];
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        schema: [...currentSchema, item],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        schema: currentSchema.filter((i) => i !== item),
                      });
                    }
                  }}
                  className="w-5 h-5 text-violet-600 border-2 border-gray-300 rounded focus:ring-violet-500 focus:ring-2"
                />
                <span className="text-gray-700 group-hover:text-violet-600 transition-colors">
                  {item}
                </span>
              </label>
            ))}
          </div>
          {errors.schema && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.schema}
            </p>
          )}
        </div>

        {/* Finalité de l'accès */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Finalité de l'accès <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Objectif de la demande d'accès"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.finalite_access
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.finalite_access}
            onChange={(e) =>
              setFormData({ ...formData, finalite_access: e.target.value })
            }
          />
          {errors.finalite_access && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.finalite_access}
            </p>
          )}
        </div>

        {/* Détails d'usage */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Détails d'usage <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Comment allez-vous utiliser l'accès ?"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.Details_usage
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.Details_usage}
            onChange={(e) =>
              setFormData({ ...formData, Details_usage: e.target.value })
            }
          />
          {errors.Details_usage && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.Details_usage}
            </p>
          )}
        </div>

        {/* Durée d'accès */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Durée d'accès <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ex: 6 mois, 1 an..."
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.Duree_acces
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.Duree_acces}
            onChange={(e) =>
              setFormData({ ...formData, Duree_acces: e.target.value })
            }
          />
          {errors.Duree_acces && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.Duree_acces}
            </p>
          )}
        </div>

        {/* Extraction */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Besoin d'extraction <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.extraction
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.extraction}
            onChange={(e) =>
              setFormData({ ...formData, extraction: e.target.value })
            }
          >
            <option value="">Sélectionner</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
          </select>
          {errors.extraction && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.extraction}
            </p>
          )}
        </div>

        {/* Date début */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Date de début <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.date_debut
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.date_debut || ""}
            onChange={(e) =>
              setFormData({ ...formData, date_debut: e.target.value })
            }
          />
          {errors.date_debut && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.date_debut}
            </p>
          )}
        </div>

        {/* Date fin */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Date de fin <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.date_fin
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.date_fin || ""}
            onChange={(e) =>
              setFormData({ ...formData, date_fin: e.target.value })
            }
          />
          {errors.date_fin && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.date_fin}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onPrev}
          className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Précédent
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          Suivant
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// function Step3({
//   formData,
//   setFormData,
//   onNext,
//   onPrev,
//   prediction,
//   loadingPrediction,
// }) {
//   const [error, setError] = useState("");
//   const [errorBack, setErrorBack] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const [errors, setErrors] = useState({});
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.demandeur) {
//       newErrors.demandeur = "demandeur est obligatoire";
//     }

//     if (!formData.bussiness_owner) {
//       newErrors.bussiness_owner = "bussiness_owner est obligatoire";
//     }
//     return newErrors;
//   };

//   useEffect(() => {
//     const newErrors = { ...errors };

//     if (formData.demandeur && newErrors.demandeur) {
//       delete newErrors.demandeur;
//     }

//     if (formData.bussiness_owner && newErrors.bussiness_owner) {
//       delete newErrors.bussiness_owner;
//     }
//     setErrors(newErrors);
//   }, [formData]);

//   const handleNext = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     console.log("formdata::", formData);
//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/demandes/create`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       const data = await response.json();
//       if (!response.ok) {
//         setErrorBack(data.detail);
//         setTimeout(() => {
//           setErrorBack("");
//           navigate("/");
//         }, 2000);
//         console.log("data : ", data);
//         return;
//       }
//       setSuccess(data.detail);
//       setFormData({});
//       onNext();
//       setTimeout(() => {
//         setSuccess("");
//       }, 2000);
//     } catch (error) {
//       console.error("Erreur lors de l'inscription :", error);
//       setErrorBack("Une erreur réseau est survenue. Veuillez réessayer.");
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col min-h-[50vh] justify-center">
//         {errorBack && (
//           <div
//             className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//             role="alert"
//           >
//             <span className="font-medium">Error alert!</span> {errorBack}
//           </div>
//         )}
//         {success && (
//           <div
//             className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
//             role="alert"
//           >
//             <span className="font-medium">Success alert!</span> {success}
//           </div>
//         )}
//         <div>
//           <h2 className="text-2xl font-bold md:text-start text-gray-600  font-mono">
//             Avis & Visa
//           </h2>
//           <hr className="border-t border-black my-8" />

//           {loadingPrediction && (
//             <div style={{ color: "blue", marginBottom: "10px" }}>
//               Chargement de la prédiction...
//             </div>
//           )}

//           {!loadingPrediction && prediction && (
//             <div
//               style={{
//                 padding: "10px",
//                 marginBottom: "10px",
//                 borderRadius: "5px",
//                 backgroundColor: prediction.risk > 0.5 ? "#f8d7da" : "#d4edda",
//                 color: prediction.risk > 0.5 ? "#721c24" : "#155724",
//               }}
//             >
//               {prediction.risk > 0.5
//                 ? `⚠️ Risque de rejet élevé (${(prediction.risk * 100).toFixed(
//                     1
//                   )}%)`
//                 : `✔️ Risque faible (${(prediction.risk * 100).toFixed(1)}%)`}
//               <br />
//               Causes probables :{" "}
//               {(prediction.causes || []).length > 0
//                 ? prediction.causes.join(", ")
//                 : "Aucune cause détectée"}
//             </div>
//           )}
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Demandeur
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="demandeur"
//               value={formData.demandeur}
//               onChange={(e) =>
//                 setFormData({ ...formData, demandeur: e.target.value })
//               }
//             />
//             {errors.demandeur && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.demandeur}*
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 self-start">
//               Business Owner
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="business_owner "
//               value={formData.bussiness_owner}
//               onChange={(e) =>
//                 setFormData({ ...formData, bussiness_owner: e.target.value })
//               }
//             />
//             {errors.bussiness_owner && (
//               <p className="text-red-500 text-sm mt-2 self-start ">
//                 {errors.bussiness_owner}*
//               </p>
//             )}
//           </div>
//         </div>
//         {error && <p className="text-red-500">{error}</p>}
//         <div className="flex justify-between items-center justify-center">
//           <button
//             onClick={onPrev}
//             className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-start"
//           >
//             Previous
//           </button>
//           <button
//             onClick={handleNext}
//             className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-end"
//           >
//             soummetre
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


function Step3({
  formData,
  setFormData,
  onNext,
  onPrev,
  prediction,
  loadingPrediction,
}) {
  const [error, setError] = useState("");
  const [errorBack, setErrorBack] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    if (!formData.demandeur) {
      newErrors.demandeur = "Le demandeur est obligatoire";
    }

    if (!formData.bussiness_owner) {
      newErrors.bussiness_owner = "Le propriétaire d'entreprise est obligatoire";
    }
    return newErrors;
  };

  useEffect(() => {
    const newErrors = { ...errors };

    if (formData.demandeur && newErrors.demandeur) {
      delete newErrors.demandeur;
    }

    if (formData.bussiness_owner && newErrors.bussiness_owner) {
      delete newErrors.bussiness_owner;
    }
    setErrors(newErrors);
  }, [formData]);

  // const handleNext = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = validate();

  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   console.log("formdata::", formData);
    
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/api/demandes/create`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );
  //     const data = await response.json();
      
  //     if (!response.ok) {
  //       setErrorBack(data.detail);
  //       setTimeout(() => {
  //         setErrorBack("");
  //         navigate("/");
  //       }, 3000);
  //       console.log("data : ", data);
  //       return;
  //     }
      
  //     setSuccess(data.detail);
  //     setFormData({});
  //     onNext();
  //     setTimeout(() => {
  //       setSuccess("");
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Erreur lors de l'inscription :", error);
  //     setErrorBack("Une erreur réseau est survenue. Veuillez réessayer.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

const handleNext = async () => {
  try {
    // Create FormData object to handle file upload
    const formDataToSend = new FormData();

    // Append all form fields
    formDataToSend.append('demandeur', formData.demandeur);
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('Details_usage', formData.Details_usage);
    formDataToSend.append('Duree_acces', formData.Duree_acces);
    formDataToSend.append('bussiness_owner', formData.bussiness_owner);
    formDataToSend.append('date_debut', formData.date_debut);
    formDataToSend.append('date_fin', formData.date_fin);
    formDataToSend.append('direction', formData.direction);
    formDataToSend.append('directionBu', formData.directionBu);
    formDataToSend.append('environnement', formData.environnement);
    formDataToSend.append('extraction', formData.extraction);
    formDataToSend.append('finalite_access', formData.finalite_access);
    formDataToSend.append('interneExterne', formData.interneExterne);

    // Handle schema array - convert to JSON string
    formDataToSend.append('schema', JSON.stringify(formData.schema));

    // Handle file attachment
    if (formData.attachment && formData.attachment instanceof File) {
      formDataToSend.append('attachment', formData.attachment);
    }

    const response = await fetch(`${process.env.REACT_APP_BACK_URL}/api/demandes/create`, {
      method: "POST",
      headers: {
        // Remove Content-Type header - let browser set it with boundary for FormData
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formDataToSend, // Use FormData instead of JSON.stringify
    });

    const data = await response.json();
    if (!response.ok) {
      setErrorBack(data.message || data.detail);
      setTimeout(() => {
        setErrorBack("");
        navigate("/");
      }, 2000);
      console.log("data : ", data);
      return;
    }

    setSuccess(data.message || data.detail);
    setFormData({});
    onNext();
    setTimeout(() => {
      setSuccess("");
    }, 2000);
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    setErrorBack("Une erreur réseau est survenue. Veuillez réessayer.");
  }
};



  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-violet-100 rounded-xl">
          <User className="w-6 h-6 text-violet-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Avis & Visa
          </h2>
          <p className="text-gray-600">
            Informations sur les responsables de la demande
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {errorBack && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <span className="font-semibold text-red-800">Erreur!</span>
            <p className="text-red-700 text-sm mt-1">{errorBack}</p>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <span className="font-semibold text-green-800">Succès!</span>
            <p className="text-green-700 text-sm mt-1">{success}</p>
          </div>
        </div>
      )}

      {/* Prediction Display */}
      {loadingPrediction && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-blue-700 font-medium">
            Analyse de la demande en cours...
          </span>
        </div>
      )}

      {!loadingPrediction && prediction && (
        <div
          className={`mb-6 p-4 rounded-xl border ${
            prediction.risk > 0.5
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            {prediction.risk > 0.5 ? (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            <span
              className={`font-semibold ${
                prediction.risk > 0.5 ? "text-red-800" : "text-green-800"
              }`}
            >
              {prediction.risk > 0.5
                ? `⚠️ Risque de rejet élevé (${(prediction.risk * 100).toFixed(1)}%)`
                : `✔️ Risque faible (${(prediction.risk * 100).toFixed(1)}%)`}
            </span>
          </div>
          <p
            className={`text-sm ${
              prediction.risk > 0.5 ? "text-red-700" : "text-green-700"
            }`}
          >
            Causes probables :{" "}
            {(prediction.causes || []).length > 0
              ? prediction.causes.join(", ")
              : "Aucune cause détectée"}
          </p>
        </div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Demandeur */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4" />
            Demandeur <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nom du demandeur"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.demandeur
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.demandeur || ""}
            onChange={(e) =>
              setFormData({ ...formData, demandeur: e.target.value })
            }
          />
          {errors.demandeur && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.demandeur}
            </p>
          )}
        </div>

        {/* Business Owner */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Propriétaire d'entreprise <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nom du propriétaire d'entreprise"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              errors.bussiness_owner
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-violet-500 hover:border-gray-300"
            }`}
            value={formData.bussiness_owner || ""}
            onChange={(e) =>
              setFormData({ ...formData, bussiness_owner: e.target.value })
            }
          />
          {errors.bussiness_owner && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.bussiness_owner}
            </p>
          )}
        </div>
      </div>

      {/* General Error */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onPrev}
          disabled={isSubmitting}
          className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Précédent
        </button>
        
        <button
          onClick={handleNext}
          disabled={isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Soumission...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Soumettre
            </>
          )}
        </button>
      </div>
    </div>
  );
}


// function Validate() {
//   const navigate = useNavigate();
//   return (
//     <div className="relative flex flex-col min-h-[60vh] justify-center items-center text-center px-4">
//       {/* Image */}
//       <div className="w-40 h-40 mb-6 animate-fade-in">
//         <img
//           src="/images/image_validate.png" // depuis /public
//           alt="Validation"
//           className="w-full h-full object-contain"
//         />
//       </div>

//       {/* Titre */}
//       <h2 className="text-2xl font-bold text-violet-600 mb-2">
//         Demande validée !
//       </h2>

//       {/* Texte */}
//       <p className="text-gray-500">
//         Vous pouvez maintenant voir le statut de votre demande.
//       </p>
//       <div className="absolute bottom-4 right-4">
//         <button
//           className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300"
//           onClick={() => {
//             navigate("/");
//           }}
//         >
//           Voir la demande
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function Formulaire() {
//   const [step, setStep] = useState(0);
//   const [formData, setFormData] = useState({
//     schema: [],
//   });

//   const [prediction, setPrediction] = useState(null); // { score: 0.76, reasons: [...] }
//   const [loadingPrediction, setLoadingPrediction] = useState(false);

//   const steps = [1, 2, 3, 4];

//   useEffect(() => {
//     const fetchPrediction = async () => {
//       // Ignorer si les champs importants ne sont pas remplis
//       const champsUtiles = Object.values(formData).filter(
//         (val) =>
//           val !== null &&
//           val !== "" &&
//           !(Array.isArray(val) && val.length === 0)
//       );
//       if (champsUtiles.length < 2) {
//         setPrediction(null);
//         return;
//       }

//       setLoadingPrediction(true);
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_BACK_URL}/api/predict`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(formData),
//           }
//         );

//         if (!response.ok) {
//           console.error("Erreur de prédiction :", response.statusText);
//           setPrediction(null);
//         } else {
//           const data = await response.json();
//           console.log("Réponse prediction API:", data);

//           setPrediction({
//             risk: data.probabiliteRejet,
//             causes: data.causesProbables || [],
//           });
//         }
//       } catch (error) {
//         console.error("Erreur réseau :", error);
//         setPrediction(null);
//       } finally {
//         setLoadingPrediction(false);
//       }
//     };

//     fetchPrediction();
//   }, [formData]);
//   return (
//     <>
//       <div className="p-4 max-w-5xl mx-auto content ">
//         <div>
//           <h2 className="text-2xl font-bold md:text-start text-gray-600  font-mono">
//             Demande D'acces
//           </h2>
//           <div className="flex justify-between mt-16 items-center">
//             {steps.map((stp, index) => {
//               return (
//                 <>
//                   <div
//                     key={index}
//                     className={`${
//                       step >= index
//                         ? "bg-violet-500 text-white"
//                         : "bg-gray-300 text-violet-500"
//                     }  rounded-full w-16 h-16  flex  text-center items-center justify-center border`}
//                   >
//                     <p className=" font-bold  text-center">{stp}</p>
//                   </div>
//                   {index < steps.length - 1 && (
//                     <div className="flex-1 border-black border-t bg-gray-600 mx-2"></div>
//                   )}
//                 </>
//               );
//             })}
//           </div>
//         </div>

//         {step === 0 && (
//           <Step1
//             formData={formData}
//             setFormData={setFormData}
//             onNext={() => setStep(step + 1)}
//             prediction={prediction}
//             loadingPrediction={loadingPrediction}
//           />
//         )}

//         {step === 1 && (
//           <Step2
//             formData={formData}
//             setFormData={setFormData}
//             onNext={() => setStep(step + 1)}
//             onPrev={() => setStep(step - 1)}
//             prediction={prediction}
//             loadingPrediction={loadingPrediction}
//           />
//         )}
//         {step === 2 && (
//           <Step3
//             formData={formData}
//             setFormData={setFormData}
//             onNext={() => setStep(step + 1)}
//             onPrev={() => setStep(step - 1)}
//             prediction={prediction}
//             loadingPrediction={loadingPrediction}
//           />
//         )}
//         {step === 3 && <Validate />}
//       </div>
//     </>
//   );
// }


function Validate() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Success Animation */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-2 -right-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-yellow-800" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            🎉 Demande validée !
          </h2>
          <p className="text-gray-600 text-lg max-w-md">
            Félicitations ! Votre demande d'accès a été soumise avec succès. 
            Vous pouvez maintenant suivre son statut depuis votre tableau de bord.
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          <div className="bg-green-50 p-3 rounded-xl text-center">
            <FileCheck className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-xs text-green-700 font-medium">Validé</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl text-center">
            <Database className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-blue-700 font-medium">Traité</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-xl text-center">
            <Award className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <p className="text-xs text-purple-700 font-medium">Terminé</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3 group"
        >
          <Home className="w-5 h-5" />
          Voir le tableau de bord
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Additional Info */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 w-full max-w-md">
          <p className="text-sm text-blue-800">
            <strong>Prochaine étape :</strong> Vous recevrez une notification par email 
            dès que votre demande sera examinée par notre équipe.
          </p>
        </div>
      </div>
    </div>
  );
}

// Modern Formulaire Component
export default function Formulaire() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    schema: [],
  });

  const [prediction, setPrediction] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  const steps = [
    { number: 1, title: "Informations", icon: Users },
    { number: 2, title: "Détails", icon: Database },
    { number: 3, title: "Validation", icon: FileCheck },
    { number: 4, title: "Confirmation", icon: CheckCircle2 }
  ];

  useEffect(() => {
    const fetchPrediction = async () => {
      // Ignorer si les champs importants ne sont pas remplis
      const champsUtiles = Object.values(formData).filter(
        (val) =>
          val !== null &&
          val !== "" &&
          !(Array.isArray(val) && val.length === 0)
      );
      if (champsUtiles.length < 2) {
        setPrediction(null);
        return;
      }

      setLoadingPrediction(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACK_URL}/api/predict`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          console.error("Erreur de prédiction :", response.statusText);
          setPrediction(null);
        } else {
          const data = await response.json();
          console.log("Réponse prediction API:", data);

          setPrediction({
            risk: data.probabiliteRejet,
            causes: data.causesProbables || [],
          });
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        setPrediction(null);
      } finally {
        setLoadingPrediction(false);
      }
    };

    fetchPrediction();
  }, [formData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-28">
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Demande d'Accès
          </h1>
          <p className="text-gray-600 text-lg">
            Suivez les étapes pour soumettre votre demande d'accès aux données
          </p>
        </div>

        {/* Modern Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((stepInfo, index) => {
              const isActive = step >= index;
              const isCurrent = step === index;
              const IconComponent = stepInfo.icon;
              
              return (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className={`
                        relative w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300
                        ${isActive 
                          ? 'bg-gradient-to-br from-violet-500 to-purple-600 border-violet-500 shadow-lg' 
                          : 'bg-white border-gray-300 hover:border-gray-400'
                        }
                        ${isCurrent ? 'ring-4 ring-violet-200 scale-110' : ''}
                      `}
                    >
                      <IconComponent 
                        className={`w-7 h-7 ${isActive ? 'text-white' : 'text-gray-400'}`} 
                      />
                      {isActive && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className={`font-semibold text-sm ${isActive ? 'text-violet-600' : 'text-gray-400'}`}>
                        Étape {stepInfo.number}
                      </p>
                      <p className={`text-xs ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                        {stepInfo.title}
                      </p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-4 relative">
                      <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-500 ${
                          step > index ? 'w-full' : 'w-0'
                        }`}
                      ></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {step === 0 && (
            <Step1
              formData={formData}
              setFormData={setFormData}
              onNext={() => setStep(step + 1)}
              prediction={prediction}
              loadingPrediction={loadingPrediction}
            />
          )}

          {step === 1 && (
            <Step2
              formData={formData}
              setFormData={setFormData}
              onNext={() => setStep(step + 1)}
              onPrev={() => setStep(step - 1)}
              prediction={prediction}
              loadingPrediction={loadingPrediction}
            />
          )}

          {step === 2 && (
            <Step3
              formData={formData}
              setFormData={setFormData}
              onNext={() => setStep(step + 1)}
              onPrev={() => setStep(step - 1)}
              prediction={prediction}
              loadingPrediction={loadingPrediction}
            />
          )}

          {step === 3 && <Validate />}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Besoin d'aide ? Contactez notre équipe support</p>
        </div>
      </div>
    </div>
  );
}