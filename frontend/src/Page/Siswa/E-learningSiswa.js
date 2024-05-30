import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useJWT from "../../libs/hooks/useJWT";
import { useNavigate } from "react-router-dom";
import { ContextApplication } from "../../libs/config/contexts";
import belajar from "../../img/belajar.jpg";
import Header from "../../libs/components/Header";
import { BASE_URL } from "../../libs/config/settings";
import useMessage from "../../libs/hooks/useMessage";
import useHTTP from "../../libs/hooks/useHTTP";
import { jwtDecode } from "jwt-decode";


function E_learningSiswa() {
  const [daftarMapel, setDaftarMapel] = useState([]);
  const[idUser,setIdUser]=useState([]);
  // const [daftarMapelPagination, setDaftarMapelPagination] = useState({});

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const application = useContext(ContextApplication);
  const navigate = useNavigate();

  const signOut = () => {
    jwt.signOut();
    navigate("/login");
    application.setIsAuthenticated(false);
  };


  const onMapelList = (params) => {
    const url = `${BASE_URL}/mapel/`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
      params,
    };
    http.privateHTTP
      .get(url, config)
      .then((response) => {
        const { results, ...pagination } = response.data;
        // setDaftarMapelPagination(pagination);
        setDaftarMapel(results);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  useEffect(() => {
    onMapelList();
    if (isLoggedIn) {
      const decodedToken = jwtDecode(token);
      const { id } = decodedToken;
      setIdUser(id);
    }
  }, []);
  const hariArray = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const jamArray = Array.from({ length: 9 }, (_, i) => i + 7);




  return (
    <>
      {/* Header */}
      <Header />

      {/* body */}
      <section>
      
        <div
          id="cover"
          className="mt-[25px] lg:mt-[50px] relative justify-center lg:justify-start bg-blue-500 min-h-screen flex items-center mx-auto max-w-screen-xl bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${belajar})` }}
        >
          <div
            id="cover-content"
            className="relative text-center md:text-left lg:left-20"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
              Selamat Belajar!!
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white mb-8">
              Mari kita belajar di E-Learning!!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start"></div>
          </div>
        </div> 
      </section>

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* list menggunakan React Router Dom */}
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {daftarMapel.map((mapel, index) => (
              
              <li key={index}>

                <div className="group block overflow-hidden relative border drop-shadow-lg">
                  <img
                    src={mapel.images}
                    alt=""
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <NavLink
                      to={`/siswa/eLearning/mapel/${mapel._id}`}
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Lihat Detail
                      </button>
                    </NavLink>
                  </div>
                </div>
                <div className="relative bg-white pt-3">
                  <h3 className="font-bold text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {mapel.nama_mapel}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="flex m-10 gap-4">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FMakassar&bgcolor=%23039BE5&showTitle=0&showPrint=0&src=NmViNzdmYmZjYmIxNGRmZTJjODY4MTUwMGI3YmIxYzlmZWU4YTJhODk1MGYzMjdjODhjZGZmYjZhY2U4MDY5N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23F4511E"
          className="border-none w-[700px] h-[600px] "
        ></iframe>

        <div className="w-3/4 mx-auto bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4">Jadwal Mata Pelajaran</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Waktu</th>
                {hariArray.map((hari) => (
                  <th key={hari} className="border border-gray-300 px-4 py-2">
                    {hari}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jamArray.map((jam) => (
                <tr key={jam}>
                  <td className="border border-gray-300 px-4 py-2">{jam}:00</td>
                  {hariArray.map((hari, index) => (
                    <td
                      key={index}
                      className="border border-gray-300 px-4 py-2"
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default E_learningSiswa;
