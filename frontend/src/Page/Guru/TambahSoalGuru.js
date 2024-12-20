import React, { useState, useRef } from "react";
import Header from "../../libs/components/Header";

function TambahSoalGuru() {
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
  const inputRef = useRef(null);
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
  };

  // const handleEditSoalFromList = (soal) => {
  //   const {
  //     id,
  //     type,
  //     soal_PG,
  //     soal_essay,
  //     jawaban_essay,
  //     jawabanList,
  //     kunciJawaban,
  //   } = soal;

  //   if (type === "PG") {
  //     setIsFormPGVisible(true);
  //     setIsFormEssayVisible(false);
  //     setFormData({
  //       soal_PG,
  //       soal_essay: "",
  //       jawaban_essay: "",
  //     });
  //     setJawabanList(jawabanList);
  //     setKunciJawaban(kunciJawaban);
  //   } else if (type === "Essay") {
  //     setIsFormPGVisible(false);
  //     setIsFormEssayVisible(true);
  //     setFormData({
  //       soal_PG: "",
  //       soal_essay,
  //       jawaban_essay,
  //     });
  //   }
  //   setEditId(id);
  // };

  console.log(formData);
  return (
    <>
      <Header />
      <div className="h-full mx-4 mt-4 shadow-lg border border-black rounded-xl">
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
            <option value="Ilmu Pengetahuan Alam">Ilmu Pengetahuan Alam</option>
            <option value="Ilmu Pengetahuan Sosial">
              Ilmu Pengetahuan Sosial
            </option>
          </select>
        </div>

        {/* Pilih kelas dan rombel */}
        <div className="m-4 flex gap-4">
          <div className=" w-3/4">
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

        {/* pilih jenis soal */}
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

        <div className="flex">
          {isFormPGVisible && (
            <div className="m-[10px] border rounded-lg box-shadow border-black p-[10px] w-full">
              <form onSubmit={(e) => handleSave(e, "PG")}>
                <h1>Form Pilihan Ganda</h1>
                <div className="col-span-full">
                  <label
                    htmlFor="soal_PG"
                    className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Soal
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <textarea
                        name="soal_PG"
                        id="soal_PG"
                        value={formData.soal_PG}
                        onChange={handleInputChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Masukkan soal"
                      />
                    </div>
                  </div>
                </div>

                {/* Jawaban */}
                {jawabanList.map((jawaban) => (
                  <div key={jawaban.id} className="col-span-full">
                    <label
                      htmlFor={`jawaban_${jawaban.id}`}
                      className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Jawaban {String.fromCharCode(64 + jawaban.id)}
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <input
                          type="text"
                          id={`jawaban_${jawaban.id}`}
                          value={jawaban.text}
                          onChange={(e) =>
                            handleJawabanChange(jawaban.id, e.target.value)
                          }
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={TambahJawabanPG}
                  className="mt-2 mb-4 flex items-center text-teal-500 hover:text-teal-800"
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

                <div className="col-span-full">
                  <label
                    htmlFor="kunciJawaban"
                    className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Kunci Jawaban
                  </label>
                  <div className="mt-2">
                    <ul className="mt-3 space-y-3">
                      {jawabanList.map((jawaban) => (
                        <li
                          key={jawaban.id}
                          className="flex items-center gap-x-2.5"
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
                            className="form-radio border-gray-400 text-indigo-600 focus:ring-indigo-600 duration-150"
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
                  className="my-4 cursor-pointer flex items-center fill-cyan-300 bg-cyan-600 hover:bg-cyan-500 active:border active:border-cyan-300 rounded-md duration-100 p-2"
                >
                  <span className="text-sm text-cyan-950 font-bold pr-1">
                    Simpan
                  </span>
                </button>
              </form>
            </div>
          )}
          {isFormEssayVisible && (
            <div className="m-[10px] border rounded-lg box-shadow border-black p-[10px] w-full">
              <form onSubmit={(e) => handleSave(e, "Essay")}>
                <h1>Form Essay</h1>
                <div className="col-span-full">
                  <label
                    htmlFor="soal_essay"
                    className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Soal
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <textarea
                        type="text"
                        name="soal_essay"
                        id="soal_essay"
                        autoComplete="soal_essay"
                        value={formData.soal_essay}
                        onChange={handleInputChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Masukkan soal"
                      />
                    </div>
                  </div>
                </div>
                <label
                  htmlFor="jawaban_essay"
                  className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  Jawaban
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="jawaban_essay"
                      id="jawaban_essay"
                      autoComplete="jawaban_essay"
                      value={formData.jawaban_essay}
                      onChange={handleInputChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Masukkan jawaban"
                    />
                  </div>
                </div>

                <button
                  title="Save"
                  type="submit"
                  className="my-4 cursor-pointer flex items-center fill-cyan-300 bg-cyan-600 hover:bg-cyan-500 active:border active:border-cyan-300 rounded-md duration-100 p-2"
                >
                  <span className="text-sm text-cyan-950 font-bold pr-1">
                    Simpan
                  </span>
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="m-4">
          <h2 className="text-lg font-semibold">
            Soal yang sudah ditambahkan:
          </h2>
          <ul>
            {soalList.map((soal) => (
              <li key={soal.id} className="border-b border-gray-300 py-2">
                <p>
                  Kelas : {soal.kelas}
                  {soal.rombel}
                </p>
                <p>Mata pelajaran : {soal.mapel}</p>
                <p>Nomor {soal.id}</p>
                <p>
                  Jenis soal : {soal.type === "PG" ? "Pilihan Ganda" : "Essay"}
                </p>
                <p>
                  Soal : {soal.type === "PG" ? soal.soal_PG : soal.soal_essay}
                </p>
                {soal.type === "PG" && (
                  <>
                    <p>Jawaban:</p>
                    <ul className="ml-4 list-disc">
                      {soal.jawabanList.map((jawaban, index) => (
                        <li key={index}>
                          Jawaban {String.fromCharCode(65 + index)}:{" "}
                          {jawaban.text}
                        </li>
                      ))}
                    </ul>
                    <p>Kunci Jawaban: {soal.kunciJawaban}</p>
                  </>
                )}
                {soal.type === "Essay" && <p>Jawaban: {soal.jawaban_essay}</p>}

                <div className="flex space-x-4 mt-2">
                  <button
                    // onClick={() => handleSubmit(soal.id)}
                    className="text-green-500 hover:text-blue-700"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => handleEditSoal(soal.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSoal(soal.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TambahSoalGuru;
