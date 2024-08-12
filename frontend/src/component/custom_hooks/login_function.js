// for login
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useLogin = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const login = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await axios.post(apiUrl, userData, { signal });
      const { access, refresh } = response.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      setSuccess(true);
      toast.success("Login successful!");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  };

  const handleError = (err) => {
    if (axios.isCancel(err)) {
      console.log("Request canceled", err.message);
    } else if (err.response) {
      if (err.response.status === 401) {
        setError("Invalid username or password. Please try again.");
        toast.error("Login failed. Please check your credentials.");
      } else if (err.response.status === 500) {
        setError("Server error. Please try again later.");
        toast.error("Server error. Please try again later.");
      } else {
        setError(err.response.data.detail || "Login failed");
        toast.error(err.response.data.detail || "Login failed");
      }
    } else {
      setError("Network error. Please check your connection.");
      toast.error("Network error. Please check your connection.");
    }
  };

  return { login, loading, error, success };
};

export default useLogin;
