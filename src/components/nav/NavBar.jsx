import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import whiteLogo from "../../assets/whiteLogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="navbar" ref={navRef}>

      <div className="nav-wrapper">
        <img className="meadow-logo" src={whiteLogo} alt="Logo" />

        {/* Hamburger button */}
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/register-invasion" onClick={() => setIsOpen(false)}>Register for Invasion 2025</Link></li>
          {/* <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/events" onClick={() => setIsOpen(false)}>Events</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
