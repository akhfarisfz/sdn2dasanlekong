import React, { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import Logo from "../../img/tuturi.png";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

function Header() {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div className="z-10 shadow-md w-full bg-blue-400 fixed top-0 left-0 ">
      <div className="md:px-10 py-4 px-7 md:flex justify-between items-center">
        <div className="flex text-2xl cursor-pointer items-center gap-5">
          <img className="size-12" src={Logo} alt="Logo" />
          <span className="font-bold">SDN 2 Dasan Lekong</span>
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {isOpen ? (
            <IoCloseCircleOutline className="size-8" />
          ) : (
            <CgMenuGridO className="size-8" />
          )}
        </div>

        <ul
          className={`md:flex md:pl-0 pl-9 md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto  bg-blue-400  transition-all duration-500 ease-in ${
            isOpen ? "top12" : "top-[-490px]"
          }`}
        >
          <li className="font-semibold my-7 md:my-0 md:ml-8">
            <a href="#Sekolah">
              <Link to="Sekolah" smooth={true} duration={350}>
                Sekolah
              </Link>
            </a>
          </li>
          <li className="font-semibold my-7 md:my-0 md:ml-8">
            <a href="#Eskul">
              <Link to="Eskul" smooth={true} duration={350}>
                Eskul
              </Link>
            </a>
          </li>
          <li className="font-semibold my-7 md:my-0 md:ml-8">
            <a href="#">
              <Link to="prestasi" smooth={true} duration={350}>
                Prestasi
              </Link>
            </a>
          </li>
          <li className="font-semibold my-7 md:my-0 md:ml-8">
            <NavLink to="/login">Masuk</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
