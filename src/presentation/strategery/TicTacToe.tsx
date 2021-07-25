import { Component } from "react";
import { ISocketInteractor } from "../../domain/interfaces/ISocketInteractor";

export interface TicTacToeProps {
    socketInteractor: ISocketInteractor,
    playerName: string
}

export interface TicTacToeState {
    board: Record<number, Record<number, string>>,
    currentPlayer: string
}

export interface TurnData {
    board: Record<number, Record<number, string>>,
    currentPlayer: string
}

export class TicTacToe extends Component<TicTacToeProps, TicTacToeState> {
    constructor(props: TicTacToeProps) {
        super(props);

        this.selectTile = this.selectTile.bind(this);
    }
    
    state = {
        board: {},
        currentPlayer: ""
    }

    componentDidMount() {
        let _this = this;
        this.props.socketInteractor.on("tic-tac-toe-turn", (data: TurnData) => {
            _this.setState({ board: data.board, currentPlayer: data.currentPlayer });
        });
        this.props.socketInteractor.on("game-end", (data: any) => {
            alert(data.winningPlayer + " won the game!");
            window.location.href = "/";
        })
        this.props.socketInteractor.emit("loaded-game");
    }

    renderBoard() {
        let items = [];
        for (const [rowIndex, rowColumn] of Object.entries(this.state.board)) {
            let innerItems = [];
            for (const [columnIndex, character] of Object.entries(rowColumn as Record<number, string>)) {
                innerItems.push(<div className='tic-tac-toe-item' key={columnIndex} onClick={() => this.selectTile(columnIndex, rowIndex)}>{ character }</div>);
            }
            items.push(<div className='board-row' key={rowIndex}>{ innerItems }</div>);
        }
        return items;
    }

    selectTile(x: string, y: string): void {
        if(this.state.currentPlayer !== this.props.playerName) return;

        this.props.socketInteractor.emit("select-tile", { playerName: this.props.playerName, x: x, y: y});
    }

    render() {
        return (
            <div id="tic-tac-toe">
                <h2>Current Player: {this.state.currentPlayer}</h2>
                <div id="board">
                    { this.renderBoard() }
                </div>
            </div>
        )
    }
}