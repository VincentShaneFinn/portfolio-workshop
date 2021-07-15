import { Component } from "react";
import { ISocketInteractor } from "../../domain/interfaces/ISocketInteractor";
import { LandingPage } from "./landing-page";
import './strategery.scss';

export interface StrategeryProps {
    setAppHeaderIsHidden: (value: boolean) => void,
    socketInteractor: ISocketInteractor,
}

export class Strategery extends Component<StrategeryProps> {
    constructor(props: StrategeryProps) {
        super(props);
        this.updateMainContainer = this.updateMainContainer.bind(this);
    }

    state = {
        currentPage: <LandingPage socketInteractor={this.props.socketInteractor} updateMainContainer={this.updateMainContainer.bind(this)}/>
    }

    componentDidMount() {
        this.props.setAppHeaderIsHidden(true);
    }
    
    componentWillUnmount() {
        this.props.setAppHeaderIsHidden(false);
    }
    
    updateMainContainer(element: JSX.Element) {
        this.setState({ currentPage: element});
    }

    render() {
        return (
            <div id="strategery">
                <div id="page-title" className="app-header">Strategery</div>
                <div id="main-container">
                    {this.state.currentPage}
                </div>
            </div>
        )
    }
}