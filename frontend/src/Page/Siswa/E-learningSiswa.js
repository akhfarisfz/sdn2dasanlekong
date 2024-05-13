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
import Header from "../Home Page/Header";
import matematika from "../../img/matematika.jpg";
import IPA from "../../img/IPA.jpg";
import indonesia from "../../img/bhs indo.jpg";
import inggris from "../../img/bhs inggris.jpg";

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
      id: 1,
      image: matematika,
      title: "Matematika",
      price: "£24.00 GBP",
    },
    {
      id: 2,
      image: indonesia,
      title: "Bahasa Indonesia",
      price: "£24.00 GBP",
    },
    {
      id: 3,
      image: IPA,
      title: "Ilmu Pengetahuan Alam",
      price: "£24.00 GBP",
    },
    {
      id: 4,
      image: inggris,
      title: "Bahasa Inggris",
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
      <Header />

      {/* body */}
      <section>
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
              Selamat Belajar!!
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white mb-8">
              Mari kita belajar di E-Learning!!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start"></div>
          </div>
        </div>
      </section>

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

          {/* list menggunakan React Router Dom */}
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <li key={index}>
                <div className="group block overflow-hidden relative">
                  <img
                    src={product.image}
                    alt=""
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <NavLink
                      to={`/siswa/eLearning/mapel/${product.id}`}
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Lihat Detail
                      </button>
                    </NavLink>
                  </div>
                </div>
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
