/**
 * Date and Time formatters and helpers.
 */

import { Period } from '../api/api';
import { AimedExpected } from '../api/stop_predictions';

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Format time in NZ time zone even if the browser is set to some other time zone.
 */
const nzTimeFormatter = new Intl.DateTimeFormat([], {
    timeStyle: 'short',
    hour12: true,
    hourCycle: 'h12',
    timeZone: 'Pacific/Auckland',
});

/**
 * Format the wall clock time of this service departure
 * along with a relative 'how long from now' value.
 * 
 * Example: '9:10a (11min)'
 * 
 * @param ae
 * @param now - defaults to Date.now()
 */
export const prettyAimedExpected = (ae: AimedExpected, now?: number): string => {
    const timestamp = Date.parse(ae.expected || ae.aimed);
    if (isNaN(timestamp)) {
        return '';
    }
    now = now || Date.now();
    const ago = (timestamp < now) ? ' ago' : '';
    const minutesDelta = Math.round(Math.abs(timestamp - now) / (1000 * 60));
    const howLong = minutesDelta > 0 ? `${minutesDelta}min${ago}` : '<1min';

    const d = new Date(timestamp);

    // Format the given time, shortening the text by replacing "1:00 pm" with "1:00p".

    return `${nzTimeFormatter.
        format(d).
        toLowerCase().
        replace(/^00:/, "12:").
        replace(/^0/, "").
        replace(" am", "a").
        replace(" pm", "p")} (${howLong})`;
};

/**
 * Formats an iso8601 duration string in a nice way.
 * It doesn't parse the values but flattens to lower case and removes
 * the leading 'PT'.
 * It also adds a late/early indicator.
 * And, a space is prepended to simplify formatting by the caller.
 * 
 * Example: PT7M43S -> ' (7m43s late)'
 * 
 * @param delay - iso8601 duration string
 */
export const prettyDelay = (delay: Period): string => {
    delay = delay?.replace('PT', '');
    if (!delay || delay === '0S') {
        return '';
    }
    delay = delay.toLowerCase();
    if (delay.startsWith('-')) {
        delay = delay.substring(1) + ' early';
    } else {
        delay += ' late';
    }
    return ` (${delay})`;
};

/**
 * Returns the month and day given an time value in seconds since 1970.
 * 
 * Example: 1707029263 -> 'Feb 12'
 */
export const monthAndDayFromEpochTime = (epochTime: number): string => {
    const date = new Date(epochTime * 1000);
    return `${months[date.getMonth()]} ${date.getDate()}`;
};

export interface StartAndEndTimes {
    start_time: number;
    end_time: number;
}

/**
 * Formats the alert start and, if different, end date of an alert.
 * 
 * Example: 'Feb 12..Feb 14'
 */
export const alertDates = (alertInfo: StartAndEndTimes): string => {
    const start = monthAndDayFromEpochTime(alertInfo.start_time);
    const end = monthAndDayFromEpochTime(alertInfo.end_time);
    return `${start}${start !== end ? `..${end}` : ''}`
};
