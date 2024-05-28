import Header from "../../libs/components/Header";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useMessage from "../../libs/hooks/useMessage";
import { BASE_URL } from "../../libs/config/settings";
import { Link } from "react-scroll";

function BelajarSiswa() {
  const { id } = useParams(); // Ambil ID mapel dari URL menggunakan useParams
  const [mapel, setMapel] = useState(null); // State untuk menyimpan data mapel
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const onMapelDetail = () => {
    const url = `${BASE_URL}/mapel/${id}`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .get(url, config)
      .then((response) => {
        setMapel(response.data);
      })
      .catch((error) => {
        message.error(error);
      });
  };
  const list_menu = [
    {
      id: 1,
      title: "Bab 1",
    },
    {
      id: 2,
      title: "Bab 2",
    },
    {
      id: 3,
      title: "Bab 3",
    },
    {
      id: 4,
      title: "Ujian Tengah Semester",
    },
    {
      id: 5,
      title: "Bab 4",
    },
    {
      id: 6,
      title: "Bab 5",
    },
    {
      id: 7,
      title: "Ujian Akhir Semester",
    },
  ];
  useEffect(() => {

    onMapelDetail();
  }, []);

  if (!mapel) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <section>
        <div
          id="cover"
          className="relative justify-center lg:justify-start bg-blue-500 min-h-screen flex items-center mx-auto bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${mapel.images})` }}
        >
          <div
            id="cover-content"
            className="relative text-center lg:text-left lg:left-20"
          >
            <h1 className="p-4 bg-gray-500 text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
              Selamat Belajar!!
            </h1>
            <p className="lg:w-fit p-4 bg-gray-500 text-lg md:text-xl lg:text-2xl text-white mb-8">
              Mari kita belajar {mapel.nama_mapel}!!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start"></div>
          </div>
        </div>
      </section>
      <section>
        <ul className="mt-4 grid m-auto px-4 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list_menu.map((tugas, index) => (
            <li className="my-6 w-full" key={index}>
              <Link to={`/tujuan/${tugas.id}`}>
                <button
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-[200px] w-full text-white text-center font-bold"
                >
                  {tugas.title}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </>
  );
}

export default BelajarSiswa;
