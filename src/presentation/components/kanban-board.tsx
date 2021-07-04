import React, { Component } from 'react';
import './kanban-board.scss';

interface KanbanBoardProps {
    cardTitle: string,
    cards: Array<string>
}

class KanbanBoard extends Component<{}, KanbanBoardProps> {
    constructor(props?: any) {
        super(props);
        this.addCard = this.addCard.bind(this);
    }

    state = {
        cardTitle: "",
        cards: []
    };

    addCard() {
        this.setState(prevState => ({
            cards: [...prevState.cards, prevState.cardTitle]
        }));
    }

    getCards() {
        return this.state.cards.map((cardTitle) =>
            <div className="kanban-card" key={cardTitle}>
                <div className="kanban-card-title">{cardTitle}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="kanban-board container">
                <div className="add-kanban-card">
                    <div className="form-group">
                        <label className="kanban-card-title-label w-100">
                            Title<br />
                            <input className="kanban-card-title-input form-control" onChange={event => this.setState({ cardTitle: event.target.value })}></input>
                        </label>
                    </div>
                    <br />
                    <button className="btn btn-primary add-kanban-card-btn" onClick={this.addCard}>Add Card</button>
                </div>
                <div>
                    {this.getCards()}
                </div>
            </div>
        )
    }
}

export default KanbanBoard;
