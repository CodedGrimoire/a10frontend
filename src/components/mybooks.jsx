import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth"; // adjust path if yours is different

// you can move this to a separate config file
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MyBooks = () => {
  const { user, loading } = useAuth();
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(false);

  // fetch user's books
  const fetchMyBooks = async (email) => {
    try {
      setFetching(true);
      const res = await axios.get(
        `${BASE_URL}/myBooks?email=${encodeURIComponent(email)}`
      );
      setBooks(res.data || []);
    } catch (err) {
      console.error(err);
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

  // delete
  const handleDelete = async (id) => {
    const sure = window.confirm("Delete this book?");
    if (!sure) return;
    try {
      await axios.delete(`${BASE_URL}/delete-book/${id}`);
      toast.success("Book deleted");
      // refetch or update locally
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  // update (minimal: prompt for title & rating)
  const handleUpdate = async (book) => {
    const newTitle = window.prompt("New title:", book.title);
    if (newTitle === null) return; // cancel

    const newRating = window.prompt("New rating (1-5):", book.rating || "5");
    if (newRating === null) return;

    const payload = {
      ...book,
      title: newTitle,
      rating: newRating,
    };

    try {
      await axios.put(`${BASE_URL}/update-book/${book._id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Book updated");
      // update in UI
      setBooks((prev) =>
        prev.map((b) => (b._id === book._id ? { ...b, ...payload } : b))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Toaster />
        <p>Loading user…</p>
      </div>
    );
  }

  if (!user?.email) {
    return (
      <div className="p-6">
        <Toaster />
        <p>You must be logged in to see your books.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Toaster />
      <h2 className="text-2xl font-semibold mb-4">My Books</h2>

      {fetching ? (
        <p>Loading your books…</p>
      ) : books.length === 0 ? (
        <p>You haven’t added any books yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-md shadow">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title / Author</th>
                <th>Genre</th>
                <th>Rating</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-14 h-16 object-cover rounded"
                    />
                  </td>
                  <td>
                    <div className="font-medium">{book.title}</div>
                    <div className="text-sm text-gray-500">
                      {book.author || "Unknown"}
                    </div>
                  </td>
                  <td>{book.genre || "-"}</td>
                  <td>{book.rating || "-"}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(book)}
                      className="btn btn-sm btn-outline"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
