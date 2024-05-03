import React from "react";
import { useLocation } from "react-router-dom";

function DashboardAdmin() {
  const location = useLocation();
  const { state } = location;
  const role = state && state.role;

  return (
    <div>
      {role ? (
        <div>Ini adalah dashboard untuk role: {role}</div>
      ) : (
        <div>Anda tidak diizinkan</div>
      )}
    </div>
  );
}

export default DashboardAdmin;
