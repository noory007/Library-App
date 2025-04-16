import React, { useState, useEffect } from "react";
import axios from "axios";

function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();

      // GA Event for Delete
      if (window.gtag) {
        window.gtag("event", "delete_book", {
          event_category: "Books",
          event_label: id,
        });
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = async (book) => {
    const updatedTitle = prompt("Edit Title:", book.title);
    const updatedAuthor = prompt("Edit Author:", book.author);
    const updatedPages = prompt("Edit Pages:", book.pages);

    if (updatedTitle && updatedAuthor && updatedPages) {
      try {
        await axios.patch(`http://localhost:5000/api/books/${book._id}`, {
          title: updatedTitle,
          author: updatedAuthor,
          pages: updatedPages,
        });
        fetchBooks();

        // GA Event for Edit
        if (window.gtag) {
          window.gtag("event", "edit_book", {
            event_category: "Books",
            event_label: book._id,
          });
        }
      } catch (error) {
        console.error("Error updating book:", error);
      }
    }
  };

  return (
    <div className="books-list">
      <h2>All Books</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id} className="book-item">
              <div className="book-details">
                <p>
                  <strong>Title:</strong> {book.title}
                </p>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Pages:</strong> {book.pages}
                </p>
              </div>
              <div className="book-actions">
                <button onClick={() => handleEdit(book)} className="btn-edit">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BooksList;
