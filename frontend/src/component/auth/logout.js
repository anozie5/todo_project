import React from "react";
import useLogout from "../custom_hooks/logout_function";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout, loading, error, success } = useLogout(
    "http://127.0.0.1:8000/"
  );
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    if (success) {
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Log Out"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Logout successful!</p>}
    </div>
  );
};

export default Logout;
