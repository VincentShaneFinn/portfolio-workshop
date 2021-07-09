import { defineFeature, loadFeature } from "jest-cucumber";
import { Coordinate } from "../../domain/game_of_life/coordinate";
import { World } from "../../domain/game_of_life/world";

const feature = loadFeature('src/__tests__/features/game-of-life.feature');

defineFeature(feature, test => {
    let world: World;

    beforeEach(() => {
        world = World.empty();
    });

    const when_tick_occurs = function (when: any) {
        when('tick occurs', () => {
            world.tick();
        });
    }

    test('Any coordinate with 2 or three neighbours survives', ({
        given,
        and,
        when,
        then
    }) => {
        given('A coordinate in the world with two neighbours', () => {
            let coordinateWith2Neighbours = new Coordinate(0, 0);
            let neighbor1 = new Coordinate(0, 1);
            let neighbor2 = new Coordinate(1, 0);

            world.addCoordinate(coordinateWith2Neighbours);
            world.addCoordinate(neighbor1);
            world.addCoordinate(neighbor2);
        });
        and('A coordinate in the world with three neighbours', () => {
            let coordinateWith3Neighbours = new Coordinate(10, 10);
            let neighbor1 = new Coordinate(10, 11);
            let neighbor2 = new Coordinate(11, 10);
            let neighbor3 = new Coordinate(10, 9);

            world.addCoordinate(coordinateWith3Neighbours);
            world.addCoordinate(neighbor1);
            world.addCoordinate(neighbor2);
            world.addCoordinate(neighbor3);
        });

        when_tick_occurs(when);

        then('these coordinate remain', () => {
            expect(world.coordinateAt(0, 0)).not.toBeNull();
            expect(world.coordinateAt(10, 10)).not.toBeNull();
        });
    });

    test('All other cells die on tick', ({
        given,
        when,
        then
    }) => {
        given('a coordinate with four or more neighbors', () => {
            let coordinateWith4Neighbours = new Coordinate(0, 0);
            let neighbor1 = new Coordinate(0, 1);
            let neighbor2 = new Coordinate(1, 0);
            let neighbor3 = new Coordinate(0, -1);
            let neighbor4 = new Coordinate(-1, 0);

            world.addCoordinate(coordinateWith4Neighbours);
            world.addCoordinate(neighbor1);
            world.addCoordinate(neighbor2);
            world.addCoordinate(neighbor3);
            world.addCoordinate(neighbor4);
        });

        when_tick_occurs(when);

        then('that coordinate is removed', () => {
            expect(world.coordinateAt(0,0)).toBeNull();
        });
    });

    test('Dead cells with exactly 3 neigbors become living cells', ({
        given,
        when,
        then
    }) => {
        given('three neighbours relative to a nonexistent coordinate', () => {
            // dead cell at 0,0
            let neighbor1 = new Coordinate(0, 1);
            let neighbor2 = new Coordinate(1, 0);
            let neighbor3 = new Coordinate(0, -1);

            world.addCoordinate(neighbor1);
            world.addCoordinate(neighbor2);
            world.addCoordinate(neighbor3);
        });

        when_tick_occurs(when);

        then('that coordinate now exists', () => {
            expect(world.coordinateAt(0,0)).not.toBeNull();
        });
    });
});