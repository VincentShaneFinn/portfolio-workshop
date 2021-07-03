import React from 'react';
import { addOne } from '../../domain/workshop';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="images/logo.svg" className="App-logo" alt="logo" />
        <p>
          Add one to 1: {addOne(1)}
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
