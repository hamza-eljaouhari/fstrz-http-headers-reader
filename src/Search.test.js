import { render } from '@testing-library/react';
import SearchFunctions from './Search.functions';
const axios = require('axios');

jest.mock('axios')

describe('History', () => {

    it('Should get a 400 validation error when an invalid URL is sent', async () => {
        const errorMessage = "L'URL que vous avez entré n'existe pas.";

        axios.post.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );


        await expect(SearchFunctions.fetchHttpHeaders('https://www.google.com')).rejects.toEqual(new Error(errorMessage));
    });

    it('Should fetch successfully data from API', async () => {
        const data = {
            plugged: true,
            statusCode: 200,
            fstrzFlags: [
                'optimisée',
                'cachée'
            ],
            cloudFrontStatus: 'MISS',
            cloudfrontPOP: 'Madrid'
        };

        axios.post.mockImplementationOnce(() => Promise.resolve(data));
        
        await expect(SearchFunctions.fetchHttpHeaders('http://wwww.fasterize.com')).resolves.toEqual(data);

        await expect(axios.post).toHaveBeenCalledWith("http://localhost:3000", {"url": "http://wwww.fasterize.com"});
    })

    // it('Input must be empty after clicking "Launch Analysis"', async () => {

    // })
});