import React from 'react';
import '../App/App.scss';
import { CellState, CellValue } from '../../Types';

interface BoardButtonProps {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
}

const BoardButton: React.FC<BoardButtonProps> = (props: BoardButtonProps) => {
  const renderContent = (): React.ReactNode => {
    if (props.state === CellState.opened) {
      if (props.value === CellValue.bomb) {
        return <span>💣</span>;
      } else if (props.value === CellValue.none) {
        return null;
      }
      return props.value;
    } else if (props.state === CellState.flagged) {
      return <span>🚩</span>;
    }
    return null;
  };

  return (
    <div
      className={`BoardButton 
      ${props.state === CellState.opened ? 'visible' : ''} 
      value-${props.value}`}
      onClick={props.onClick(props.row, props.col)}
      onContextMenu={props.onContext(props.row, props.col)}
    >
      {renderContent()}
    </div>
  );
};

export default BoardButton;
