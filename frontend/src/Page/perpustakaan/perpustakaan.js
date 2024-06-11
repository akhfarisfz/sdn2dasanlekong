import React, { useState, useEffect } from "react";

function Perpustakaan() {
  const [books, setBooks] = useState([]);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  useEffect(() => {
    ambilBuku();
  }, []);

  const tambahBuku = async (event) => {
    event.preventDefault();
    const formBuku = {
      title: judul,
      description: deskripsi,
    };

    try {
      const response = await fetch("http://localhost:5000/inputBooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBuku),
      });
      const data = await response.json();
      setBooks([...books, data]);
      setJudul("");
      setDeskripsi("");
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const ambilBuku = async () => {
    try {
      const response = await fetch("http://localhost:5000/books");
      const data = await response.json();
      setBooks(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>Perpustakaan</div>
      <form onSubmit={tambahBuku}>
        <div>
          <label>
            Judul Buku:
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Deskripsi Buku:
            <input
              type="text"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Tambah Buku</button>
      </form>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          <a href={`http://localhost:5000/books/${book.id}/download`}>
            Download
          </a>
        </div>
      ))}
    </>
  );
}

export default Perpustakaan;
