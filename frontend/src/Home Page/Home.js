import React from "react";
import Header from "../Header/Header.js";
import sekolah from "../img/pexels-yankrukov-8617771.jpg"; // Impor gambar cover sekolah

function Home() {
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
            SDN 02 Dasanlekong
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
            <button className="bg-white text-blue-500 hover:bg-blue-400 text-lg md:text-xl lg:text-2xl font-semibold py-2 px-6 md:py-3 md:px-8 lg:py-4 lg:px-10 rounded-full shadow-md transition duration-300 mb-4 md:mb-0">
              Ayokk! masuk ke akun anda
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 px-4">
        <h2 className="text-3xl font-semibold mb-4">Tentang Sekolah</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <img
            src={sekolah} // Gunakan prop src untuk menampilkan gambar cover sekolah
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
        <p className="text-lg md:text-xl lg:text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac
          malesuada justo. Integer id orci quis felis dapibus scelerisque sed ut
          nisl. Integer vulputate, nisi nec maximus suscipit, risus lacus tempus
          ipsum, nec placerat arcu metus vel felis.
        </p>
      </div>
    </div>
  );
}
export default Home;
