import React from "react";
import "./Style.css";

const Instructions: React.FC = () => {
  return (
    <div className="container">
      <h1>WebProc Project</h1>
      <p>Interactive Learning System</p>
      <div className="section">
        {" "}
        //Sessão 2
        <div className="TitleDiv">
          <h2 className="section-title">Title 1</h2>
        </div>
      </div>
      <div className="ContentDiv">
        {/* Content for the second block */}

        <div className="block">{/* Content for the second block */}</div>
        <div className="Theory">{/* Content for the second block */}</div>
      </div>
      <div className="section">
        {" "}
        //Sessão 2
        <div className="TitleDiv">
          <h2 className="section-title">Title 2</h2>
        </div>
        <div className="ContentDiv">
          {/* Content for the second block */}

          <div className="Theory">{/* Content for the second block */}</div>
          <div className="block">{/* Content for the second block */}</div>
        </div>
      </div>
      <div className="section">
        {" "}
        //Sessão 2
        <div className="TitleDiv">
          <h2 className="section-title">Title 3</h2>
        </div>
      </div>
      <div className="ContentDiv">
        {/* Content for the second block */}

        <div className="block">{/* Content for the second block */}</div>
        <div className="Theory">{/* Content for the second block */}</div>
      </div>
    </div>
  );
};

export default Instructions;
