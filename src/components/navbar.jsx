// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.css";

const Navbar = () => {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          📚 The Book Haven
        </Link>
      </div>

      <div className="navbar-content">
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all">All Books</Link></li>
          <li><Link to="/add">Add Book</Link></li>
          <li><Link to="/my">My Books</Link></li>
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
                alt="user"
                className="user-avatar"
              />
              <div className="user-tooltip">
                {user.displayName || user.email}
              </div>
            </div>
            <button onClick={logout} className="btn-logout">
              Log out
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/register" className="btn-register">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;