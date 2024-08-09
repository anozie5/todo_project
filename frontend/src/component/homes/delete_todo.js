import React from "react";
import useDelete from "./custom_hook/deleting";

apiUrl = "http://127.0.0.1:8000/todo/<int:id>/";

const DeleteButton = ({ apiUrl, id }) => {
  const { deleteItem, loading, error, success } = useDelete(apiUrl);

  const handleDelete = () => {
    deleteItem(id);
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <p>Error: {error}</p>}
      {success && <p>Item deleted successfully!</p>}
    </div>
  );
};

export default DeleteButton;
