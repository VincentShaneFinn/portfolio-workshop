import { Coordinate } from "./coordinate";

export class World {
    private coordinates: Array<Coordinate>;

    constructor() {
        this.coordinates = new Array<Coordinate>();
    }

    tick(): void {
        let newCoordinates = new Array<Coordinate>();
        this.coordinates.forEach(coordinate => {
            let neighbours = this.getNeighbours(coordinate);
            if (neighbours.length === 2 || neighbours.length === 3) this._addCoordinate(coordinate, newCoordinates);
            
            for (let i = coordinate.x - 1; i <= coordinate.x + 1; i++) {
                for (let j = coordinate.y - 1; j <= coordinate.y + 1; j++) {
                    if (!this.coordinateAt(i, j)) {
                        let deadCoordinate = new Coordinate(i, j);
                        let deadCoordinateNeighbours = this.getNeighbours(deadCoordinate);
                        if (deadCoordinateNeighbours.length === 3) this._addCoordinate(deadCoordinate, newCoordinates);
                    }
                }
            }
        });
        this.coordinates = newCoordinates;
    }

    getNeighbours(coordinate: Coordinate): Array<Coordinate> {
        return this.coordinates.filter(potentialNeighbour => {
            var xWithin1 = Math.abs(coordinate.x - potentialNeighbour.x) <= 1;
            var yWithin1 = Math.abs(coordinate.y - potentialNeighbour.y) <= 1;
            var isItself = coordinate.x == potentialNeighbour.x && coordinate.y == potentialNeighbour.y;
            return xWithin1 && yWithin1 && !isItself;
        });
    }

    addCoordinate(coordinate: Coordinate) {
        this._addCoordinate(coordinate, this.coordinates);
    }

    coordinateAt(x: number, y: number): Coordinate | null {
        return this._coordinateAt(x,y, this.coordinates);
    }

    private _addCoordinate(coordinate: Coordinate, coordinates: Array<Coordinate>) {
        if(!this._coordinateAt(coordinate.x, coordinate.y, coordinates))
        coordinates.push(coordinate);
    }

    private _coordinateAt(x: number, y: number, coordinates: Array<Coordinate>): Coordinate | null {
        let foundCoordinates = coordinates.filter(coordinate => coordinate.x === x && coordinate.y === y);
        if (foundCoordinates.length >= 1) return foundCoordinates[0];
        return null;
    }

    static empty(): World {
        return new World();
    }

}