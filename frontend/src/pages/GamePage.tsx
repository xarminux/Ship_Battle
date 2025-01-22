import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBoard, handleHit } from '../api/gameApi'; // Importuojame funkcijas iš api/gameApi
import Table from '../components/Table';  // Importuojame Table komponentą

const GamePage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>(); // Gauti sessionId iš URL
  const navigate = useNavigate(); // Naudojame navigate, kad nukreiptume į meniu
  const [board, setBoard] = useState<number[][]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(25); // Pradinis bandymų skaičius
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Užklausos funkcija, kad gauti lentą pagal sesijos ID
  useEffect(() => {
    const loadBoard = async () => {
      try {
        if (sessionId) {
          const data = await fetchBoard(sessionId); // Naudojame fetchBoard funkciją iš api
          const { board, attemptsLeft, gameOver } = data;
          setBoard(board); // Atvaizduojame lentą
          setAttemptsLeft(attemptsLeft); // Atvaizduojame likusius bandymus
          setGameOver(gameOver); // Atvaizduojame žaidimo būseną

          // Jei žaidi
        }
      } catch (error) {
        console.error('Klaida gaunant zaidimo lenta', error);
      }
    };

    if (sessionId) {
      loadBoard();
    }
  }, [sessionId, gameOver]); // Pridedame gameOver kaip priklausomybę

  // Paspaudimo apdorojimas
  const handleCellClick = async (x: number, y: number) => {
    try {
      if (sessionId && !gameOver) {
        const data = await handleHit(sessionId, x, y); // Naudojame handleHit funkciją iš api
        const { board, attemptsLeft, gameOver } = data;

        // Atinaujinsime lentą ir bandymų skaičių
        setBoard(board);
        setAttemptsLeft(attemptsLeft);
        setGameOver(gameOver);

        // Galima pridėti logiką pranešimams apie pataikymą ar praleidimą
        if (gameOver) {
          console.log('Hit!');
        } else {
          console.log('Miss!');
        }
      }
    } catch (error) {
      console.error('Error handling click:', error);
    }
  };

  // Funkcija, kuri nukreipia į pagrindinį meniu ir išvalo sessionId iš localStorage
  const handleReturnToMenu = () => {
    localStorage.removeItem('sessionId'); // Pašaliname sessionId iš localStorage
    navigate('/'); // Nukreipia į pagrindinį meniu
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
