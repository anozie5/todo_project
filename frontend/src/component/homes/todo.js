import React from "react";
import useFormHandler from "../custom_hooks/creating";

// creating todo
export const CreateTodo = () => {
  const { formData, handleChange, handleSubmit, loading, error, success } =
    useFormHandler("http://127.0.0.1:8000/todo/", "POST");

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Body:
          <input
            type="textarea"
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {success && (
        <p style={{ color: "green" }}>Form submitted successfully!</p>
      )}
    </form>
  );
};

// updating todo
import React, { useState } from "react";
import useUpdateInstance from "./useUpdateInstance";

export const UpdateInstanceComponent = ({ instanceId }) => {
  const { updateInstance, loading, error, data } = useUpdateInstance(
    "http://127.0.0.1:8000/todo/<int:pk>/"
  );
  const [formData, setFormData] = useState({ title: "", body: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInstance(instanceId, formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titl"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Body"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Instance"}
        </button>
      </form>
      {error && <p>Error: {error}</p>}
      {data && <p>Instance updated successfully!</p>}
    </div>
  );
};
