/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";

import axios from "axios";

import "./AllBooks2.css";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Card from "./ui/Card";
import Button from "./ui/Button";
import SectionHeader from "./ui/SectionHeader";
import Container from "./ui/Container";
import Badge from "./ui/Badge";
import Skeleton from "./ui/Skeleton";

const BASE_URL = import.meta.env.VITE_API_URL;

const AllBooks = () => {
  const [loading, setLoading] = useState(true);

  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const pageSize = 8;

  useEffect(() => {
    const fetchBooks = async () => {
      try 
      
      {
        const response = await axios.get(`${BASE_URL}/all-books`);
        setBooks(response.data || []);
      } 
      
      catch (error) 
      
      {
        // console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === "" || value == null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  useEffect(() => {
    setSearchInput(searchParams.get("q") || "");
  }, [searchParams]);

  const genres = useMemo(() => {
    const set = new Set();
    books.forEach((b) => b.genre && set.add(b.genre));
    return Array.from(set);
  }, [books]);

  const filters = useMemo(() => {
    const q = (searchParams.get("q") || "").toLowerCase();
    const genre = searchParams.get("genre") || "";
    const minRating = Number(searchParams.get("rating") || 0);
    const sort = searchParams.get("sort") || "rating-desc";
    const page = Number(searchParams.get("page") || 1);
    return { q, genre, minRating, sort, page };
  }, [searchParams]);

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    const t = setTimeout(() => updateParam("q", searchInput.trim()), 300);
    setDebounceTimer(t);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const filtered = useMemo(() => {
    let list = [...books];
    if (filters.q) {
      list = list.filter(
        (b) =>
          b.title?.toLowerCase().includes(filters.q) ||
          b.author?.toLowerCase().includes(filters.q) ||
          b.genre?.toLowerCase().includes(filters.q)
      );
    }
    if (filters.genre) {
      list = list.filter((b) => b.genre === filters.genre);
    }
    if (filters.minRating) {
      list = list.filter((b) => (b.rating || 0) >= filters.minRating);
    }
    switch (filters.sort) {
      case "rating-asc":
        list.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      case "title-asc":
        list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      default:
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return list;
  }, [books, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(filters.page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  if (loading) {
    return (
      <Container className="section-shell">
        <Card>
          <div className="stack">
            <Skeleton style={{ height: 22, width: "40%" }} />
            <Skeleton style={{ height: 22, width: "60%" }} />
          </div>
          <div className="card-grid listing-grid" style={{ marginTop: "var(--space-4)" }}>
            {Array.from({ length: 8 }).map((_, idx) => (
              <Card key={idx} className="book-card modern">
                <Skeleton style={{ height: 160 }} />
                <Skeleton />
                <Skeleton style={{ width: "70%" }} />
              </Card>
            ))}
          </div>
        </Card>
      </Container>
    );
  }

  if (books.length === 0) {
    return (
      <Container className="section-shell">
        <Card className="empty-card">
          <h3>No books found</h3>
          <p className="muted-text">Add a new title or refresh to try again.</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="section-shell">
      <Card>
        <SectionHeader
          title="All Books"
          description="Browse every title shared in The Book Haven."
        />

        <div className="filter-bar">
          <input
            className="ui-input"
            placeholder="Search by title, author, genre..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <select
            className="ui-input"
            value={filters.genre}
            onChange={(e) => updateParam("genre", e.target.value)}
          >
            <option value="">All genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            className="ui-input"
            value={filters.minRating || ""}
            onChange={(e) => updateParam("rating", e.target.value)}
          >
            <option value="">All ratings</option>
            <option value="3">3+ stars</option>
            <option value="4">4+ stars</option>
            <option value="4.5">4.5+ stars</option>
          </select>
          <select
            className="ui-input"
            value={filters.sort}
            onChange={(e) => updateParam("sort", e.target.value)}
          >
            <option value="rating-desc">Rating: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="title-asc">Title A-Z</option>
          </select>
        </div>

        {visible.length === 0 ? (
          <div className="empty-card">
            <h3>No books match these filters</h3>
            <p className="muted-text">Try adjusting search or filters.</p>
          </div>
        ) : (
        <div className="card-grid listing-grid">
          {visible.map((book) => (
            <Card key={book._id} className="book-card modern listing-card">
              <div className="book-cover">
                <img src={book.coverImage} alt={book.title} loading="lazy" />
              </div>
              <div className="stack" style={{ gap: "var(--space-2)" }}>
                <div className="book-title-row">
                  <h3>{book.title}</h3>
                  {book.genre && <Badge tone="warn">{book.genre}</Badge>}
                </div>
                <div className="muted-text">{book.author}</div>
                {book.summary && (
                  <p className="line-clamp-2 muted-text">{book.summary}</p>
                )}
                <div className="meta-row">
                  {book.rating ? <span>⭐ {book.rating} / 5</span> : <span>Not rated</span>}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
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
        )}

        <div className="pagination">
          <Button
            size="sm"
            variant="ghost"
            disabled={currentPage <= 1}
            onClick={() => updateParam("page", String(currentPage - 1))}
          >
            Prev
          </Button>
          <span className="muted-text">
            Page {currentPage} / {totalPages}
          </span>
          <Button
            size="sm"
            variant="ghost"
            disabled={currentPage >= totalPages}
            onClick={() => updateParam("page", String(currentPage + 1))}
          >
            Next
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default AllBooks;
