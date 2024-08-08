import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="logo-text">WebProc</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
