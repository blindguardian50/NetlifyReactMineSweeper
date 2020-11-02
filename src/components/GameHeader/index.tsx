import React from 'react';
import '../App/App.scss';
import NumberDisplay from '../NumberDisplay';
import Face from '../Face';

const GameHeader: React.FC = () => {
  return (
    <div className="GameHeader">
      <NumberDisplay value={0} />
      <Face></Face>
      <NumberDisplay value={99} />
    </div>
  );
};

export default GameHeader;
