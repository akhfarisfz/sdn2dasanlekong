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
    // Inisialisasi state dari localStorage
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

  // Simpan soalList ke localStorage setiap kali soalList berubah
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

  // !!! TOlong ini error karena undifined

  // const onMapelList = (params) => {
  //   const url = `${BASE_URL}/mapel/`;
  //   const config = {
  //     headers: {
  //       Authorization: jwt.get(),
  //     },
  //     params,
  //   };
  //   http.privateHTTP
  //     .get(url, config)
  //     .then((response) => {
  //       const { results, ...pagination } = response.data;
  //       setDaftarMapelPagination(pagination);
  //       setDaftarMapel(results);
  //     })
  //     .catch((error) => {
  //       message.error(error);
  //     });
  // };

  // useEffect(() => {
  //   onMapelList();
  // }, []);

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
      jenis: "",
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

      {/* Body */}
      <section>
        <div className="mt-[25px] lg:mt-[1px] relative justify-center lg:justify-start h-52 w-full bg-blue-300 flex items-center mx-auto ">
          <div id="cover-content" className="relative text-center md:text-left lg:left-20">
            <button onClick={handleOpenPopUp} className="group cursor-pointer outline-none" title="Add New">
              <svg className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300" viewBox="0 0 24 24" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg">
                <path strokeWidth="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"></path>
                <path strokeWidth="1.5" d="M8 12H16"></path>
                <path strokeWidth="1.5" d="M12 16V8"></path>
              </svg>
              <h2>Tambah Soal</h2>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start"></div>
        </div>
      </section>

      <section>
        <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <ul className="mt-4 flex gap-8 overflow-auto">
            {/* List buku */}
            {books.map((book) => (
              <li key={book.id}>
                <div className="relative h-48 w-64 rounded-lg bg-red-200">
                  <div>
                    <h2 className="text-xl font-bold text-gray-700 text-center p-6">{book.title}</h2>
                  </div>

                  <div className="flex mx-auto items-end h-12 w-fit gap-4 absolute bottom-2 left-2 right-2">
                    <NavLink to={`/guru/dashboard/soal/${book.title}`} className="cursor-pointer transition-all bg-blue-500 text-white h-11 px-4 py-1 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                      Buka
                    </NavLink>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" onClick={handleClosePopUp}>
          {/* Isi Popup */}
          <div className="relative mx-auto p-5 border w-full max-w-4xl h-auto shadow-lg rounded-md bg-white overflow-auto" style={{ maxHeight: "80vh" }} onClick={(e) => e.stopPropagation()}>
            {/* Konten Form */}
            <div className="m-4">
              {/* Form */}
              <form onSubmit={(e) => handleSave(e, "PG")}>
                {/* Form Element */}
                <h1 className="text-lg font-bold mb-4">Form Pilihan Ganda</h1>
                {/* Form Element */}
                <div className="mb-4">
                  {/* Form Input */}
                  <label htmlFor="soal_PG" className="block text-sm font-medium text-gray-900">Soal</label>
                  <div className="mt-2">
                    <textarea name="soal_PG" id="soal_PG" value={formData.soal_PG} onChange={handleInputChange} className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Masukkan soal" />
                  </div>
                </div>
                {/* Form Element */}
                {/* Form Button */}
                <button type="submit" title="Save" className="mt-4 cursor-pointer flex items-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded">Simpan</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardGuru;