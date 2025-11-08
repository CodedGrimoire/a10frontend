import { useEffect, useState } from "react";
import { getAllBooks } from "./api";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, []);

  if (err) return <p>{err}</p>;

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map(b => (
          <li key={b._id}>{b.title} — {b.author}</li>
        ))}
      </ul>
    </div>
  );
}
