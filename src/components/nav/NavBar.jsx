import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./index.css";
import whiteLogo from "../../assets/whiteLogo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img className="meadow-logo" src={whiteLogo} alt="Logo" />

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register-invasion">Regiter for invasion 2025</Link></li>
        {/* <li><Link to="/about">About</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/contact">Contact</Link></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
