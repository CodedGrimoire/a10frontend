import React, { useEffect, useState } from "react";
import "./BookOfWeek.css";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BookOfWeek = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBook = async () => {
      try {
        const res = await fetch(`${BASE_URL}/books/latest`);
        if (!res.ok) throw new Error("Failed to fetch latest books");
        const data = await res.json();
        // Get the first book from the array
        if (data && data.length > 0) {
          setBook(data[0]);
        }
      } catch (error) {
        console.error("Error fetching latest book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBook();
  }, []);

  if (loading) {
    return (
      <div className="book-of-week-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="book-of-week-container">
      <h2 className="section-title">📖 Book of the Week</h2>
      <div className="featured-book-card">
        <div className="featured-image">
          <img
            src={book.coverImage || "https://via.placeholder.com/300x400?text=No+Image"}
            alt={book.title}
          />
        </div>
        <div className="featured-info">
          <h3 className="featured-title">{book.title}</h3>
          <p className="featured-author">
            <strong>by</strong> {book.author}
          </p>
          <div className="featured-meta">
            <span className="meta-item">
              <strong>Genre:</strong> {book.genre}
            </span>
            {book.rating && (
              <span className="meta-item">
                <strong>Rating:</strong> {book.rating}/5 ⭐
              </span>
            )}
          </div>
          {book.summary && (
            <p className="featured-description">{book.summary}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookOfWeek;