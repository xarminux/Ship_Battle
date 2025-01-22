// Laivų tipai dydžiai ir kiekiai
const shipTypes = [
  { id: 1, size: 1, count: 3 },
  { id: 2, size: 2, count: 3 },
  { id: 3, size: 3, count: 2 },
  { id: 4, size: 4, count: 1 },
  { id: 5, size: 5, count: 1 }
];

const MAX_ATTEMPTS = 1000;

// Sugeneruojame lauką su laivais
const getBattleField = () => {
  let battleField = Array(10).fill(null).map(() => Array(10).fill(null));
  let attempts = 0;

  for (let ship of shipTypes) {
    for (let i = 0; i < ship.count; i++) {
      attempts = 0;
      while (true) {
        attempts++;
        if (attempts > MAX_ATTEMPTS) {
          console.warn("Maksimalus bandymų skaičius viršytas, perkuriama lenta.");
          return getBattleField(); 
        }

        const start = getRandomCoordinate();
        const directions = shuffleArray([0, 1, 2, 3]); 

        for (let direction of directions) {
          if (canPlaceShip(start, ship.size, direction, battleField)) {
            battleField = placeShipOnBoard(start, ship.size, direction, ship.id, battleField);
            break;
          }
        }

        if (battleField.flat().filter(cell => cell === ship.id).length === ship.size * (i + 1)) {
          break;
        }
      }
    }
  }

  return battleField;
};

// Patikrina, ar galima pastatyti laivą tam tikroje pozicijoje
const canPlaceShip = (start, size, direction, battleField) => {
  const [x, y] = start;

  for (let i = 0; i < size; i++) {
    const nx = x + (direction === 1 ? i : direction === 3 ? -i : 0);
    const ny = y + (direction === 0 ? i : direction === 2 ? -i : 0);

    if (
      nx < 0 || nx >= 10 || ny < 0 || ny >= 10 ||
      battleField[nx][ny] !== null ||
      !surroundingCellsAreFree(battleField, nx, ny)
    ) {
      return false;
    }
  }
  return true;
};

// Pastato laivą ant lentos
const placeShipOnBoard = (start, size, direction, shipId, battleField) => {
  const [x, y] = start;

  for (let i = 0; i < size; i++) {
    const nx = x + (direction === 1 ? i : direction === 3 ? -i : 0);
    const ny = y + (direction === 0 ? i : direction === 2 ? -i : 0);
    battleField[nx][ny] = shipId;
  }

  return battleField;
};

// Patikrina, ar aplinkiniai langeliai yra laisvi
const surroundingCellsAreFree = (battleField, x, y) => {
  const directions = [
    [1, 0], [0, 1], [-1, 0], [0, -1], 
    [1, 1], [-1, -1], [-1, 1], [1, -1] 
  ];

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10 && battleField[nx][ny] !== null) {
      return false;
    }
  }
  return true;
};

const getRandomCoordinate = () => {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

module.exports = { getBattleField };
