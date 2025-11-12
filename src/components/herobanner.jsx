import React from 'react';
import { Link } from 'react-router-dom';


import './main.css';


import 'animate.css';


const HeroBanner = () => {
  return (
    
    <div className="hero-banner">

      <div className="banner-content animate__animated animate__fadeInUp">
        <h1>Welcome to the Bookstore


        </h1>
        <p>
          
          Explore the world of knowledge with our vast collection of books
          
          </p>


        <div className="button-container">
          <Link to="/all">
            <button className="btn-all-books">
              
              All Books
              
              </button>
          </Link>

          
          <Link to="/add">
            <button className="btn-create-book">
              
              
              Create Book</button>
          </Link>


        </div></div>
      
    </div>
  );
};

export default HeroBanner;
