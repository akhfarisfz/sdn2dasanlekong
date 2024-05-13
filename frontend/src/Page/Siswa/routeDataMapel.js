// api.js
import matematika from "../../img/matematika.jpg";
import IPA from "../../img/IPA.jpg";
import indonesia from "../../img/bhs indo.jpg";
import inggris from "../../img/bhs inggris.jpg";

export function getMapel(id) {
  // Contoh sumber data mapel
  const mapelData = {
    1: {
      id: 1,
      title: "Matematika",
      description: "Deskripsi tentang mata pelajaran Matematika.",
      teacher: "Bapak Matematika",
      image: matematika,
    },
    2: {
      id: 2,
      title: "Bahasa Indonesia",
      description: "Deskripsi tentang mata pelajaran Bahasa Indonesia.",
      teacher: "Ibu Bahasa Indonesia",
      image: indonesia,
    },
    3: {
      id: 3,
      title: "Ilmu Pengetahuan Alam",
      description: "Deskripsi tentang mata pelajaran IPA.",
      teacher: "Pak IPA",
      image: IPA,
    },
    4: {
      id: 4,
      title: "Bahasa Inggris",
      description: "Deskripsi tentang mata pelajaran Bahasa Inggris.",
      teacher: "Miss English",
      image: inggris,
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
