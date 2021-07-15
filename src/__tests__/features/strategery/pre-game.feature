Feature: Pre Game

    Support player joining a pre game lobby so the host can start a match

    Scenario: Strategery shows the landing page
        Given Strategery is loaded
        Then the landing page is visible

    Scenario: Strategery hides app header
        Given Strategery is loaded
        When mounted
        Then setAppHeaderIsHidden is called with value true
        When unmounted
        Then setAppHeaderIsHidden is called with value false

    Scenario: Host a game
        Given Strategery is loaded
        When a player clicks host game
        Then the player tries to connect to the server
        When the player is connected to the server
        Then the player notifies the server they will host the game
        When the server responds to host request
        Then the player can see the lobby

    # Scenario: Joined Lobby as the Host
    #     Given a player has joined the lobby as the host
    #     Then the lobby displays 'Player 1' in the player list
    #     And the header displays 'Player 1 (Host)'
    #     And the start game button is visible
