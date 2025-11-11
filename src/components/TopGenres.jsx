import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./main.css";

const TopGenres = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRatedBooks = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await axios.get(`${API_URL}/books/top-rated`);
        setBooks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedBooks();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <span className="loading-text">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container">
        <div className="error-text">{error}</div>
      </div>
    );
  }

  return (
    <div className="top-genres-container">
      <div className="header">
        <div className="textual">
          <h2 className="title">Top Rated Books</h2>
          <p className="subtitle">Discover the highest-rated books in The Book Haven.</p>
        </div>
      </div>

      <div className="grid-container">
        {books.length === 0 ? (
          <p className="no-books-message">No books found.</p>
        ) : (
          books.map((book, idx) => (
            <div key={book._id || idx} className="book-card">
              <div className="book-image-container">
                <img
                  src={
                    book.coverImage ||
                    book.img ||
                    book.image ||
                    "https://via.placeholder.com/300x400?text=Book+Cover"
                  }
                  alt={book.title}
                  className="book-image"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x400?text=Book+Cover";
                  }}
                />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title || book.name}</h3>
                <p className="author">{book.author}</p>
                {book.genre && <span className="genre">{book.genre}</span>}
                {book.rating && (
                  <div className="rating">
                    <span className="star">★</span>
                    <span className="rating-value">
                      {book.rating.toFixed ? book.rating.toFixed(1) : book.rating}
                    </span>
                    {book.reviewCount && (
                      <span className="review-count">({book.reviewCount} reviews)</span>
                    )}
                  </div>
                )}
                <button
                  className="view-details-button"
                  style={{ backgroundColor: "#813b10", color: "white" }}
                  onClick={() => navigate(`/book-details/${book._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopGenres;
