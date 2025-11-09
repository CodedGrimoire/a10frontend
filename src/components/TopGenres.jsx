import React, { useState, useEffect } from "react";

const TopGenres = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedBooks = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/books/top-rated`);
        if (!res.ok) throw new Error("Failed to fetch top rated books");
        const data = await res.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTopRatedBooks();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <span style={{ fontSize: '18px' }}>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ color: '#ef4444' }}>{error}</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '8px' }}>Top Rated Books</h2>
          <p style={{ color: '#666' }}>Discover the highest-rated books in The Book Haven.</p>
        </div>
        <button style={{
          padding: '10px 24px',
          backgroundColor: '#92400e',
          color: 'white',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          View All Books
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px'
      }}>
        {books.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>No books found.</p>
        ) : (
          books.map((book, idx) => (
            <div 
              key={book._id || idx}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{ height: '300px', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
                <img
                  src={book.img || book.coverImage || book.image || "https://via.placeholder.com/300x400?text=Book+Cover"}
                  alt={book.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x400?text=Book+Cover";
                  }}
                />
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {book.title || book.name}
                </h3>
                <p style={{ color: '#666', marginBottom: '8px' }}>{book.author}</p>
                {book.genre && (
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    fontSize: '14px',
                    borderRadius: '9999px',
                    marginBottom: '12px'
                  }}>
                    {book.genre}
                  </span>
                )}
                {book.rating && (
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ color: '#fbbf24', marginRight: '4px' }}>★</span>
                    <span style={{ fontWeight: '500' }}>{book.rating.toFixed(1)}</span>
                    {book.reviewCount && (
                      <span style={{ color: '#666', fontSize: '14px', marginLeft: '8px' }}>
                        ({book.reviewCount} reviews)
                      </span>
                    )}
                  </div>
                )}
                {book.description && (
                  <p style={{
                    color: '#666',
                    fontSize: '14px',
                    marginBottom: '16px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {book.description}
                  </p>
                )}
                <button style={{
                  width: '100%',
                  padding: '10px 16px',
                  backgroundColor: '#92400e',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#78350f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#92400e';
                }}>
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopGenres;