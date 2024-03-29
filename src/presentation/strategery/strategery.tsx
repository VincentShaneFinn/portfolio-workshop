import { Component } from "react";
import { ISocketInteractor } from "../../domain/interfaces/ISocketInteractor";
import { LoadingScreen } from "./loading-screen";
import { Lobby } from "./lobby";
import './strategery.scss';

export interface StrategeryProps {
    setAppHeaderIsHidden: (value: boolean) => void,
    socketInteractor: ISocketInteractor,
}

export class Strategery extends Component<StrategeryProps> {
    state = {
        currentPage: <LoadingScreen />,
        playerName: "",
        host: ""
    }

    componentDidMount() {
        let _this = this;
        this.props.setAppHeaderIsHidden(true);
        this.props.socketInteractor.connect(() => {
            _this.props.socketInteractor.on("join-game", (playerName: string) => {
                this.setState({ playerName });
                this.setState({ currentPage: <Lobby socketInteractor={this.props.socketInteractor} playerName={this.state.playerName}/>});
            })
            _this.props.socketInteractor.on("host-changed", (playerName: string) => {
                _this.setState({ host: playerName });
            });
            _this.props.socketInteractor.emit("join-game");
        });
    }
    
    componentWillUnmount() {
        this.props.setAppHeaderIsHidden(false);
        this.props.socketInteractor.disconnect();
    }

    renderHostName() {
        if(this.state.playerName === this.state.host) return <span id="host-name">(Host)</span>
        return null;
    }

    render() {
        return (
            <div id="strategery">
                <div id="page-title" className="app-header">
                    <div className="row">
                        <div className="col">Strategery</div>
                        <div className="col text-end"><span id="player-name">{this.state.playerName}</span> { this.renderHostName() }</div>
                    </div>
                </div>
                <section id="strategery-main-container" className="container">
                    {this.state.currentPage}
                </section>
            </div>
        )
    }
}