import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global CSS import
import App from "./App"; // Main App component
import reportWebVitals from "./reportWebVitals"; // Performance measurement

// Create the root element for React
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render the application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
