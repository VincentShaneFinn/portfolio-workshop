import { mount, ReactWrapper } from 'enzyme';
import { defineFeature, loadFeature } from "jest-cucumber";
import { Mock, Times, It } from 'typemoq';
import { Strategery, StrategeryProps } from '../../../presentation/strategery/strategery';
import { ISocketInteractor } from '../../../domain/interfaces/ISocketInteractor';
import { stringify } from 'querystring';

const feature = loadFeature('src/__tests__/features/strategery/pre-game.feature');

defineFeature(feature, test => {
  let socketInteractor = Mock.ofType<ISocketInteractor>();
  let props: StrategeryProps;

  let strategery: ReactWrapper;

  beforeEach(() => {
    socketInteractor = getFakeSocketManagerSetupToCaptureRegisteredOnEvents();
    props = {
      setAppHeaderIsHidden: setAppHeaderIsHidden,
      socketInteractor: socketInteractor.object
    }
  })

  const given_strategery_is_loaded = (given: any) => {
    given('Strategery is loaded', () => {
      strategery = mount(<Strategery {...props} />);
    });
  }

  test('Strategery shows the landing page', ({
    given,
    then
  }) => {
    given_strategery_is_loaded(given);

    then('the landing page is visible', () => {
      expect(strategery.find("#landing-page").length).toBe(1);
    });
  });

  test('Strategery hides app header', ({
    given,
    when,
    then
  }) => {
    given_strategery_is_loaded(given);

    when('mounted', () => {
      strategery.mount();
    });

    then('setAppHeaderIsHidden is called with value true', () => {
      appHeaderIsHidden = true;
    });

    when('unmounted', () => {
      strategery.unmount();
    });

    then('setAppHeaderIsHidden is called with value false', () => {
      appHeaderIsHidden = false;
    });
  });

  test('Host a game', ({
    given,
    when,
    then
  }) => {
    given_strategery_is_loaded(given);

    when('a player clicks host game', () => {
      let hostGameBtn = strategery.find("#host-game-btn");

      hostGameBtn.simulate("click");
    });

    then('the player tries to connect to the server', () => {
      socketInteractor.verify(mock => mock.connect(It.isAny()), Times.once())
    });

    when('the player is connected to the server', () => {
      _onConnectionSuccessful();
    });

    then('the player notifies the server they will host the game', () => {
      socketInteractor.verify(mock => mock.emit("host-game"), Times.once())
    });
    
    when('the server responds to host request', () => {
      _serverEmitter["host-game-confirmed"]();
      strategery.update();
    });

    then('the player can see the lobby', () => {
      expect(strategery.find("#lobby").length).toBe(1);
    });
  });

  let appHeaderIsHidden: boolean;

  function setAppHeaderIsHidden(value: boolean) {
    appHeaderIsHidden = value;
  }

  let _onConnectionSuccessful: any;
  let _serverEmitter: Record<string, any> = {};

  function getFakeSocketManagerSetupToCaptureRegisteredOnEvents(): import("typemoq").IMock<ISocketInteractor> {
    let socketManager = Mock.ofType<ISocketInteractor>();
    socketManager.setup(mock => mock.connect(It.isAny())).callback((onConnectionSuccessful: any) => { _onConnectionSuccessful = onConnectionSuccessful })
    socketManager.setup(mock => mock.on(It.isAny(), It.isAny())).callback((eventName: string, onSendMessage: any) => { _serverEmitter[eventName] = onSendMessage })
    return socketManager;
  }
});

