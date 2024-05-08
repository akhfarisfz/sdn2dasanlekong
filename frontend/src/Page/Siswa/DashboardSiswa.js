import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Home Page/Header";

function DashboardAdmin() {
  // Gunakan useLocation untuk mengakses location dan state
  const location = useLocation();
  const { state } = location;
  const role = state && state.role;

  return (
    <>
      <Header />
      <div className="container">
        {role ? (
          <div>Ini adalah dashboard untuk role: {role}</div>
        ) : (
          <div>Anda tidak diizinkan</div>
        )}
      </div>
    </>
  );
}

export default DashboardAdmin;
