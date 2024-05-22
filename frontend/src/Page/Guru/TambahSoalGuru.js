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
    } else if (value === "Essay") {
      setIsFormPGVisible(false);
      setIsFormEssayVisible(true);
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

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const newSoal = {
      id: idCounter,
      type,
      ...formData,
    };
    setSoalList([...soalList, newSoal]);
    setIdCounter(idCounter + 1);
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
          {isFormEssayVisible && (
            <div className="m-[10px] border rounded-lg box-shadow border-black p-[10px] w-fit">
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
          <h2 className="text-lg font-semibold">
            Soal yang sudah ditambahkan:
          </h2>
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
