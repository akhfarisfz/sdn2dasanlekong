import Header from "../Home Page/Header";
import belajar from "../../img/belajar.jpg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMapel } from "./routeDataMapel";
import { NavLink } from "react-router-dom";

function Mapel() {
  const { id } = useParams(); // Ambil ID mapel dari URL menggunakan useParams
  const [mapel, setMapel] = useState(null); // State untuk menyimpan data mapel

  const list_tugas = [
    {
      id: 1,
      title: "Ujian Harian",
    },
    {
      id: 2,
      title: "Tugas Harian",
    },
    {
      id: 3,
      title: "Ujian Akhir Semester",
    },
    {
      id: 4,
      title: "Tugas Harian",
    },
  ];

  // Ambil data mapel berdasarkan ID saat komponen dimuat
  useEffect(() => {
    getMapel(id)
      .then((data) => setMapel(data))
      .catch((error) => console.error("Error fetching mapel:", error));
  }, [id]);

  // Tampilkan loading jika data belum tersedia
  if (!mapel) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header />
      <section>
        <div
          id="cover"
          className="relative justify-center lg:justify-start bg-blue-500 min-h-screen flex items-center mx-auto bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${mapel.gambar})` }}
        >
          {console.log(mapel.gambar)}
          <div
            id="cover-content"
            className="relative text-center lg:text-left lg:left-20"
          >
            <h1 className="p-4 bg-gray-500 text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
              Selamat Belajar!!
            </h1>

            <p className="lg:w-fit p-4 bg-gray-500 text-lg md:text-xl lg:text-2xl text-white mb-8">
              Mari kita belajar {mapel.title}!!
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start"></div>
          </div>
        </div>
      </section>

      <h2>{mapel.title}</h2>
      <ul className="mt-4 grid m-auto px-4 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list_tugas.map((tugas, index) => (
          <li
            className="my-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 h-[200px] w-full"
            key={index}
          >
            <div className="flex justify-center items-center text-center h-full">
              <h3 className="text-white">{tugas.title}</h3>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Mapel;
