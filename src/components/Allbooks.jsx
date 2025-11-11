import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllBooks.css"; // import the CSS file

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from the server on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/all-books`);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const sortAsc = () => {
    const sorted = [...books].sort((a, b) => (a.rating || 0) - (b.rating || 0));
    setBooks(sorted);
  };

  const sortDesc = () => {
    const sorted = [...books].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    setBooks(sorted);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <span className="loading-spinner">Loading...</span>
      </div>
    );
  }

  return (
    <div className="all-books-container">
      <h2>All Books</h2>

      <div className="sort-buttons" style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
        <button onClick={sortAsc}>Sort by Rating ↑</button>
        <button onClick={sortDesc}>Sort by Rating ↓</button>
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <img src={book.coverImage} alt={book.title} />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Rating:</strong> {book.rating} / 5</p>
            <button onClick={() => (window.location.href = `/book-details/${book._id}`)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
