import React from 'react';
import 'animate.css';
import './main.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="banner-content animate__animated animate__fadeInUp">
        <h1>Welcome to the Bookstore</h1>
        <p>Explore the world of knowledge with our vast collection of books</p>
        <div className="button-container">
          <button className="btn-all-books">All Books</button>
          <button className="btn-create-book">Create Book</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
