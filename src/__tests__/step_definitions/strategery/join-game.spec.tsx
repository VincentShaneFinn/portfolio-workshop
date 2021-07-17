import { mount, ReactWrapper } from 'enzyme';
import { defineFeature, loadFeature } from "jest-cucumber";
import { Mock, Times, It } from 'typemoq';
import { Strategery, StrategeryProps } from '../../../presentation/strategery/strategery';
import { ISocketInteractor } from '../../../domain/interfaces/ISocketInteractor';

const feature = loadFeature('src/__tests__/features/strategery/join-game.feature');

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
    given_strategery_is_loaded();
  })

  const given_strategery_is_loaded = () => {
    strategery = mount(<Strategery {...props} />);
  };

  const given_PLAYER_NAME_has_joined_the_lobby = (given: any) => {
    given(/^'(.*)' has joined the lobby$/, (playerName: string) => {
      _onConnectionSuccessful();
      serverEmit("join-game", playerName);
      strategery.update();
    });
  }

  test('Strategery shows the loading screen', ({
    then
  }) => {
    then('the loading screen is visible', () => {
      expect(strategery.find("#loading-screen").length).toBe(1);
    });
  });

  test('Strategery hides app header', ({
    when,
    then
  }) => {
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

  test('disconnects on unmount', ({
    when,
    then
  }) => {
    when('unmounted', () => {
      strategery.unmount();
    });
  
    then('socket is disconnected', () => {
      socketInteractor.verify(mock => mock.disconnect(), Times.once());
    });
  });

  test('Players can join the lobby', ({
    when,
    then
  }) => {
    then('the player tries to connect to the server', () => {
      socketInteractor.verify(mock => mock.connect(It.isAny()), Times.once())
    });

    when('the player is connected to the server', () => {
      _onConnectionSuccessful();
    });

    then('the player tries to join the game', () => {
      socketInteractor.verify(mock => mock.emit("join-game"), Times.once())
    });

    when('the server responds to join game request', () => {
      serverEmit("join-game");
      strategery.update();
    });

    then('the player can see the lobby', () => {
      expect(strategery.find("#lobby").length).toBe(1);
    });
  });

  test('Player joining the game sees their name in the header', ({
    given,
    and,
    then
  }) => {
    given_PLAYER_NAME_has_joined_the_lobby(given);

    then(/^'(.*)' is displayed in the header$/, (playerName) => {
      let playerNameSpan = strategery.find("#player-name");
      expect(playerNameSpan.text()).toBe(playerName);
    });
  });

  test('Display list of players currently in the game', ({
    given,
    when,
    then
  }) => {
    given_PLAYER_NAME_has_joined_the_lobby(given);

    then('the player notifies the server they have joined-lobby', () => {
      socketInteractor.verify(mock => mock.emit("joined-lobby"), Times.once());
    });

    when('server player-changed event was called with two players', () => {
      serverEmit("players-changed", ["Player 1", "Player 2"])
      strategery.update();
    });

    then('the two players are displayed in a list of players', () => {
      let playerList = strategery.find("#player-list");
      let playerNameSpans = playerList.find(".player-name");
      expect(playerNameSpans.contains("Player 1")).toBe(true);
      expect(playerNameSpans.contains("Player 2")).toBe(true);
    });
  });

  test('Host knows they are host and can see start game', ({
    given,
    when,
    then,
    and
  }) => {
    given_PLAYER_NAME_has_joined_the_lobby(given);

    when(/^host-changed event was called with '(.*)'$/, (playerName) => {
      serverEmit("host-changed", playerName);
      strategery.update();
    });

    then('they can see Host next to their player name', () => {
      expect(strategery.find("#host-name").text()).toBe("(Host)");
    });

    and('they can see the start game button', () => {
      expect(strategery.find("#start-game-btn").length).toBe(1);
    });
  });

  let appHeaderIsHidden: boolean;

  function setAppHeaderIsHidden(value: boolean) {
    appHeaderIsHidden = value;
  }

  let _onConnectionSuccessful: any;
  let _serverEmitter: Record<string, any> = {};

  function serverEmit(eventName: string, params?: any) {
    let eventHandlers = _serverEmitter[eventName];
    eventHandlers.forEach((eventHandler: any) => {
      eventHandler(params);
    });
  }

  function getFakeSocketManagerSetupToCaptureRegisteredOnEvents(): import("typemoq").IMock<ISocketInteractor> {
    let socketInteractor = Mock.ofType<ISocketInteractor>();
    socketInteractor.setup(mock => mock.connect(It.isAny())).callback((onConnectionSuccessful: any) => { _onConnectionSuccessful = onConnectionSuccessful })
    socketInteractor.setup(mock => mock.on(It.isAny(), It.isAny())).callback((eventName: string, onSendMessage: any) => {
      if (!_serverEmitter[eventName]) _serverEmitter[eventName] = [];
      _serverEmitter[eventName].push(onSendMessage)
    })
    return socketInteractor;
  }
});

