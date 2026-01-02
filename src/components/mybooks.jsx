/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

import "./MyBooks.css";

import { useAuth } from "../hooks/useAuth";
import Container from "./ui/Container";
import Card from "./ui/Card";
import Button from "./ui/Button";
import SectionHeader from "./ui/SectionHeader";
import Input from "./ui/Input";
import Skeleton from "./ui/Skeleton";

const BASE_URL = import.meta.env.VITE_API_URL;

const MyBooks = () => {
  const { user, loading } = useAuth();

  const [fetching, setFetching] = useState(false);
  const [books, setBooks] = useState([]);

  const [edix, setEditingBook] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    summary: "",
    coverImage: "",
  });
  const [updating, setUpdating] = useState(false);

  const fetchMyBooks = async (email) => {
    try {
      setFetching(true);
      const res = await axios.get(
        `${BASE_URL}/myBooks?email=${encodeURIComponent(email)}`
      );
      setBooks(res.data || []);
    } catch (err) {
      toast.error("Failed to load your books");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading && user?.email) {
      fetchMyBooks(user.email);
    }
  }, [loading, user]);

  const handleDelete = async (id) => {
    const sure = window.confirm("Delete this book?");
    if (!sure) return;
    try {
      await axios.delete(`${BASE_URL}/delete-book/${id}`);
      toast.success("Book deleted successfully!");

      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const closeModal = () => {
    setEditingBook(null);
    setFormData({
      title: "",
      author: "",
      genre: "",
      rating: "",
      summary: "",
      coverImage: "",
    });
  };

  const openUpdateModal = (book) => {
    setEditingBook(book);

    setFormData({
      title: book.title || "",
      author: book.author || "",
      genre: book.genre || "",
      rating: book.rating || "",
      summary: book.summary || "",
      coverImage: book.coverImage || "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.genre) {
      toast.error("Title, Author, and Genre are required.");
      return;
    }

    const payload = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      rating: formData.rating ? parseFloat(formData.rating) : 0,

      summary: formData.summary || "",

      coverImage: formData.coverImage || "",
      userEmail: edix.userEmail,

      userName: edix.userName,
    };

    try {
      setUpdating(true);

      await axios.put(`${BASE_URL}/update-book/${edix._id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Book updated successfully!");

      setBooks((prev) =>
        prev.map((b) => (b._id === edix._id ? { ...b, ...payload } : b))
      );
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update book");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Container className="section-shell">
        <Toaster />
        <Card>
          <Skeleton style={{ height: 80 }} />
        </Card>
      </Container>
    );
  }

  if (!user?.email) {
    return (
      <Container className="section-shell">
        <Toaster />
        <Card className="empty-card">
          <p>You must be logged in to see your books.</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="section-shell">
      <Toaster />
      <Card>
        <SectionHeader
          title="My Books"
          description="Manage the titles you have added to The Book Haven."
        />

        {fetching ? (
          <div className="loading-state">
            <Skeleton style={{ height: 18 }} />
            <Skeleton style={{ height: 18, width: "60%" }} />
          </div>
        ) : books.length === 0 ? (
          <div className="empty-card">
            <p>You haven&apos;t added any books yet.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Title / Author</th>
                  <th>Genre</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>
                    <td>
                      <img src={book.coverImage} alt="" className="tmb" />
                    </td>

                    <td>
                      <div className="book-title-cell">{book.title}</div>
                      <div className="book-author-cell">
                        {book.author || "Unknown"}
                      </div>
                    </td>
                    <td>{book.genre || "-"}</td>

                    <td>{book.rating || "-"}</td>
                    <td>
                      <div className="action-buttons">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openUpdateModal(book)}
                        >
                          Update
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(book._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {edix && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="mhdr">
              <h3 className="modal-title">Update Book</h3>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="form-grid">
                <Input
                  label="Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Author *"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Genre *"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Rating (1–5)"
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  step="0.1"
                />
                <div className="field full-span">
                  <label>Summary</label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    className="ui-input"
                    rows="3"
                  />
                </div>

                <Input
                  label="Cover Image URL"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-actions">
                <Button variant="ghost" onClick={closeModal}>
                  Cancel
                </Button>

                <Button type="button" onClick={handleUpdateSubmit} loading={updating}>
                  Update Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MyBooks;
