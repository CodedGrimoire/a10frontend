// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-primary">📚 The Book Haven</h1>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 hidden md:flex">
          <li><a href="#">Home</a></li>
          <li><a href="#">All Books</a></li>
          <li><a href="#">Add Book</a></li>
          <li><a href="#">My Books</a></li>
        </ul>

        <div className="ml-4">
          <button className="btn btn-outline btn-sm mx-1" type="button">Login</button>
          <button className="btn btn-primary btn-sm mx-1" type="button">Register</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;