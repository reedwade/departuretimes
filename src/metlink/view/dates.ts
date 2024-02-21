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
 * Format integers with a leading zero.
 * It's used here for the 2 digit values in times.
 * 
 * Example: 9 -> '09'
 * 
 * @param value input number to be padded
 * @returns the input value but with a leading "0" if less than 10
 */
export const padLeadingZero = (value: number): string => {
    return String(value).padStart(2, '0');
};

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
    const ts = Date.parse(ae.expected || ae.aimed);
    if (isNaN(ts)) {
        return '';
    }
    now = now || Date.now();
    const ago = (ts < now) ? ' ago' : '';
    const minutesDelta = Math.round(Math.abs(ts - now) / (1000 * 60));
    const howLong = minutesDelta > 0 ? `${minutesDelta}min${ago}` : '<1min';

    const d = new Date(ts);

    let hours12 = d.getHours() % 12;
    if (hours12 === 0) {
        hours12 = 12;
    }
    const ampm = d.getHours() < 12 ? 'a' : 'p';

    return `${hours12}:${padLeadingZero(d.getMinutes())}${ampm} (${howLong})`;
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
