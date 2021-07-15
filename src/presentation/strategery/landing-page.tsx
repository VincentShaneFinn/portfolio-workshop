import { Component } from "react";
import { ISocketInteractor } from "../../domain/interfaces/ISocketInteractor";
import { Lobby } from "./lobby";
import './strategery.scss';

export interface LandingPageProps {
    socketInteractor: ISocketInteractor,
    updateMainContainer: (element: JSX.Element) => void
}

export class LandingPage extends Component<LandingPageProps> {
    constructor(props: LandingPageProps) {
        super(props);
        this.onHostGameClicked = this.onHostGameClicked.bind(this);
    }

    onHostGameClicked() {
        let _this = this;

        this.props.socketInteractor.connect(() => {
            _this.props.socketInteractor.on("host-game-confirmed", () => {
                _this.props.updateMainContainer(<Lobby />)
            })
            _this.props.socketInteractor.emit("host-game")
        });
    }

    render() {
        return (
            <div id="landing-page">
                <button id="host-game-btn" onClick={this.onHostGameClicked}>Host Game</button>
            </div>
        )
    }
}