
export const startGame = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/start', {
        method: 'POST',
      });
      const data = await response.json();
      return data; // Grąžinami duomenys, pavyzdžiui, sessionId
    } catch (error) {
      console.error('Error starting game:', error);
      throw error;
    }
  };
  
  export const fetchBoard = async (sessionId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/board/${sessionId}`);
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching board:', error);
      throw error;
    }
  };
  
  export const handleHit = async (sessionId: string, x: number, y: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/hit/${sessionId}`, {
        method: 'POST',
        body: JSON.stringify({ x, y }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error handling hit:', error);
      throw error;
    }
  };
  