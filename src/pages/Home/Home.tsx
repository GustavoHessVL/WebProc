import React from "react";
import { useNavigate } from "react-router-dom";
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
          onClick={() => openInNewTab("/example1")}
          className="nav-button"
        >
          1
        </button>
        <button
          onClick={() => openInNewTab("/example2")}
          className="nav-button"
        >
          2
        </button>
        <button
          onClick={() => openInNewTab("/example3")}
          className="nav-button"
        >
          3
        </button>
      </div>
    </div>
  );
};

export default Home;
