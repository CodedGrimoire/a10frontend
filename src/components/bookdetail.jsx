import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "./BookDetails.css";

import { useAuth } from "../hooks/useAuth";

import {
  getCommentsByBookId,
  createComment,
  updateComment,
  deleteComment,
} from "./comments";

import axios from "axios";
import Container from "./ui/Container";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import SectionHeader from "./ui/SectionHeader";
import Skeleton from "./ui/Skeleton";

const API_URL = import.meta.env.VITE_API_URL;

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [editingText, setEditingText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [related, setRelated] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  useEffect(() => {
    if (!API_URL) {
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
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getCommentsByBookId(id)
      .then((data) => setComments(data))
      .catch((err) => console.error("comments fetch error:", err));
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(`${API_URL}/books/latest`);
        const data = res.data || [];
        setRelated((book?.genre ? data.filter((b) => b.genre === book.genre) : data).filter((b) => b._id !== id).slice(0, 4));
      } catch {
        setRelated([]);
      } finally {
        setRelatedLoading(false);
      }
    };
    if (book) {
      setRelatedLoading(true);
      fetchRelated();
    }
  }, [book, id]);

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

      const updated = await getCommentsByBookId(id);
      setComments(updated);
      setCommentText("");
    } catch (err) {
      // ignore
    } finally {
      setCommentLoading(false);
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment._id);
    setEditingText(comment.comment);
  };

  const handleEditSubmit = async (commentId) => {
    if (!editingText.trim()) return;
    try {
      await updateComment(commentId, editingText.trim());

      const updated = await getCommentsByBookId(id);
      setComments(updated);
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      // ignore
    }
  };

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
      <Container className="section-shell">
        <Card className="book-detail-card">
          <div className="gallery-grid">
            <Skeleton style={{ height: 220 }} />
            <Skeleton style={{ height: 220 }} />
          </div>
          <div className="stack" style={{ marginTop: "var(--space-4)" }}>
            <Skeleton />
            <Skeleton style={{ width: "60%" }} />
          </div>
        </Card>
      </Container>
    );
  }

  if (notFound || !book) {
    return (
      <Container className="section-shell">
        <Card className="not-found">
          <h2>Book not found</h2>
          <Button as={Link} to="/all" variant="primary" size="sm">
            Go back to All Books
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="section-shell">
      <div className="book-detail-layout">
        <Card className="book-detail-card">
          <div className="book-detail-grid">
            <div className="gallery-grid">
              {(book.images || [book.coverImage]).map((img, idx) => (
                <img key={idx} src={img || book.coverImage} alt={book.title} />
              ))}
            </div>

            <div className="stack" style={{ gap: "var(--space-3)" }}>
              <h1 className="book-title-text">{book.title}</h1>
              {book.author && (
                <div className="detail-line">
                  <span className="muted-text">Author</span>
                  <strong>{book.author}</strong>
                </div>
              )}
              {book.genre && (
                <div className="detail-line">
                  <span className="muted-text">Genre</span>
                  <Badge tone="warn">{book.genre}</Badge>
                </div>
              )}
              {typeof book.rating !== "undefined" && (
                <div className="detail-line">
                  <span className="muted-text">Rating</span>
                  <strong>⭐ {book.rating} / 5</strong>
                </div>
              )}
              {book.userEmail && (
                <div className="detail-line">
                  <span className="muted-text">Added by</span>
                  <strong>{book.userName ? book.userName : book.userEmail}</strong>
                </div>
              )}
              <p className="muted-text">{book.summary || "No description available."}</p>
            </div>
          </div>
        </Card>

        <Card className="comments-card">
          <SectionHeader title="Comments" />
          {comments.length === 0 && <p className="muted-text">No comments yet.</p>}

          <ul className="comments-list">
            {comments.map((c) => (
              <li key={c._id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{c.userName || c.userEmail}</span>

                  <span className="comment-date">
                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                  </span>
                </div>

                {editingId === c._id ? (
                  <div className="editrow">
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="comment-textarea"
                    />

                    <div className="comment-edit-actions">
                      <Button size="sm" onClick={() => handleEditSubmit(c._id)}>
                        Save
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingId(null);
                          setEditingText("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="comment-body">{c.comment}</p>
                )}

                {user && user.email === c.userEmail && editingId !== c._id && (
                  <div className="comment-actions">
                    <Button size="sm" variant="ghost" onClick={() => startEdit(c)}>
                      Edit
                    </Button>

                    <Button size="sm" variant="ghost" onClick={() => handleDelete(c._id)}>
                      Delete
                    </Button>
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
                placeholder="Leave a review..."
                className="comment-textarea"
              />
              <Button type="submit" variant="primary" disabled={commentLoading}>
                {commentLoading ? "Posting..." : "Post Comment"}
              </Button>
            </form>
          )}
        </Card>

        <Card className="comments-card">
          <SectionHeader title="Key information" />
          <div className="spec-grid">
            {book.author && (
              <div className="spec-item">
                <span className="muted-text">Author</span>
                <strong>{book.author}</strong>
              </div>
            )}
            {book.genre && (
              <div className="spec-item">
                <span className="muted-text">Genre</span>
                <strong>{book.genre}</strong>
              </div>
            )}
            {typeof book.rating !== "undefined" && (
              <div className="spec-item">
                <span className="muted-text">Rating</span>
                <strong>⭐ {book.rating} / 5</strong>
              </div>
            )}
            {book.userEmail && (
              <div className="spec-item">
                <span className="muted-text">Added by</span>
                <strong>{book.userName || book.userEmail}</strong>
              </div>
            )}
          </div>
        </Card>

        {relatedLoading ? (
          <Card className="comments-card">
            <SectionHeader title="Related titles" />
            <div className="card-grid listing-grid">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Card key={idx} className="book-card modern">
                  <Skeleton style={{ height: 140 }} />
                </Card>
              ))}
            </div>
          </Card>
        ) : related.length > 0 ? (
          <Card className="comments-card">
            <SectionHeader title="Related titles" />
            <div className="card-grid listing-grid">
              {related.map((rel) => (
                <Card key={rel._id} className="book-card modern">
                  <div className="book-cover">
                    <img src={rel.coverImage} alt={rel.title} />
                  </div>
                  <div className="stack" style={{ gap: "var(--space-2)" }}>
                    <div className="book-title-row">
                      <h3>{rel.title}</h3>
                      {rel.genre && <Badge tone="warn">{rel.genre}</Badge>}
                    </div>
                    <div className="muted-text">{rel.author}</div>
                    {rel.summary && <p className="line-clamp-2 muted-text">{rel.summary}</p>}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/book-details/${rel._id}`)}
                    >
                      View details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        ) : null}
      </div>
    </Container>
  );
};

export default BookDetails;
