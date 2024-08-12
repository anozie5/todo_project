import { useState, useEffect, useRef } from "react";
import axios from "axios";

const useUpdate = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const isMounted = useRef(true);

  const updateForm = async (instanceId, updateData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`${url}/${instanceId}/`, updateData);
      if (isMounted.current) {
        setData(response.data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.response ? err.response.data : "Something went wrong");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { updateForm, loading, error, data };
};

export default useUpdate;
