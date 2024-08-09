import React from "react";
import useFormHandler from "./custom_hooks/updating";

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
            type="text"
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
export const UpdateTodo = () => {
  const { formData, handleChange, handleSubmit, loading, error, success } =
    useFormHandler("http://127.0.0.1:8000/todo/<int:id>/", "PUT");

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
            type="text"
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
