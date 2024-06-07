import React, { useState } from "react";

const FormSoal = () => {
  const [soalList, setSoalList] = useState([]);
  const [inputFields, setInputFields] = useState([
    { id: 1, text1: "", text2: "", text3: "" },
  ]);
  const [nextId, setNextId] = useState(2);

  const handleInputChange = (id, name, value) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === id ? { ...field, [name]: value } : field
      )
    );
  };

  const handleAddField = () => {
    setInputFields([
      ...inputFields,
      { id: nextId, text1: "", text2: "", text3: "" },
    ]);
    setNextId(nextId + 1);
  };

  const handleDeleteField = (id) => {
    setInputFields(inputFields.filter((field) => field.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSoalList(inputFields);
    setInputFields([{ id: 1, text1: "", text2: "", text3: "" }]);
  };

  return (
    <div>
      <h2>Form Soal</h2>
      <form onSubmit={handleSubmit}>
        {inputFields.map((field) => (
          <div key={field.id} className="mb-4">
            <input
              type="text"
              value={field.text1}
              onChange={(e) =>
                handleInputChange(field.id, "text1", e.target.value)
              }
              className="mr-2"
            />
            <input
              type="text"
              value={field.text2}
              onChange={(e) =>
                handleInputChange(field.id, "text2", e.target.value)
              }
              className="mr-2"
            />
            <input
              type="text"
              value={field.text3}
              onChange={(e) =>
                handleInputChange(field.id, "text3", e.target.value)
              }
              className="mr-2"
            />
            <button
              type="button"
              onClick={() => handleDeleteField(field.id)}
              className="bg-red-500 text-white px-2 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddField}
          className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
        >
          Tambah
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-1 rounded-md"
        >
          Submit
        </button>
      </form>
      <div>
        <h3>Soal yang sudah ditambahkan:</h3>
        <ul>
          {soalList.map((soal) => (
            <li key={soal.id}>
              <p>{`Text 1: ${soal.text1}, Text 2: ${soal.text2}, Text 3: ${soal.text3}`}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormSoal;
