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
        state: CellState.opened,
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
  const topLeftCell = rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1] : null;
  const topCell = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null;
  const topRightCell =
    rowIndex > 0 && colIndex < MAX_COLS - 1 ? cells[rowIndex - 1][colIndex + 1] : null;
  const leftCell = colIndex > 0 ? cells[rowIndex][colIndex - 1] : null;
  const rightCell = colIndex < MAX_COLS - 1 ? cells[rowIndex][colIndex + 1] : null;
  const bottomLeftCell =
    rowIndex < MAX_ROWS - 1 && colIndex > 0 ? cells[rowIndex + 1][colIndex + 1] : null;
  const bottomCell = rowIndex < MAX_ROWS - 1 ? cells[rowIndex + 1][colIndex] : null;
  const bottomRightCell =
    rowIndex < MAX_ROWS - 1 && colIndex < MAX_COLS - 1 ? cells[rowIndex + 1][colIndex - 1] : null;

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
