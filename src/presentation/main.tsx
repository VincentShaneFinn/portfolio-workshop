import { Component } from "react";
import { Link } from "react-router-dom";

class Main extends Component {
    render() {
        return (
            <div className="App">
                <div id="main-container" className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <h5 className="card-header">Kanban Board</h5>
                                <div className="card-body">
                                    <p className="card-text">Add stories to an open board, and close them when done</p>
                                    <Link to="/kanbanboard" className="btn btn-dark">Click here</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <h5 className="card-header">Conway's game of life</h5>
                                <div className="card-body">
                                    <p className="card-text">Simple render of Conway's game of life</p>
                                    <Link to="/gameoflife" className="btn btn-dark">Click here</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <h5 className="card-header">Chat</h5>
                                <div className="card-body">
                                    <p className="card-text">A spike to learn about sockets witha basic chat application</p>
                                    <Link to="/chat" className="btn btn-dark">Click here</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <h5 className="card-header">Strategery</h5>
                                <div className="card-body">
                                    <p className="card-text">A "risk" like turnbased strategy game based on the iOS game of the same name</p>
                                    <Link to="/strategery" className="btn btn-dark">Click here</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
