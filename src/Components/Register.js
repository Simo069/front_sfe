// import React from "react";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { Eye, EyeOff } from "lucide-react";

// export default function Register() {
//   const [errorBack, setErrorBack] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmpassword: "",
//     terms: false,
//   });
//   const [errors, setErrors] = useState({});

//   const { register } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.firstName) {
//       newErrors.firstName = "prenom est obligatoire ";
//     }
//     if (!formData.lastName) {
//       newErrors.lastName = "nom est obligatoire ";
//     }
//     if (!formData.email) {
//       newErrors.email = "Email est obligatoire ";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Invalid format de email";
//     }
//     if (!formData.password) {
//       newErrors.password = "Password est obligatoire ";
//     } else if (formData.password.length < 7) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     if (!formData.confirmpassword) {
//       newErrors.confirmpassword = "ce champ est obligatoire";
//     } else if (formData.confirmpassword !== formData.password) {
//       newErrors.confirmpassword = "Password ne sont pas les memes ";
//     }
//     if (!formData.terms) {
//       newErrors.terms = "Vous devez accepter les conditions";
//     }
//     return newErrors;
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       setErrors({});
//       console.log("Form Data:", formData);
//       try {
//         setFormData({ ...formData, username: formData.email });
//         const result = await register(formData);
//         console.log("resultadas", result);
//         if (!result.success) {
//           // Affiche l'erreur retournée par l'API
//           setErrorBack(
//             result.message || "Échec de l'inscription, veuillez réessayer."
//           );
//           setTimeout(() => {
//             setErrorBack("");
//           }, 3000);
//           console.log("error ", result.success);
//           return;
//         }

//         setSuccess(result.message || "Inscription réussie");

//         // Reset formulaire
//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           password: "",
//           confirmpassword: "",
//           terms: false,
//         });

//         // Redirection après 2s
//         setTimeout(() => {
//           navigate("/login");
//           setSuccess("");
//         }, 2000);
//       } catch (error) {
//         console.error("Erreur lors de l'inscription :", error);
//         setErrorBack("Une erreur réseau est survenue. Veuillez réessayer.");
//       }
//     }
//   };
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
//   };

//   useEffect(() => {
//     const newErrors = { ...errors };
//     if (formData.firstName && errors.firstName) {
//       delete newErrors.firstName;
//     }
//     if (formData.lastName && errors.lastName) {
//       delete newErrors.lastName;
//     }
//     if (
//       formData.email &&
//       /^\S+@\S+\.\S+$/.test(formData.email) &&
//       errors.email
//     ) {
//       delete newErrors.email;
//     }
//     if (formData.password && formData.password.length >= 6 && errors.password) {
//       delete newErrors.password;
//     }
//     if (
//       formData.confirmpassword === formData.password &&
//       errors.confirmpassword
//     ) {
//       delete newErrors.confirmpassword;
//     }
//     if (formData.terms) {
//       delete newErrors.terms;
//     }

//     setErrors(newErrors);
//   }, [formData]);

//   return (
//     <>
//       <section className="bg-gray-50 dark:bg-gray-900 content">
//         <div className="flex flex-col items-center mx-auto justify-center md:min-h-[95vh] ">
//           {errorBack && (
//             <div
//               className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//               role="alert"
//             >
//               <span className="font-medium">Error alert!</span> {errorBack}
//             </div>
//           )}
//           {success && (
//             <div
//               className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
//               role="alert"
//             >
//               <span className="font-medium">Success alert!</span> {success}
//             </div>
//           )}
//           <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//             <h1>SFE</h1>
//           </div>
//           <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700  ">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                 créer un compte
//               </h1>
//               <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
//                 <div className="flex flex-col items-start ">
//                   <label
//                     for="firstName"
//                     className="block mb-2 text-md font-semibold text-gray-600 dark:text-white  "
//                   >
//                     prénom
//                   </label>
//                   <input
//                     id="firstName"
//                     name="firstName"
//                     placeholder="prénom"
//                     className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 "
//                     onChange={handleChange}
//                     value={formData.firstName}
//                   />
//                   {errors.firstName && (
//                     <p className="text-red-500 text-sm  ">
//                       {errors.firstName}*
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex flex-col items-start ">
//                   <label
//                     for="lastName"
//                     className="block mb-2 text-md font-semibold text-gray-600 dark:text-white  "
//                   >
//                     nom de famille
//                   </label>
//                   <input
//                     id="lastName"
//                     name="lastName"
//                     placeholder="nom de famille"
//                     className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 "
//                     onChange={handleChange}
//                     value={formData.lastName}
//                   />
//                   {errors.lastName && (
//                     <p className="text-red-500 text-sm ">{errors.lastName}*</p>
//                   )}
//                 </div>
//                 <div className="flex flex-col items-start ">
//                   <label
//                     for="email"
//                     className="block mb-2 text-md font-semibold text-gray-600 dark:text-white  "
//                   >
//                     votre email
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     placeholder="email"
//                     className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 "
//                     onChange={handleChange}
//                     value={formData.email}
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm ">{errors.email}*</p>
//                   )}
//                 </div>
//                 {/* <div className="flex flex-col items-start ">
//                   <label
//                     for="password"
//                     className="block mb-2 text-md font-semibold text-gray-600 dark:text-white  "
//                   >
//                     mot de passe
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     placeholder="mot de passe"
//                     className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 "
//                     onChange={handleChange}
//                     value={formData.password}
//                   />
//                   {errors.password && (
//                     <p className="text-red-500 text-sm ">{errors.password}*</p>
//                   )}
//                 </div> */}
//                 <div className="flex flex-col items-start w-full relative">
//                   <label
//                     htmlFor="password"
//                     className="block mb-2 text-md font-semibold text-gray-600 dark:text-white"
//                   >
//                     Mot de passe
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="password"
//                     className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 pr-10 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
//                     onChange={handleChange}
//                     value={formData.password}
//                   />
//                   {/* Toggle button/icon */}
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     className="absolute right-3 top-[45px] text-gray-500 dark:text-gray-300"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>

//                   {errors.password && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.password}*
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex flex-col items-start w-full relative">
//                   <label
//                     htmlFor="password"
//                     className="block mb-2 text-md font-semibold text-gray-600 dark:text-white"
//                   >
//                     Confirmer le mot de passe
//                   </label>
//                   <input
//                     id="confirmpassword"
//                     name="confirmpassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="confirmpassword"
//                     className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 pr-10 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
//                     onChange={handleChange}
//                     value={formData.confirmpassword}
//                   />
//                   {/* Toggle button/icon */}
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword((prev) => !prev)}
//                     className="absolute right-3 top-[45px] text-gray-500 dark:text-gray-300"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff size={20} />
//                     ) : (
//                       <Eye size={20} />
//                     )}
//                   </button>

//                   {errors.confirmpassword && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.confirmpassword}*
//                     </p>
//                   )}
//                 </div>

//                 {/* <div className="flex flex-col items-start ">
//                   <label
//                     for="confirmpassword"
//                     className="block mb-2 text-md font-semibold text-gray-600 dark:text-white  "
//                   >
//                     Confirmer le mot de passe
//                   </label>
//                   <input
//                     id="confirmpassword"
//                     name="confirmpassword"
//                     placeholder="Confirmer le mot de passe"
//                     className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 "
//                     onChange={handleChange}
//                     value={formData.confirmpassword}
//                   />
//                   {errors.confirmpassword && (
//                     <p className="text-red-500 text-sm ">
//                       {errors.confirmpassword}*
//                     </p>
//                   )}
//                 </div> */}
//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <input
//                       id="terms"
//                       aria-describedby="terms"
//                       name="terms"
//                       type="checkbox"
//                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-violet-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-violet-600 dark:ring-offset-gray-800 accent-violet-400"
//                       onChange={handleChange}
//                       checked={formData.terms}
//                     />
//                   </div>
//                   <div className="ml-3 text-sm ">
//                     <label
//                       for="terms"
//                       className="font-light text-gray-500 dark:text-gray-300"
//                     >
//                       {" "}
//                       j'accepte les{" "}
//                       <Link
//                         className="font-medium text-violet-600 hover:underline dark:text-violet-500"
//                         to="/"
//                       >
//                         termes et conditions
//                       </Link>{" "}
//                     </label>
//                     {errors.terms && (
//                       <p className="text-red-500 text-sm">{errors.terms}*</p>
//                     )}
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full  text-white bg-violet-500  hover:bg-violet-700 focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 "
//                 >
//                   créer un compte
//                 </button>
//                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                   Vous avez déjà un compte?{" "}
//                   <Link
//                     to="/login"
//                     className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                   >
//                     connectez-vous ici
//                   </Link>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


import React from "react";
import { useState, useEffect } from "react";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const { register } = useAuth();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est obligatoire";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    if (!formData.confirmpassword) {
      newErrors.confirmpassword = "Veuillez confirmer votre mot de passe";
    } else if (formData.confirmpassword !== formData.password) {
      newErrors.confirmpassword = "Les mots de passe ne correspondent pas";
    }
    if (!formData.terms) {
      newErrors.terms = "Vous devez accepter les conditions d'utilisation";
    }
    return newErrors;
  };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
        } else {
          setErrors({});
          console.log("Form Data:", formData);
          try {
            setFormData({ ...formData, username: formData.email });
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
    if (formData.email && /^\S+@\S+\.\S+$/.test(formData.email) && errors.email) {
      delete newErrors.email;
    }
    if (formData.password && formData.password.length >= 6 && errors.password) {
      delete newErrors.password;
    }
    if (formData.confirmpassword === formData.password && errors.confirmpassword) {
      delete newErrors.confirmpassword;
    }
    if (formData.terms && errors.terms) {
      delete newErrors.terms;
    }
    setErrors(newErrors);
  }, [formData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 flex items-center justify-center p-4 mt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Alert Messages */}
        {errorBack && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg shadow-sm animate-slideDown">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
              <div>
                <p className="text-sm text-red-800 font-medium">Erreur</p>
                <p className="text-sm text-red-700">{errorBack}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg shadow-sm animate-slideDown">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              <div>
                <p className="text-sm text-green-800 font-medium">Succès</p>
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Créer un compte</h1>
            <p className="text-purple-100">Rejoignez-nous dès aujourd'hui</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-2 text-purple-500" />
                    Prénom
                  </label>
                  <div className="relative">
                    <input
                      name="firstName"
                      type="text"
                      placeholder="Votre prénom"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-[1.02] ${
                        errors.firstName
                          ? "border-red-300 bg-red-50"
                          : formData.firstName
                          ? "border-green-300 bg-green-50"
                          : "border-gray-200 bg-gray-50 hover:border-purple-300 focus:border-purple-500 focus:bg-white"
                      }`}
                    />
                    {formData.firstName && !errors.firstName && (
                      <CheckCircle className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-xs flex items-center animate-slideDown">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-2 text-purple-500" />
                    Nom de famille
                  </label>
                  <div className="relative">
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Votre nom"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-[1.02] ${
                        errors.lastName
                          ? "border-red-300 bg-red-50"
                          : formData.lastName
                          ? "border-green-300 bg-green-50"
                          : "border-gray-200 bg-gray-50 hover:border-purple-300 focus:border-purple-500 focus:bg-white"
                      }`}
                    />
                    {formData.lastName && !errors.lastName && (
                      <CheckCircle className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-xs flex items-center animate-slideDown">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-purple-500" />
                  Adresse email
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-[1.02] ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : formData.email && /^\S+@\S+\.\S+$/.test(formData.email)
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-gray-50 hover:border-purple-300 focus:border-purple-500 focus:bg-white"
                    }`}
                  />
                  {formData.email && !errors.email && /^\S+@\S+\.\S+$/.test(formData.email) && (
                    <CheckCircle className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs flex items-center animate-slideDown">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-purple-500" />
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Créez un mot de passe sécurisé"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-[1.02] ${
                      errors.password
                        ? "border-red-300 bg-red-50"
                        : formData.password && formData.password.length >= 6
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-gray-50 hover:border-purple-300 focus:border-purple-500 focus:bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs flex items-center animate-slideDown">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.password}
                  </p>
                )}
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            formData.password.length >= i * 2
                              ? formData.password.length >= 8
                                ? "bg-green-400"
                                : formData.password.length >= 6
                                ? "bg-yellow-400"
                                : "bg-red-400"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Force du mot de passe: {
                        formData.password.length >= 8 ? "Forte" :
                        formData.password.length >= 6 ? "Moyenne" : "Faible"
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-purple-500" />
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    name="confirmpassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Répétez votre mot de passe"
                    value={formData.confirmpassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-[1.02] ${
                      errors.confirmpassword
                        ? "border-red-300 bg-red-50"
                        : formData.confirmpassword && formData.confirmpassword === formData.password
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-gray-50 hover:border-purple-300 focus:border-purple-500 focus:bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {formData.confirmpassword && formData.confirmpassword === formData.password && (
                    <CheckCircle className="absolute right-10 top-3.5 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.confirmpassword && (
                  <p className="text-red-500 text-xs flex items-center animate-slideDown">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.confirmpassword}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="space-y-2">
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      name="terms"
                      type="checkbox"
                      checked={formData.terms}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                      formData.terms
                        ? "bg-purple-500 border-purple-500"
                        : "border-gray-300 group-hover:border-purple-400"
                    }`}>
                      {formData.terms && (
                        <CheckCircle className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    J'accepte les{" "}
                    <a href="#" className="text-purple-600 hover:text-purple-800 font-medium underline">
                      conditions d'utilisation
                    </a>{" "}
                    et la{" "}
                    <a href="#" className="text-purple-600 hover:text-purple-800 font-medium underline">
                      politique de confidentialité
                    </a>
                  </div>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-xs flex items-center animate-slideDown">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Création en cours...
                  </div>
                ) : (
                  "Créer mon compte"
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600">
                  Vous avez déjà un compte ?{" "}
                  <Link to="/login" className="text-purple-600 hover:text-purple-800 font-semibold underline transition-colors">
                    Connectez-vous ici
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

