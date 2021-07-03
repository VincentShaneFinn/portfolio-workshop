import { addOne } from "../workshop";

describe("addOne", () => {
    it("given a number, should add one", () => {
        let val = 1;

        let actual = addOne(val);

        expect(actual).toBe(2);
    })
})
