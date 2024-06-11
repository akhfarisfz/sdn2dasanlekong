const express = require("express");
const path = require("path");
const cors = require("cors"); // Import CORS
const app = express();
const port = 5000;

app.use(cors()); // Gunakan middleware CORS
app.use(express.json()); // Middleware untuk parsing JSON

// Data dummy buku
let books = [
  {
    id: 1,
    title: "Book One",
    description: "Description for Book One",
    filePath: "rak buku/Bahasa_Indonesia_BG_KLS_I_Rev.pdf",
  },
  {
    id: 2,
    title: "Book Two",
    description: "Description for Book Two",
    filePath: "rak buku/Bahasa-Inggris-BS-KLS-II.pdf",
  },
];

// Endpoint untuk mendapatkan semua buku
app.get("/books", (req, res) => {
  res.json(books);
});

// Endpoint untuk mendapatkan buku berdasarkan ID
app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// Endpoint untuk mengunduh buku berdasarkan ID
app.get("/books/:id/download", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    const filePath = path.join(__dirname, book.filePath);
    res.download(filePath);
  } else {
    res.status(404).send("Book not found");
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
