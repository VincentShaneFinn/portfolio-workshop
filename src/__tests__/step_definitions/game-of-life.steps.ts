import { defineFeature, loadFeature } from "jest-cucumber";
import { World } from "../../domain/game_of_life/world";

const feature = loadFeature('src/__tests__/features/game-of-life.feature');

defineFeature(feature, test => {
    let world: World;

    test('Empty world remains empty on tick', ({
        given,
        when,
        then
    }) => {
        given('an empty world', () => {
            world = World.empty();
        });

        when('tick occurs', () => {
            world.tick();
        });

        then('the world remains empty', () => {
            expect(world.isEmpty()).toBe(true);
        });
    });
});