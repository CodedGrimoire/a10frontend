import React, { useEffect, useState } from "react";
import axios from "axios";

import "./BookOfWeek.css";
import SectionHeader from "./ui/SectionHeader";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Skeleton from "./ui/Skeleton";

const BASE_URL = import.meta.env.VITE_API_URL;

const BookOfWeek = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBook = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/books/latest`);

        const data = res.data;

        if (Array.isArray(data) && data.length > 0) {
          setBook(data[0]);
        }
      } catch (error) {
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBook();
  }, []);

  if (loading) {
    return (
      <Card className="book-week-card">
        <Skeleton style={{ height: 200 }} />
      </Card>
    );
  }

  if (!book) return null;

  return (
    <div className="stack">
      <SectionHeader
        title="Book of the week"
        description="A spotlight on the latest community favorite."
      />
      <Card className="book-week-card">
        <div className="book-week-grid">
          <div className="book-week-cover">
            <img src={book.coverImage} alt={book.title} loading="lazy" />
          </div>
          <div className="stack" style={{ gap: "var(--space-3)" }}>
            <div className="book-title-row">
              <h3>{book.title}</h3>
              {book.genre && <Badge tone="warn">{book.genre}</Badge>}
            </div>
            <div className="muted-text">{book.author}</div>
            <div className="rating-row">
              {book.rating && (
                <span>
                  ⭐ {book.rating} / 5
                </span>
              )}
            </div>
            {book.summary && <p className="muted-text">{book.summary}</p>}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookOfWeek;
