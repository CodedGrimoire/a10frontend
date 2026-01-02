import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "./main.css";
import TopGenres from "./TopGenres";
import BookOfWeek from "./bookOfWeek";
import About from "./About";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import Skeleton from "./ui/Skeleton";

const Maincontent = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/latest`);
        setBooks(response.data || []);
      } catch (error) {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const genreStats = useMemo(() => {
    const counts = {};
    books.forEach((b) => {
      if (b.genre) counts[b.genre] = (counts[b.genre] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [books]);

  const authorStats = useMemo(() => {
    const counts = {};
    books.forEach((b) => {
      if (b.author) counts[b.author] = (counts[b.author] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [books]);

  const topByRating = useMemo(
    () => [...books].filter((b) => b.rating).sort((a, b) => b.rating - a.rating).slice(0, 4),
    [books]
  );

  const stats = useMemo(
    () => ({
      total: books.length,
      genres: genreStats.length,
      authors: authorStats.length,
      rated: books.filter((b) => b.rating).length,
    }),
    [books, genreStats, authorStats]
  );

  const scrollToSection = () => {
    const el = document.getElementById("latest");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const latestSlides = books;
  const [latestActive, setLatestActive] = useState(0);

  useEffect(() => {
    if (!latestSlides.length) return undefined;
    const t = setInterval(() => {
      setLatestActive((prev) => (prev + 1) % latestSlides.length);
    }, 4500);
    return () => clearInterval(t);
  }, [latestSlides.length]);

  return (
    <div className="home-wrapper">
      <Container className="section-shell" id="hero">
        <div className="hero-shell">
          <div className="hero-content">
            <div className="chip">Curated by readers</div>
            <h1 className="hero-title">Welcome to The Book Haven</h1>
            <p className="hero-subtitle">
              Explore the world of knowledge with our growing collection. Track your reads, add
              your own discoveries, and see what&apos;s trending with the community.
            </p>
            <div className="hero-actions">
          <Button variant="primary" onClick={scrollToSection} aria-label="Browse latest books">
            Browse latest
          </Button>
              <Button as={Link} to="/add" variant="secondary">
                Add a book
              </Button>
            </div>
          </div>

          <div className="hero-visual surface">
            <div className="hero-visual-header">
              <span className="muted-text">Latest additions</span>
              <Badge tone="info">{books.length} live</Badge>
            </div>
            <div className="hero-visual-list single-slide">
              {loading ? (
                <div className="hero-visual-row">
                  <Skeleton style={{ width: 60, height: 80 }} />
                  <div className="stack" style={{ width: "100%" }}>
                    <Skeleton />
                    <Skeleton style={{ width: "60%" }} />
                  </div>
                </div>
              ) : latestSlides.length ? (
                latestSlides.map((book, idx) => (
                  <button
                    key={book._id}
                    className={`hero-visual-row ${idx === latestActive ? "active" : "inactive"}`}
                    aria-hidden={idx !== latestActive}
                    onClick={() =>
                      navigate(`/book-details/${book._id}`, { state: { from: location } })
                    }
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="hero-thumb"
                      loading="lazy"
                    />
                    <div className="stack">
                      <div className="hero-row-title">{book.title}</div>
                      <div className="muted-text">{book.author}</div>
                    </div>
                    <Badge tone="warn">{book.genre}</Badge>
                  </button>
                ))
              ) : null}
              {latestSlides.length > 1 && (
                <div className="hero-mini-controls">
                  <button
                    aria-label="Previous latest"
                    onClick={() =>
                      setLatestActive((latestActive - 1 + latestSlides.length) % latestSlides.length)
                    }
                  >
                    ‹
                  </button>
                  <div className="hero-mini-dots">
                    {latestSlides.map((_, idx) => (
                      <button
                        key={idx}
                        aria-label={`Go to latest book ${idx + 1}`}
                        className={idx === latestActive ? "dot active" : "dot"}
                        onClick={() => setLatestActive(idx)}
                      />
                    ))}
                  </div>
                  <button
                    aria-label="Next latest"
                    onClick={() => setLatestActive((latestActive + 1) % latestSlides.length)}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      <Container className="section-shell" id="latest">
        <SectionHeader
          title="Latest arrivals"
          description="Fresh picks from the community. Jump into something new before it trends."
          action={
            <Button as={Link} to="/all" variant="ghost" size="sm">
              View all
            </Button>
          }
        />
        <div className="card-grid listing-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
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
                      {typeof book.rating !== "undefined" && (
                        <div className="rating-row">
                          <span>⭐ {book.rating} / 5</span>
                        </div>
                      )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        navigate(`/book-details/${book._id}`, { state: { from: location } })
                      }
                    >
                      View details
                    </Button>
                  </div>
                </Card>
              ))}
        </div>
      </Container>

      <Container className="section-shell" id="genres">
        <SectionHeader
          title="Genres spotlight"
          description="What readers are sharing right now."
        />
        <div className="chips-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => <Skeleton key={idx} />)
            : genreStats.map(([genre, count]) => (
                <Badge key={genre} tone="info" className="pill">
                  {genre} · {count}
                </Badge>
              ))}
        </div>
      </Container>

      <Container className="section-shell" id="top-rated">
        <TopGenres />
      </Container>

      <Container className="section-shell" id="book-week">
        <BookOfWeek />
      </Container>

      <Container className="section-shell" id="authors">
        <Card className="surface-block">
          <SectionHeader
            title="Author highlights"
            description="Most-shared authors from the latest submissions."
          />
          <div className="author-row">
            <div className="author-visual">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQomB3jpFDqRjRTvuph_V57e8rSBx4qiO6l9g&s"
                alt="Author highlights feature"
              />
            </div>
            <div className="chips-grid">
              {loading
                ? Array.from({ length: 6 }).map((_, idx) => <Skeleton key={idx} />)
                : authorStats.map(([author, count]) => (
                    <button
                      key={author}
                      className="chip-button"
                      aria-label={`View books by ${author}`}
                    >
                      <span>{author}</span>
                      <span className="muted-text">· {count}</span>
                    </button>
                  ))}
            </div>
          </div>
        </Card>
      </Container>

      <Container className="section-shell" id="stats">
        <SectionHeader
          title="Community stats"
          description="A quick snapshot of what the community is curating."
        />
        <div className="stats-grid">
          <Card className="stat-card tile">
            <div className="stat-icon" aria-hidden="true">📚</div>
            <div className="stat-value">{stats.total}</div>
            <div className="muted-text">Books shared</div>
          </Card>
          <Card className="stat-card tile">
            <div className="stat-icon" aria-hidden="true">🏷️</div>
            <div className="stat-value">{stats.genres}</div>
            <div className="muted-text">Genres covered</div>
          </Card>
          <Card className="stat-card tile">
            <div className="stat-icon" aria-hidden="true">👥</div>
            <div className="stat-value">{stats.authors}</div>
            <div className="muted-text">Authors featured</div>
          </Card>
          <Card className="stat-card tile">
            <div className="stat-icon" aria-hidden="true">⭐</div>
            <div className="stat-value">{stats.rated}</div>
            <div className="muted-text">Rated titles</div>
          </Card>
        </div>
      </Container>

      <Container className="section-shell" id="highlights">
        <SectionHeader
          title="Reader favorites"
          description="Highest rated picks from recent additions."
        />
        <div className="card-grid listing-grid">
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <Card key={idx} className="book-card modern">
                  <Skeleton style={{ height: 160 }} />
                </Card>
              ))
            : topByRating.map((book) => (
                <Card key={book._id} className="book-card modern">
                  <div className="book-cover">
                    <img src={book.coverImage} alt={book.title} loading="lazy" />
                  </div>
                  <div className="stack" style={{ gap: "var(--space-2)" }}>
                    <div className="book-title-row">
                      <h3>{book.title}</h3>
                      <Badge tone="warn">{book.genre}</Badge>
                    </div>
                    <div className="muted-text">{book.author}</div>
                    {book.summary && (
                      <p className="line-clamp-2 muted-text">{book.summary}</p>
                    )}
                    <div className="rating-row">⭐ {book.rating} / 5</div>
                  </div>
                </Card>
              ))}
        </div>
      </Container>

      <Container className="section-shell" id="snapshot">
        <SectionHeader
          title="Quick browse"
          description="A compact list of books to jump into detailed views."
          action={
            <Button as={Link} to="/all" variant="ghost" size="sm">
              Open full catalog
            </Button>
          }
        />
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 4 }).map((_, idx) => (
                    <tr key={idx}>
                      <td><Skeleton /></td>
                      <td><Skeleton style={{ width: "70%" }} /></td>
                      <td><Skeleton style={{ width: "60%" }} /></td>
                      <td><Skeleton style={{ width: "50%" }} /></td>
                    </tr>
                  ))
                : books.slice(0, 4).map((book) => (
                    <tr key={book._id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.genre}</td>
                      <td>{book.rating ? `${book.rating} / 5` : "-"}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </Container>

      <Container className="section-shell" id="about">
        <About />
      </Container>

      <Container className="section-shell" id="cta">
        <div className="cta-card surface">
          <SectionHeader
            title="Share your next favorite"
            description="Add a title to help readers discover something great."
            action={
              <Button as={Link} to="/add" variant="primary">
                Add a book
              </Button>
            }
          />
        </div>
      </Container>
    </div>
  );
};

export default Maincontent;
