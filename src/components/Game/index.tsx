import React, { useEffect, useState } from 'react';
import '../App/App.scss';
import GameBody from '../GameBody';
import GameHeader from '../GameHeader';
import { generateCells, openCells, openField } from '../../Utils';
import BoardButton from '../BoardButton';
import { Cell, CellState, CellValue, FaceType } from '../../Types';
import { MAX_COLS, MAX_ROWS, NUMBER_OF_BOMBS } from '../../Constants';

const Game: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<FaceType>(FaceType.chilled);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [lost, setLost] = useState<boolean>(false);
  const [bombsLeft, setBombsLeft] = useState<number>(NUMBER_OF_BOMBS);

  useEffect(() => {
    const handleMouseDown = (): void => {
      if (!won && !lost) {
        setFace(FaceType.excited);
      }
    };
    const handleMouseUp = (): void => {
      if (!won && !lost) {
        setFace(FaceType.chilled);
      }
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });

  const handleCellClick = (rowParameter: number, colParameter: number) => (): void => {
    let newCells = cells.slice();
    if (won || lost) {
      return;
    }
    if (!live) {
      setLive(true);

      while (newCells[rowParameter][colParameter].value !== CellValue.none) {
        newCells = generateCells();
      }
      setCells(newCells);
    }

    const currentCell = newCells[rowParameter][colParameter];
    if ([CellState.flagged, CellState.opened].includes(currentCell.state)) {
      return;
    }

    if (currentCell.state === CellState.closed) {
      if (currentCell.value === CellValue.bomb) {
        setFace(FaceType.dead);
        setLive(false);
        setCells(openCells(cells));
        setLost(true);
      } else if (currentCell.value === CellValue.none) {
        console.log(rowParameter, colParameter);
        newCells = openField(newCells, rowParameter, colParameter);
      } else {
        newCells[rowParameter][colParameter].state = CellState.opened;
      }
    }

    setCells(newCells);

    checkGameWon(newCells);
  };

  const handleCellContext = (rowParameter: number, colParameter: number) => (
    e: React.MouseEvent<HTMLDivElement>,
  ): void => {
    e.preventDefault();
    if (live) {
      if (
        cells[rowParameter][colParameter].state !== CellState.flagged &&
        cells[rowParameter][colParameter].state !== CellState.opened &&
        bombsLeft > 0
      ) {
        cells[rowParameter][colParameter].state = CellState.flagged;
        setBombsLeft(bombsLeft - 1);
      } else if (cells[rowParameter][colParameter].state === CellState.flagged) {
        cells[rowParameter][colParameter].state = CellState.closed;
        setBombsLeft(bombsLeft + 1);
      }
    }
  };

  const onFaceClick = () => {
    setLive(false);
    setTime(0);
    setCells(generateCells);
    setWon(false);
    setLost(false);
    setFace(FaceType.chilled);
  };

  useEffect(() => {
    if (live) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <BoardButton
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          state={cell.state}
          value={cell.value}
          onClick={handleCellClick}
          onContext={handleCellContext}
        />
      )),
    );
  };

  const checkGameWon = (cells: Cell[][]): Cell[][] => {
    let newCells = cells.slice();
    let counter = 0;
    for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
      for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
        if (
          newCells[rowIndex][colIndex].state === CellState.flagged ||
          newCells[rowIndex][colIndex].state === CellState.closed
        ) {
          counter = counter + 1;
        }
      }
    }

    if (counter == NUMBER_OF_BOMBS) {
      setFace(FaceType.victory);
      newCells = openCells(newCells);
      setWon(true);
      setLive(false);
    }
    return newCells;
  };

  console.log('cells', cells);
  return (
    <div className="Game">
      <GameHeader
        face={face}
        time={time}
        onFaceClick={onFaceClick}
        bombsLeft={bombsLeft}
      ></GameHeader>
      <GameBody cells={renderCells()}></GameBody>
    </div>
  );
};

export default Game;
