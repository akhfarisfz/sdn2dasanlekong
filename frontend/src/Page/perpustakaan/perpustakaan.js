import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useJWT from "../../libs/hooks/useJWT";
import { useNavigate } from "react-router-dom";
import { ContextApplication } from "../../libs/config/contexts";
import belajar from "../../img/belajar.jpg";
import Header from "../../libs/components/Header";
import { BASE_URL } from "../../libs/config/settings";

function Perpustakaan() {
  const [books, setBooks] = useState([]);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const jwt = useJWT();

  useEffect(() => {
    ambilBuku();
  });

  const tambahBuku = async (event) => {
    event.preventDefault();
    const formBuku = {
      title: judul,
      description: deskripsi,
    };

    try {
      const response = await fetch("http://localhost:4000/inputBooks", {
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
      const response = await fetch(`${BASE_URL}/buku/`, {
        method: "GET",
        headers: {
          Authorization: jwt.get(),
        },
      });

      const data = await response.json();
      setBooks(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>Perpustakaan</div>
      <form onSubmit={tambahBuku}>
        <div>
          <label>Judul Buku:</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Deskripsi Buku:</label>
          <input
            type="text"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Masukkan File Buku (PDF):</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
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
