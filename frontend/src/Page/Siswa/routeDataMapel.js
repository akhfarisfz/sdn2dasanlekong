// api.js
import matematika_land from "../../img/matematika_land.jpg";
import IPA_land from "../../img/IPA_land.jpg";
import indonesia_land from "../../img/bhs indo_land.jpg";
import inggris_land from "../../img/bhs inggris_land.jpeg";
import indonesia_land2 from "../../img/bhs indo_land2.jpg";
import indonesia3 from "../../img/bhs indo3.jpg";
import indonesia_land4 from "../../img/bhs indo4.jpg";

export function getMapel(id) {
  // Contoh sumber data mapel
  const mapelData = {
    1: {
      id: 1,
      title: "Bahasa Indonesia",
      description: "Deskripsi tentang mata pelajaran Bahasa Indonesia.",
      teacher: "Ibu Bahasa Indonesia",
      gambar: indonesia_land4,
    },
    2: {
      id: 2,
      title: "Matematika",
      description: "Deskripsi tentang mata pelajaran Matematika.",
      teacher: "Bapak Matematika",
      gambar: matematika_land,
    },
    3: {
      id: 3,
      title: "Ilmu Pengetahuan Alam",
      description: "Deskripsi tentang mata pelajaran IPA.",
      teacher: "Pak IPA",
      gambar: IPA_land,
    },
    4: {
      id: 4,
      title: "Bahasa Inggris",
      description: "Deskripsi tentang mata pelajaran Bahasa Inggris.",
      teacher: "Miss English",
      gambar: inggris_land,
    },
  };

  // Ambil data mapel berdasarkan ID
  const data = mapelData[id];

  // Jika data tidak ditemukan, lempar error
  if (!data) {
    return Promise.reject("Mapel not found");
  }

  // Kembalikan data mapel
  return Promise.resolve(data);
}
