import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { SocketInteractor } from '../domain/interactors/SocketInteractor';
import './App.scss';
import { Chat } from './chat/chat';
import GameOfLife from './game-of-life';
import KanbanBoard from './kanban-board';
import Main from './main';
import { Strategery } from './strategery/strategery';

class App extends Component {
  constructor(props: never) {
    super(props);
    this.setAppHeaderIsHidden = this.setAppHeaderIsHidden.bind(this);
  }

  state = {
    appHeaderIsHidden: false,
    socketInteractor: new SocketInteractor(),
  }

  setAppHeaderIsHidden(value: boolean) {
    this.setState({ appHeaderIsHidden: value });
  }

  renderHeader() {
    if (!this.state.appHeaderIsHidden) {
      return (<header id="app-header" className="app-header"><Link to="/">Portfolio Workshop</Link></header>);
    }
    return null;
  }

  render() {
    return (
      <Router>
        {this.renderHeader()}
        <Route exact path="/" component={Main} />
        <Route exact path="/KanbanBoard" component={KanbanBoard} />
        <Route exact path="/GameOfLife" component={GameOfLife} />
        <Route exact path="/Chat" component={Chat} />
        <Route exact path="/TicTacToe" render={(_) => (<Strategery setAppHeaderIsHidden={this.setAppHeaderIsHidden} socketInteractor={ this.state.socketInteractor } />)} />
      </Router>
    )
  }
}

export default App;
