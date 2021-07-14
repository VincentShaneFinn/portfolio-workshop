import { Component } from "react";
import { World } from "../../domain/game_of_life/world";
import "./game-of-life.scss";

interface GameOfLifeState {
    world: World
}

class GameOfLife extends Component<{}, GameOfLifeState> {
    private altState = false;

    constructor(props?: any) {
        super(props);
        this.tick = this.tick.bind(this);
        this.toggleStart = this.toggleStart.bind(this);
    }

    state = {
        world: World.glider()
    }

    tick() {
        this.state.world.tick();
        this.setState(prevState => ({ world: prevState.world }));
    }

    toggleStart() {
        this.setState(({ world: this.altState ? World.glider() : World.infiniteGrowth() }));
        this.altState = !this.altState;
    }

    renderCells(): JSX.Element[] {
        const rows = [];

        for (let y = 10; y >= -10; y--) {
            let row = [];
            for (let x = -10; x <= 10; x++) {
                let isAliveClass = this.state.world.coordinateAt(x, y) ? "alive" : "";
                row.push(<div key={x} className={"game-of-life-cell " + isAliveClass}></div>)
            }
            rows.push(<div key={y} className="game-of-life-row">{row}</div>)
        }

        return rows;
    }

    render() {
        return (
            <div className="game-of-life container">
                <div className="world">
                    {this.renderCells()}
                </div>
                <br />
                <div className="control-buttons">
                    <div className="btn btn-primary tick-btn" onClick={this.tick}>Tick</div>
                    <div className="btn btn-primary tick-btn" onClick={this.toggleStart}>Toggle Start</div>
                </div>
            </div>
        )
    }
}

export default GameOfLife;
