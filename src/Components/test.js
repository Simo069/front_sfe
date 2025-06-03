// // Formulaire multi-étapes avec validations simples
// import React, { useState } from "react";

// function Step1({ formData, setFormData, onNext }) {
//   const [error, setError] = useState("");

//   const handleNext = () => {
//     if (!formData.direction || !formData.nomPrenom || !formData.interneExterne) {
//       setError("Tous les champs marqués sont obligatoires.");
//       return;
//     }
//     onNext();
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold">Présentation du demandeur</h2>
//       <div className="mb-4">
//         <label>Direction *</label>
//         <input type="text" value={formData.direction} onChange={e => setFormData({ ...formData, direction: e.target.value })} className="border p-2 w-full" />
//       </div>
//       <div className="mb-4">
//         <label>Nom et prénom *</label>
//         <input type="text" value={formData.nomPrenom} onChange={e => setFormData({ ...formData, nomPrenom: e.target.value })} className="border p-2 w-full" />
//       </div>
//       <div className="mb-4">
//         <label>Interne / Externe *</label>
//         <select value={formData.interneExterne} onChange={e => setFormData({ ...formData, interneExterne: e.target.value })} className="border p-2 w-full">
//           <option value="">Choisir</option>
//           <option value="Interne">Interne</option>
//           <option value="Externe">Externe</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label>Directeur BU</label>
//         <input type="text" value={formData.directeurBU} onChange={e => setFormData({ ...formData, directeurBU: e.target.value })} className="border p-2 w-full" />
//       </div>
//       <div className="mb-4">
//         <label>SPOC Data</label>
//         <input type="text" value={formData.spocData} onChange={e => setFormData({ ...formData, spocData: e.target.value })} className="border p-2 w-full" />
//       </div>
//       <div className="mb-4">
//         <label>SPOC DT</label>
//         <input type="text" value={formData.spocDT} onChange={e => setFormData({ ...formData, spocDT: e.target.value })} className="border p-2 w-full" />
//       </div>
//       {error && <p className="text-red-500">{error}</p>}
//       <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Suivant</button>
//     </div>
//   );
// }

// function Step2({ formData, setFormData, onNext, onPrev }) {
//   const [error, setError] = useState("");
//   const handleNext = () => {
//     if (!formData.environnement || !formData.tables || !formData.finalite) {
//       setError("Tous les champs marqués sont obligatoires.");
//       return;
//     }
//     onNext();
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold">Détails de la demande d'accès</h2>
//       <div className="mb-4">
//         <label>Environnement *</label>
//         <input type="text" value={formData.environnement} onChange={e => setFormData({ ...formData, environnement: e.target.value })} className="border p-2 w-full" />
//       </div>
//       <div className="mb-4">
//         <label>Schéma / Tables / Dashboard *</label>
//         <input type="text" value={formData.tables} onChange={e => setFormData({ ...formData, tables: e.target.value })} className="border p-2 w-full" />
//       </div>
//       <div className="mb-4">
//         <label>Finalité de l'accès *</label>
//         <textarea value={formData.finalite} onChange={e => setFormData({ ...formData, finalite: e.target.value })} className="border p-2 w-full" />
//       </div>
//       <div className="mb-4">
//         <label>Détails d'usage</label>
//         <textarea value={formData.usage} onChange={e => setFormData({ ...formData, usage: e.target.value })} className="border p-2 w-full" />
//       </div>
//       <div className="mb-4">
//         <label>Durée d'accès</label>
//         <input type="text" value={formData.duree} onChange={e => setFormData({ ...formData, duree: e.target.value })} className="border p-2 w-full" />
//       </div>
//       <div className="mb-4">
//         <label>Besoin de faire des extractions</label>
//         <select value={formData.extraire} onChange={e => setFormData({ ...formData, extraire: e.target.value })} className="border p-2 w-full">
//           <option value="">Choisir</option>
//           <option value="Oui">Oui</option>
//           <option value="Non">Non</option>
//         </select>
//       </div>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="flex justify-between">
//         <button onClick={onPrev} className="bg-gray-400 text-white px-4 py-2 rounded">Précédent</button>
//         <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Suivant</button>
//       </div>
//     </div>
//   );
// }

// function Step3({ formData, setFormData, onPrev }) {
//   return (
//     <div>
//       <h2 className="text-xl font-bold">Avis & Visa</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {[
//           "avisSpocData", "avisSpocDT", "avisBusinessOwner", "visaDemandeur", "visaDirecteurBU",
//           "visaBusinessOwner", "visaSpocData", "visaSpocDT", "statutDemande"
//         ].map(field => (
//           <div key={field}>
//             <label>{field.replace(/([A-Z])/g, " $1")}</label>
//             <input
//               type="text"
//               value={formData[field] || ""}
//               onChange={e => setFormData({ ...formData, [field]: e.target.value })}
//               className="border p-2 w-full"
//             />
//           </div>
//         ))}
//       </div>
//       <button onClick={onPrev} className="mt-4 bg-gray-400 text-white px-4 py-2 rounded">Précédent</button>
//     </div>
//   );
// }

// export default function Formulaire() {
//   const [step, setStep] = useState(0);
//   const [formData, setFormData] = useState({});

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       {step === 0 && (
//         <Step1 formData={formData} setFormData={setFormData} onNext={() => setStep(step + 1)} />
//       )}
//       {step === 1 && (
//         <Step2
//           formData={formData}
//           setFormData={setFormData}
//           onNext={() => setStep(step + 1)}
//           onPrev={() => setStep(step - 1)}
//         />
//       )}
//       {step === 2 && (
//         <Step3 formData={formData} setFormData={setFormData} onPrev={() => setStep(step - 1)} />
//       )}
//     </div>
//   );
// }


import { useState } from "react";

const ProfileMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Circle Profile Image */}
      <div className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center text-white font-bold">
        U
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
          <a
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </a>
          <button
            onClick={onLogout}
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
