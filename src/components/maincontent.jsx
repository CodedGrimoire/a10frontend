import React, { useState, useEffect } from 'react'; 
import HBan from "./herobanner";
import Topss from "./TopGenres";
import Aboo from "./About";
import "./AllBooks.css"; 
import './main.css'; 
import axios from "axios";

const Maincontent = () => {
  const [books, setBooks] = useState([]);

  // Fetch exactly 6 books from the server on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-books?limit=6`);
        setBooks(response.data.slice(0, 6)); // Ensure only 6 books
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
        <h2>All Books</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.coverImage} alt={book.title} />
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Rating:</strong> {book.rating} / 5</p>
              <button onClick={() => window.location.href = `/book-details/${book._id}`}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Topss />
      </div>

      <Aboo />
    </div>
  );
};

export default Maincontent;