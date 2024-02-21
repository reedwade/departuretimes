import { favsKey, getFavs } from './favs';


describe('getFavs', () => {
    beforeEach(() => {
        localStorage.clear();
    });
    afterEach(() => {
        localStorage.clear();
    });

    test('default', () => {
        expect(getFavs()).toEqual([]);
    });

    test('with value', () => {
        localStorage.setItem('favs/A/B', '1');
        localStorage.setItem('favs/C', '1');
        expect(getFavs()).toEqual([
            {
                destinationID: 'B',
                key: 'favs/A/B',
                stopID: 'A',
            },
            {
                destinationID: '',
                key: 'favs/C',
                stopID: 'C',
            },
        ]);
    });

});

describe('favsKey', () => {
    test.each([
        {
            stopID: '',
            destinationID: '',
            expected: 'favs/',
        },
        {
            stopID: 'a',
            destinationID: undefined,
            expected: 'favs/a',
        },
        {
            stopID: 'a',
            destinationID: 'b',
            expected: 'favs/a/b',
        },
        {
            stopID: '', // abnormal but allowed
            destinationID: 'b',
            expected: 'favs//b',
        },
    ])('$# / {$stopID, $destinationID} -> $expected', ({ stopID, destinationID, expected }) => {
        expect(favsKey(stopID, destinationID)).toBe(expected);
    });
});
