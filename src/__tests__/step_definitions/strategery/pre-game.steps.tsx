import { mount, ReactWrapper } from 'enzyme';
import { defineFeature, loadFeature } from "jest-cucumber";
import { LandingPage } from '../../../presentation/strategery/landing-page';

const feature = loadFeature('src/__tests__/features/strategery/pre-game.feature');

defineFeature(feature, test => {
  let landingPage: ReactWrapper;

  const given_the_strategery_landing_page = (given: any) => {
    given('the Strategery Landing Page', () => {
      landingPage = mount(<LandingPage setAppHeaderIsHidden={setAppHeaderIsHidden} />);
    });
  }

  test('Landing Page has a the game title', ({
    given,
    then
  }) => {
    given_the_strategery_landing_page(given);

    then('the game title is visible', () => {
      expect(landingPage.find("#page-title").text()).toBe("Strategery");
    });
  });

  test('Landing Page hides app header', ({
    given,
    when,
    then
  }) => {
    given_the_strategery_landing_page(given);

    when('mounted', () => {
      landingPage.mount();
    });

    then('setAppHeaderIsHidden is called with value true', () => {
      appHeaderIsHidden = true;
    });

    when('unmounted', () => {
      landingPage.unmount();
    });

    then('setAppHeaderIsHidden is called with value false', () => {
      appHeaderIsHidden = false;
    });
  });

  let appHeaderIsHidden: boolean;

  function setAppHeaderIsHidden(value: boolean) {
    appHeaderIsHidden = value;
  }
});