Feature: Kanban Board

    The kanban board holds a few status lists, and allows the user to add cards and move them between lists

    Scenario: Add card to board
        Given I entered a title
        When I click add
        Then A card is added to the board