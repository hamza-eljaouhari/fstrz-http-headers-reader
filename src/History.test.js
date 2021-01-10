import { render, screen } from '@testing-library/react';
import History from './History';
import axios from 'axios';
import SearchFunctions from './Search.functions'

jest.mock('axios');

describe('History', () => {
    it('Local Storage to be empty initially', () => {
        expect(localStorage.getItem('links')).toBe(null);
    });
});
