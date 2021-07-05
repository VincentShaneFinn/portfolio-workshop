import { World } from "../world";

describe('World', () => {
    test('Empty world is empty', () => {
        let emptyWorld = World.empty();

        expect(emptyWorld.isEmpty()).toBe(true);
    })
})