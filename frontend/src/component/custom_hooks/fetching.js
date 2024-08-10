// data fetching hook just to display information
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (apiUrl) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(apiUrl, { signal });
        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [apiUrl]);

  return { data, loading, error };
};

export default useFetchData;
