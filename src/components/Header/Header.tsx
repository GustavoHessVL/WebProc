import React from "react";
import "./Style.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-text">WebProc</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
