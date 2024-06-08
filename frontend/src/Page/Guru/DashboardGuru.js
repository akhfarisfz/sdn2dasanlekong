import React, { useState, useContext, useEffect } from "react";
import Header from "../../libs/components/Header";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { BASE_URL } from "../../libs/config/settings";
import useMessage from "../../libs/hooks/useMessage";
import useHTTP from "../../libs/hooks/useHTTP";
import { NavLink } from "react-router-dom";

function DashboardGuru() {
  let [isOpen, setIsOpen] = useState(false);
  const [isFormPGVisible, setIsFormPGVisible] = useState(false);
  const [isFormEssayVisible, setIsFormEssayVisible] = useState(false);
  const LOCAL_STORAGE_KEY = "soal-list";

  const [soalList, setSoalList] = useState(() => {
    const savedSoalList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return savedSoalList || [];
  });
  const [idCounter, setIdCounter] = useState(1);
  const [formData, setFormData] = useState({
    mapel: "",
    jenis: "",
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
  const [selectJenisTugas, setSelectJenisTugas] = useState("");
  const [selectKelas, setSelectKelas] = useState("");
  const [selectRombel, setSelectRombel] = useState("");
  const [selectType, setSelectType] = useState("");
  const [formSoalList, setFormSoalList] = useState([formData]);

  const handleTypeChange = (e, index) => {
    const value = e.target.value;
    setSelectType(value); // Bind select value to state

    const updatedFormSoalList = formSoalList.map((item, idx) => {
      if (index === idx) {
        return {
          ...item,
          jenis: value,
          soal_PG: "",
          soal_essay: "",
          jawaban_essay: "",
        };
      }
      return item;
    });
    setFormSoalList(updatedFormSoalList);

    // Remove this block, it's not needed
    // if (value === "PG") {
    //   setIsFormPGVisible(true);
    //   setIsFormEssayVisible(false);
    //   setJawabanList([{ id: 1, text: "" }]);
    //   setKunciJawaban("");
    //   setEditId(null);
    // } else if (value === "Essay") {
    //   setIsFormPGVisible(false);
    //   setIsFormEssayVisible(true);
    // } else {
    //   setIsFormPGVisible(false);
    //   setIsFormEssayVisible(false);
    // }
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(soalList));
  }, [soalList]);

  const handleMapelChange = (e) => {
    setSelectMapel(e.target.value);
    setFormData({ ...formData, mapel: e.target.value });
  };

  const handleJenisTugas = (e) => {
    setSelectJenisTugas(e.target.value);
    setFormData({ ...formData, jenis: e.target.value });
  };

  const handleKelasChange = (e) => {
    setSelectKelas(e.target.value);
    setFormData({ ...formData, kelas: e.target.value });
  };

  const handleRombelChange = (e) => {
    setSelectRombel(e.target.value);
    setFormData({ ...formData, rombel: e.target.value });
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormSoalList = formSoalList.map((item, idx) => {
      if (index === idx) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setFormSoalList(updatedFormSoalList);
  };

  const handleJawabanChange = (e, index) => {
    const { value } = e.target;
    const updatedJawabanList = jawabanList.map((jawaban, idx) => {
      if (idx === index) {
        return { ...jawaban, text: value };
      }
      return jawaban;
    });
    setJawabanList(updatedJawabanList);
  };
  const handleKunciJawabanChange = (e) => {
    setKunciJawaban(e.target.value);
  };

  const TambahJawabanPG = () => {
    const newId = jawabanList.length + 1;
    setJawabanList([...jawabanList, { id: newId, text: "" }]);
  };
  const handleHapusJawabanPG = (id) => {
    if (jawabanList.length > 1) {
      const updatedJawabanList = jawabanList.filter(
        (jawaban) => jawaban.id !== id
      );
      setJawabanList(updatedJawabanList);
    }
  };
  const handleDeleteSoal = (index) => {
    const updatedFormSoalList = formSoalList.filter((_, idx) => idx !== index);
    setFormSoalList(updatedFormSoalList);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newSoalList = formSoalList.map((formItem, index) => ({
      id: editId !== null ? editId : idCounter + index,
      ...formItem,
      jawabanList: formItem.jenis === "PG" ? jawabanList : [],
      kunciJawaban: formItem.jenis === "PG" ? kunciJawaban : "",
    }));

    if (editId !== null) {
      setSoalList(
        soalList.map((soal) => (soal.id === editId ? newSoalList[0] : soal))
      );
    } else {
      setSoalList([...soalList, ...newSoalList]);
      setIdCounter(idCounter + newSoalList.length);
    }

    setIsFormPGVisible(false);
    setIsFormEssayVisible(false);
    setFormSoalList([formData]);
    setJawabanList([{ id: 1, text: "" }]);
    setKunciJawaban("");
    setEditId(null);
    setSelectMapel("");
    setSelectKelas("");
    setSelectRombel("");
    setSelectType("");
    setIsOpen(false);
  };

  const handleAddSoal = () => {
    setFormSoalList([...formSoalList, formData]);
  };

  const handleOpenPopUp = () => setIsOpen(true);
  const handleClosePopUp = () => setIsOpen(false);

  console.log(formData);

  return (
    <>
      <Header />

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
                className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                viewBox="0 0 24 24"
                height="50px"
                width="50px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeWidth="1.5"
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                ></path>
                <path strokeWidth="1.5" d="M8 12H16"></path>
                <path strokeWidth="1.5" d="M12 16V8"></path>
              </svg>
              <h2>Tambah Soal</h2>
            </button>

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start"></div>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <ul className="mt-4 flex gap-8 overflow-auto">
            {/* List mata pelajaran */}
            {[
              "Bahasa Indonesia",
              "Bahasa Inggris",
              "Matematika",
              "Ilmu Pengetahuan Alam",
              "Ilmu Pengetahuan Sosial",
            ].map((mapel) => (
              <li key={mapel}>
                <div className="relative h-48 w-64 rounded-lg bg-red-200">
                  <div>
                    <h2 className="text-xl font-bold text-gray-700 text-center p-6">
                      {mapel}
                    </h2>
                  </div>
                  <div className="flex mx-auto items-end h-12 w-fit gap-4 absolute bottom-2 left-2 right-2">
                    <NavLink
                      to={`/guru/dashboard/soal/${mapel}`}
                      className="cursor-pointer transition-all bg-blue-500 text-white h-11 px-4 py-1 rounded-lg hover:bg-blue-800"
                    >
                      Soal
                    </NavLink>
                    <NavLink
                      to={`/guru/dashboard/tugas/${mapel}`}
                      className="cursor-pointer transition-all bg-blue-500 text-white h-11 px-4 py-1 rounded-lg hover:bg-blue-800"
                    >
                      Tugas
                    </NavLink>
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
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <h4 className="text-lg font-medium text-gray-800">
                  Tambah Soal
                </h4>
                <form onSubmit={handleSave}>
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
                  <div className="m-4">
                    <label
                      htmlFor="TambahTugasMapel"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Pilih jenis tugas
                    </label>

                    <select
                      name="TambahJenisTugas"
                      id="TambahJenisTugas"
                      className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                      onChange={handleJenisTugas}
                      value={selectJenisTugas}
                    >
                      <option value="">Pilih jenis tugas ....</option>
                      <option value="Pekerjaan Rumah">PR</option>
                      <option value="Soal latihan">Soal latihan</option>
                      <option value="UTS">UTS</option>
                      <option value="UAS">UAS</option>
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

                  {formSoalList.map((formItem, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-md p-4 mt-4"
                    >
                      <label
                        htmlFor={`HeadlineAct-${index}`} // Make ID unique for each form item
                        className="block text-sm font-medium text-gray-900"
                      >
                        Pilih jenis soal yang ingin ditambahkan
                      </label>

                      <select
                        name="HeadlineAct"
                        id={`HeadlineAct-${index}`} // Make ID unique for each form item
                        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                        onChange={(e) => handleTypeChange(e, index)}
                        value={formItem.jenis} // Bind select value to state
                      >
                        <option value="">Jenis soal ....</option>
                        <option value="PG">Pilihan ganda</option>
                        <option value="Essay">Essay</option>
                      </select>
                      {formItem.jenis === "PG" && (
                        <>
                          <div className="mt-2">
                            <label className="block font-semibold">
                              Soal PG
                            </label>
                            <textarea
                              name="soal_PG"
                              value={formItem.soal_PG}
                              onChange={(e) => handleInputChange(e, index)}
                              rows="4"
                              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block font-semibold">
                              Jawaban PG
                            </label>
                            {/* Jawaban */}
                            {jawabanList.map((jawaban, index) => (
                              <>
                                <div key={jawaban.id} className="mb-4">
                                  <label
                                    htmlFor={`jawaban_${jawaban.id}`}
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Jawaban{" "}
                                    {String.fromCharCode(64 + jawaban.id)}
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      id={`jawaban_${jawaban.id}`}
                                      value={jawaban.text}
                                      onChange={(e) =>
                                        handleJawabanChange(e, index)
                                      }
                                      className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                  </div>
                                </div>
                                <div className="flex gap-6">
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
                                      <path
                                        strokeWidth="1.5"
                                        d="M8 12H16"
                                      ></path>
                                      <path
                                        strokeWidth="1.5"
                                        d="M12 16V8"
                                      ></path>
                                    </svg>
                                    <span className="ml-1">Tambah Jawaban</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleHapusJawabanPG(jawaban.id)
                                    }
                                    className={`flex items-center text-red-500 hover:text-red-800 ${
                                      jawabanList.length === 1
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                    disabled={jawabanList.length === 1}
                                  >
                                    <svg
                                      className="stroke-red-500 fill-none hover:fill-red-800 duration-300"
                                      viewBox="0 0 24 24"
                                      height="24px"
                                      width="24px"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeWidth="1.5"
                                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                      ></path>
                                      <path
                                        strokeWidth="1.5"
                                        d="M8 12H16"
                                      ></path>
                                    </svg>
                                    <span className="ml-1">Hapus Jawaban</span>
                                  </button>
                                </div>
                              </>
                            ))}

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
                                        value={String.fromCharCode(
                                          64 + jawaban.id
                                        )}
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
                          </div>
                        </>
                      )}
                      {formItem.jenis === "Essay" && (
                        <>
                          <div className="mt-2">
                            <label className="block font-semibold">
                              Soal Essay
                            </label>
                            <textarea
                              name="soal_essay"
                              value={formItem.soal_essay}
                              onChange={(e) => handleInputChange(e, index)}
                              rows="4"
                              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block font-semibold">
                              Jawaban Essay
                            </label>
                            <textarea
                              name="jawaban_essay"
                              value={formItem.jawaban_essay}
                              onChange={(e) => handleInputChange(e, index)}
                              rows="4"
                              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                          </div>
                        </>
                      )}
                      <div className="flex gap-4 my-2">
                        <button
                          type="button"
                          onClick={handleAddSoal}
                          className="mt-2 px-2 py-2 bg-green-500 text-white rounded-md"
                        >
                          Tambah soal
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSoal(index)}
                          className={`mt-2 px-4 py-2 bg-red-500 text-white rounded-md ${
                            formSoalList.length === 1
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={formSoalList.length === 1}
                        >
                          Hapus Soal
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    title="submit"
                    type="submit"
                    className="mt-4 cursor-pointer flex items-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default DashboardGuru;
