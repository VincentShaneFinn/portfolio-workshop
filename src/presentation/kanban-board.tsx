import React, { Component } from 'react';
import './kanban-board.scss';

interface KanbanBoardState {
    cardTitle: string,
    openList: Array<string>,
    closedList: Array<string>
}

class KanbanBoard extends Component<{}, KanbanBoardState> {
    constructor(props?: any) {
        super(props);
        this.addCard = this.addCard.bind(this);
        this.moveCard = this.moveCard.bind(this);
    }

    state = {
        cardTitle: "",
        openList: [] as Array<string>,
        closedList: [] as Array<string>
    };

    //#region Card creation and movement

    addCard() {
        this.setState(prevState => ({
            openList: [...prevState.openList, prevState.cardTitle]
        }));
    }

    moveCard(index: number) {
        let closedCard = this.state.openList[index];
        let newOpenCards = this.state.openList.filter((_, i) => i !== index);

        this.setState(prevState => ({
            openList: newOpenCards,
            closedList: [...prevState.closedList, closedCard]
        }));
    }

    //#endregion

    //#region Rendering helpers

    renderList(list: Array<string>, hasCloseButton: boolean) {
        let _this = this;
        function conditionallyDrawCloseBtn(index: number) {
            if (hasCloseButton) {
                return (
                    <div>
                        <br />
                        <button className="btn btn-primary close-kanban-card-btn" onClick={() => _this.moveCard(index)}>Close</button>
                    </div>
                )
            }
        }

        return list.map((cardTitle, index) =>
            <div className="kanban-card" key={cardTitle}>
                <div className="kanban-card-title">{cardTitle}</div>
                {conditionallyDrawCloseBtn(index)}
            </div>
        );
    }

    renderAddCard() {
        return (
            <div className="add-kanban-card">
                <div className="form-group">
                    <label className="kanban-card-title-label w-100">
                        Title<br />
                        <input className="kanban-card-title-input form-control"
                            onChange={event => this.setState({ cardTitle: event.target.value })}
                            onKeyPress={event => { if (event.key === "Enter") this.addCard(); }} ></input>
                    </label>
                </div>
                <br />
                <button className="btn btn-primary add-kanban-card-btn" onClick={this.addCard}>Add Card</button>
            </div>
        )
    }

    //#endregion

    render() {
        return (
            <div className="kanban-board container">
                {this.renderAddCard()}
                <br />
                <div className="row kanban-lists">
                    <div className="col-6">
                        <div className="border">
                            <h3>Open</h3>
                            <div className="open-list">
                                {this.renderList(this.state.openList, true)}
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="border">
                            <h3>Closed</h3>
                            <div className="closed-list">
                                {this.renderList(this.state.closedList, false)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default KanbanBoard;
