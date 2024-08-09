// for creating new user
import { useState } from "react";
import axios from "axios";

const useSignup = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const controller = new AbortController();
    const signal = controller.signal;

    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    try {
      const response = await axios.post(apiUrl, formData, {
        signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { access, refresh } = response.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      setSuccess(true);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError(err.response?.data?.detail || err.message);
      }
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  };

  return { signup, loading, error, success };
};

export default useSignup;
