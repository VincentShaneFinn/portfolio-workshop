import React, { Component } from 'react';
import { Card } from '../../domain/kanbanBoard/card';
import { KanbanBoard } from '../../domain/kanbanBoard/kanbanBoard';

export interface CardProps {
    board: KanbanBoard;
    addCard: (card: Card) => void
}

export interface CardState {
    cardTitle: string;
}

class AddCard extends Component<CardProps> {
    state: CardState = {
        cardTitle: ""
    }

    addCardToBoard(props: CardProps): void {
        props.addCard(new Card(this.state.cardTitle))
    }

    render() {
        return (
            <div className="Card">
                <label className="card-title-label">
                    Title
                    <input className="card-title-input" onChange={(event) => this.setState({ cardTitle:  event.target.value})}></input>
                </label>
                <button onClick={() => this.addCardToBoard(this.props)}>Add Card</button>
            </div>
        )
    }
}

export default AddCard;
