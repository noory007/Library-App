import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !pages) {
      alert("All fields are required");
      return;
    }

    const newBook = {
      title,
      author,
      pages: parseInt(pages),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/books",
        newBook
      );
      if (response.status === 201) {
        alert("Book added successfully!");
        setTitle("");
        setAuthor("");
        setPages("");

        // GA Event for Add
        if (window.gtag) {
          window.gtag("event", "add_book", {
            event_category: "Books",
            event_label: title,
          });
        }
      }
    } catch (error) {
      console.error("Error submitting book:", error);
      alert("Failed to submit book");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="input-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="pages">Pages</label>
        <input
          type="number"
          id="pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
        />
      </div>

      <div className="button-group">
        <button type="submit" className="btn-submit">
          Submit
        </button>
        <Link to="/books">
          <button className="btn-view-books">View All Books</button>
        </Link>
      </div>
    </form>
  );
}

export default BookForm;
