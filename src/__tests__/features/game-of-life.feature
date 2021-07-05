Feature: Conway's game of life

    Implement the game of life zero-player game

    Scenario: Any coordinate with 2 or three neighbours survives
        Given A coordinate in the world with two neighbours
        And A coordinate in the world with three neighbours
        When tick occurs
        Then these coordinate remain

    Scenario: All other cells die on tick
        Given a coordinate with four or more neighbors
        When tick occurs
        Then that coordinate is removed

    Scenario: Dead cells with exactly 3 neigbors become living cells
        Given three neighbours relative to a nonexistent coordinate
        When tick occurs
        Then that coordinate now exists