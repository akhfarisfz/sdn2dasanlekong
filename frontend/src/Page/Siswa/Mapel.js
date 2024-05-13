import Header from "../Home Page/Header";
import belajar from "../../img/belajar.jpg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMapel } from "./routeDataMapel";

function Mapel() {
  const { id } = useParams(); // Ambil ID mapel dari URL menggunakan useParams
  const [mapel, setMapel] = useState(null); // State untuk menyimpan data mapel

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
            className="relative text-center md:text-left lg:left-20"
          >
            <h1 className="bg-gray-500 p-4 text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
              Selamat Belajar!!
            </h1>
            <p className="bg-gray-500 p-4 w-fit text-lg md:text-xl lg:text-2xl text-white mb-8">
              Mari kita belajar di E-Learning!!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start"></div>
          </div>
        </div>
      </section>
      <div>
        <h2>{mapel.title}</h2>
        <p>{mapel.description}</p>
        <p>{mapel.teacher}</p>
        <img src={mapel.image}></img>
      </div>
    </>
  );
}

export default Mapel;
