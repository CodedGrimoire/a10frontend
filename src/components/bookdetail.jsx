import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import {
  getCommentsByBookId,
  createComment,
  updateComment,
  deleteComment,
} from "./comments"; // ← import the service
import "./BookDetails.css";

const API_URL = import.meta.env.VITE_API_URL;

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // comments
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // fetch book
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

  // fetch comments for this book
  useEffect(() => {
    if (!id) return;
    getCommentsByBookId(id)
      .then((data) => setComments(data))
      .catch((err) => console.error("comments fetch error:", err));
  }, [id]);

  // handle new comment submit
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!user) return;

    setCommentLoading(true);
    try {
      await createComment({
        bookId: id,
        userEmail: user.email,
        userName: user.displayName || user.email,
        comment: commentText.trim(),
      });

      // refetch comments
      const updated = await getCommentsByBookId(id);
      setComments(updated);
      setCommentText("");
    } catch (err) {
      console.error("create comment error:", err);
    } finally {
      setCommentLoading(false);
    }
  };

  // start editing
  const startEdit = (comment) => {
    setEditingId(comment._id);
    setEditingText(comment.comment);
  };

  // submit edit
  const handleEditSubmit = async (commentId) => {
    if (!editingText.trim()) return;
    try {
      await updateComment(commentId, editingText.trim());
      const updated = await getCommentsByBookId(id);
      setComments(updated);
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      console.error("update comment error:", err);
    }
  };

  // delete
  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      const updated = await getCommentsByBookId(id);
      setComments(updated);
    } catch (err) {
      console.error("delete comment error:", err);
    }
  };

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
            src={
              book.coverImage ||
              "https://via.placeholder.com/400x500?text=No+Image"
            }
            alt={book.title}
            className="book-cover-image"
          />
        </div>

        <div className="book-info-section">
          <h1 className="book-title">{book.title}</h1>
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
              <p className="user-info">You are logged in as {user.email}</p>
            </div>
          ) : (
            <p className="login-prompt">
              Login to comment or interact with this book.
            </p>
          )}
        </div>
      </div>

      {/* comments section */}
      <div className="comments-section">
        <h2 className="comments-title">Comments</h2>

        {comments.length === 0 && (
          <p className="no-comments">No comments yet.</p>
        )}

        <ul className="comments-list">
          {comments.map((c) => (
            <li key={c._id} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">
                  {c.userName || c.userEmail}
                </span>
                <span className="comment-date">
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>

              {editingId === c._id ? (
                <div className="comment-edit-row">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="comment-textarea"
                  />
                  <div className="comment-edit-actions">
                    <button
                      onClick={() => handleEditSubmit(c._id)}
                      className="btn-comment-save"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditingText("");
                      }}
                      className="btn-comment-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="comment-body">{c.comment}</p>
              )}

              {user && user.email === c.userEmail && editingId !== c._id && (
                <div className="comment-actions">
                  <button
                    onClick={() => startEdit(c)}
                    className="btn-comment-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="btn-comment-delete"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {user && (
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="comment-textarea"
            />
            <button
              type="submit"
              className="btn-comment-submit"
              disabled={commentLoading}
            >
              {commentLoading ? "Posting..." : "Post Comment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
