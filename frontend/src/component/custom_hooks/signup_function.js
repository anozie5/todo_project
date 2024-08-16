// for creating new user
import { useState } from "react";
import axios from "axios";

const useSignup = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, success };
};

export default useSignup;
