// import keperluan gambar disini
import futsal from "../../img/eskul futsal.jpeg";
import badminton from "../../img/badminton.jpeg";
import catur from "../../img/catur.jpg";
import menari from "../../img/menari.jpg";
import pramuka from "../../img/pramuka.jpg";
import voli from "../../img/voli.jpg";
import suara from "../../img/suara.jpg";

const dataPrestasi = [
  {
    id: 1,
    title: "Juara 1 lomba futsal tingkat provinsi",
    description: "Juara liga provinsi",
    images: [
      { src: futsal, alt: "Eskul Futsal 1" },
      { src: voli, alt: "Eskul Futsal 2" },
      // Tambahkan gambar-gambar eskul futsal sesuai kebutuhan
    ],
  },
  {
    id: 2,
    title: "Juara 3 lomba catur sekecamatan",
    description: "Kompetisi lomba catur.",
    images: [
      { src: catur, alt: "Eskul Catur 1" },
      { src: catur, alt: "Eskul Catur 2" },
      // Tambahkan gambar-gambar eskul catur sesuai kebutuhan
    ],
  },
  {
    id: 3,
    title: "Harapan 2 lomba catur desa Dasan Lekong",
    description: "Kompetensi seni tari.",
    images: [
      { src: menari, alt: "Eskul Menari 1" },
      { src: menari, alt: "Eskul Menari 2" },
      // Tambahkan gambar-gambar eskul menari sesuai kebutuhan
    ],
  },
  {
    id: 4,
    title: "Harapan orang tua",
    description: "Kemah pramuka",
    images: [
      { src: pramuka, alt: "Eskul Pramuka 1" },
      { src: pramuka, alt: "Eskul Pramuka 2" },
      // Tambahkan gambar-gambar eskul pramuka sesuai kebutuhan
    ],
  },
];

export default dataPrestasi;
