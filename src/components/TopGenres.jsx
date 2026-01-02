
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "./main.css";
import Button from "./ui/Button";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import Skeleton from "./ui/Skeleton";

const TopGenres = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTopRatedBooks = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const ress = await axios.get(`${API_URL}/books/top-rated`);

        setBooks(ress.data);
      } catch (err) {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedBooks();
  }, []);

  return (
    <div className="stack">
      <SectionHeader
        title="Top rated books"
        description="Discover the highest-rated picks from The Book Haven community."
      />
      <div className="card-grid">
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <Card key={idx} className="book-card modern">
                <Skeleton style={{ height: 180 }} />
                <div className="stack" style={{ marginTop: "var(--space-3)" }}>
                  <Skeleton />
                  <Skeleton style={{ width: "60%" }} />
                </div>
              </Card>
            ))
          : books.map((book) => (
              <Card key={book._id} className="book-card modern">
                <div className="book-cover">
                  <img
                    src={book.coverImage || book.img || book.image}
                    alt={book.title || book.name}
                    loading="lazy"
                  />
                </div>
                <div className="stack" style={{ gap: "var(--space-2)" }}>
                  <div className="book-title-row">
                    <h3>{book.title || book.name}</h3>
                    {book.genre && <Badge tone="warn">{book.genre}</Badge>}
                  </div>
                  <div className="muted-text">{book.author}</div>
                  {book.rating && (
                    <div className="rating-row">
                      <span>⭐ {book.rating.toFixed ? book.rating.toFixed(1) : book.rating}</span>
                      {book.reviewCount && (
                        <span className="muted-text">({book.reviewCount} reviews)</span>
                      )}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      navigate(`/book-details/${book._id}`, {
                        state: { from: location },
                      })
                    }
                  >
                    View details
                  </Button>
                </div>
              </Card>
            ))}
      </div>
      {!loading && books.length === 0 && (
        <div className="muted-text">No books found in this list.</div>
      )}
    </div>
  );
};

export default TopGenres;
