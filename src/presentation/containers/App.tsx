import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.scss';
import { Chat } from './chat/chat';
import GameOfLife from './game-of-life';
import KanbanBoard from './kanban-board';
import Main from './main';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <header className="App-header">
              <Link to="/">Portfolio Workshop</Link>
          </header>
          <Route exact path="/" component={Main} />
          <Route exact path="/KanbanBoard" component={KanbanBoard} />
          <Route exact path="/GameOfLife" component={GameOfLife} />
          <Route exact path="/Chat" component={Chat} />
        </Router>
      </div>
    )
  }
}

export default App;
