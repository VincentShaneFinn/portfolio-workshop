import { Component } from "react";
import { ISocketInteractor } from "../../domain/interfaces/ISocketInteractor";

export interface LobbyProps {
    socketInteractor: ISocketInteractor,
    playerName: string
}

export class Lobby extends Component<LobbyProps> {
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

        this.props.socketInteractor.emit("joined-lobby");
    }

    renderPlayers(): Array<JSX.Element> {
        let playerSpans: Array<JSX.Element> = [];
        this.state.players.forEach(playerName => {
            playerSpans.push(<span className="player-name" key={playerName}>{playerName}</span>);
        });
        return playerSpans;
    }

    renderStartGameBtn() {
        if (this.props.playerName === this.state.host) return <button id="start-game-btn" className="btn btn-primary">Start Game</button>
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