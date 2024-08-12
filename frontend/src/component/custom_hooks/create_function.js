// for creating Todo
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useCreate = (apiUrl, method = "POST") => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const fetchData = useCallback(
    async (signal) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(apiUrl, { signal });
        setFormData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err.response?.data?.detail || err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [apiUrl]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchData(signal);

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await axios({
        method: method,
        url: apiUrl,
        data: formData,
        signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

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

  return { formData, handleChange, handleSubmit, loading, error, success };
};

export default useCreate;
