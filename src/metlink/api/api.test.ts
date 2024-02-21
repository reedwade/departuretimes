import { setApiKey, getHeaders } from './api';


describe('getHeaders', () => {

    afterEach(() => {
        setApiKey('SECRETAPIKEY');
    });

    test('normal case', () => {
        expect(getHeaders()).toEqual({
            'accept': 'application/json',
            'x-api-key': 'SECRETAPIKEY',
        });
    });

    test('w/out API key', () => {
        setApiKey();
        expect(getHeaders()).toEqual({
            'accept': 'application/json',
        });
    });
});
