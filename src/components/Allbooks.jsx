
import React, { useState, useEffect } from "react";


import "./AllBooks.css";

import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


const BASE_URL = import.meta.env.VITE_API_URL ;

const AllBooks = () => {


  const [loading, setLoading] = useState(true);
 const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  

 
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      try 
      
      {
        const response = await axios.get(`${BASE_URL}/all-books`);
        setBooks(response.data);


      } 
      
      // eslint-disable-next-line no-unused-vars
      catch (error) 
      
      {
        //console.error("Error fetching books:", error);
      }
      
      finally 
      
      {
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

  return (
    <div className="aallbc">
      <h2>All Books</h2>

      <div
        className="sorrty"
        style={{ marginBottom: "16px",
          
          display: "flex", gap: "10px" 
        
        }}
      >
        <button onClick={sortAsc}>
          
          
          Sort by Rating ↑</button>


        <button onClick={sortDesc}>
          
          
          Sort by Rating ↓
          
          
          </button>
      </div>

      <div className="bcard">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <img
              src={
                book.coverImage ||
                "https://via.placeholder.com/300x400?text=Book+Cover"
              }
              alt=""
            />
            <h3>{book.title}</h3>
            <p>
              <strong>
                
                Author:
                </strong> 
              
              {book.author}
            </p>
            <p>
              <strong>Genre:</strong> 
              
              
              {book.genre}  </p>
          
            <p>
              <strong>
                
                
                Rating:</strong> 
                {book.rating} / 5


            </p>


            <button
              onClick={() =>
                navigate(`/book-details/${book._id}`, {
                  state: { from: location },
                })
              }
            >
              View Details
            </button></div>
          
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
