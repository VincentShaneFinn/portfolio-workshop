import React, { Component } from 'react';
import { Card as CardEntity } from '../../domain/kanbanBoard/card';
import { KanbanBoard } from '../../domain/kanbanBoard/kanbanBoard';

export interface CardProps {
    board: KanbanBoard;
}

export interface CardState {
    cardTitle: string;
}

class Card extends Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
    }

    state: CardState = {
        cardTitle: ""
    }

    addCardToBoard(props: CardProps): void {
        props.board.addCard(new CardEntity(this.state.cardTitle))
    }

    render() {
        return (
            <div className="Card">
                <label className="card-title-label">
                    Title
                    <input className="card-title-input" onChange={(event) => this.state.cardTitle = event.target.value}></input>
                </label>
                <button onClick={() => this.addCardToBoard(this.props)}>Add Card</button>
            </div>
        )
    }
}

export default Card;
