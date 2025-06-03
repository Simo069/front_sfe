import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function Register() {
  const [errorBack, setErrorBack] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    terms: false,
    
  });
  const [errors, setErrors] = useState({});

  const {register}= useAuth();


  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "prenom est obligatoire ";
    }
    if (!formData.lastName) {
      newErrors.lastName = "nom est obligatoire ";
    }
    if (!formData.email) {
      newErrors.email = "Email est obligatoire ";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid format de email";
    }
    if (!formData.password) {
      newErrors.password = "Password est obligatoire ";
    } else if (formData.password.length < 7) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmpassword) {
      newErrors.confirmpassword = "ce champ est obligatoire";
    } else if (formData.confirmpassword !== formData.password) {
      newErrors.confirmpassword = "Password ne sont pas les memes ";
    }
    if (!formData.terms) {
      newErrors.terms = "Vous devez accepter les conditions";
    }
    return newErrors;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = validate();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //   } else {
  //     setErrors({});
  //     console.log("Form Data:", formData);
  //     try {
  //       const response = await fetch("http://localhost:8000/api/register/", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       const data = await response.json();
  //       console.log("data", data);
  //       if (!response.ok) {
  //         // Affiche l'erreur retournée par l'API
  //         setErrorBack(
  //           data.details || "Échec de l'inscription, veuillez réessayer."
  //         );
  //         setTimeout(() => {
  //           setErrorBack("");
  //         }, 3000);
  //         console.log("error ", data.details);
  //         return;
  //       }

  //       setSuccess(data.details);
  //       console.log("Inscription réussie :", data);

  //       // Reset formulaire
  //       setFormData({
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         password: "",
  //         confirmpassword: "",
  //         terms: false,
  //       });

  //       // Redirection après 2s
  //       setTimeout(() => {
  //         navigate("/login");
  //         setSuccess("");
  //       }, 2000);
  //     } catch (error) {
  //       console.error("Erreur lors de l'inscription :", error);
  //       setErrorBack("Une erreur réseau est survenue. Veuillez réessayer.");
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form Data:", formData);
      try {


        setFormData({...formData , username:formData.email});
        const result = await register(formData);
        console.log("resultadas", result);
        if (!result.success) {
          // Affiche l'erreur retournée par l'API
          setErrorBack(
            result.message || "Échec de l'inscription, veuillez réessayer."
          );
          setTimeout(() => {
            setErrorBack("");
          }, 3000);
          console.log("error ", result.success);
          return;
        }

        setSuccess(result.message || "Inscription réussie");
        

        // Reset formulaire
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmpassword: "",
          terms: false,
          
        });

        // Redirection après 2s
        setTimeout(() => {
          navigate("/login");
          setSuccess("");
        }, 2000);
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        setErrorBack("Une erreur réseau est survenue. Veuillez réessayer.");
      }
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  useEffect(() => {
    const newErrors = { ...errors };
    if (formData.firstName && errors.firstName) {
      delete newErrors.firstName;
    }
    if (formData.lastName && errors.lastName) {
      delete newErrors.lastName;
    }
    if (
      formData.email &&
      /^\S+@\S+\.\S+$/.test(formData.email) &&
      errors.email
    ) {
      delete newErrors.email;
    }
    if (formData.password && formData.password.length >= 6 && errors.password) {
      delete newErrors.password;
    }
    if (
      formData.confirmpassword === formData.password &&
      errors.confirmpassword
    ) {
      delete newErrors.confirmpassword;
    }
    if (formData.terms) {
      delete newErrors.terms;
    }

    setErrors(newErrors);
  }, [formData]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 content">
        <div className="flex flex-col items-center mx-auto justify-center md:min-h-[95vh] ">
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
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <h1>SFE</h1>
          </div>
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              créer un compte
              </h1>
              <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
                <div className="flex flex-col items-start ">
                  <label
                    for="firstName"
                    className="block mb-2 text-md font-semibold text-gray-600 dark:text-white  "
                  >
                    prénom
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="prénom"
                    className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 "
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm  ">
                      {errors.firstName}*
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-start ">
                  <label
                    for="lastName"
                    className="block mb-2 text-md font-semibold text-gray-600 dark:text-white  "
                  >
                    nom de famille
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="nom de famille"
                    className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 "
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm ">{errors.lastName}*</p>
                  )}
                </div>
                <div className="flex flex-col items-start ">
                  <label
                    for="email"
                    className="block mb-2 text-md font-semibold text-gray-600 dark:text-white  "
                  >
                    votre email
                  </label>
                  <input
                    id="email"
                    name="email"
                    placeholder="email"
                    className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 "
                    onChange={handleChange}
                    value={formData.email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm ">{errors.email}*</p>
                  )}
                </div>
                <div className="flex flex-col items-start ">
                  <label
                    for="password"
                    className="block mb-2 text-md font-semibold text-gray-600 dark:text-white  "
                  >
                    mot de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    placeholder="mot de passe"
                    className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 "
                    onChange={handleChange}
                    value={formData.password}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm ">{errors.password}*</p>
                  )}
                </div>
                <div className="flex flex-col items-start ">
                  <label
                    for="confirmpassword"
                    className="block mb-2 text-md font-semibold text-gray-600 dark:text-white  "
                  >
                    Confirmer le mot de passe
                  </label>
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder="Confirmer le mot de passe"
                    className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 "
                    onChange={handleChange}
                    value={formData.confirmpassword}
                  />
                  {errors.confirmpassword && (
                    <p className="text-red-500 text-sm ">
                      {errors.confirmpassword}*
                    </p>
                  )}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      name="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-violet-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-violet-600 dark:ring-offset-gray-800 accent-violet-400"
                      onChange={handleChange}
                      checked={formData.terms}
                    />
                  </div>
                  <div className="ml-3 text-sm ">
                    <label
                      for="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      {" "}
                      j'accepte les{" "}
                      <Link
                        className="font-medium text-violet-600 hover:underline dark:text-violet-500"
                        to="/"
                      >
                       termes et conditions
                      </Link>{" "}
                    </label>
                    {errors.terms && (
                      <p className="text-red-500 text-sm">{errors.terms}*</p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full  text-white bg-violet-500  hover:bg-violet-700 focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 "
                >
                  créer un compte
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous avez déjà un compte?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    connectez-vous ici
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
