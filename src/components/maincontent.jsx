import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import HBan from "./herobanner";
import Topss from "./TopGenres";
import Bweek from "./bookOfWeek"

import "./main.css";
import Aboo from "./About";


import "./AllBooks.css";

import axios from "axios";

const Maincontent = () => {

    const [isDark, setIsDark] = useState(false);
  const [books, setBooks] = useState([]);
  

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      try 
      
      {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/latest`);
        setBooks(response.data.slice(0, 6));
      } 
      
      // eslint-disable-next-line no-unused-vars
      catch (error) {
        //console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);



  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#3e2723' : '#fff';

    
    document.body.style.transition = 'background-color ease';
  }, [isDark]);

  return (
    <div style={{ 
      backgroundColor: isDark ?
      
      '#3e2723' : '#fff',
      minHeight: '100vh',
      transition: 'background-color  ease'
    }}>
     
      <button
        onClick={() => setIsDark(!isDark)} className="toogle"

        
       

      >
        {isDark ? 
        
        '☀️ Light' : '🌙 Dark'}
      </button>

      <HBan />

      <div className="aallbc" style={{
        backgroundColor: isDark ? '#3e2723' : '#fff'
      }}>
        <h2 style={{ color: isDark ? '#fef3c7' : '#000' }}>
          
          See Latest Books
          
          
          </h2>
        <div className="bcard">


          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.coverImage} alt={book.title} />
              <h3>{book.title}</h3>
              <p><strong>
                
                Author:
                
                </strong> {book.author}
                
                
                </p>
              <p><strong>
                
                Genre:</strong> 
                
                
                {book.genre}</p>
              <p>
                
                <strong>
                  
                  Rating:</strong> 
                  
                  {book.rating} / 5
                  
                  </p>
              <button
  onClick={() =>
    navigate(`/book-details/${book._id}`, { state: { from: location } })
  }
>
  View Details
</button>  </div>
          
          ))}

          <div
            className="gotoall"

            style={{
              display: "flex",

              width: "100%",
              gridColumn: "1 / -1", 
              justifyContent: "center",


               marginTop: "30px",
              alignItems: "center",
              
             
            }}
          >
            <button
              className="gotoallbtn"
              onClick={() => navigate("/all")}
              style={{  fontSize: "16px",
                   padding: "12px 28px",

                backgroundColor: "#813b10",
                color: "white",
               
                borderRadius: "6px",

              
                border: "none",
                fontWeight: "600",
              
               
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#a85c2f")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#813b10")}
            >
              View All
            </button> </div>
         
        </div>
      </div>

      <Topss />
      <Bweek/>
      <Aboo />
    </div>
  );
};

export default Maincontent;