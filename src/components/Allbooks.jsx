import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllBooks.css"; // import the CSS file

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from the server on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-books`);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // If the books are still loading, show a loading spinner
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
  );
};

export default AllBooks;
