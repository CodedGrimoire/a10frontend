
import React, { useState } from "react";

import "./AddBooks.css";
import axios from "axios";

import { useAuth } from "../hooks/useAuth";

import toast, { Toaster } from "react-hot-toast";


const BASE_URL = import.meta.env.VITE_API_URL ;


const AddBooks = () => {


  const { user } = useAuth();


  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    summary: "",
    coverImage: "",
  });
  const [loading, setLoading] = useState(false);




  const handleChange = (e) => {

    if (e.target.name === "rating") {
  let value = parseFloat(e.target.value);
  if (value > 5) value = 5;
  if (value < 1) value = 1;
  setBook({ ...book, rating: value });
  return;
}

    setBook({ ...book, [e.target.name]: e.target.value });
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) 
      
      {
      toast.error("You must be logged in to add a book.");
      return;
    }

    if (!book.title || !book.author || !book.genre) {
      toast.error("Title, Author, and Genre are required.");
      return;
    }
if (book.rating && Number(book.rating) > 5) {
  toast.error("Rating cannot be more than 5.");
  return;
}
if (book.rating && Number(book.rating) < 1) {
  toast.error("Rating cannot be less than 1.");
  return;
}

    const payload = 
    {
      ...book,
      rating: book.rating ? parseFloat(book.rating) : 0, 
      userEmail: user.email,
      userName: user.displayName || user.email,
    };

    try {
      setLoading(true);
      console.log("sending payload:", payload);


      await axios.post(`${BASE_URL}/add-book`, payload, 
        {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Book added successfully!");
      setBook({
        title: "",
        author: "",
        genre: "",
        rating: "",
        summary: "",
        coverImage: "",
      });
    } 
    
    catch (error) 
    
    {
      console.error("add-book error:", error);


      if (error.response?.data?.message) 
        
        {
        toast.error(error.response.data.message);
      } 
      
      else 
        
        {
        toast.error("Failed to add book");
      }
    } 
    
    finally 
    {
      setLoading(false);
    }
  };



  return (
    <div className="adding">


      <Toaster />
      <div className="adding-card">

        <h2 
        
        className="adding-title">

          Add a New Book
        </h2>

        <div>
         
          <div className="adding-form">




            <label className="form-label">
              
              
              Title *
              
              </label>


            <input
              type="text"
              name="title"


              value={book.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

         
          <div className="adding-form">
            <label className="form-label">
              
              Author *
              
              </label>
            <input
              type="text"


              name="author"
              value={book.author}
              onChange={handleChange}


              className="form-input"


              required
            />
          </div>

          <div className="adding-form">


            <label className="form-label">
              
              Genre *
              
              </label>


            <input
              type="text"
              name="genre"
              value={book.genre}



              onChange={handleChange}
              className="form-input"


              placeholder="Fantasy, Mystery, Non-Fiction..."


              required
            />
          </div>

        
          <div className="adding-form">


            <label className="form-label">
              
              Rating 
              
              </label>
            <input
              type="number"
              name="rating"
              value={book.rating}
              onChange={handleChange}



              className="form-input"
              min="1"
              max="5"

              step="0.1" 
            />
          </div>

         
          <div className="adding-form">


            <label className="form-label">
              
              
              Summary
              
              </label>
            <textarea

              name="summary"
              value={book.summary}
              onChange={handleChange}



              className="form-textarea"
              rows="3"
              placeholder="Short description of the book"


            />
          </div>

         
          <div className="adding-form">

            <label className="form-label">
              
              Cover Image URL
              
              
              </label>
            <input
              type="text"
              name="coverImage"


              value={book.coverImage}
              onChange={handleChange}
              className="form-input"
              placeholder="https://..."
            />
          </div>

         
          <div className="UFO-grid">


            <div className="adding-form">

              <label className="form-label">
                
                
                User Email
                
                </label>
              <input
                type="text"
                value={user?.email || ""}
                readOnly
                className="form-input readonly"
              />
            </div>
            <div className="adding-form">
              <label className="form-label">
                
                User Name
                
                </label>
              <input
                type="text"
                value={user?.displayName || user?.email || ""}
                readOnly


                className="form-input readonly"
              />
            </div>



          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}


            
            className="submit-button"
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </div>




      </div>  </div>
   
  );
};

export default AddBooks;