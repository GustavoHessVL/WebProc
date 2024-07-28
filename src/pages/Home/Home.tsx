import React from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>WebProc Project</h1>
      <p>Interactive Learning System</p>
      <div className="buttons">
        <button onClick={() => navigate("/example1")} className="nav-button">
          1
        </button>
        <button onClick={() => navigate("/example2")} className="nav-button">
          2
        </button>
      </div>
    </div>
  );
};

export default Home;
