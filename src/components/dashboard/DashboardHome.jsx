import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import Skeleton from "../ui/Skeleton";
import Badge from "../ui/Badge";

const API_URL = import.meta.env.VITE_API_URL;

export default function DashboardHome({ adminView = false }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/all-books`);
        setBooks(res.data || []);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const total = books.length;
    const rated = books.filter((b) => b.rating).length;
    const genres = new Set(books.map((b) => b.genre).filter(Boolean));
    const latest = books.slice(0, 5);
    const genreCounts = {};
    books.forEach((b) => {
      if (b.genre) genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1;
    });
    const genreData = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    return { total, rated, genres: genres.size, latest, genreData };
  }, [books]);

  return (
    <div className="stack" style={{ gap: "var(--space-6)" }}>
      <SectionHeader
        title={adminView ? "Admin Overview" : "Dashboard Overview"}
        description="Snapshot of your library activity."
      />

      <div className="stats-grid">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <Card key={idx} className="stat-card">
              <Skeleton style={{ height: 20 }} />
            </Card>
          ))
        ) : (
          <>
            <Card className="stat-card">
              <div className="stat-value">{stats.total}</div>
              <div className="muted-text">Total books</div>
            </Card>
            <Card className="stat-card">
              <div className="stat-value">{stats.rated}</div>
              <div className="muted-text">Rated titles</div>
            </Card>
            <Card className="stat-card">
              <div className="stat-value">{stats.genres}</div>
              <div className="muted-text">Genres</div>
            </Card>
            <Card className="stat-card">
              <div className="stat-value">{stats.latest.length}</div>
              <div className="muted-text">Recent adds</div>
            </Card>
          </>
        )}
      </div>

      <Card>
        <SectionHeader
          title="Top genres"
          description="Most common genres in the catalog."
        />
        {loading ? (
          <Skeleton style={{ height: 140 }} />
        ) : stats.genreData.length === 0 ? (
          <p className="muted-text">No genre data.</p>
        ) : (
          <div className="bar-chart">
            {stats.genreData.map(([genre, count]) => (
              <div key={genre} className="bar-row">
                <span>{genre}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${(count / stats.total) * 100}%` }}
                  />
                </div>
                <span className="muted-text">{count}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <SectionHeader
          title="Recent activity"
          description="Newest books added to the library."
        />
        {loading ? (
          <div className="table-wrapper">
            <table className="table">
              <tbody>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx}>
                    <td><Skeleton /></td>
                    <td><Skeleton style={{ width: "60%" }} /></td>
                    <td><Skeleton style={{ width: "50%" }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : stats.latest.length === 0 ? (
          <p className="muted-text">No recent activity.</p>
        ) : (
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
                {stats.latest.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.rating || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {error && <p className="error-text">{error}</p>}
      </Card>
    </div>
  );
}
