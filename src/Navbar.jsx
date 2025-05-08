import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  
  return (
    <header className="navbar">
      <div className="logo">
        <img src="/images/logo.png" alt="Care Companion Logo" />
        <h1>Care Companion</h1>
      </div>
      <nav className="navbar-menu">
        <ul>
          <Link to="/home">HOME</Link>
          <Link to="/chatbot">CHATBOT</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/patient-data">PATIENT DATA</Link>
          <Link to="/contact">CONTACT US</Link>
          <Link to="/logout">LOGOUT</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
