import React from "react";
import useFetchData from "./custom_hooks/fetching";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./todo";
import DeleteButton from "./delete_todo";

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
              <div>
                <Link to="./todo" component={UpdateTodo}>
                  Update
                </Link>
                <Link to="./delete_todo" component={DeleteButton}>
                  Delete
                </Link>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoDisplay;
