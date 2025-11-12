/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import axios from "axios";


import "./MyBooks.css";

import { useAuth } from "../hooks/useAuth";


const BASE_URL = import.meta.env.VITE_API_URL ;

const MyBooks = () => {
  const { user, loading } = useAuth();

   const [fetching, setFetching] = useState(false);
  const [books, setBooks] = useState([]);


   const [edix, setEditingBook] = useState(null);


 
 



  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    summary: "",
    coverImage: "",
  });
  const [updating, setUpdating] = useState(false);



  
  const fetchMyBooks = async (email) => {
    try {
      setFetching(true);
      const res = await axios.get(
        `${BASE_URL}/myBooks?email=${encodeURIComponent(email)}`
      );
      setBooks(res.data || []);
    }
    
    
    catch (err) 
    
    
    {
     // console.error(err);


      toast.error("Failed to load your books");
    } 
    
    finally 
    {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading && user?.email) {
      fetchMyBooks(user.email);
    }
  }, [loading, user]);


  const handleDelete = async (id) => {
    const sure = window.confirm("Delete this book?");
    if (!sure) return;
    try 
    
    {
      await axios.delete(`${BASE_URL}/delete-book/${id}`);
      toast.success("Book deleted successfully!");


      setBooks((prev) => prev.filter((b) => b._id !== id));
    }
    
    catch (err) {
      //console.error(err);
      toast.error("Failed to delete");
    }
  };



  const closeModal = () => {
    setEditingBook(null);
    setFormData({
      title: "",
      author: "",
      genre: "",
      rating: "",
      summary: "",
      coverImage: "",
    });
  };


  
  const openUpdateModal = (book) => 
    
    {
    setEditingBook(book);


    setFormData({
      title: book.title || "",
      author: book.author || "",
      genre: book.genre || "",
      rating: book.rating || "",
      summary: book.summary || "",
      coverImage: book.coverImage || "",
    });

  };

 
//brrrrr
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.genre) 
      
      {
      toast.error("Title, Author, and Genre are required.");
      return;
    }

    const payload = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      rating: formData.rating ? parseFloat(formData.rating) : 0, 


      summary: formData.summary || "",


      coverImage: formData.coverImage || "",
      userEmail: edix.userEmail,


      userName: edix.userName,
    };

    try {
      setUpdating(true);
     // console.log("Sending update payload:", payload);


      await axios.put(`${BASE_URL}/update-book/${edix._id}`, payload, 
        
        
        {
        headers: { "Content-Type": "application/json" },
      });



      toast.success("Book updated successfully!");



      setBooks((prev) =>
        prev.map((b) => (b._id === edix._id ? { ...b, ...payload } : b))
      );
      closeModal();
    }
    
    catch (err) 
    
    {
      //console.error("Update error:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to update book");
    } 
    
    finally 
    
    {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="mines">
        <Toaster />

        <div className="loading-state">


          <div className="loading-spinner">



          </div>
          
        </div>
      </div>
    );
  }

  if (!user?.email) {
    return (
      <div className="mines">
        <Toaster />


        <div className="empty-state">
          <p>
            
            You must be logged in to see your books.
            
            
            </p>
        </div> </div>
     
    );
  }

  return (
    <div className="mines">
      <Toaster />
      <h2 className="my-books-title">
        
        My Books
        
        
        </h2>

      {fetching ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>
            
            
            Loading your books…
            
            
            </p>
        </div>
      ) :
       books.length === 0 ? (
        <div className="empty-state">
          <p>
            
            You haven't added any books yet.
            
            </p>
        </div>
      ) : 
      
      
      (
        <div className="table-wrapper">
          <table className="books-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title / Author</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <img
                      src={book.coverImage}
                      alt=""
                      className="tmb"
                    />
                  </td>
                  <td>
                    <div className="book-title-cell">
                      
                      
                      {book.title}
                      
                      
                      </div>
                    <div className="book-author-cell">


                      {book.author || "Unknown"}
                    </div>
                  </td>
                  <td>{book.genre || "-"}</td>
                  <td>{book.rating || "-"}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => openUpdateModal(book)}
                        className="btn-update"
                      >
                        Update
                      </button>


                      <button
                        onClick={() => handleDelete(book._id)}
                        className="btn-delete"
                      >
                        Delete
                      </button> </div>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    
      {edix && (
        <div className="modal-overlay"
        
        onClick={closeModal}>
          <div className="modal-content"
          
          onClick={(e) => e.stopPropagation()}>
            <div className="mhdr">


              <h3 className="modal-title">
                
                Update Book
                
                
                </h3>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>  </div>
          

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">
                  
                  
                  Title *</label>


                <input


                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  
                  
                  Author *
                  
                  
                  </label>


                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Genre *</label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rating (1–5)</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  max="5"
                  step="0.1" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Summary</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cover Image URL</label>
                <input
                  type="text"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateSubmit}
                  disabled={updating}
                  className="btn-submit"
                >
                  {updating ?
                  
                  "Updating..." : "Update Book"}
                </button>



              </div> </div>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
