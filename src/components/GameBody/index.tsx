import React, { ReactNode } from 'react';
import '../App/App.scss';

interface GameBodyProps {
  cells: ReactNode;
}

const GameBody: React.FC<GameBodyProps> = (props: GameBodyProps) => {
  return <div className="GameBody">{props.cells}</div>;
};

export default GameBody;
