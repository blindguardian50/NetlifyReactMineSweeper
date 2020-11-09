import React from 'react';
import '../App/App.scss';
import NumberDisplay from '../NumberDisplay';
import Face from '../Face';
import { FaceType } from '../../Types';

interface GameHeaderProps {
  face: FaceType;
  time: number;
  onFaceClick: () => void;
  bombsLeft: number;
}

const GameHeader: React.FC<GameHeaderProps> = (props: GameHeaderProps) => {
  return (
    <div className="GameHeader">
      <NumberDisplay value={props.bombsLeft} />
      <Face face={props.face} onFaceClick={props.onFaceClick}></Face>
      <NumberDisplay value={props.time} />
    </div>
  );
};

export default GameHeader;
