
import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";


import { useAuth } from "../hooks/useAuth";


const Navbar = () => {
  const { user, loading, logout } = useAuth();
  
  const location = useLocation();

  const isActive = (path) => 
    location.pathname === path;

  return (
    <nav className="navbar">


      <div className="navbar-brand">

        <Link to="/" 
        
        className="navbar-logo">
          📚 The Book Haven
        </Link></div>
      

      <div className="navbar-content">
        <ul className="navbar-menu">
          <li>
            <Link to="/" className={isActive("/") ? "active-link" : ""}>Home</Link>
          </li>
          <li>
            <Link to="/all" className={isActive("/all") ? "active-link" : ""}>All Books</Link>
          </li>
          <li>
            <Link to="/add" className={isActive("/add") ? "active-link" : ""}>Add Book</Link>
          </li>
          <li>
            <Link to="/my" className={isActive("/my") ? "active-link" : ""}>My Books</Link>
          </li>
        </ul>

        {loading ? (
          <span className="loading-text">...</span>
        ) : user ? (
          <div className="user-section">
            <div className="user-avatar-container">
              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.displayName || user.email
                  )}`
                }
                alt=""  className="user-avatar"
               
              />



              <div className="user-tooltip">


                {user.displayName || user.email || user.name} </div>
             
            </div>



            <button onClick={logout} 
            
            className="btn-logout">


              Log out


            </button>
          </div>
        ) :
        
        
        (
          <div className="auth-buttons">
            <Link to="/login" 
            
            
            className="btn-login">
              Login


            </Link>


            <Link to="/register" 
            
            className="btn-register">



              Register
            </Link></div>
          
        )}
        
      </div> </nav>
   
  );
};

export default Navbar;
