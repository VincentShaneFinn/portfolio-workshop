import { Component } from "react";
import { Link } from "react-router-dom";

class Main extends Component {
    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card bg-dark">
                                <h5 className="card-header">Conway's game of life</h5>
                                <div className="card-body">
                                    <p className="card-text">Simple render of Conway's game of life</p>
                                    <Link to="/gameoflife" className="btn btn-primary">Click here</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-dark">
                                <h5 className="card-header">Kanban Board</h5>
                                <div className="card-body">
                                    <p className="card-text">Add stories to an open board, and close them when done</p>
                                    <Link to="/kanbanboard" className="btn btn-primary">Click here</Link>
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
