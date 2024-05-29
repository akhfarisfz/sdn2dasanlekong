import React from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Header from "../../libs/components/Header";

function SoalDetail() {
  const { mapel } = useParams(); // Ambil mata pelajaran dari URL

  const soalList = JSON.parse(localStorage.getItem("soal-list")) || [];
  const soalMapel = soalList.filter((soal) => soal.mapel === mapel);

  console.log(mapel);
  console.log(soalMapel);

  if (soalMapel.length === 0) {
    return (
      <>
        <Header />
        <div className="">
          <h2 className="mx-auto mt-12 font-bold text-lg border-b-2 border-gray-400 w-fit">
            Soal masih kosong
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {soalMapel.map((soal, index) => (
          <li key={index}>
            <div className="relative h-48 rounded-lg w-full bg-red-200">
              <div>
                <h2 className="text-xl font-bold text-gray-700 text-center p-6">
                  {soal.jenis}
                </h2>
              </div>

              <div className="flex mx-auto items-end h-12 w-fit gap-4 absolute bottom-2 left-2 right-2">
                <NavLink
                  //   to={`/guru/dashboard/soal/${soal.id}`}
                  className="cursor-pointer transition-all bg-blue-500 text-white h-11 px-4 py-1 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                >
                  Buka
                </NavLink>
                <button
                  //   onClick={() => handleDeleteSoal(soal.id)}
                  className="cursor-pointer transition-all bg-blue-500 h-11 text-white px-4 py-1 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                >
                  Hapus
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <h1>Detail Soal - {mapel}</h1>
        {soalMapel.map((soal, index) => (
          <div key={index}>
            <h2>Soal {index + 1}</h2>
            <p>Kelas: {soal.kelas}</p>
            <p>Rombel: {soal.rombel}</p>
            {soal.type === "PG" && (
              <>
                <p>Soal PG: {soal.soal_PG}</p>
                <p>Kunci Jawaban: {soal.kunciJawaban}</p>
                <ul>
                  {soal.jawabanList.map((jawaban, idx) => (
                    <li key={idx}>
                      {String.fromCharCode(65 + idx)}: {jawaban.text}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {soal.type === "Essay" && (
              <>
                <p>Soal Essay: {soal.soal_essay}</p>
                <p>Jawaban Essay: {soal.jawaban_essay}</p>
              </>
            )}
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}

export default SoalDetail;