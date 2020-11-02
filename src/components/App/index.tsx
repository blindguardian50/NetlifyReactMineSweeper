import React from 'react';
import './App.scss';
import Game from '../Game';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Game></Game>
      </div>
    );
  }
}

export default App;
