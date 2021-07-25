import { Component } from "react";
import { ISocketInteractor } from "../../domain/interfaces/ISocketInteractor";
import { TicTacToe } from "./TicTacToe";

export interface LobbyProps {
    socketInteractor: ISocketInteractor,
    playerName: string,
    setCurrentPage: (page: JSX.Element) => void
}

export class Lobby extends Component<LobbyProps> {
    constructor(props: LobbyProps) {
        super(props);

        this.startGame = this.startGame.bind(this);
    }

    state = {
        players: [] as Array<string>,
        host: "",
    }

    componentDidMount() {
        let _this = this;
        this.props.socketInteractor.on("players-changed", (players: Array<string>) => {
            _this.setState({ players });
        });
        this.props.socketInteractor.on("host-changed", (playerName: string) => {
            _this.setState({ host: playerName });
        });
        this.props.socketInteractor.on("load-game", () => {
            _this.props.setCurrentPage(<TicTacToe socketInteractor={this.props.socketInteractor} playerName={this.props.playerName}/>)
        })
        this.props.socketInteractor.emit("joined-lobby");
    }

    renderPlayers(): Array<JSX.Element> {
        let playerSpans: Array<JSX.Element> = [];
        this.state.players.forEach(playerName => {
            playerSpans.push(<span className="player-name" key={playerName}>{playerName}</span>);
        });
        return playerSpans;
    }

    startGame() {
        this.props.socketInteractor.emit("start-game");
    }

    renderStartGameBtn() {
        if (this.props.playerName === this.state.host) return <button id="start-game-btn" className="btn btn-primary" onClick={this.startGame}>Start Game</button>
        return null;
    }

    render() {
        return (
            <div id="lobby">
                <div className="row">
                    <div className="col"><h1>Lobby</h1></div>
                    <div className="col text-end align-self-center">{this.renderStartGameBtn()}</div>
                </div>
                <hr />
                <div id="player-list">
                    <h3>Players</h3>
                    {this.renderPlayers()}
                </div>
            </div>
        )
    }
}