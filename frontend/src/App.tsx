import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import MenuPage from './pages/MenuPage'; 
import GamePage from './pages/GamePage'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} /> 
        <Route path="/game/:sessionId" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
