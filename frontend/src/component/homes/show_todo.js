import React from "react";
import useFetchData from "../custom_hooks/fetching";
import { Link } from "react-router-dom";

const TodoDisplay = () => {
  const { data, loading, error } = useFetchData("http://127.0.0.1:8000/todo/");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Your Planned Stuff:</h1>
      <ul>
        {data &&
          data.map((item) => (
            <li key={item.id}>
              <ul>{item.title}</ul>
              <ul>{item.body}</ul>
              <ul>{item.updated_on}</ul>
              <ul>
                <div>
                  <span>
                    <Link to="./todo/update"> Update </Link>
                  </span>
                  <span>
                    <Link to="./todo/delete">Delete</Link>
                  </span>
                </div>
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoDisplay;
