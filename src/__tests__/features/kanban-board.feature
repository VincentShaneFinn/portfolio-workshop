Feature: Kanban Board

    The kanban board holds a few status lists, and allows the user to add cards and move them between lists

    Scenario: Add card to board
        Given I entered a title
        When I click add
        Then a card is added to the board

    Scenario: Click enter on input to add card
        Given I entered a title
        When I hit the enter key
        Then a card is added to the board

    Scenario: Move a card to closed
        Given I added a card to the Board
        When I click move on that card
        Then the card is moved to the closed list