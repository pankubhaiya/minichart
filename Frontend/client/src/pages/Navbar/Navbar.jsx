import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./Navbar.css"; // Importing the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/product" className="nav-link">
            Product Page
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin" className="nav-link">
            Admin Page
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
