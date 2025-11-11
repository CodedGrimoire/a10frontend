import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HBan from "./herobanner";
import Topss from "./TopGenres";
import Aboo from "./About";
import "./AllBooks.css";
import "./main.css";
import axios from "axios";

const Maincontent = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/latest`);
        setBooks(response.data.slice(0, 6)); // show only 6 latest
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <HBan />

      <div className="all-books-container">
        <h2>See Latest Books</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.coverImage} alt={book.title} />
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Rating:</strong> {book.rating} / 5</p>
              <button onClick={() => navigate(`/book-details/${book._id}`)}>
                View Details
              </button>
            </div>
          ))}

          {/* View All Button */}
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
      <Aboo />
    </div>
  );
};

export default Maincontent;
