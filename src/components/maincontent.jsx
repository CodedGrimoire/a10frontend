import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import HBan from "./herobanner";
import Topss from "./TopGenres";
import Bweek from "./bookOfWeek"
import Aboo from "./About";
import "./AllBooks.css";
import "./main.css";
import axios from "axios";

const Maincontent = () => {
  const [books, setBooks] = useState([]);
  
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/latest`);
        setBooks(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#3e2723' : '#fff';
    document.body.style.transition = 'background-color 0.3s ease';
  }, [isDark]);

  return (
    <div style={{ 
      backgroundColor: isDark ? '#3e2723' : '#fff',
      minHeight: '100vh',
      transition: 'background-color 0.3s ease'
    }}>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: isDark ? '#fef3c7' : '#3e2723',
          color: isDark ? '#3e2723' : '#fef3c7',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: '600',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
      >
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>

      <HBan />

      <div className="all-books-container" style={{
        backgroundColor: isDark ? '#3e2723' : '#fff'
      }}>
        <h2 style={{ color: isDark ? '#fef3c7' : '#000' }}>See Latest Books</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.coverImage} alt={book.title} />
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Rating:</strong> {book.rating} / 5</p>
              <button
  onClick={() =>
    navigate(`/book-details/${book._id}`, { state: { from: location } })
  }
>
  View Details
</button>
            </div>
          ))}

          <div
            className="view-all-container"
            style={{
              display: "flex",
              gridColumn: "1 / -1", 
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "30px",
            }}
          >
            <button
              className="view-all-button"
              onClick={() => navigate("/all")}
              style={{
                backgroundColor: "#813b10",
                color: "white",
                padding: "12px 28px",
                border: "none",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                transition: "all 0.25s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#a85c2f")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#813b10")}
            >
              View All
            </button>
          </div>
        </div>
      </div>

      <Topss />
      <Bweek/>
      <Aboo />
    </div>
  );
};

export default Maincontent;