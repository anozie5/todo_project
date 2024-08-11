// for logging in a user
import { useState } from "react";
import axios from "axios";

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
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled", err.message);
      } else {
        setError(err.response?.data?.detail || "Login failed");
      }
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  };

  return { login, loading, error, success };
};

export default useLogin;
