import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Instructions from "./pages/Instructions/Instructions";
import Mesi from "./pages/Example2/Mesi";
import MMU from "./pages/MMU/MMU";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/mesi" element={<Mesi />} />
        <Route path="/MMU" element={<MMU />} />
      </Routes>
    </Router>
  );
}

export default App;
