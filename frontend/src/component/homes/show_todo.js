import React from "react";
import useFetchData from "./custom_hooks/fetching";

const TodoDisplay = () => {
  const { data, loading, error } = useFetchData("http://127.0.0.1:8000/todo/");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data from API:</h1>
      <ul>{data && data.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
    </div>
  );
};

export default TodoDisplay;
