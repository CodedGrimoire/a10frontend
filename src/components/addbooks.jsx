import React, { useState } from "react";

import "./AddBooks.css";
import axios from "axios";

import { useAuth } from "../hooks/useAuth";

import toast, { Toaster } from "react-hot-toast";
import Container from "./ui/Container";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";
import Input from "./ui/Input";
import Button from "./ui/Button";

const BASE_URL = import.meta.env.VITE_API_URL;

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
    if (e.target.name === "rating") {
      let value = parseFloat(e.target.value);
      if (value > 5) value = 5;
      if (value < 1) value = 1;
      setBook({ ...book, rating: value });
      return;
    }

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
      rating: book.rating ? parseFloat(book.rating) : 0,
      userEmail: user.email,
      userName: user.displayName || user.email,
    };

    try {
      setLoading(true);
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
    <Container className="section-shell">
      <Toaster />
      <Card className="add-card">
        <SectionHeader
          title="Add a New Book"
          description="Share a title with the Book Haven community."
        />

        <form className="form-grid two-col" onSubmit={handleSubmit}>
          <Input
            label="Title *"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
          <Input
            label="Author *"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
          <Input
            label="Genre *"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            placeholder="Fantasy, Mystery, Non-Fiction..."
            required
          />
          <Input
            label="Rating"
            name="rating"
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={book.rating}
            onChange={handleChange}
            hint="1 to 5"
          />

          <div className="field full-span">
            <label>Summary</label>
            <textarea
              name="summary"
              value={book.summary}
              onChange={handleChange}
              className="ui-input"
              rows="3"
              placeholder="Short description of the book"
            />
          </div>

          <Input
            label="Cover Image URL"
            name="coverImage"
            value={book.coverImage}
            onChange={handleChange}
            placeholder="https://..."
          />

          <Input label="User Email" value={user?.email || ""} readOnly />
          <Input label="User Name" value={user?.displayName || user?.email || ""} readOnly />

          <div className="form-actions full-span">
            <Button type="submit" variant="primary" loading={loading}>
              Add Book
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default AddBooks;
