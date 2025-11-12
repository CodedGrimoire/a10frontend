// src/components/TopGenres.jsx
import React, { useState, useEffect } from "react";

import "./main.css";


import { useNavigate, useLocation } from "react-router-dom";



import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";

import axios from "axios";


const TopGenres = () => {
  const [books, setBooks] = useState([]);

  const [, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTopRatedBooks = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL ;
        const ress = await axios.get(`${API_URL}/books/top-rated`);

        setBooks(ress.data);
      }
       catch (err)
       
       {
        setError(err.message);
      } 
      
      finally {
        setLoading(false);
      }
    };

    fetchTopRatedBooks();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-[#813b10]"></span>
      </div>
    );

  
  return (
    <>
      
      <Tooltip id="book-tooltip"
       place="top" 

       className="book-tooltip" />

      <div className="top-genres">
        <div className="header">


          <div className="textual">
            <h2 className="title">
              Top Rated Books</h2>



            <p className="subtitle">
              Discover the highest-rated books in The Book Haven. </p>
            
          </div>  </div>
       

        <div className="grid-container">
          {books.length === 0 ? 
          
          (
            <p className="no-books-message">No books found.</p>
          ) : 
          
          (
            books.map((book, idx) => (
              <div
                key={book._id || idx}


                className="bookies"
                
                data-tooltip-id="book-tooltip"
                data-tooltip-content={
                  book.description ||
                  book.summary ||
                  "No description available."
                }
              >
                <div className="bookies-image">

                  <img
                    src={
                      book.coverImage ||
                      book.img ||
                      book.image ||
                      "https://via.placeholder.com/300x400?text=Book+Cover"
                    }
                    alt=""  className="book-image"


                   
                  
                  />


                </div>

                <div className="book-info">
                  
                  <h3 className="book-title">{book.title || book.name}



                  </h3>


                  <p className="author">
                    
                    {book.author}
                    
                    </p>



                  {book.genre && <span className="genre">{book.genre}</span>}


                  {book.rating && (
                    <div className="rating">
                      <span className="star">
                        
                        
                        ★</span>
                      <span className="rating-value">
                        {book.rating.toFixed
                          ? book.rating.toFixed(1)


                          : book.rating} </span>
                     



                      {book.reviewCount && (
                        <span className="review-count">
                          ({book.reviewCount} reviews)
                        </span>
                      )} </div>
                   
                  )}

                  <button
                    className="view-details-button"
                    style={{ backgroundColor: "#813b10", 
                      
                      color: "white" }}
                    onClick={() =>
                      navigate(`/book-details/${book._id}`, {
                        state: { from: location }, 
                      })
                    }
                  >
                    View Details


                  </button> </div>
               
              </div>
            ))
          )}


        </div></div>
      
    </>
  );
};

export default TopGenres;
