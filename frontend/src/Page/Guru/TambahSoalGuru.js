import React, { useState, useRef } from "react";
import Header from "../../libs/components/Header";

function TambahSoalGuru() {
  const [isFormPGVisible, setIsFormPGVisible] = useState(false);
  const [isFormEssayVisible, setIsFormEssayVisible] = useState(false);
  const [soalList, setSoalList] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [formData, setFormData] = useState({
    soal_PG: "",
    soal_essay: "",
    jawaban_essay: "",
  });
  const [jawabanList, setJawabanList] = useState([{ id: 1, text: "" }]);
  const [kunciJawaban, setKunciJawaban] = useState("");
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);
  const [selectValue, setSelectValue] = useState("");

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSelectValue(value); // Update select value state
    if (value === "PG") {
      setIsFormPGVisible(true);
      setIsFormEssayVisible(false);
      setFormData({
        teks_soal: "",
        opsi_jawaban: [],
        kunci_jawaban: "",
        skor: 1,
      });
    } else if (value === "Essay") {
      setIsFormPGVisible(false);
      setIsFormEssayVisible(true);
      setFormData({ teks_soal: "", skor: 1 });
    } else {
      setIsFormPGVisible(false);
      setIsFormEssayVisible(false);
    }
    setFormData({ soal_PG: "", soal_essay: "", jawaban_essay: "" });
    setJawabanList([{ id: 1, text: "" }]);
    setKunciJawaban("");
    setEditId(null);
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

  const handleOpsiChange = (e, index) => {
    const newOpsiJawaban = [...formData.opsi_jawaban];
    newOpsiJawaban[index] = e.target.value;
    setFormData({ ...formData, opsi_jawaban: newOpsiJawaban });
  };

  const handleAddOpsi = () => {
    setFormData({ ...formData, opsi_jawaban: [...formData.opsi_jawaban, ""] });
  };

  const handleSubmit = async (e, type) => {
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

    // Reset form and select value
    setIsFormPGVisible(false);
    setIsFormEssayVisible(false);
    setFormData({ soal_PG: "", soal_essay: "", jawaban_essay: "" });
    setJawabanList([{ id: 1, text: "" }]);
    setKunciJawaban("");
    setEditId(null);
    setSelectValue(""); // Reset select value to empty
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

  return (
    <>
      <Header />
      <div className="h-full mx-4 mt-4 shadow-lg border border-black rounded-xl">
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
            onChange={handleOnChange}
            value={selectValue} // Bind select value to state
          >
            <option value="">Jenis soal ....</option>
            <option value="PG">Pilihan ganda</option>
            <option value="Essay">Essay</option>
          </select>
        </div>

        <div className="flex">
          {isFormPGVisible && (
            <div className="m-[10px] border rounded-lg box-shadow border-black p-[10px] w-full">
              <form onSubmit={(e) => handleSubmit(e, "PG")}>
                <h1>Form Pilihan Ganda</h1>
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
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
              <form onSubmit={(e) => handleSubmit(e, "Essay")}>
                <h1>Form Essay</h1>
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
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
