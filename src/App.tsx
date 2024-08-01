import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Instructions from "./pages/Instructions/Instructions";
import Example2 from "./pages/Example2/Example2";
import Example3 from "./pages/Example3/Example3";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/example2" element={<Example2 />} />
        <Route path="/example3" element={<Example3 />} />
      </Routes>
    </Router>
  );
}

export default App;
