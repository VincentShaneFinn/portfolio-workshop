import React from 'react';
import { render, screen } from '@testing-library/react';
import Card, { CardProps, CardState } from '../card';
import { mount, ReactWrapper, shallow } from 'enzyme';
import { KanbanBoard } from '../../../domain/kanbanBoard/kanbanBoard';

describe('Card component', () => {
    let kanbanBoard: KanbanBoard;
    let props: CardProps;
    let wrapper: ReactWrapper<CardProps, CardState, Card>;

    beforeEach(() => {
        kanbanBoard = new KanbanBoard();
        props = {
            board: kanbanBoard
        };
        wrapper = mount<Card>(<Card {...props}/>)
    });

    it('should have Title label', () => {
        const label = wrapper.find('label');

        expect(label.text()).toBe("Title");
      });

    it('should update its title when text is entered', () => {
        let input = wrapper.find('input');

        input.simulate('change', { target: { value: 'Card title'}});

        expect(wrapper.instance().state.cardTitle).toBe("Card title");
    });
      
    it('given title was entered, when button pressed, then add card to board', () => {
        let button = wrapper.find("button");
        wrapper.instance().state.cardTitle = "new card title";
        
        button.simulate('click');

        expect(props.board.openList[0].title).toBe("new card title");
    })
});
