import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Example1 from "./pages/Example1/Example1";
import Example2 from "./pages/Example2/Example2";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/example1" element={<Example1 />} />
        <Route path="/example2" element={<Example2 />} />
      </Routes>
    </Router>
  );
}

export default App;
