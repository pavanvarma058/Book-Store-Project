const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const books = [
  { id: 1, title: "Book One", author: "Author One" },
  { id: 2, title: "Book Two", author: "Author Two" },
];

app.use(express.json());

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be of type number" });
  }
  const book = books.find((b) => b.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "No book is found with that ID." });
  }
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });
  if (!author || author === "")
    return res.status(400).json({ error: "author is required" });
  const id = books.length + 1;
  const book = { id, title, author };
  books.push(book);

  return res.status(201).json({ message: "Book created successfully", id });
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be of type number" });
  }
  const indexToDelete = books.findIndex((e) => e.id === id);
  if (indexToDelete === -1) {
    res.status(404).json({ message: "No book is found with that ID." });
  } else {
    books.splice(indexToDelete, 1);
  }
  return res.status(200).json({ message: "Book deleted successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on Port:${port}`);
});
