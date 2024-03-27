import { alertDates, monthAndDayFromEpochTime, prettyAimedExpected, prettyDelay } from './dates';

const january22at2pm = Date.parse('2024-01-22T14:00:00+13:00');

test.each([
    {
        arg: {
            aimed: '',
            expected: null,
        },
        expected: ''
    },
    {
        arg: {
            aimed: '2024-01-22T14:11:00+13:00',
            expected: null,
        },
        expected: '2:11p (11min)',
    },
    {
        arg: {
            aimed: '2024-01-22T13:11:00+13:00',
            expected: null,
        },
        expected: '1:11p (49min ago)',
    },
    {
        arg: {
            aimed: '2024-01-22T03:11:00+13:00',
            expected: null,
        },
        expected: '3:11a (649min ago)',
    },
    {
        arg: {
            aimed: '2024-01-22T00:11:00+13:00',
            expected: null,
        },
        expected: '12:11a (829min ago)',
    },
    {
        arg: {
            aimed: '2024-01-22T14:11:00+13:00',
            expected: '2024-01-22T14:05:00+13:00',
        },
        expected: '2:05p (5min)',
    },
    {
        arg: {
            aimed: '2024-01-22T14:00:01+13:00',
            expected: null,
        },
        expected: '2:00p (<1min)',
    },
])('prettyAimedExpected / $# / {$arg.aimed, $arg.expected} -> $expected', ({ arg, expected }) => {
    expect(prettyAimedExpected(arg, january22at2pm)).toBe(expected);
});


test.each([
    {
        arg: '',
        expected: '',
    },
    {
        arg: 'PT0S',
        expected: '',
    },
    {
        arg: 'PT7M43S',
        expected: ' (7m43s late)',
    },
    {
        arg: '-PT1M17S',
        expected: ' (1m17s early)',
    },
])('prettyDelay / $# / $arg -> $expected', ({ arg, expected }) => {
    expect(prettyDelay(arg)).toBe(expected);
});


test.each([
    { arg: 0, expected: 'Jan 1' },
    { arg: Date.parse('2024-01-22T14:00:00+13:00') / 1000, expected: 'Jan 22' },
    { arg: Date.parse('2024-01-25T14:00:00+13:00') / 1000, expected: 'Jan 25' },
])('monthAndDayFromEpochTime / $# / $arg -> $expected', ({ arg, expected }) => {
    expect(monthAndDayFromEpochTime(arg)).toBe(expected);
});


test.each([
    {
        arg: {
            start_time: 0,
            end_time: 0,
        },
        expected: 'Jan 1',
    },
    {
        arg: {
            start_time: Date.parse('2024-01-22T14:00:00+13:00') / 1000,
            end_time: Date.parse('2024-01-22T14:00:00+13:00') / 1000,
        },
        expected: 'Jan 22',
    },
    {
        arg: {
            start_time: Date.parse('2024-01-22T14:00:00+13:00') / 1000,
            end_time: Date.parse('2024-01-26T14:00:00+13:00') / 1000,
        },
        expected: 'Jan 22..Jan 26',
    },
])('alertDates / $# / {$arg.start_time, $arg.end_time} -> $expected', ({ arg, expected }) => {
    expect(alertDates(arg)).toBe(expected);
});
