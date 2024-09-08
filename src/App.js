import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import WeatherReport from './components/WeatherReport';
import { useQuery } from "@tanstack/react-query";
import Weather from './components/Weather'
import Navbar from './components/Navbar'
import axios from "axios";

function App() {

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/history" element={<WeatherReport />} />
      </Routes>
    </Router>
  );
}

export default App;
