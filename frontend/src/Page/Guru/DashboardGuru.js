import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import useJWT from "../../libs/hooks/useJWT";
import { useNavigate } from "react-router-dom";
import { ContextApplication } from "../../libs/config/contexts";
import belajar from "../../img/belajar.jpg";
import Header from "../../libs/components/Header";
import matematika from "../../img/matematika.jpg";
import IPA from "../../img/IPA.jpg";
import indonesia from "../../img/bhs indo.jpg";
import inggris from "../../img/bhs inggris.jpg";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

function E_learningSiswa() {
  let [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const jwt = useJWT();
  const application = useContext(ContextApplication);
  const navigate = useNavigate();

  const signOut = () => {
    jwt.signOut();
    navigate("/login");
    application.setIsAuthenticated(false);
  };

  const hariArray = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const jamArray = Array.from({ length: 9 }, (_, i) => i + 7);

  const list_matpel = [
    {
      id: 1,
      image: indonesia,
      title: "Bahasa Indonesia",
    },
    {
      id: 2,

      image: matematika,
      title: "Matematika",
    },
    {
      id: 3,
      image: IPA,
      title: "Ilmu Pengetahuan Alam",
    },
    {
      id: 4,
      image: inggris,
      title: "Bahasa Inggris",
    },
  ];

  return (
    <>
      {/* Header */}
      <Header />

      {/* body */}
      <section>
        <div className="mt-[25px] lg:mt-[1px] relative justify-center lg:justify-start h-52 w-full bg-blue-300 flex items-center mx-auto ">
          <div
            id="cover-content"
            className="relative text-center md:text-left lg:left-20"
          >
            <UserCircleIcon
              className="h-24 w-24 text-gray-300"
              aria-hidden="true"
            />

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start"></div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* list menggunakan React Router Dom */}
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {list_matpel.map((mapel, index) => (
              <li key={index}>
                <div className="relative h-48 rounded-lg w-full bg-red-200">
                  <h2 className="text-xl font-bold text-gray-700 text-center p-6">
                    {mapel.title}
                  </h2>

                  <div className="flex mx-auto items-end h-12 w-fit gap-4">
                    <button
                      class="cursor-pointer transition-all bg-blue-500 text-white h-11 px-4 py-1 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    >
                      Buka
                    </button>
                    <button
                      class="cursor-pointer transition-all bg-blue-500 h-11 text-white px-4 py-1 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    >
                      Hapus
                    </button>
                  </div>
                </div>

                <div className="flex h-14 mt-4 m-auto w-1/2 bg-blue-200 items-center justify-center text-center">
                  <h2 className="text-center w-fit">20</h2>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default E_learningSiswa;
