import { defineFeature, loadFeature } from 'jest-cucumber';
import { Card } from '../../domain/kanbanBoard/card';
import { KanbanBoard } from '../../domain/kanbanBoard/kanbanBoard';

const feature = loadFeature('src/__tests__/features/kanbanBoard.feature');

defineFeature(feature, test => {
    let board = new KanbanBoard();
    let card: Card;

    test('Add card to board', ({
      given,
      when,
      then
    }) => {
        given('a card', () => {
            card = new Card("Card title")
        });
        when('I add a card to the board', () => {
            board.addCard(card);
        });
        then('It is added to the open list', () => {
            expect(board.openList).toContain(card);
        });
    });
  });