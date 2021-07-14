import { defineFeature, loadFeature } from 'jest-cucumber';
import { mount, ReactWrapper } from 'enzyme';
import KanbanBoard from '../../presentation/kanban-board';

const feature = loadFeature('src/__tests__/features/kanban-board.feature');

defineFeature(feature, test => {
    const cardTitle = "Card title";
    let kanbanBoard: ReactWrapper;

    beforeEach(() => {
        kanbanBoard = mount(<KanbanBoard />);
    });

    const given_I_entered_a_title = (given: any) => {
        given('I entered a title', enterCardTitle)
    }

    const a_card_is_added_to_the_board = (then: any) => {
        then('a card is added to the board', () => {
            let actualCards = kanbanBoard.find('.open-list .kanban-card');

            expect(actualCards.length).toBe(1);
            expect(actualCards.find('.kanban-card-title').at(0).text()).toBe(cardTitle);
        })
    }

    test('Add card to board', ({
        given,
        when,
        then
    }) => {
        given_I_entered_a_title(given);

        when('I click add', () => {
            clickAddCard();
        });

        a_card_is_added_to_the_board(then);
    });

    test('Click enter on input to add card', ({
        given,
        when,
        then
      }) => {
        given_I_entered_a_title(given);
      
        when('I hit the enter key', () => {
            let addCardBtn = kanbanBoard.find('input.kanban-card-title-input');
            addCardBtn.simulate('keypress', {key: 'Enter'})
        });
      
        a_card_is_added_to_the_board(then);
      });
    
    test('Move a card to closed', ({
        given,
        when,
        then
    }) => { 
        given('I added a card to the Board', () => {
            enterCardTitle();
            clickAddCard();
        });
        when('I click move on that card', () => {
            let moveCardBtn = kanbanBoard.find('.open-list .kanban-card').at(0).find("button.close-kanban-card-btn");
            moveCardBtn.simulate('click');
        });
        then('the card is moved to the closed list', () => {
            let openCards = kanbanBoard.find('.open-list .kanban-card');
            let closedCards = kanbanBoard.find('.closed-list .kanban-card');

            expect(openCards.length).toBe(0);
            expect(closedCards.length).toBe(1);
        });
    });

    function enterCardTitle() {
        let cardTitleInput =  kanbanBoard.find('input.kanban-card-title-input');
        cardTitleInput.simulate('change', { target: { value: cardTitle }})
    }

    function clickAddCard() {
        let addCardBtn = kanbanBoard.find('button.add-kanban-card-btn');
        addCardBtn.simulate('click');
    }
});