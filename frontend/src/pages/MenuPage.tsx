import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startGame } from '../api/gameApi';
import 'bootstrap/dist/css/bootstrap.min.css';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  const handleStartGame = async () => {
    try {
      const data = await startGame();
      const { sessionId } = data;
      localStorage.setItem('sessionId', sessionId);
      navigate(`/game/${sessionId}`);
    } catch (error) {
      console.error('Nepavyko užkrauti sesijos:', error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div
        className="text-center text-white p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '15px',
        }}
      >
        <h1 className="display-4 mb-4">Armino laivų mūšis</h1>
        <p className="lead mb-4">Jeigu pasiruoše pradėti žaidimą, spauskite pradėti</p>
        <button
          className="btn btn-primary btn-lg mb-3"
          onClick={handleStartGame}
          style={{
            padding: '10px 30px',
            fontSize: '18px',
            borderRadius: '50px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Pradėti žaidimą
        </button>
      </div>
    </div>
  );
};

export default MenuPage;
