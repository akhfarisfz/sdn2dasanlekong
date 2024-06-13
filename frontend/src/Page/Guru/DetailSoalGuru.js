// SoalDetail.js
import React from "react";
import { useParams } from "react-router-dom";

function SoalDetail() {
  const { id } = useParams(); // Ambil ID dari URL

  // Misalkan Anda memiliki data soal di sini
  const soalList = [
    {
      id: 1,
      mapel: "Matematika",
      soal_PG: "Apa itu matematika?",
      jawabanList: [
        { id: 1, text: "Studi tentang angka" },
        { id: 2, text: "Studi tentang huruf" },
      ],
      kunciJawaban: "A",
    },
    {
      id: 2,
      mapel: "Bahasa Inggris",
      soal_PG: "What is English?",
      jawabanList: [
        { id: 1, text: "A language" },
        { id: 2, text: "A number" },
      ],
      kunciJawaban: "A",
    },
  ];

  const soal = soalList.find((soal) => soal.id === parseInt(id));

  if (!soal) {
    return <h2>Soal tidak ditemukan</h2>;
  }

  return (
    <div>
      <h2>Detail Soal</h2>
      <p>
        <strong>Mata Pelajaran:</strong> {soal.mapel}
      </p>
      <p>
        <strong>Soal:</strong> {soal.soal_PG}
      </p>
      <p>
        <strong>Jawaban:</strong>
      </p>
      <ul>
        {soal.jawabanList.map((jawaban) => (
          <li key={jawaban.id}>{jawaban.text}</li>
        ))}
      </ul>
      <p>
        <strong>Kunci Jawaban:</strong> {soal.kunciJawaban}
      </p>
    </div>
  );
}

export default SoalDetail;
