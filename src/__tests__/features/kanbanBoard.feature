Feature: Kanban Board

    The kanban board holds a few status lists, and allows the user to add cards and move them between lists

    Scenario: Add card to board
        Given a card
        When I add a card to the board
        Then It is added to the open list