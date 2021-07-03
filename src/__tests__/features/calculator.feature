Feature: Calculator

    Perform basic calulations

    Scenario: Add numbers
        Given I enter two numbers
        When I add them
        Then I expect the sum