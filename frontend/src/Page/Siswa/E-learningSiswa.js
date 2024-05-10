import React, { useState, useContext } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import Logo from "../../img/tuturi.png";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import useJWT from "../../libs/hooks/useJWT";
import { useNavigate } from "react-router-dom";
import { ContextApplication } from "../../libs/config/contexts";
import belajar from "../../img/belajar.jpg";

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

  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      title: "Basic Tee",
      price: "£24.00 GBP",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      title: "Basic Tee",
      price: "£24.00 GBP",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      title: "Basic Tee",
      price: "£24.00 GBP",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      title: "Basic Tee",
      price: "£24.00 GBP",
    },
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();

  const renderCalendarDays = () => {
    const daysArray = [];

    // Empty cells for days before the start of the month
    for (let i = 0; i < startDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="text-center"></div>);
    }

    // Render days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(
        <div key={i} className="text-center py-2 border">
          {i}
        </div>
      );
    }

    return daysArray;
  };

  return (
    <>
      {/* Header */}
      <header className="z-10 shadow-md w-screen bg-blue-400 fixed top-0 left-0 ">
        <div className="md:px-10 py-[2px] px-7 md:flex justify-between items-center">
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
              <NavLink
                to={isLoggedIn ? "/" : "/login"}
                onClick={isLoggedIn ? signOut : null}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </NavLink>
            </li>
          </ul>
        </div>
      </header>

      {/* body */}
      <div
        id="cover"
        className="mt-[25px] lg:mt-[50px] relative justify-center lg:justify-start bg-blue-500 min-h-screen flex items-center mx-auto max-w-screen-xl bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${belajar})` }}
      >
        <div
          id="cover-content"
          className="relative text-center md:text-left lg:left-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Selamat Datang di halaman
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white mb-8">
            SDN 2 Dasan Lekong
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
            {!isLoggedIn && (
              <NavLink to="/login">
                <button className="bg-white text-blue-500 hover:bg-blue-400 text-lg md:text-xl lg:text-2xl font-semibold py-2 px-6 md:py-3 md:px-8 lg:py-4 lg:px-10 rounded-full shadow-md transition duration-300 mb-4 md:mb-0">
                  Ayokk! masuk ke akun anda
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Product Collection
            </h2>

            <p className="mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </header>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex rounded border border-gray-100">
              <button className="inline-flex size-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </button>

              <button className="inline-flex size-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </button>
            </div>

            <div>
              <label htmlFor="SortBy" className="sr-only">
                SortBy
              </label>

              <select
                id="SortBy"
                className="h-10 rounded border-gray-300 text-sm"
              >
                <option>Sort By</option>
                <option value="Title, DESC">Title, DESC</option>
                <option value="Title, ASC">Title, ASC</option>
                <option value="Price, DESC">Price, DESC</option>
                <option value="Price, ASC">Price, ASC</option>
              </select>
            </div>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <li key={index}>
                <a href="#" className="group block overflow-hidden">
                  <img
                    src={product.image}
                    alt=""
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                  />

                  <div className="relative bg-white pt-3">
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {product.title}
                    </h3>

                    <p className="mt-2">
                      <span className="sr-only">Regular Price</span>

                      <span className="tracking-wider text-gray-900">
                        {product.price}
                      </span>
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="container mx-auto my-8">
        <h1 className="text-center font-bold text-2xl mb-4">
          {today.toLocaleString("default", { month: "long" })} {currentYear}
        </h1>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 mt-2">
          {renderCalendarDays()}
        </div>
      </div>

      <div className="w-3/4 mx-auto bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4">Jadwal Hari Ini</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Waktu</th>
              {hariArray.map((hari) => (
                <th key={hari} className="border border-gray-300 px-4 py-2">
                  {hari}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jamArray.map((jam) => (
              <tr key={jam}>
                <td className="border border-gray-300 px-4 py-2">{jam}:00</td>
                {hariArray.map((hari, index) => (
                  <td key={index} className="border border-gray-300 px-4 py-2">
                    Kegiatan
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default E_learningSiswa;
