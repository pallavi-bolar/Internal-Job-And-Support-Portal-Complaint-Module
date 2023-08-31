import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <img src="brand-name.png" alt="Logo" />
        </div>
        <div className="menu-link">
          <ul>
            <li>
              <Link to="/support-dashboard">Home</Link>
            </li>
            <li>
              <Link to="/open-complaints">Open Complaints</Link>
            </li>
            <li>
              <Link to="/create-faq">Create FAQ</Link>
            </li>
            <li>
              <Link to="/view-all-faqs">View FAQs</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
