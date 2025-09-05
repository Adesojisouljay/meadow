import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/Landing";
import Navbar from "./components/nav/NavBar";
import RegisterInvasion from "./pages/register-invasion/RegisterInvasion";
import "./App.css"

function App() {

  return (
    <Router>
      <Navbar />
      <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register-invasion" element={<RegisterInvasion />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
