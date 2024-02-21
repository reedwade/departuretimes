import { composeStopURL } from './urls';

describe('composeStopURL', () => {
    test.each([
        {
            stopID: '',
            destinationID: '',
            expected: '/stop?stop=',
        },
        {
            stopID: 'a',
            destinationID: undefined,
            expected: '/stop?stop=a',
        },
        {
            stopID: 'a',
            destinationID: 'b',
            expected: '/stop?stop=a&destination=b',
        },
        {
            stopID: '',
            destinationID: 'b',
            expected: '/stop?stop=&destination=b',
        },
    ])('$# / {$stopID, $destinationID} -> $expected', ({ stopID, destinationID, expected }) => {
        expect(composeStopURL(stopID, destinationID)).toBe(expected);
    });
});
