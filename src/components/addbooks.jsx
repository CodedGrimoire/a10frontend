// src/components/addbooks.jsx
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth"; // make sure this path is right

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
      rating: book.rating ? Number(book.rating) : 0,
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
    <div className="p-6 max-w-xl mx-auto bg-base-100 rounded-lg shadow-md mt-10">
      <Toaster />
      <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
        Add a New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium mb-1">Author *</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium mb-1">Genre *</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Fantasy, Mystery, Non-Fiction..."
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium mb-1">Rating (1–5)</label>
          <input
            type="number"
            name="rating"
            value={book.rating}
            onChange={handleChange}
            className="input input-bordered w-full"
            min="1"
            max="5"
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium mb-1">Summary</label>
          <textarea
            name="summary"
            value={book.summary}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="3"
            placeholder="Short description of the book"
          />
        </div>

        {/* Cover image */}
        <div>
          <label className="block text-sm font-medium mb-1">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={book.coverImage}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="https://..."
          />
        </div>

        {/* User info (read-only, from auth) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">User Email</label>
            <input
              type="text"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">User Name</label>
            <input
              type="text"
              value={user?.displayName || user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
