import React, { useState } from "react";
import Header from "../../libs/components/Header";

function TambahSoalGuru() {
  const [isFormPGVisible, setIsFormPGVisible] = useState(false);
  const [isFormEssayVisible, setIsFormEssayVisible] = useState(false);
  const [soalList, setSoalList] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [formData, setFormData] = useState({
    teks_soal: "",
    opsi_jawaban: [],
    kunci_jawaban: "",
    skor: 1,
  });

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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    setFormData({ teks_soal: "", opsi_jawaban: [], kunci_jawaban: "", skor: 1 });
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
            <option value="">Jenis soal ....</option>
            <option value="PG">Pilihan ganda</option>
            <option value="Essay">Essay</option>
          </select>
        </div>

        <div className="flex">
          {isFormPGVisible && (
            <div className="m-[10px] border rounded-lg box-shadow border-black p-[10px] w-fit">
              <form onSubmit={(e) => handleSubmit(e, "PG")}>
                <h1>Form Pilihan Ganda</h1>
                <div>
                  <label htmlFor="teks_soal">Teks Soal:</label>
                  <input
                    type="text"
                    id="teks_soal"
                    name="teks_soal"
                    value={formData.teks_soal}
                    onChange={handleInputChange}
                  />
                </div>
                {formData.opsi_jawaban.map((opsi, index) => (
                  <div key={index}>
                    <label htmlFor={`opsi_${index}`}>Opsi {index + 1}:</label>
                    <input
                      type="text"
                      id={`opsi_${index}`}
                      value={opsi}
                      onChange={(e) => handleOpsiChange(e, index)}
                    />
                  </div>
                ))}
                <button type="button" onClick={handleAddOpsi}>
                  Tambah Opsi
                </button>
                <div>
                  <label htmlFor="kunci_jawaban">Kunci Jawaban:</label>
                  <input
                    type="number"
                    id="kunci_jawaban"
                    name="kunci_jawaban"
                    value={formData.kunci_jawaban}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="skor">Skor:</label>
                  <input
                    type="number"
                    id="skor"
                    name="skor"
                    value={formData.skor}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
          {isFormEssayVisible && (
            <div className="m-[10px] border rounded-lg box-shadow border-black p-[10px] w-fit">
              <form onSubmit={(e) => handleSubmit(e, "Essay")}>
                <h1>Form Essay</h1>
                <div>
                  <label htmlFor="teks_soal">Teks Soal:</label>
                  <input
                    type="text"
                    id="teks_soal"
                    name="teks_soal"
                    value={formData.teks_soal}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="skor">Skor:</label>
                  <input
                    type="number"
                    id="skor"
                    name="skor"
                    value={formData.skor}
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
                <p>Teks Soal: {soal.teks_soal}</p>
                {soal.type === "PG" && (
                  <>
                    <p>Opsi Jawaban: {soal.opsi_jawaban.join(", ")}</p>
                    <p>Kunci Jawaban: {soal.kunci_jawaban}</p>
                  </>
                )}
                <p>Skor: {soal.skor}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TambahSoalGuru;
