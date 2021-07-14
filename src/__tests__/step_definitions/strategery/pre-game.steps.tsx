import { shallow, ShallowWrapper } from 'enzyme';
import { defineFeature, loadFeature } from "jest-cucumber";
import { LandingPage } from '../../../presentation/strategery/landing-page';

const feature = loadFeature('src/__tests__/features/strategery/pre-game.feature');

defineFeature(feature, test => {
  let landingPage: ShallowWrapper;

  test('Landing Page has a the game title', ({
    given,
    then
  }) => {
    given('the Strategery Landing Page', () => {
      landingPage = shallow(<LandingPage />);
    });

    then('the game title is visible', () => {
      expect(landingPage.find("#page-title").text()).toBe("Strategery");
    });
  });
});