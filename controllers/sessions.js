const { getBattleField } = require('../battlefield');

let sessions = {};

const startGame = (req, res) => {
  const sessionId = Date.now().toString(); 
  console.log(`Session started: ${sessionId}`);
  
  const emptyBattleField = Array(10).fill(null).map(() => Array(10).fill(null));
  const battleField = getBattleField(emptyBattleField); 
  
  const shipCounts = [0, 0, 0, 0, 0]; 
  
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cellValue = battleField[x][y];
      if (cellValue !== null) {
        shipCounts[cellValue - 1]++;
      }
    }
  }
  
  sessions[sessionId] = {
    board: battleField,
    playerboard: emptyBattleField, 
    attempts: 0,
    hits: 0,
    shipsSunk: 0,
    maxAttempts: 25,
    gameOver: false,
    shipCounts
  };

  res.json({ sessionId, battleField: emptyBattleField });
};

const getBoard = (req, res) => {
  const sessionId = req.params.sessionId;

  if (!sessions[sessionId]) {
    return res.status(404).json({ message: 'Session not found' });
  }

  const session = sessions[sessionId];
  res.json({ board: session.playerboard, attemptsLeft: session.maxAttempts - session.attempts, gameOver:session.gameOver });
};

const handleHit = (req, res) => {
  const { sessionId } = req.params;
  const { x, y } = req.body;  

  if (!sessions[sessionId]) {
    return res.status(404).json({ message: 'Session not found' });
  }

  const session = sessions[sessionId];

  if (session.gameOver) {
    return res.status(400).json({ message: 'Game over' });
  }

  const cellValue = session.board[x][y];  
  const isHit = cellValue !== null;

  if (isHit) {
    session.playerboard[x][y] = cellValue;  
    session.hits++; 
    if (session.hits === session.shipCounts.reduce((acc, count) => acc + count, 0)) {
      session.gameOver = true;
    }
  } else {
    session.playerboard[x][y] = 0;  
    session.attempts++;
  }

  if (session.attempts >= session.maxAttempts) {
    session.gameOver = true;
  }

  res.json({
    board: session.playerboard,  
    isHit,
    attemptsLeft: session.maxAttempts - session.attempts,
    gameOver: session.gameOver
  });
};

module.exports = { startGame, getBoard, handleHit };
