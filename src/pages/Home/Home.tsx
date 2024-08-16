import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Style.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="home">
      <h1>WebProc Project</h1>
      <p>Interactive Learning System</p>
      <div className="buttons">
        <button
          onClick={() => navigate("/instructions")}
          className="nav-button"
        >
          Instructions
        </button>
        <button onClick={() => navigate("/example2")} className="nav-button">
          2
        </button>
        <button onClick={() => navigate("/MMU")} className="nav-button">
          MMU
        </button>
      </div>
    </div>
  );
};

export default Home;
