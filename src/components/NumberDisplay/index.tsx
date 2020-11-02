import React, { useState } from 'react';
import '../App/App.scss';

interface NumberDisplayProps {
  value: number;
}

const NumberDisplay: React.FC<NumberDisplayProps> = (
  props: NumberDisplayProps,
): React.ReactElement => {
  return <div className="NumberDisplay">{props.value.toString().padStart(3, '0')}</div>;
};

export default NumberDisplay;

/*const NumberDisplay: React.FC<NumberDisplayProps> = ({ value }) => {
  return (
    <div className="NumberDisplay">
      <text>{value.toString().padStart(3, '0')}</text>
    </div>
  );
};*/

/*function NumberDisplay(
  props: NumberDisplayProps,
): React.ReactElement {
  return (
    <div className="NumberDisplay">
      <text>{props.value.toString().padStart(3, '0')}</text>
    </div>
  );
}*/
