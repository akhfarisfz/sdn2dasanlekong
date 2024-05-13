// import keperluan gambar disini
import futsal from "../../img/eskul futsal.jpeg";
import badminton from "../../img/badminton.jpeg";
import catur from "../../img/catur.jpg";
import menari from "../../img/menari.jpg";
import pramuka from "../../img/pramuka.jpg";
import voli from "../../img/voli.jpg";
import suara from "../../img/suara.jpg";

const dataEskul = [
  {
    id: 1,
    title: "Futsal",
    description:
      "Eskul futsal di sekolah ini setara dengan akademi Barcelona di spanyol. Sudah langganan juara liga provinsi",
    images: [
      { src: futsal, alt: "Eskul Futsal 1" },
      { src: voli, alt: "Eskul Futsal 2" },
      { src: suara, alt: "Eskul Futsal 2" },
      // Tambahkan gambar-gambar eskul futsal sesuai kebutuhan
    ],
  },
  {
    id: 2,
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
    id: 3,
    title: "Menari",
    description:
      "Eskul menari di sekolah ini membawa warna tersendiri dalam seni tari.",
    images: [
      { src: menari, alt: "Eskul Menari 1" },
      { src: menari, alt: "Eskul Menari 2" },
      // Tambahkan gambar-gambar eskul menari sesuai kebutuhan
    ],
  },
  {
    id: 4,
    title: "Pramuka",
    description: "Eskul pramuka mengajarkan kemandirian dan keberanian.",
    images: [
      { src: pramuka, alt: "Eskul Pramuka 1" },
      { src: pramuka, alt: "Eskul Pramuka 2" },
      // Tambahkan gambar-gambar eskul pramuka sesuai kebutuhan
    ],
  },
  {
    id: 5,
    title: "Voli",
    description:
      "Eskul voli di sekolah ini telah mencetak banyak atlet voli berprestasi.",
    images: [
      { src: voli, alt: "Eskul Voli 1" },
      { src: voli, alt: "Eskul Voli 2" },
      // Tambahkan gambar-gambar eskul voli sesuai kebutuhan
    ],
  },
  {
    id: 6,
    title: "Badminton",
    description:
      "Eskul badminton di sekolah ini memiliki fasilitas yang lengkap dan pelatih berpengalaman.",
    images: [
      { src: badminton, alt: "Eskul Badminton 1" },
      { src: badminton, alt: "Eskul Badminton 2" },
      // Tambahkan gambar-gambar eskul badminton sesuai kebutuhan
    ],
  },
  {
    id: 7,
    title: "Paduan Suara",
    description:
      "Eskul paduan suara di sekolah ini telah meraih banyak prestasi dalam berbagai kompetisi.",
    images: [
      { src: suara, alt: "Eskul Paduan Suara 1" },
      { src: suara, alt: "Eskul Paduan Suara 2" },
      // Tambahkan gambar-gambar eskul paduan suara sesuai kebutuhan
    ],
  },
];

export default dataEskul;
