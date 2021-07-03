import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature("src/__tests__/features/calculator.feature");

function Calculator() {
    this.number1 = null;
    this.number2 = null;
    this.value = null;
    this.add = function () {
        this.value = this.number1 + this.number2;
    }
}

defineFeature(feature, test => {
    let calculator = new Calculator();

    test('Add numbers', ({
        given,
        when,
        then
    }) => {
        given('I enter two numbers', () => {
            calculator.number1 = 1;
            calculator.number2 = 2;
        });

        when('I add them', () => {
            calculator.add();
        });

        then('I expect the sum', () => {
            expect(calculator.value).toBe(3);
        });
    });
});