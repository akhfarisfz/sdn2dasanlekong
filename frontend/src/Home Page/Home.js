import React, { useState } from "react";
import Header from "../Header/Header.js";
import Footer from "./Footer.js";
import sekolah1 from "../img/Gambar-Gedung-Sekolah-Modern-18.jpg"; // Impor gambar cover sekolah

const images = [
  {
    src: "image1.jpg",
    title: "Judul Gambar 1",
    description: "Deskripsi Gambar 1",
  },
  {
    src: "image2.jpg",
    title: "Judul Gambar 2",
    description: "Deskripsi Gambar 2",
  },
  // Tambahkan item gambar dan caption sesuai kebutuhan
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="container">
      <div
        id="cover"
        className="relative justify-center lg:justify-start bg-blue-500 min-h-screen flex items-center w-screen"
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
            <button className="bg-white text-blue-500 hover:bg-blue-400 text-lg md:text-xl lg:text-2xl font-semibold py-2 px-6 md:py-3 md:px-8 lg:py-4 lg:px-10 rounded-full shadow-md transition duration-300 mb-4 md:mb-0">
              Ayokk! masuk ke akun anda
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 px-4">
        <h2 className="text-3xl font-semibold mb-4">
          Tentang SDN 2 Dasan Lekong
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <img
            src={sekolah1} // Gunakan prop src untuk menampilkan gambar cover sekolah
            alt="Sekolah"
            className="w-full md:w-1/2 rounded-lg shadow-lg mb-4 md:mb-0"
          />
          <p className="text-lg md:text-xl lg:text-2xl ml-0 md:ml-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac
            malesuada justo. Integer id orci quis felis dapibus scelerisque sed
            ut nisl. Integer vulputate, nisi nec maximus suscipit, risus lacus
            tempus ipsum, nec placerat arcu metus vel felis.
          </p>
        </div>

        <h2 className="text-3xl font-semibold mb-4">Deskripsi Sekolah</h2>
        <p className="text-lg md:text-xl lg:text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac
          malesuada justo. Integer id orci quis felis dapibus scelerisque sed ut
          nisl. Integer vulputate, nisi nec maximus suscipit, risus lacus tempus
          ipsum, nec placerat arcu metus vel felis.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">
          Ekstrakurikuler dan Prestasi Sekolah
        </h2>
        <div className="relative max-w-lg mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className={index === currentIndex ? "block" : "hidden"}
            >
              <img
                src={image.src}
                alt={`Image ${index + 1}`}
                className="w-full"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
          <button
            className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full bg-black bg-opacity-50 text-white p-2"
            onClick={prevSlide}
          >
            &#10094;
          </button>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full bg-black bg-opacity-50 text-white p-2"
            onClick={nextSlide}
          >
            &#10095;
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Home;
