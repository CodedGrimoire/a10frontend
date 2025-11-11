// src/components/addbooks.jsx
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import "./AddBooks.css";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AddBooks = () => {
  const { user } = useAuth();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    summary: "",
    coverImage: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to add a book.");
      return;
    }

    if (!book.title || !book.author || !book.genre) {
      toast.error("Title, Author, and Genre are required.");
      return;
    }

    const payload = {
      ...book,
      rating: book.rating ? parseFloat(book.rating) : 0, // ✅ allows decimals
      userEmail: user.email,
      userName: user.displayName || user.email,
    };

    try {
      setLoading(true);
      console.log("sending payload:", payload);
      await axios.post(`${BASE_URL}/add-book`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Book added successfully!");
      setBook({
        title: "",
        author: "",
        genre: "",
        rating: "",
        summary: "",
        coverImage: "",
      });
    } catch (error) {
      console.error("add-book error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add book");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-books-container">
      <Toaster />
      <div className="add-books-card">
        <h2 className="add-books-title">
          Add a New Book
        </h2>

        <div>
          {/* Title */}
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Author */}
          <div className="form-group">
            <label className="form-label">Author *</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Genre */}
          <div className="form-group">
            <label className="form-label">Genre *</label>
            <input
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              className="form-input"
              placeholder="Fantasy, Mystery, Non-Fiction..."
              required
            />
          </div>

          {/* Rating */}
          <div className="form-group">
            <label className="form-label">Rating (1–5, decimal allowed)</label>
            <input
              type="number"
              name="rating"
              value={book.rating}
              onChange={handleChange}
              className="form-input"
              min="1"
              max="5"
              step="0.1" // ✅ allows decimals
            />
          </div>

          {/* Summary */}
          <div className="form-group">
            <label className="form-label">Summary</label>
            <textarea
              name="summary"
              value={book.summary}
              onChange={handleChange}
              className="form-textarea"
              rows="3"
              placeholder="Short description of the book"
            />
          </div>

          {/* Cover image */}
          <div className="form-group">
            <label className="form-label">Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              value={book.coverImage}
              onChange={handleChange}
              className="form-input"
              placeholder="https://..."
            />
          </div>

          {/* User info (read-only, from auth) */}
          <div className="user-info-grid">
            <div className="form-group">
              <label className="form-label">User Email</label>
              <input
                type="text"
                value={user?.email || ""}
                readOnly
                className="form-input readonly"
              />
            </div>
            <div className="form-group">
              <label className="form-label">User Name</label>
              <input
                type="text"
                value={user?.displayName || user?.email || ""}
                readOnly
                className="form-input readonly"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="submit-button"
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBooks;
