import React from 'react';
import './Cell.css';

interface CellProps {
  x: number;
  y: number;
  value: number | null;
  onClick: (x: number, y: number) => void;
}

const Cell: React.FC<CellProps> = ({ x, y, value, onClick }) => {
  const getCellClass = () => {
    if (value === null) {
      return 'water';
    } else if (value === 0) {
      return 'miss';
    } else {
      return `ship-${value}`;
    }
  };

  const handleClick = () => {
    if (value === null) {
      onClick(x, y);
    }
  };

  return (
    <div
      className={`cell ${getCellClass()}`}
      onClick={handleClick}
      style={{ pointerEvents: value !== null ? 'none' : 'auto' }}
    >
    </div>
  );
};

export default Cell;
