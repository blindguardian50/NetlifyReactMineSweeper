import React from 'react';
import '../App/App.scss';
import { FaceType } from '../../Types';

interface GameHeaderProps {
  face: FaceType;
  onFaceClick: () => void;
}

const Face: React.FC<GameHeaderProps> = (props: GameHeaderProps) => {
  return (
    <div className="Face" onClick={props.onFaceClick}>
      <span>{props.face}</span>
    </div>
  );
};

export default Face;
