import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useJWT from "../../libs/hooks/useJWT";
import { useNavigate } from "react-router-dom";
import { ContextApplication } from "../../libs/config/contexts";
import belajar from "../../img/belajar.jpg";
import Header from "../../libs/components/Header";
import matematika from "../../img/matematika.jpg";
import IPA from "../../img/IPA.jpg";
import indonesia from "../../img/bhs indo.jpg";
import inggris from "../../img/bhs inggris.jpg";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { BASE_URL } from "../../libs/config/settings";
import useMessage from "../../libs/hooks/useMessage";
import useHTTP from "../../libs/hooks/useHTTP";

function DashboardGuru() {
  let [isOpen, setIsOpen] = useState(false);
  const [isFormPGVisible, setIsFormPGVisible] = useState(false);
  const [isFormEssayVisible, setIsFormEssayVisible] = useState(false);
  const [soalList, setSoalList] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [formData, setFormData] = useState({
    mapel: "",
    kelas: "",
    rombel: "",
    soal_PG: "",
    soal_essay: "",
    jawaban_essay: "",
  });
  const [jawabanList, setJawabanList] = useState([{ id: 1, text: "" }]);
  const [kunciJawaban, setKunciJawaban] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectMapel, setSelectMapel] = useState("");
  const [selectKelas, setSelectKelas] = useState("");
  const [selectRombel, setSelectRombel] = useState("");
  const [selectType, setSelectType] = useState("");

  // Pilih jenis soal (PG dan Essay)
  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectType(value); // Update select value state
    if (value === "PG") {
      setIsFormPGVisible(true);
      setIsFormEssayVisible(false);
      setFormData({
        ...formData,
        soal_PG: "",
        soal_essay: "",
        jawaban_essay: "",
      });
      setJawabanList([{ id: 1, text: "" }]);
      setKunciJawaban("");
      setEditId(null);
    } else if (value === "Essay") {
      setIsFormPGVisible(false);
      setIsFormEssayVisible(true);
      setFormData({
        ...formData,
        soal_PG: "",
        soal_essay: "",
        jawaban_essay: "",
      });
    } else {
      setIsFormPGVisible(false);
      setIsFormEssayVisible(false);
    }
  };

  const handleMapelChange = (e) => {
    setSelectMapel(e.target.value);
    setFormData({ ...formData, mapel: e.target.value });
  };

  const handleKelasChange = (e) => {
    setSelectKelas(e.target.value);
    setFormData({ ...formData, kelas: e.target.value });
  };

  const handleRombelChange = (e) => {
    setSelectRombel(e.target.value);
    setFormData({ ...formData, rombel: e.target.value });
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
        setDaftarMapelPagination(pagination);
        setDaftarMapel(results);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  useEffect(() => {
    onMapelList();
  }, []);
  // const list_matpel = [
  //   {
  //     id: 1,
  //     image: indonesia,
  //     title: "Bahasa Indonesia",
  //   },
  //   {
  //     id: 2,

  //     image: matematika,
  //     title: "Matematika",
  //   },
  //   {
  //     id: 3,
  //     image: IPA,
  //     title: "Ilmu Pengetahuan Alam",
  //   },
  //   {
  //     id: 4,
  //     image: inggris,
  //     title: "Bahasa Inggris",
  //   },
  // ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleJawabanChange = (id, text) => {
    setJawabanList(jawabanList.map((j) => (j.id === id ? { ...j, text } : j)));
  };

  const TambahJawabanPG = () => {
    const newId = jawabanList.length + 1;
    setJawabanList([...jawabanList, { id: newId, text: "" }]);
  };
  const handleDeleteSoal = (id) => {
    const filteredSoalList = soalList.filter((soal) => soal.id !== id);
    const updatedSoalList = filteredSoalList.map((soal) => {
      if (soal.id > id) {
        return { ...soal, id: soal.id - 1 };
      }
      return soal;
    });
    setSoalList(updatedSoalList);
    setIdCounter(updatedSoalList.length + 1);
  };

  const handleEditSoal = (id) => {
    const soalToEdit = soalList.find((soal) => soal.id === id);
    if (soalToEdit.type === "PG") {
      setIsFormPGVisible(true);
      setIsFormEssayVisible(false);
      setFormData({
        soal_PG: soalToEdit.soal_PG,
        soal_essay: "",
        jawaban_essay: "",
      });
      setJawabanList(soalToEdit.jawabanList);
      setKunciJawaban(soalToEdit.kunciJawaban);
    } else if (soalToEdit.type === "Essay") {
      setIsFormPGVisible(false);
      setIsFormEssayVisible(true);
      setFormData({
        soal_PG: "",
        soal_essay: soalToEdit.soal_essay,
        jawaban_essay: soalToEdit.jawaban_essay,
      });
    }
    setEditId(id);
  };
  const handleKunciJawabanChange = (e) => {
    setKunciJawaban(e.target.value);
  };

  const handleSave = (e, type) => {
    e.preventDefault();
    const newSoal = {
      id: editId !== null ? editId : idCounter,
      type,
      ...formData,
      jawabanList: type === "PG" ? jawabanList : [],
      kunciJawaban: type === "PG" ? kunciJawaban : "",
    };

    if (editId !== null) {
      setSoalList(
        soalList.map((soal) => (soal.id === editId ? newSoal : soal))
      );
    } else {
      setSoalList([...soalList, newSoal]);
      setIdCounter(idCounter + 1);
    }

    // const handleSubmit = (e) => {};
    // Reset form and select value
    setIsFormPGVisible(false);
    setIsFormEssayVisible(false);
    setFormData({
      mapel: "",
      kelas: "",
      rombel: "",
      soal_PG: "",
      soal_essay: "",
      jawaban_essay: "",
    });
    setJawabanList([{ id: 1, text: "" }]);
    setKunciJawaban("");
    setEditId(null);
    setSelectMapel("");
    setSelectKelas("");
    setSelectRombel("");
    setSelectType("");
    setIsOpen(false);
  };
  const handleOpenPopUp = () => setIsOpen(true);
  const handleClosePopUp = () => setIsOpen(false);

  console.log(formData);
  return (
    <>
      {/* Header */}
      <Header />

      {/* body */}
      <section>
        <div className="mt-[25px] lg:mt-[1px] relative justify-center lg:justify-start h-52 w-full bg-blue-300 flex items-center mx-auto ">
          <div
            id="cover-content"
            className="relative text-center md:text-left lg:left-20"
          >
            <button
              onClick={handleOpenPopUp}
              className="group cursor-pointer outline-none"
              title="Add New"
            >
              <svg
                class="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                viewBox="0 0 24 24"
                height="50px"
                width="50px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-width="1.5"
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                ></path>
                <path stroke-width="1.5" d="M8 12H16"></path>
                <path stroke-width="1.5" d="M12 16V8"></path>
              </svg>
              <h2>Tambah Soal</h2>
            </button>

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start"></div>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* list menggunakan React Router Dom */}
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {soalList.map((soal, index) => (
              <li key={index}>
                <div className="relative h-48 rounded-lg w-full bg-red-200">
                  <div>
                    <h2 className="text-xl font-bold text-gray-700 text-center p-6">
                      {soal.mapel}
                    </h2>
                  </div>

                  <div className="flex mx-auto items-end h-12 w-fit gap-4 absolute bottom-2 left-2 right-2">
                    <button class="cursor-pointer transition-all bg-blue-500 text-white h-11 px-4 py-1 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                      Buka
                    </button>
                    <button
                      onClick={() => handleDeleteSoal(soal.id)}
                      class="cursor-pointer transition-all bg-blue-500 h-11 text-white px-4 py-1 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        {isOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
            onClick={handleClosePopUp} // Menambahkan event handler untuk menutup form saat klik di luar
          >
            <div
              className="relative mx-auto p-5 border w-full max-w-4xl h-auto shadow-lg rounded-md bg-white overflow-auto"
              style={{ maxHeight: "80vh" }} // Menambahkan batas tinggi maksimum
              onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat klik di dalam form
            >
              {/* Pilih mapel */}
              <div className="m-4">
                <label
                  htmlFor="TambahTugasMapel"
                  className="block text-sm font-medium text-gray-900"
                >
                  Pilih mata pelajaran yang ingin ditambahkan tugasnya
                </label>

                <select
                  name="TambahTugasMapel"
                  id="TambahTugasMapel"
                  className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                  onChange={handleMapelChange}
                  value={selectMapel} // Bind select value to state
                >
                  <option value="">Pilih mata pelajaran ....</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Ilmu Pengetahuan Alam">
                    Ilmu Pengetahuan Alam
                  </option>
                  <option value="Ilmu Pengetahuan Sosial">
                    Ilmu Pengetahuan Sosial
                  </option>
                </select>
              </div>

              {/* Pilih kelas dan rombel */}
              <div className="m-4 flex gap-4">
                <div className="w-3/4">
                  <label
                    htmlFor="PilihKelas"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Pilih kelas
                  </label>

                  <select
                    name="PilihKelas"
                    id="PilihKelas"
                    className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                    onChange={handleKelasChange}
                    value={selectKelas} // Bind select value to state
                  >
                    <option value="">Pilih kelas ....</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>

                <div className="w-1/4">
                  <label
                    htmlFor="PilihRombel"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Pilih rombel
                  </label>

                  <select
                    name="PilihRombel"
                    id="PilihRombel"
                    className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                    onChange={handleRombelChange}
                    value={selectRombel} // Bind select value to state
                  >
                    <option value="">Pilih rombel ....</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>
              </div>

              {/* Pilih jenis soal */}
              <div className="m-4">
                <label
                  htmlFor="HeadlineAct"
                  className="block text-sm font-medium text-gray-900"
                >
                  Pilih jenis soal yang ingin ditambahkan
                </label>

                <select
                  name="HeadlineAct"
                  id="HeadlineAct"
                  className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                  onChange={handleTypeChange}
                  value={selectType} // Bind select value to state
                >
                  <option value="">Jenis soal ....</option>
                  <option value="PG">Pilihan ganda</option>
                  <option value="Essay">Essay</option>
                </select>
              </div>

              <div className="flex flex-col">
                {isFormPGVisible && (
                  <div
                    className="m-4 border rounded-lg shadow p-4 w-full overflow-auto"
                    style={{ maxHeight: "60vh" }}
                  >
                    <form onSubmit={(e) => handleSave(e, "PG")}>
                      <h1 className="text-lg font-bold mb-4">
                        Form Pilihan Ganda
                      </h1>
                      <div className="mb-4">
                        <label
                          htmlFor="soal_PG"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Soal
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="soal_PG"
                            id="soal_PG"
                            value={formData.soal_PG}
                            onChange={handleInputChange}
                            className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Masukkan soal"
                          />
                        </div>
                      </div>

                      {/* Jawaban */}
                      {jawabanList.map((jawaban) => (
                        <div key={jawaban.id} className="mb-4">
                          <label
                            htmlFor={`jawaban_${jawaban.id}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Jawaban {String.fromCharCode(64 + jawaban.id)}
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              id={`jawaban_${jawaban.id}`}
                              value={jawaban.text}
                              onChange={(e) =>
                                handleJawabanChange(jawaban.id, e.target.value)
                              }
                              className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={TambahJawabanPG}
                        className="flex items-center text-teal-500 hover:text-teal-800"
                      >
                        <svg
                          className="stroke-teal-500 fill-none hover:fill-teal-800 duration-300"
                          viewBox="0 0 24 24"
                          height="24px"
                          width="24px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeWidth="1.5"
                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          ></path>
                          <path strokeWidth="1.5" d="M8 12H16"></path>
                          <path strokeWidth="1.5" d="M12 16V8"></path>
                        </svg>
                        <span className="ml-1">Tambah Jawaban</span>
                      </button>

                      <div className="mb-4">
                        <label
                          htmlFor="kunciJawaban"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Kunci Jawaban
                        </label>
                        <div className="mt-2">
                          <ul className="space-y-2">
                            {jawabanList.map((jawaban) => (
                              <li
                                key={jawaban.id}
                                className="flex items-center gap-2"
                              >
                                <input
                                  type="radio"
                                  name="kunciJawaban"
                                  value={String.fromCharCode(64 + jawaban.id)}
                                  checked={
                                    kunciJawaban ===
                                    String.fromCharCode(64 + jawaban.id)
                                  }
                                  onChange={handleKunciJawabanChange}
                                  className="form-radio border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`kunciJawaban_${jawaban.id}`}
                                  className="text-sm text-gray-700 font-medium"
                                >
                                  {String.fromCharCode(64 + jawaban.id)}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button
                        title="Save"
                        type="submit"
                        className="mt-4 cursor-pointer flex items-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded"
                      >
                        Simpan
                      </button>
                    </form>
                  </div>
                )}

                {isFormEssayVisible && (
                  <div
                    className="m-4 border rounded-lg shadow p-4 w-full overflow-auto"
                    style={{ maxHeight: "60vh" }}
                  >
                    <form onSubmit={(e) => handleSave(e, "Essay")}>
                      <h1 className="text-lg font-bold mb-4">Form Essay</h1>
                      <div className="mb-4">
                        <label
                          htmlFor="soal_essay"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Soal
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="soal_essay"
                            id="soal_essay"
                            value={formData.soal_essay}
                            onChange={handleInputChange}
                            className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Masukkan soal"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="jawaban_essay"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Jawaban
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="jawaban_essay"
                            id="jawaban_essay"
                            value={formData.jawaban_essay}
                            onChange={handleInputChange}
                            className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Masukkan jawaban"
                          />
                        </div>
                      </div>

                      <button
                        title="Save"
                        type="submit"
                        className="mt-4 cursor-pointer flex items-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded"
                      >
                        Simpan
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default DashboardGuru;
