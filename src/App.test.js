import { render, queryByAttribute   } from '@testing-library/react';
import App from './App';

const getById = queryByAttribute.bind(null, 'id');

describe('History', () => {
    it("Should not render any table if localStorage.getItems('links') is empty", () => {
        const dom = render(<App />);
        const element = getById(dom.container, 'Table-Container');
        expect(element).not.toBeInTheDocument();
    })
});