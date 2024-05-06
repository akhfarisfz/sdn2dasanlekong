import futsal from "../../img/eskul futsal.jpeg";
import badminton from "../../img/badminton.jpeg";
import catur from "../../img/catur.jpg";
import menari from "../../img/menari.jpg";
import pramuka from "../../img/pramuka.jpg";
import voli from "../../img/voli.jpg";
import suara from "../../img/suara.jpg";

const dataEskul = [
  {
    title: "Futsal",
    description:
      "Eskul futsal di sekolah ini setara dengan akademi Barcelona di spanyol. Sudah langganan juara liga provinsi",
    images: [
      { src: futsal, alt: "Eskul Futsal 1" },
      { src: futsal, alt: "Eskul Futsal 2" },
      // Tambahkan gambar-gambar eskul futsal sesuai kebutuhan
    ],
  },
  {
    title: "Catur",
    description:
      "Eskul catur di sekolah ini membawa nama baik di berbagai kompetisi.",
    images: [
      { src: catur, alt: "Eskul Catur 1" },
      { src: catur, alt: "Eskul Catur 2" },
      // Tambahkan gambar-gambar eskul catur sesuai kebutuhan
    ],
  },
  {
    title: "Menari",
    description:
      "Eskul menari di sekolah ini membawa warna tersendiri dalam seni tari.",
    images: [
      { src: menari, alt: "Eskul Menari 1" },
      { src: menari, alt: "Eskul Menari 2" },
      // Tambahkan gambar-gambar eskul menari sesuai kebutuhan
    ],
  },
  // Tambahkan data eskul lainnya sesuai kebutuhan
];

export default dataEskul;
