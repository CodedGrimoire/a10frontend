import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import "./BookDetails.css";

const API_URL = import.meta.env.VITE_API_URL;

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!API_URL) {
      console.error("VITE_API_URL missing");
      setNotFound(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`${API_URL}/book-details/${id}`)
      .then((res) => {
        const data = res.data;
        if (!data || !data._id) {
          setNotFound(true);
        } else {
          setBook(data);
        }
      })
      .catch((err) => {
        console.error("book-details error:", err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (notFound || !book) {
    return (
      <div className="not-found-container">
        <h2 className="not-found-title">Book not found</h2>
        <Link to="/all" className="btn-primary">
          Go back to All Books
        </Link>
      </div>
    );
  }

  return (
    <div className="book-details-container">
      <div className="back-button-wrapper">
        <Link to="/all" className="btn-back">
          ← Back to All Books
        </Link>
      </div>

      <div className="book-details-card">
        <div className="book-image-section">
          <img
            src={book.coverImage || "https://via.placeholder.com/400x500?text=No+Image"}
            alt={book.title}
            className="book-cover-image"
          />
        </div>

        <div className="book-info-section">
          <h1 className="book-title">
            {book.title}
          </h1>
          {book.author && (
            <p className="book-detail">
              <span className="detail-label">Author:</span> {book.author}
            </p>
          )}
          {book.genre && (
            <p className="book-detail">
              <span className="detail-label">Genre:</span> {book.genre}
            </p>
          )}
          {typeof book.rating !== "undefined" && (
            <p className="book-detail">
              <span className="detail-label">Rating:</span> {book.rating}/5
            </p>
          )}
          {book.userEmail && (
            <p className="book-detail added-by">
              <span className="detail-label">Added by:</span>{" "}
              {book.userName ? book.userName : book.userEmail}
            </p>
          )}
          <p className="book-summary">
            {book.summary || "No description available."}
          </p>

          {user ? (
            <div className="interactions-section">
              <h3 className="interactions-title">Interactions</h3>
              <p className="user-info">
                You are logged in as {user.email}
              </p>
            </div>
          ) : (
            <p className="login-prompt">
              Login to comment or interact with this book.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;