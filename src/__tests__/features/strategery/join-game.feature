Feature: Join Game

    Support player joining a pre game lobby where the host can start the match

    #Given Strategery is loaded

    Scenario: Strategery shows the loading screen
        Then the loading screen is visible

    Scenario: Strategery hides app header
        When mounted
        Then setAppHeaderIsHidden is called with value true
        When unmounted
        Then setAppHeaderIsHidden is called with value false

    Scenario: disconnects on unmount 
        When unmounted
        Then socket is disconnected

    Scenario: Players can join the lobby
        Then the player tries to connect to the server
        When the player is connected to the server
        Then the player tries to join the game
        When the server responds to join game request
        Then the player can see the lobby

    Scenario: Player joining the game sees their name in the header
        Given 'Player 1' has joined the lobby
        Then 'Player 1' is displayed in the header

    Scenario: Display list of players currently in the game
        Given 'Player 1' has joined the lobby
        Then the player notifies the server they have joined-lobby
        When server player-changed event was called with two players
        Then the two players are displayed in a list of players
        
    Scenario: Host knows they are host and can see start game
        Given 'Player 1' has joined the lobby
        When host-changed event was called with 'Player 1'
        Then they can see Host next to their player name
        And they can see the start game button
        

# two players join display both names in a list of player
# 1st player to join sees that they are the host, and see a Start Game button
