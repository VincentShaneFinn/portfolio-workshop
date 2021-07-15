import { Component } from "react";
import './strategery.scss';

export interface LandingPageProps {
    setAppHeaderIsHidden: any
}

export class LandingPage extends Component<LandingPageProps> {    
    componentDidMount() {
        this.props.setAppHeaderIsHidden(true);
    }

    componentWillUnmount() {
        this.props.setAppHeaderIsHidden(false);
    }

    render() {
        return (
            <div id="landing-page">
                <div id="page-title" className="app-header">Strategery</div>
            </div>
        )
    }
}