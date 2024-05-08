import React, { useState, useContext } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import Logo from "../../img/tuturi.png";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import useJWT from "../../libs/hooks/useJWT";
import { useNavigate } from "react-router-dom";
import { ContextApplication } from "../../libs/config/contexts";

function Header() {
  let [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const jwt = useJWT();
  const application = useContext(ContextApplication);
  const navigate = useNavigate();

  const signOut = () => {
    jwt.signOut();
    navigate("/login");
    application.setIsAuthenticated(false);
  };

  return (
    <div className="z-10 shadow-md w-screen bg-blue-400 fixed top-0 left-0 ">
      <div className="md:px-10 py-4 px-7 md:flex justify-between items-center">
        <div className="flex text-2xl cursor-pointer items-center gap-5">
          <a href="/" className="flex items-center">
            <img className="flexbox size-12" src={Logo} alt="Logo" />
            <span className="ml-2 font-bold">SDN 2 Dasan Lekong</span>
          </a>
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
              {isHomePage ? (
                <Link to="Sekolah" smooth={true} duration={350}>
                  Sekolah
                </Link>
              ) : (
                <NavLink to="/" smooth={true} duration={350}>
                  Sekolah
                </NavLink>
              )}
            </a>
          </li>
          <li className="font-semibold my-7 md:my-0 md:ml-8">
            <a href="#Eskul">
              {isHomePage ? (
                <Link to="Eskul" smooth={true} duration={350}>
                  Eskul
                </Link>
              ) : (
                <NavLink to="/" smooth={true} duration={350}>
                  Eskul
                </NavLink>
              )}
            </a>
          </li>
          <li className="font-semibold my-7 md:my-0 md:ml-8">
            <a href="#Prestasi">
              {isHomePage ? (
                <Link to="Prestasi" smooth={true} duration={350}>
                  Prestasi
                </Link>
              ) : (
                <NavLink to="/#Prestasi" smooth={true} duration={350}>
                  Prestasi
                </NavLink>
              )}
            </a>
          </li>
          <li className="font-semibold my-7 md:my-0 md:ml-8">
            <NavLink
              to={isLoggedIn ? "/login" : "/login"}
              onClick={isLoggedIn ? signOut : null}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </NavLink>
          </li>
          <li className="font-semibold my-7 md:my-0 md:ml-8">
            <NavLink to={isLoggedIn ? "/siswa/eLearning" : "/login"}>
              E-Learning
            </NavLink>
          </li>
          {isLoggedIn && (
            <li className="font-semibold my-7 md:my-0 md:ml-8">
              <NavLink to={"/siswa/dashboard"}>Dashboard</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
