const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let books = [];

// Function to load books from JSON file
const loadBooks = () => {
  try {
    const data = fs.readFileSync("dataBuku.json", "utf8");
    books = JSON.parse(data);
  } catch (err) {
    console.error("Error reading books.json:", err);
  }
};

// Load books initially
loadBooks();

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

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

app.post("/inputBooks", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    description: req.body.description,
    filePath: "rak buku/default.pdf",
  };
  books.push(newBook);
  // Save the updated books array to books.json
  fs.writeFileSync("dataBuku.json", JSON.stringify(books, null, 2));
  res.status(201).json(newBook);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
