import React, { useState } from 'react';
import '../App/App.scss';
import GameBody from '../GameBody';
import GameHeader from '../GameHeader';
import { generateCells } from '../../Utils';
import BoardButton from '../BoardButton';
import { MAX_COLS } from '../../Constants';

const Game: React.FC = () => {
  const [cells, setCells] = useState(generateCells);

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <BoardButton
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          state={cell.state}
          value={cell.value}
        />
      )),
    );
  };

  console.log('cells', cells);
  return (
    <div className="Game">
      <GameHeader></GameHeader>
      <GameBody cells={renderCells()}></GameBody>
    </div>
  );
};

export default Game;
