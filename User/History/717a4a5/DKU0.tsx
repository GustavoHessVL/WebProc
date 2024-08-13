import React, { useState } from "react";
import "./Styles.css";

const ToggleButton: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prevCount) => (prevCount === 0 ? 1 : 0));
  };

  return (
    <div>
      <div className="container">
        <button className="toggle-button" onClick={handleClick}>
          {count}
        </button>
        <button className="toggle-button" onClick={handleClick}>
          {count}
        </button>
      </div>
    </div>
  );
};

export default ToggleButton;
