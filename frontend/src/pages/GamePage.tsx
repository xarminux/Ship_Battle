import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBoard, handleHit } from '../api/gameApi';
import Table from '../components/Table';

const GamePage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<number[][]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(25);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const loadBoard = async () => {
      try {
        if (sessionId) {
          const data = await fetchBoard(sessionId);
          const { board, attemptsLeft, gameOver } = data;
          setBoard(board);
          setAttemptsLeft(attemptsLeft);
          setGameOver(gameOver);
        }
      } catch (error) {
        console.error('Klaida gaunant zaidimo lenta', error);
      }
    };

    if (sessionId) {
      loadBoard();
    }
  }, [sessionId]);

  const handleCellClick = async (x: number, y: number) => {
    try {
      if (sessionId && !gameOver) {
        const data = await handleHit(sessionId, x, y);
        const { board, attemptsLeft, gameOver } = data;
        setBoard(board);
        setAttemptsLeft(attemptsLeft);
        setGameOver(gameOver);
      }
    } catch (error) {
      console.error('klaida su cell langeliu', error);
    }
  };

  const handleReturnToMenu = () => {
    localStorage.removeItem('sessionId');
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h1>Laivų mūšis</h1>
      {board.length > 0 ? (
        <>
          <Table board={board} onClick={handleCellClick} />
          <div className="mt-4">
            <h3>Likę bandymai: {attemptsLeft}</h3>
            {gameOver && (
              <>
                <h4>Žaidimas baigtas!</h4>
                <button onClick={handleReturnToMenu} className="btn btn-primary">
                  Grįžti į meniu
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <p>Kraunama sesija...</p>
      )}
    </div>
  );
};

export default GamePage;
