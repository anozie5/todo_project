// for logging out
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogout = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const Logout = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/logout/`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        signal,
      });

      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
      } else {
        throw new Error("Logout failed");
      }
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError(err.response?.data?.detail || err.message);
      }
    } finally {
      setLoading(false);
    }

    useEffect(() => {
      return () => {
        controller.abort();
      };
    }, []);
  };

  return { Logout, loading, error };
};

export default useLogout;
