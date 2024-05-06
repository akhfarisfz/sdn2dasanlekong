import React, { useState, useRef } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import sekolah1 from "../../img/Gambar-Gedung-Sekolah-Modern-18.jpg";
import { NavLink } from "react-router-dom";
import futsal from "../../img/eskul futsal.jpeg";
import badminton from "../../img/badminton.jpeg";
import catur from "../../img/catur.jpg";
import menari from "../../img/menari.jpg";
import pramuka from "../../img/pramuka.jpg";
import voli from "../../img/voli.jpg";
import suara from "../../img/suara.jpg";
import { useSwipeable } from "react-swipeable";
import dataEskul from "../../libs/data/data_eskul.js";

const images = [
  { src: catur, alt: "Image 2" },
  { src: futsal, alt: "Image 3" },
  { src: menari, alt: "Image 4" },
  { src: pramuka, alt: "Image 5" },
  { src: suara, alt: "Image 6" },
  { src: voli, alt: "Image 7" },
];

const carouselData = [
  {
    id: 1,
    src: futsal,
    title: "Futsal",
    description:
      "Eskul futsal di sekolah ini setara dengan akademi Barcelona di spanyol. Sudah langganan juara liga provinsi",
  },
  {
    id: 2,
    src: "image2.jpg",
    title: "Pramuka",
    description: "ini eskul pramuka",
  },
  // Tambahkan item gambar dan caption sesuai kebutuhan
];
function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? dataEskul[currentIndex].images.length - 1
        : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dataEskul[currentIndex].images.length - 1
        ? 0
        : prevIndex + 1
    );
  };
  return (
    <>
      <Header />

      <div className="container w-screen">
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
              <NavLink to="/login">
                <button className="bg-white text-blue-500 hover:bg-blue-400 text-lg md:text-xl lg:text-2xl font-semibold py-2 px-6 md:py-3 md:px-8 lg:py-4 lg:px-10 rounded-full shadow-md transition duration-300 mb-4 md:mb-0">
                  Ayokk! masuk ke akun anda
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 w-screen">
          <div
            id="Sekolah"
            className="rounded-lg lg: shadow-lg bg-white p-6 md:p-8 justify-center mx-8"
          >
            <h2 className="text-3xl font-semibold mb-4">
              Tentang SDN 2 Dasan Lekong
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
              <img
                src={sekolah1}
                alt="sekolah1"
                className="w-full md:w-1/2 rounded-lg shadow-lg mb-4 md:mb-0"
              />
              <p className="text-lg md:text-xl lg:text-2xl ml-0 md:ml-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                ac malesuada justo. Integer id orci quis felis dapibus
                scelerisque sed ut nisl. Integer vulputate, nisi nec maximus
                suscipit, risus lacus tempus ipsum, nec placerat arcu metus vel
                felis.
              </p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden mx-8 shadow-lg bg-white p-6 md:p-8 mt-8">
            <h2 className="text-3xl font-semibold mb-4">Deskripsi Sekolah</h2>
            <p className="text-lg md:text-xl lg:text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac
              malesuada justo. Integer id orci quis felis dapibus scelerisque
              sed ut nisl. Integer vulputate, nisi nec maximus suscipit, risus
              lacus tempus ipsum, nec placerat arcu metus vel felis.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg bg-white p-6 md:p-8 mt-8 mx-8">
            <h2 id="Eskul" className="text-3xl font-semibold mb-4">
              Ekstrakurikuler dan Prestasi Sekolah
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac
              malesuada justo. Integer id orci quis felis dapibus scelerisque
              sed ut nisl. Integer vulputate, nisi nec maximus suscipit, risus
              lacus tempus ipsum, nec placerat arcu metus vel felis.
            </p>
            <div
              id="gallery-container"
              className="flex overflow-x-auto whitespace-nowrap gap-4 scroll-smooth snap-x"
              style={{
                cursor: "grab",
                userSelect: "none",
              }}
            >
              <div
                id="futsal"
                className="relative m-auto w-80 h-52 snap-center"
              >
                {dataEskul[currentIndex].images.map((image, index) => (
                  <div
                    key={index}
                    className={index === currentIndex ? "block" : "hidden"}
                  >
                    <div className="inline-block w-80 h-52 rounded-full">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="inline-block w-80 h-52 rounded-full"
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={prevSlide}
                >
                  &#10094;
                </button>
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={nextSlide}
                >
                  &#10095;
                </button>
              </div>
              <div
                id="badminton"
                className="relative m-auto w-80 h-52 snap-center"
              >
                {carouselData.map((item, index) => (
                  <div
                    key={item.id}
                    className={index === currentIndex ? "block" : "hidden"}
                  >
                    <div className="inline-block w-80 h-52 rounded-full">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="inline-block w-80 h-52 rounded-full"
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={prevSlide}
                >
                  &#10094;
                </button>
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={nextSlide}
                >
                  &#10095;
                </button>
              </div>

              <div id="catur" className="relative m-auto w-80 h-52 snap-center">
                {carouselData.map((item, index) => (
                  <div
                    key={item.id}
                    className={index === currentIndex ? "block" : "hidden"}
                  >
                    <div className="inline-block w-80 h-52 rounded-full">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="inline-block w-80 h-52 rounded-full"
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={prevSlide}
                >
                  &#10094;
                </button>
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={nextSlide}
                >
                  &#10095;
                </button>
              </div>

              <div
                id="menari"
                className="relative m-auto w-80 h-52 snap-center"
              >
                {carouselData.map((item, index) => (
                  <div
                    key={item.id}
                    className={index === currentIndex ? "block" : "hidden"}
                  >
                    <div className="inline-block w-80 h-52 rounded-full">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="inline-block w-80 h-52 rounded-full"
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={prevSlide}
                >
                  &#10094;
                </button>
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={nextSlide}
                >
                  &#10095;
                </button>
              </div>

              <div
                id="pramuka"
                className="relative m-auto w-80 h-52 snap-center"
              >
                {carouselData.map((item, index) => (
                  <div
                    key={item.id}
                    className={index === currentIndex ? "block" : "hidden"}
                  >
                    <div className="inline-block w-80 h-52 rounded-full">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="inline-block w-80 h-52 rounded-full"
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={prevSlide}
                >
                  &#10094;
                </button>
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={nextSlide}
                >
                  &#10095;
                </button>
              </div>

              <div id="suara" className="relative m-auto w-80 h-52 snap-center">
                {carouselData.map((item, index) => (
                  <div
                    key={item.id}
                    className={index === currentIndex ? "block" : "hidden"}
                  >
                    <div className="inline-block w-80 h-52 rounded-full">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="inline-block w-80 h-52 rounded-full"
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={prevSlide}
                >
                  &#10094;
                </button>
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={nextSlide}
                >
                  &#10095;
                </button>
              </div>

              <div id="voli" className="relative m-auto w-80 h-52 snap-center">
                {carouselData.map((item, index) => (
                  <div
                    key={item.id}
                    className={index === currentIndex ? "block" : "hidden"}
                  >
                    <div className="inline-block w-80 h-52 rounded-full">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="inline-block w-80 h-52 rounded-full"
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={prevSlide}
                >
                  &#10094;
                </button>
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full bg-black bg-opacity-50 text-white p-2 mx-2"
                  onClick={nextSlide}
                >
                  &#10095;
                </button>
              </div>
            </div>

            <div className="mt-16 px-4">
              <div className="relative max-w-lg mx-auto ">
                {carouselData.map((item, index) => (
                  <div
                    key={item.id}
                    className={index === currentIndex ? "block" : "hidden"}
                  >
                    <div className="rounded-lg lg:shadow-lg bg-white p-6 md:p-8 justify-center mx-8">
                      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full md:w-1/2 rounded-lg shadow-lg mb-4 md:mb-0"
                        />
                        <div className="text-lg md:text-xl lg:text-2xl ml-0 md:ml-4">
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </div>
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
