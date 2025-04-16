const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

let db;

// Logger function to insert logs into 'logs' collection
const logEvent = (action, details = {}) => {
  const log = {
    action,
    timestamp: new Date(),
    ...details,
  };

  db.collection("logs")
    .insertOne(log)
    .then(() => {
      console.log(`[${log.timestamp.toISOString()}] ${action}:`, details);
    })
    .catch((err) => {
      console.error("Failed to save log:", err);
    });
};

connectToDb((err) => {
  if (!err) {
    app.listen(5000, () => {
      console.log("app listening on port 5000");
    });
    db = getDb();
  }
});

// Get all books
app.get("/api/books", (req, res) => {
  let books = [];

  db.collection("books")
    .find()
    .sort({ author: 1 })
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

// Get a specific book by ID
app.get("/api/books/:id", (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID format" });
  }

  db.collection("books")
    .findOne({ _id: new ObjectId(id) })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Could not fetch the document" });
    });
});

// Add a new book
app.post("/api/books", (req, res) => {
  const book = req.body;

  db.collection("books")
    .insertOne(book)
    .then((result) => {
      logEvent("Book Added", {
        title: book.title,
        author: book.author,
        bookId: result.insertedId,
      });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not create a new document" });
    });
});

// Delete a book by ID
app.delete("/api/books/:id", (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID format" });
  }

  db.collection("books")
    .findOne({ _id: new ObjectId(id) })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      db.collection("books")
        .deleteOne({ _id: new ObjectId(id) })
        .then((result) => {
          logEvent("Book Deleted", {
            bookId: id,
            title: book.title,
            author: book.author,
          });
          res.status(200).json(result);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Could not delete the document" });
    });
});

// Update a book by ID
app.patch("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID format" });
  }

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No update data provided" });
  }

  db.collection("books")
    .updateOne({ _id: new ObjectId(id) }, { $set: updates })
    .then((result) => {
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Book not found" });
      }
      logEvent("Book Updated", {
        bookId: id,
        title: updates.title,
        author: updates.author,
      });
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Update error:", err);
      res.status(500).json({ error: "Could not update the document" });
    });
});
