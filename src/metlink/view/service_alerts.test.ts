import * as ALERTS from '../../../testdata/2024-01-22-140238-alerts.json';
import { Alert } from '../api/service_alerts';
import { ServiceAlerts } from '../view/service_alerts';
import { extractServiceAlertInfoForStop, findStopInAlert, getAlertSummaryFromAlert, overlap } from './service_alerts';


describe('extractServiceAlertInfoForStop', () => {
    test('with testdata', () => {
        const got = extractServiceAlertInfoForStop(ALERTS as ServiceAlerts, 'CROF', 'JOHN');
        expect(got).toHaveLength(2);
        expect(got[1].url).toEqual('https://www.metlink.org.nz/assets/Buses-replacing-trains/Buses-replace-trains-JVL-23-24-Jan.pdf');
    });
});

describe('getAlertSummaryFromAlert', () => {

    test('with testdata', () => {
        const alert = ALERTS.entity[0].alert as Alert;
        const alert_id = ALERTS.entity[0].id;
        const got = getAlertSummaryFromAlert(alert, alert_id);
        expect(got.url).toEqual('https://www.metlink.org.nz/news-and-updates/news/petone-station-major-subway-works/');
    });
    test('with testdata and image_alternative_text', () => {
        // This alert has an image.
        const alert = ALERTS.entity[1].alert as Alert;
        const alert_id = ALERTS.entity[1].id;

        const got = getAlertSummaryFromAlert(alert, alert_id);
        expect(got.image).toEqual('https://backend.metlink.org.nz/assets/Service-Alerts-Images/2158e064e1.png');
    });
});

describe('findStopInAlert', () => {
    test('with testdata', () => {
        const alert = ALERTS.entity[21].alert as Alert;
        expect(findStopInAlert(alert, 'CROF')).toEqual(true);
        expect(findStopInAlert(alert, 'CAKE')).toEqual(false);
    });
});


describe('overlap', () => {
    test.each([
        // equal ranges
        { p1: { start: 0, end: 0 }, p2: { start: 0, end: 0 }, expected: true },
        // disconected ranges
        { p1: { start: 1, end: 10 }, p2: { start: 11, end: 20 }, expected: false },
        // partial overlap
        { p1: { start: 2, end: 12 }, p2: { start: 1, end: 10 }, expected: true },
        // complete overlap
        { p1: { start: 2, end: 8 }, p2: { start: 1, end: 10 }, expected: true },
    ])('overlap / $# / ($p1, $p2) -> $expected', ({ p1, p2, expected }) => {
        expect(overlap(p1, p2)).toBe(expected);
        expect(overlap(p2, p1)).toBe(expected);
    });
});
