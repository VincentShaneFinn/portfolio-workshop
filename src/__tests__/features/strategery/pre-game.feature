Feature: Pre Game

    Support player joining a pre game lobby so the host can start a match

    Scenario: Landing Page has a the game title
        Given the Strategery Landing Page is loaded
        Then the game title is visible

    Scenario: Landing Page hides app header
        Given the Strategery Landing Page is loaded
        When mounted
        Then setAppHeaderIsHidden is called with value true
        When unmounted
        Then setAppHeaderIsHidden is called with value false