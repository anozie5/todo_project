// for login
import { useState } from "react";
import axios from "axios";
//import { toast } from "react-toastify";

const useLogin = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, userData);

      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
      setLoading(false);
      return false;
    }
  };

  return { login, loading, error };
};

export default useLogin;

// const useLogin = (apiUrl) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const login = async (userData) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     const controller = new AbortController();
//     const signal = controller.signal;

//     try {
//       const response = await axios.post(apiUrl, userData, { signal });
//       const { access, refresh } = response.data;

//       localStorage.setItem("accessToken", access);
//       localStorage.setItem("refreshToken", refresh);

//       setSuccess(true);
//       toast.success("Login successful!");
//     } catch (err) {
//       handleError(err);
//     } finally {
//       setLoading(false);
//     }

//     return () => {
//       controller.abort();
//     };
//   };

//   const handleError = (err) => {
//     if (axios.isCancel(err)) {
//       console.log("Request canceled", err.message);
//     } else if (err.response) {
//       if (err.response.status === 401) {
//         setError("Invalid username or password. Please try again.");
//         toast.error("Login failed. Please check your credentials.");
//       } else if (err.response.status === 500) {
//         setError("Server error. Please try again later.");
//         toast.error("Server error. Please try again later.");
//       } else {
//         setError(err.response.data.detail || "Login failed");
//         toast.error(err.response.data.detail || "Login failed");
//       }
//     } else {
//       setError("Network error. Please check your connection.");
//       toast.error("Network error. Please check your connection.");
//     }
//   };

//   return { login, loading, error, success };
// };

// export default useLogin;
