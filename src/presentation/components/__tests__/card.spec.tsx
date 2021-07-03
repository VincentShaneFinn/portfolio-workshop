import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../card';
import { mount, shallow } from 'enzyme';

describe('Card component', () => {
    it('should have Title label', () => {
        render(<Card />);
        const label = document.getElementsByClassName("card-title-label")[0];

        expect(label).toHaveTextContent("Title");
      });

    it('should update its title when text is entered', () => {
        let wrapper = mount(<Card />);
        const input = document.getElementsByClassName("card-title-input")[0] as HTMLInputElement;

        input.value = "Card title";

        // expect(wrapper.instance().state.cardTitle).toBe("Card title");
    });
      
});
