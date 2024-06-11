import React, { useState, useEffect } from "react";

function perpustakaan() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetchAPI();
  }, []);
  const fetchAPI = async () => {
    await fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  return (
    <>
      <div>perpustakaan</div>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          <p>{book.filePath}</p>
        </div>
      ))}
    </>
  );
}

export default perpustakaan;
