import React from "react";
import useLogout from "./custom_hooks/logginout";

const LogoutButton = () => {
  const { logout, loading, error } = useLogout("http://127.0.0.1:8000/");

  return (
    <div>
      <button onClick={logout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LogoutButton;
