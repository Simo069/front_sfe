import React from "react";
import { useState, useEffect , useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();

  const [errorBack, setErrorBack] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const validate = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Email est obligatoire ";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.username)) {
      newErrors.username = "Invalid format de email";
    }

    if (!formData.password) {
      newErrors.password = "Password est obligatoire ";
    } else if (formData.password.length < 7) {
      newErrors.password = "Password must be at least 6 characters";
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
  //       const response = await fetch("http://localhost:8000/api/token/", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });
  //       const data = await response.json();
  //       console.log("data ", data);
  //       if (!response.ok) {
  //         setErrorBack(data.detail);
  //         setTimeout(() => {
  //           setErrorBack("");
  //         }, 3000);
  //         console.log(data.detail);
  //         return;
  //       }
  //       console.log("data accesss ", data.access);
  //       console.log("data refresh ", data.refresh);
  //       setSuccess("you logged in succefully");

  //       localStorage.setItem("access_token", data.access);
  //       localStorage.setItem("refresh_token", data.refresh);
  //       const payload = JSON.parse(atob(data.access.split('.')[1]));
  //       console.log("is staff", payload.is_staff);
  //       login(data.access, data.refresh , payload.is_staff , payload.username);
  //       console.log("is staff", localStorage.getItem('role'));
  //       setFormData({
  //         username: "",
  //         password: "",
  //       });
  //       setTimeout(() => {
  //         if (payload.is_staff) {
  //           navigate("/admin-Dashboard");
  //         } else {
  //           navigate("/");
  //         }
  //         setSuccess("");
  //       }, 2000);
  //     } catch (error) {
  //       console.error("Erreur lors de authentification :", error);
  //       setErrorBack(
  //         "Une erreur réseau est survenue. Veuillez réessayer plus tard."
  //       );
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
        const result = await login(formData.username, formData.password);
        console.log("result", result);
        if (!result.success) {
          setErrorBack(result.message);
          setTimeout(() => {
            setErrorBack("");
          }, 3000);
          setTimeout(() => {
            
            setErrorBack("");
          }, 2000);
          return;
        }else{
          const roles = result.roles || [];
          
          setSuccess(result.message || "you are logged successfully");
          setFormData({
            username: "",
            password: "",
          });
          setTimeout(() => {
            if (roles.includes('user')) {
              navigate("/");
            } else if (roles.includes('admin')) {
              navigate("/admin-Dashboard");
            }
            
            setSuccess("");
          }, 2000);
        }
      } catch (error) {
        console.error("Erreur lors de authentification :", error);
        setErrorBack(
          "Une erreur réseau est survenue. Veuillez réessayer plus tard."
        );
      }
    }
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  useEffect(() => {
    const newErrors = { ...errors };

    if (
      formData.username &&
      /^\S+@\S+\.\S+$/.test(formData.username) &&
      errors.username
    ) {
      delete newErrors.username;
    }
    if (formData.password && formData.password.length >= 6 && errors.password) {
      delete newErrors.password;
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
              connexion
              </h1>
              <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
                <div className="flex flex-col items-start ">
                  <label
                    for="username"
                    className="block mb-2 text-md font-semibold text-gray-600 dark:text-white  "
                  >
                    votre email
                  </label>
                  <input
                    id="username"
                    name="username"
                    placeholder="username"
                    className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 "
                    onChange={handleChange}
                    value={formData.username}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm ">{errors.username}*</p>
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
                    placeholder="password"
                    className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 w-full p-3 text-sm focus:ring-violet-400 focus:border-violet-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 "
                    onChange={handleChange}
                    value={formData.password}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm ">{errors.password}*</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full  text-white bg-violet-500  hover:bg-violet-700 focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 "
                >
                  se connecter
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                vous n’avez pas de compte?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    inscription ici
                  </Link>

                </p>

                <button onClick={()=> { window.location.href = 'http://localhost:3000/login';}}>
                  keycloak
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
