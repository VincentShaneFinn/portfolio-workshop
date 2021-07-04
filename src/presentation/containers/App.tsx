import React from 'react';
import { addOne } from '../../domain/workshop';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="images/logo.svg" className="App-logo" alt="logo" />
        <p>
          Add one to 1 number: {addOne(1)}
          Add one to 1 string: {addOne("1")}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
