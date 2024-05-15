import React from "react";
import { Link } from "react-router-dom";

function TambahSiswa() {
  return (
    <>
      <Link
        to="/admin/dashboard"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Back to Admin Dashboard
      </Link>
      <div>TambahSiswa</div>
    </>
  );
}

export default TambahSiswa;
