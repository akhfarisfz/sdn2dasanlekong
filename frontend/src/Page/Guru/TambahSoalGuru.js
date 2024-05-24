import React, { useState } from "react";
import Header from "../../libs/components/Header";

function TambahSoalGuru() {
  const [isFormPGVisible, setIsFormPGVisible] = useState(false);
  const [isFormEssayVisible, setIsFormEssayVisible] = useState(false);
  const [soalList, setSoalList] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleOnChange = (e) => {
    const value = e.target.value;
    if (value === "PG") {
      setIsFormPGVisible(true);
      setIsFormEssayVisible(false);
      setFormData({ teks_soal: "", opsi_jawaban: [], kunci_jawaban: "", skor: 1 });
    } else if (value === "Essay") {
      setIsFormPGVisible(false);
      setIsFormEssayVisible(true);
      setFormData({ teks_soal: "", skor: 1 });
    } else {
      setIsFormPGVisible(false);
      setIsFormEssayVisible(false);
    }
    setFormData({ name: "", email: "" });
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
      id: idCounter,
      type,
      ...formData,
      jawabanList: type === "PG" ? jawabanList : [],
      kunciJawaban: type === "PG" ? kunciJawaban : "",
    };
    setSoalList([...soalList, newSoal]);
    setIdCounter(idCounter + 1);

    // Send the data to the server
    await fetch("/api/tambah-soal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSoal),
    });

    setIsFormPGVisible(false);
    setIsFormEssayVisible(false);
    setFormData({ name: "", email: "" });
  };

  return (
    <>
      <Header />
      <div className="h-full mx-4 mt-4 shadow-lg border border-black rounded-xl">
        <div className="m-4">
          <label
            htmlFor="HeadlineAct"
            className="block text-sm font-medium text-gray-900"
          >
            Headliner
          </label>

          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            onChange={handleOnChange}
          >
            <option selected value="">
              Jenis soal ....
            </option>
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
                    Tambah
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

                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>

        <div className="m-4">
          <h2 className="text-lg font-semibold">Soal yang sudah ditambahkan:</h2>
          <ul>
            {soalList.map((soal) => (
              <li key={soal.id} className="border-b border-gray-300 py-2">
                <p>ID: {soal.id}</p>
                <p>Jenis: {soal.type === "PG" ? "Pilihan Ganda" : "Essay"}</p>
                <p>Nama: {soal.name}</p>
                <p>Email: {soal.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TambahSoalGuru;
