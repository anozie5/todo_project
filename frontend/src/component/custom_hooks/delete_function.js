import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useDelete = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const deleteItem = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      await axios.delete(`${apiUrl}/${id}/`, { signal });
      setSuccess(true);
      navigate("/todo");
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

  return { deleteItem, loading, error, success };
};

export default useDelete;
