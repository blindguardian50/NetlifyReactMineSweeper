import { MAX_COLS, MAX_ROWS, NUMBER_OF_BOMBS } from '../Constants';
import { Cell, CellState, CellValue } from '../Types';

export const generateCells = (): Array<Array<Cell>> => {
  let cells: Array<Array<Cell>> = [];

  cells = initCells(cells);
  cells = placeBombs(cells);
  cells = calculateNumbers(cells);

  return cells;
};

function initCells(cells: Array<Array<Cell>>): Array<Array<Cell>> {
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.closed,
      });
    }
  }
  return cells;
}

function placeBombs(cells: Array<Array<Cell>>): Array<Array<Cell>> {
  let bombsPlaced = 0;
  while (bombsPlaced < NUMBER_OF_BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS);
    const randomCol = Math.floor(Math.random() * MAX_COLS);
    const currentCell = cells[randomRow][randomCol];

    if (currentCell.value !== CellValue.bomb) {
      cells = cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === randomRow && colIndex === randomCol) {
            return {
              ...cell,
              value: CellValue.bomb,
            };
          }
          return cell;
        }),
      );
      bombsPlaced++;
    }
  }
  return cells;
}

function calculateNumbers(cells: Array<Array<Cell>>): Array<Array<Cell>> {
  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
      const currentCell = cells[rowIndex][colIndex];
      if (currentCell.value === CellValue.bomb) {
        continue;
      }
      cells = calculateNumber(cells, rowIndex, colIndex);
    }
  }
  return cells;
}

function calculateNumber(
  cells: Array<Array<Cell>>,
  rowIndex: number,
  colIndex: number,
): Array<Array<Cell>> {
  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  } = grabNeighbors(cells, rowIndex, colIndex);

  let counter = 0;

  if (topLeftCell?.value === CellValue.bomb) {
    counter++;
  }
  if (topCell?.value === CellValue.bomb) {
    counter++;
  }
  if (topRightCell?.value === CellValue.bomb) {
    counter++;
  }
  if (leftCell?.value === CellValue.bomb) {
    counter++;
  }
  if (rightCell?.value === CellValue.bomb) {
    counter++;
  }
  if (bottomLeftCell?.value === CellValue.bomb) {
    counter++;
  }
  if (bottomCell?.value === CellValue.bomb) {
    counter++;
  }
  if (bottomRightCell?.value === CellValue.bomb) {
    counter++;
  }

  cells[rowIndex][colIndex].value = counter;

  return cells;
}

export const openCells = (cells: Array<Array<Cell>>): Array<Array<Cell>> => {
  const newCells = cells.slice();
  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
      newCells[rowIndex][colIndex].state = CellState.opened;
    }
  }
  return newCells;
};

export const openField = (
  cells: Array<Array<Cell>>,
  rowIndex: number,
  colIndex: number,
): Array<Array<Cell>> => {
  const currentCell = cells[rowIndex][colIndex];

  if (currentCell.state === CellState.opened || currentCell.state === CellState.flagged) {
    return cells;
  }

  let newCells = cells.slice();
  newCells[rowIndex][colIndex].state = CellState.opened;

  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  } = grabNeighbors(cells, rowIndex, colIndex);

  if (topLeftCell?.state === CellState.closed && topLeftCell.value !== CellValue.bomb) {
    if (topLeftCell.value === CellValue.none) {
      newCells = openField(newCells, rowIndex - 1, colIndex - 1);
    } else {
      newCells[rowIndex - 1][colIndex - 1].state = CellState.opened;
    }
  }

  if (topCell?.state === CellState.closed && topCell.value !== CellValue.bomb) {
    if (topCell.value === CellValue.none) {
      newCells = openField(newCells, rowIndex - 1, colIndex);
    } else {
      newCells[rowIndex - 1][colIndex].state = CellState.opened;
    }
  }

  if (topRightCell?.state === CellState.closed && topRightCell.value !== CellValue.bomb) {
    if (topRightCell.value === CellValue.none) {
      newCells = openField(newCells, rowIndex - 1, colIndex + 1);
    } else {
      newCells[rowIndex - 1][colIndex + 1].state = CellState.opened;
    }
  }

  if (leftCell?.state === CellState.closed && leftCell.value !== CellValue.bomb) {
    if (leftCell.value === CellValue.none) {
      newCells = openField(newCells, rowIndex, colIndex - 1);
    } else {
      newCells[rowIndex][colIndex - 1].state = CellState.opened;
    }
  }

  if (rightCell?.state === CellState.closed && rightCell.value !== CellValue.bomb) {
    if (rightCell.value === CellValue.none) {
      newCells = openField(newCells, rowIndex, colIndex + 1);
    } else {
      newCells[rowIndex][colIndex + 1].state = CellState.opened;
    }
  }

  if (bottomLeftCell?.state === CellState.closed && bottomLeftCell.value !== CellValue.bomb) {
    if (bottomLeftCell.value === CellValue.none) {
      newCells = openField(newCells, rowIndex + 1, colIndex - 1);
    } else {
      newCells[rowIndex + 1][colIndex - 1].state = CellState.opened;
    }
  }

  if (bottomCell?.state === CellState.closed && bottomCell.value !== CellValue.bomb) {
    if (bottomCell.value === CellValue.none) {
      newCells = openField(newCells, rowIndex + 1, colIndex);
    } else {
      newCells[rowIndex + 1][colIndex].state = CellState.opened;
    }
  }

  if (bottomRightCell?.state === CellState.closed && bottomRightCell.value !== CellValue.bomb) {
    if (bottomRightCell.value === CellValue.none) {
      newCells = openField(newCells, rowIndex + 1, colIndex + 1);
    } else {
      newCells[rowIndex + 1][colIndex + 1].state = CellState.opened;
    }
  }

  return newCells;
};

const grabNeighbors = (
  cells: Array<Array<Cell>>,
  rowIndex: number,
  colIndex: number,
): {
  topLeftCell: Cell | null;
  topCell: Cell | null;
  topRightCell: Cell | null;
  leftCell: Cell | null;
  rightCell: Cell | null;
  bottomLeftCell: Cell | null;
  bottomCell: Cell | null;
  bottomRightCell: Cell | null;
} => {
  const topLeftCell = rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1] : null;
  const topCell = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null;
  const topRightCell =
    rowIndex > 0 && colIndex < MAX_COLS - 1 ? cells[rowIndex - 1][colIndex + 1] : null;
  const leftCell = colIndex > 0 ? cells[rowIndex][colIndex - 1] : null;
  const rightCell = colIndex < MAX_COLS - 1 ? cells[rowIndex][colIndex + 1] : null;
  const bottomLeftCell =
    rowIndex < MAX_ROWS - 1 && colIndex > 0 ? cells[rowIndex + 1][colIndex - 1] : null;
  const bottomCell = rowIndex < MAX_ROWS - 1 ? cells[rowIndex + 1][colIndex] : null;
  const bottomRightCell =
    rowIndex < MAX_ROWS - 1 && colIndex < MAX_COLS - 1 ? cells[rowIndex + 1][colIndex + 1] : null;

  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  };
};
