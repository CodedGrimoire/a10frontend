import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Skeleton from "./ui/Skeleton";
import { getLatestBooks, getTopRatedBooks } from "../api";
import "./main.css";

export default function BookWeekPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setError("");
      try {
        const latest = await getLatestBooks();
        const sortedLatest = (latest || []).sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        if (sortedLatest.length) {
          setBooks(sortedLatest);
          return;
        }
        const topRated = await getTopRatedBooks();
        setBooks(topRated || []);
      } catch (err) {
        setError("We couldn't load this week's pick right now.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const featured = books[0];
  const previous = useMemo(() => books.slice(1, 5), [books]);

  return (
    <Container className="section-shell">
      <SectionHeader
        title="Book of the Week"
        description="A community-picked highlight from recent additions."
      />

      <Card className="book-week-card">
        {loading ? (
          <Skeleton style={{ height: 280 }} />
        ) : !featured ? (
          <p className="muted-text">{error || "No featured book available right now."}</p>
        ) : (
          <div className="book-week-grid">
            <div className="book-week-cover">
              <img src={featured.coverImage} alt={featured.title} loading="lazy" />
            </div>
            <div className="stack" style={{ gap: "var(--space-3)" }}>
              <div className="book-title-row">
                <h2>{featured.title}</h2>
                {featured.genre && <Badge tone="warn">{featured.genre}</Badge>}
              </div>
              <div className="muted-text">{featured.author}</div>
              {featured.summary && <p className="muted-text">{featured.summary}</p>}
              <div className="spec-grid">
                {typeof featured.rating !== "undefined" && (
                  <div className="spec-item">
                    <span className="muted-text">Rating</span>
                    <strong>⭐ {featured.rating} / 5</strong>
                  </div>
                )}
                {featured.userName && (
                  <div className="spec-item">
                    <span className="muted-text">Added by</span>
                    <strong>{featured.userName}</strong>
                  </div>
                )}
              </div>
              <Button as={Link} to={`/book-details/${featured._id}`} variant="primary">
                View details
              </Button>
            </div>
          </div>
        )}
      </Card>

      {previous.length > 0 && (
        <div className="stack" style={{ gap: "var(--space-4)", marginTop: "var(--space-6)" }}>
          <SectionHeader
            title="Other notable picks"
            description="Recent titles that stood out to our readers."
          />
          <div className="card-grid listing-grid">
            {loading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <Card key={idx} className="book-card modern">
                    <Skeleton style={{ height: 160 }} />
                  </Card>
                ))
              : previous.map((book) => (
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
                      {book.summary && <p className="line-clamp-2 muted-text">{book.summary}</p>}
                      <Button as={Link} to={`/book-details/${book._id}`} size="sm" variant="ghost">
                        View details
                      </Button>
                    </div>
                  </Card>
                ))}
          </div>
        </div>
      )}
    </Container>
  );
}
