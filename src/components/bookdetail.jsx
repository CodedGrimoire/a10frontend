import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://your-server.vercel.app/books/${id}`)
      .then((res) => {
        if (!res.data?._id) {
          setNotFound(true);
        } else {
          setBook(res.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-72">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-error">Book not found</h2>
        <Link to="/all-books" className="btn btn-primary">
          Go back to All Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/all-books" className="btn btn-outline btn-sm">
          ← Back to All Books
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-base-100 shadow-md rounded-xl p-6">
        {/* Cover */}
        <div>
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-80 object-cover rounded-lg border"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-primary mb-3">{book.title}</h1>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Rating:</span> {book.rating}/5
          </p>
          {book.userEmail && (
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Added by:</span>{" "}
              {book.userName ? book.userName : book.userEmail}
            </p>
          )}
          <p className="text-gray-600 leading-relaxed">
            {book.summary || "No description available."}
          </p>

          {/* If you want to allow comments later, check user here */}
          {user ? (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Interactions</h3>
              <p className="text-sm text-gray-500">
                (You are logged in as {user.email})
              </p>
              {/* placeholder for comment box / borrow / wishlist */}
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-400">
              Login to comment or interact with this book.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
