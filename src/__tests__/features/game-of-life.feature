Feature: Conway's game of life

    Implement the game of life zero-player game

    Scenario: Empty world remains empty on tick
        Given an empty world
        When tick occurs
        Then the world remains empty