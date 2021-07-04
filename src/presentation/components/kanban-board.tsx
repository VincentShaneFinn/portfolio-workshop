import React, { Component } from 'react';
import './kanban-board.css';

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
                <div className="kanban-card-title">{ cardTitle }</div>
            </div>
        );
    }

    render() {
        return (
            <div className="kanban-board">
                <div className="add-kanban-card">
                    <label className="kanban-card-title-label">
                        Title<br />
                        <input className="kanban-card-title-input" onChange={ event => this.setState({cardTitle: event.target.value })}></input>
                    </label>
                    <button className="add-kanban-card-btn" onClick={ this.addCard }>Add Card</button>
                </div>
                <div>
                    { this.getCards() }
                </div>
            </div>
        )
    }
}

export default KanbanBoard;
