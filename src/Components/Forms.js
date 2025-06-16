import { useState, useEffect, useDebugValue } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Step1({ formData, setFormData, onNext }) {
  const [error, serError] = useState("");
  const [errors, setErrors] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!formData.direction) {
      newErrors.direction = "direction est obligatoire";
    }
    if (!formData.firstName) {
      newErrors.firstName = "prenom est obligatoire ";
    }
    if (!formData.lastName) {
      newErrors.lastName = "nom est obligatoire ";
    }

    if (!formData.directionBu) {
      newErrors.directionBu = "direction Bu est obligatoire";
    }
    if (!formData.interneExterne) {
      newErrors.interneExterne = "ce champ est obligatoire";
    }
    if (!formData.attachment) {
      newErrors.attachment = "ce champ de attachement est obligatoire";
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
    // if (!formData.direction || !formData.firstname || !formData.lastname) {
    //   serError("Tous les champs marques sont obligatoires.");
    //   return;
    // }
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
    <>
      <div className="flex flex-col min-h-[65vh] justify-center">
        <h2 className="text-2xl font-bold md:text-start text-gray-600  font-mono">
          Présentation du demandeur
        </h2>
        <hr className="border-t border-black my-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          {/* Nom */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Nom
            </label>
            <input
              type="text"
              placeholder="Nom"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.lastName}*
              </p>
            )}
          </div>

          {/* Prénom */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Prénom
            </label>
            <input
              type="text"
              placeholder="Prénom"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.firstName}*
              </p>
            )}
          </div>
          {/* Direction */}
          <div className="flex flex-col ">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Direction
            </label>
            <input
              type="text"
              placeholder="Direction"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={formData.direction}
              onChange={(e) =>
                setFormData({ ...formData, direction: e.target.value })
              }
            />
            {errors.direction && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.direction}*
              </p>
            )}
          </div>
          {/* Directeur BU */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Directeur BU
            </label>
            <input
              type="text"
              placeholder="Directeur BU"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={formData.directionBu}
              onChange={(e) =>
                setFormData({ ...formData, directionBu: e.target.value })
              }
            />
            {errors.directionBu && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.directionBu}*
              </p>
            )}
          </div>

          {/* Interne / Externe */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Interne / Externe
            </label>
            <select
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={formData.interneExterne}
              onChange={(e) =>
                setFormData({ ...formData, interneExterne: e.target.value })
              }
            >
              <option value="">Choisir</option>
              <option value="Interne">Interne</option>
              <option value="Externe">Externe</option>
            </select>
            {errors.interneExterne && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.interneExterne}*
              </p>
            )}
          </div>
          {/* Pièce jointe */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Pièce jointe
            </label>
            <input
              type="file"
              onChange={(e) => {
                // e.target.files est une FileList, on récupère le 1er fichier
                setFormData({ ...formData, attachment: e.target.files[0] });
              }}
            />
            {/* Optionnel : afficher le nom du fichier sélectionné */}
            {formData.attachment && (
              <p className="text-gray-600 text-sm mt-1">
                Fichier sélectionné : {formData.attachment.name}
              </p>
            )}

{errors.attachment && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.attachment}*
              </p>
            )}
          </div>

          {/* SPOC Data */}
          {/* <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              SPOC Data
            </label>
            <input
              type="text"
              placeholder="SPOC Data"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={formData.spocData}
              onChange={(e) =>
                setFormData({ ...formData, spocData: e.target.value })
              }
            />
          </div> */}

          {/* SPOC DT */}
          {/* <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              SPOC DT
            </label>
            <input
              type="text"
              placeholder="SPOC DT"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={formData.spocDt}
              onChange={(e) =>
                setFormData({ ...formData, spocDt: e.target.value })
              }
            />
          </div> */}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleNext}
          className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-end"
        >
          Suivant
        </button>
      </div>
    </>
  );
}

function Step2({ formData, setFormData, onNext, onPrev }) {
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};

    if (!formData.environnement) {
      newErrors.environnement = "champ environnement est obligatoire";
    }
    if (!formData.schema || formData.schema.length === 0) {
      newErrors.schema = "champ schema est obligatoire";
    }
    if (!formData.finalite_access) {
      newErrors.finalite_access = "champ finalite access est obligatoire";
    }
    if (!formData.Details_usage) {
      newErrors.Details_usage = "champ Details usage est obligatoire";
    }
    if (!formData.Duree_acces) {
      newErrors.Duree_acces = "champ Duree acces est obligatoire";
    }
    if (!formData.extraction) {
      newErrors.extraction = "champ extraction est obligatoire";
    }

    if (!formData.date_debut) {
      newErrors.date_debut = "champ date_debut est obligatoire";
    }

    if (!formData.date_fin) {
      newErrors.date_fin = "champ date_fin est obligatoire";
    }
    // Validation date début < date fin
    if (formData.date_debut && formData.date_fin) {
      const debut = new Date(formData.date_debut);
      const fin = new Date(formData.date_fin);

      if (debut > fin) {
        newErrors.date_fin =
          "La date de fin doit être supérieure ou égale à la date de début.";
      }
    }
    return newErrors;
  };

  useEffect(() => {
    const newErrors = { ...errors };
    if (formData.environnement && newErrors.environnement) {
      delete newErrors.environnement;
    }
    if (formData.schema && newErrors.schema) {
      delete newErrors.schema;
    }
    if (formData.finalite_access && newErrors.finalite_access) {
      delete newErrors.finalite_access;
    }
    if (formData.Details_usage && newErrors.Details_usage) {
      delete newErrors.Details_usage;
    }
    if (formData.Duree_acces && newErrors.Duree_acces) {
      delete newErrors.Duree_acces;
    }
    if (formData.extraction && newErrors.extraction) {
      delete newErrors.extraction;
    }
    if (formData.date_debut && newErrors.date_debut) {
      delete newErrors.date_debut;
    }

    if (formData.date_fin && newErrors.date_fin) {
      delete newErrors.date_fin;
    }
    setErrors(newErrors);
  }, [formData]);

  const handleNext = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    // if (!formData.environnement || !formData.schema) {
    //   setError("Tous les champs marques sont obligatoires.");
    //   return;
    // }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onNext();
    console.log("formdata::", formData);
  };

  useEffect(() => {
    if (formData.environnement && formData.schema) {
      setError("");
    }
  }, [formData]);

  return (
    <>
      <div className="flex flex-col min-h-[65vh] justify-center">
        <h2 className="text-2xl font-bold md:text-start text-gray-600  font-mono">
          Détails de la demande d'accés
        </h2>
        <hr className="border-t border-black my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Environnement
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Environnement"
              value={formData.environnement}
              onChange={(e) =>
                setFormData({ ...formData, environnement: e.target.value })
              }
            />
            {errors.environnement && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.environnement}*
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Schéma / Table /Dashboard
            </label>
            <div className="flex flex-col gap-2">
              {["Schema", "Table", "Dashboard"].map((item) => (
                <>
                  <label className="flex text-center gap-2 text-gray-700">
                    <input
                      value={item}
                      type="checkbox"
                      checked={formData.schema.includes(item)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            schema: [...formData.schema, item],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            schema: formData.schema.filter((i) => i !== item),
                          });
                        }
                      }}
                      className="accent-violet-500"
                    />
                    {item}
                  </label>
                </>
              ))}
              {errors.schema && (
                <p className="text-red-500 text-sm mt-2 self-start ">
                  {errors.schema}*
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Finalité de l'accès
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Finalité de l'accès"
              value={formData.finalite_access}
              onChange={(e) =>
                setFormData({ ...formData, finalite_access: e.target.value })
              }
            />
            {errors.finalite_access && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.finalite_access}*
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Détails d'usage
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Détails d'usage"
              value={formData.Details_usage}
              onChange={(e) =>
                setFormData({ ...formData, Details_usage: e.target.value })
              }
            />
            {errors.Details_usage && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.Details_usage}*
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Durée d'accès
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder=" Durée d'accès"
              value={formData.Duree_acces}
              onChange={(e) =>
                setFormData({ ...formData, Duree_acces: e.target.value })
              }
            />
            {errors.Duree_acces && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.Duree_acces}*
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Besoin de faire des extractions
            </label>
            <select
              value={formData.extraction}
              onChange={(e) =>
                setFormData({ ...formData, extraction: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Choisir</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
            {errors.extraction && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.extraction}*
              </p>
            )}
          </div>
          {/* ✅ Date début */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Date début
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={formData.date_debut || ""}
              onChange={(e) =>
                setFormData({ ...formData, date_debut: e.target.value })
              }
            />
            {errors.date_debut && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.date_debut}*
              </p>
            )}
          </div>

          {/* ✅ Date fin */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Date fin
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={formData.date_fin || ""}
              onChange={(e) =>
                setFormData({ ...formData, date_fin: e.target.value })
              }
            />
            {errors.date_fin && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.date_fin}*
              </p>
            )}
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between items-center">
          <button
            onClick={onPrev}
            className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-start"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-end"
          >
            Suivant
          </button>
        </div>
      </div>
    </>
  );
}

function Step3({ formData, setFormData, onNext, onPrev }) {
  const [error, setError] = useState("");
  const [errorBack, setErrorBack] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!formData.demandeur) {
      newErrors.demandeur = "demandeur est obligatoire";
    }

    if (!formData.bussiness_owner) {
      newErrors.bussiness_owner = "bussiness_owner est obligatoire";
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

// Frontend - Corrected version
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

    const response = await fetch(`http://localhost:3001/api/demandes/create`, {
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
    <>
      <div className="flex flex-col min-h-[50vh] justify-center">
        {errorBack && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Error alert!</span> {errorBack}
          </div>
        )}
        {success && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">Success alert!</span> {success}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold md:text-start text-gray-600  font-mono">
            Avis & Visa
          </h2>
          <hr className="border-t border-black my-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Demandeur
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="demandeur"
              value={formData.demandeur}
              onChange={(e) =>
                setFormData({ ...formData, demandeur: e.target.value })
              }
            />
            {errors.demandeur && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.demandeur}*
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 self-start">
              Business Owner
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="business_owner "
              value={formData.bussiness_owner}
              onChange={(e) =>
                setFormData({ ...formData, bussiness_owner: e.target.value })
              }
            />
            {errors.bussiness_owner && (
              <p className="text-red-500 text-sm mt-2 self-start ">
                {errors.bussiness_owner}*
              </p>
            )}
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between items-center justify-center">
          <button
            onClick={onPrev}
            className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-start"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300 self-end"
          >
            soummetre
          </button>
        </div>
      </div>
    </>
  );
}

function Validate() {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col min-h-[60vh] justify-center items-center text-center px-4">
      {/* Image */}
      <div className="w-40 h-40 mb-6 animate-fade-in">
        <img
          src="/images/image_validate.png" // depuis /public
          alt="Validation"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Titre */}
      <h2 className="text-2xl font-bold text-violet-600 mb-2">
        Demande validée !
      </h2>

      {/* Texte */}
      <p className="text-gray-500">
        Vous pouvez maintenant voir le statut de votre demande.
      </p>
      <div className="absolute bottom-4 right-4">
        <button
          className="bg-violet-500 text-white px-4 py-2 font-bold rounded hover:scale-105 transition-transform duration-300"
          onClick={() => {
            navigate("/");
          }}
        >
          Voir la demande
        </button>
      </div>
    </div>
  );
}

export default function Formulaire() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    schema: [],
  });
  const steps = [1, 2, 3, 4];
  return (
    <>
      <div className="p-4 max-w-5xl mx-auto content ">
        <div>
          <h2 className="text-2xl font-bold md:text-start text-gray-600  font-mono">
            Demande D'acces
          </h2>
          <div className="flex justify-between mt-16 items-center">
            {steps.map((stp, index) => {
              return (
                <>
                  <div
                    key={index}
                    className={`${
                      step >= index
                        ? "bg-violet-500 text-white"
                        : "bg-gray-300 text-violet-500"
                    }  rounded-full w-16 h-16  flex  text-center items-center justify-center border`}
                  >
                    <p className=" font-bold  text-center">{stp}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 border-black border-t bg-gray-600 mx-2"></div>
                  )}
                </>
              );
            })}
          </div>
        </div>

        {step === 0 && (
          <Step1
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(step + 1)}
          />
        )}

        {step === 1 && (
          <Step2
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(step + 1)}
            onPrev={() => setStep(step - 1)}
          />
        )}
        {step === 2 && (
          <Step3
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(step + 1)}
            onPrev={() => setStep(step - 1)}
          />
        )}
        {step === 3 && <Validate />}
      </div>
    </>
  );
}

