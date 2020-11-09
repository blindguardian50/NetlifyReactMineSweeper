export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}

export enum CellState {
  closed,
  opened,
  flagged,
}

export type Cell = {
  value: CellValue;
  state: CellState;
};

export enum FaceType {
  chilled = '😁',
  excited = '🤓',
  victory = '🤑',
  dead = '🤯',
}
