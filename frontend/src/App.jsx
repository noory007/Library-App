import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BookForm from "./components/BookForm";
import BooksList from "./components/BooksList";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Noory Library</h1>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <div className="home">
                <h2>Add a New Book</h2>
                <BookForm />
              </div>
            }
          />

          <Route path="/books" element={<BooksList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
