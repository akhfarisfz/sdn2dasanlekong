import React, { useState } from "react";
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

  const handleSubmit = (e, type) => {
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
    // await fetch("/api/tambah-soal", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newSoal),
    // });

    setIsFormPGVisible(false);
    setIsFormEssayVisible(false);
    setFormData({ soal_PG: "", soal_essay: "", jawaban_essay: "" });
    setJawabanList([{ id: 1, text: "" }]);
    setKunciJawaban("");
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
                {console.log(soal.soal_PG)}
                <p>
                  Jenis soal: {soal.type === "PG" ? "Pilihan Ganda" : "Essay"}
                </p>
                <p>
                  Nomor Soal {soal.id} :{" "}
                  {soal.type === "PG" ? soal.soal_PG : soal.soal_essay}
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TambahSoalGuru;
