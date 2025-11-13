import React, { useEffect, useState } from "react";


import "./BookOfWeek.css";


import axios from "axios";



const BASE_URL = import.meta.env.VITE_API_URL;

const BookOfWeek = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBook = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/books/latest`);


        const data = res.data;

        if (Array.isArray(data) && data.length > 0) {
          setBook(data[0]);
        }
      } 
      
      catch (error)
      
      
      {
        console.error("Error fetching latest book:", error);
      }
      
      
      finally 
      
      {
        setLoading(false);
      }
    };

    fetchLatestBook();
  }, []);

  if (loading) 
    
    
    {
    return (
      <div className="bowcontainer">
        <div className="loading-state">


          <div className="loading-spinner">


          </div>
        </div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="bowcontainer">


      <h2 className="section-title">
        
        
        Book of the Week
        
        </h2>
      <div className="fbc">


        <div className="featured-image">
          <img
            src={book.coverImage }   alt=""

          
          />
        </div>


        <div className="featured-info">


          <h3 className="featured-title">
            
            
            {book.title}
            
            
            </h3>
          <p className="featured-author">


           
              
              {book.author}
          </p>
          <div className="featured-meta">


            <span className="meta-item">
              <strong>
                
                
                Genre:
                
                </strong>
                
                
                 {book.genre}
            </span>


            {book.rating && (
              <span className="meta-item">
                <strong>
                  
                  
                  Rating:
                  
                  
                  </strong> 
                  
                  {book.rating}/5 
                  
                  ⭐
              </span>
            )}
          </div>


          {book.summary && (

            
            <p className="featured-description">



              {book.summary}
              
              
              </p>
          )}
        </div>
      </div> </div>
    
  );
};

export default BookOfWeek;
