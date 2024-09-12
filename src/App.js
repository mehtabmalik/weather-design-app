import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import WeatherReport from './components/WeatherReport';
import Weather from './components/Weather'
import Navbar from './components/Navbar'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/history" element={<WeatherReport />} />
      </Routes>
    </Router>
  );
}

export default App;
