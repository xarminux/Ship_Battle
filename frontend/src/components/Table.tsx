import React from 'react';
import Cell from './Cell';

interface TableProps {
  board: (number | null)[][];
  onClick: (x: number, y: number) => void;
}

const Table: React.FC<TableProps> = ({ board, onClick }) => {
  const getCellClass = (value: number | null) => {
    if (value === null) {
      return 'water';
    }
    return `ship-${value}`;
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              x={rowIndex}
              y={colIndex}
              value={cell}
              onClick={onClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
