import React, { Component } from 'react';
import { Card } from '../../domain/kanbanBoard/card';
import { KanbanBoard as KanbanBoardEntity } from '../../domain/kanbanBoard/kanbanBoard';
import AddCard from './addCard';

export interface KanbanBoardState {
    board: KanbanBoardEntity;
}

class KanbanBoard extends Component {
    constructor(props?: any) {
        super(props);
        this.addCard = this.addCard.bind(this);
    }

    state: KanbanBoardState = {
        board: new KanbanBoardEntity()
    }

    addCard(card: Card) {
        this.state.board.addCard(card);
        this.setState(this.state);
    }

    getList() {
        return this.state.board.openList.map((card) =>
            <div key={card.title}>{card.title}</div>
        );
    }

    render() {
        return (
            <div className="KanbanBoard">
                <AddCard board={this.state.board} addCard = { this.addCard } />
                <div>
                    {this.getList()}
                </div>
            </div>
        )
    }
}

export default KanbanBoard;
