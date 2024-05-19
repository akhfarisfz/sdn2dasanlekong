import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../libs/components/Header";
import belajar from "../../img/belajar.jpg";

function DashboardAdmin() {
  const location = useLocation();
  const { state } = location;
  const role = state && state.role;

  return (
    <>
      <div>
        <div>
          <img className="h-48 w-full" src={belajar} />
        </div>
        <div className="flex justify-center gap-4 my-6">
          <button className="flex bg-red-200 size-48 rounded-md text-center justify-center items-center ">
            <h2 className="">Tugas</h2>
          </button>
          <button className="flex bg-red-200 size-48 rounded-md text-center justify-center items-center">
            <h2>Ulangan Harian</h2>
          </button>
          <button className="flex bg-red-200 size-48 rounded-md text-center justify-center items-center">
            <h2>MID</h2>
          </button>
          <button className="flex bg-red-200 size-48 rounded-md text-center justify-center items-center">
            <h2>UAS</h2>
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
