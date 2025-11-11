// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, loading, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          📚 The Book Haven
        </Link>
      </div>

      <div className="flex-none flex items-center gap-4">
        <ul className="menu menu-horizontal px-1 hidden md:flex">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all">All Books</Link></li>
          <li><Link to="/add">Add Book</Link></li>
          <li><Link to="/my">My Books</Link></li>
        </ul>

        {loading ? (
          <span className="text-sm text-gray-500">...</span>
        ) : user ? (
          <div className="flex items-center gap-3">
            <div className="relative group">
              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.displayName || user.email
                  )}`
                }
                alt="user"
                className="w-9 h-9 rounded-full border cursor-pointer"
              />
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md px-3 py-2 text-sm hidden group-hover:block z-20">
                {user.displayName || user.email}
              </div>
            </div>
            <button onClick={logout} className="btn btn-outline btn-sm">
              Log out
            </button>
          </div>
        ) : (
          <div className="ml-2 flex gap-2">
            <Link to="/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
