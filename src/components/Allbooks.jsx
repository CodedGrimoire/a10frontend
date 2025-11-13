/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import axios from "axios";

import "./AllBooks2.css";


import { useNavigate, useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const AllBooks = () => {
  const [loading, setLoading] = useState(true);


  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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

  const sortDesc = () => {
    const sorted = [...books].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    setBooks(sorted);
  };

  const sortAsc = () => {
    const sorted = [...books].sort((a, b) => (a.rating || 0) - (b.rating || 0));
    setBooks(sorted);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <span className="loading-spinner"></span>
      </div>
    );
  }

  if (books.length === 0) {
    return <h1 className="nobookinall">No books found</h1>;
  }
if(books.length!=0){
  return (
    <div className="aallbc">


      <h2>
        
        All Books
        
        
        </h2>

      <div className="sorrty">
        <button onClick={sortAsc}>Sort by Rating ↑</button>



        <button onClick={sortDesc}>Sort by Rating ↓</button>
      </div>

      <div className="table-wrapper">


        <table className="books-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>


              <th>Author</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}

                      alt=""
                      className="table-cover"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>


                <td>{book.rating ? `${book.rating} / 5` : "-"}


                  
                </td>
                <td>
                  <button
                    className="details-btn"
                    onClick={() =>
                      navigate(`/book-details/${book._id}`,
                        
                        {
                        state: { from: location },
                      })
                    }
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
}
export default AllBooks;
