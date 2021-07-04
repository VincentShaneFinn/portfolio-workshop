import { render, screen } from '@testing-library/react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { mount, ReactWrapper } from 'enzyme';
import KanbanBoard from '../../presentation/components/kanban-board';

const feature = loadFeature('src/__tests__/features/kanban-board.feature');

defineFeature(feature, test => {
    const cardTitle = "Card title";
    //let kanbanBoard: KanbanBoard;
    let kanbanBoard: ReactWrapper;

    beforeEach(() => {
        kanbanBoard = mount(<KanbanBoard />);
    });

    test('Add card to board', ({
        given,
        when,
        then
    }) => {
        given('I entered a title', () => {
            let cardTitleInput =  kanbanBoard.find('input.kanban-card-title-input');

            cardTitleInput.simulate('change', { target: { value: cardTitle }})
        });
        when('I click add', () => {
            let addCardBtn = kanbanBoard.find('button.add-kanban-card-btn');

            addCardBtn.simulate('click');
        });
        then('A card is added to the board', () => {
            let actualCards = kanbanBoard.find('.kanban-card');

            expect(actualCards.length).toBe(1);
            expect(actualCards.find('.kanban-card-title').at(0).text()).toBe(cardTitle);
        });
    });
});