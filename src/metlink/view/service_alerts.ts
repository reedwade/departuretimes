import { APIFetchTimeAndError } from '../api/api';
import { ActivePeriod, Alert, ServiceAlertsResponse } from '../api/service_alerts';

/**
 * A display oriented record created from an Alert.
 * 
 * @see extractServiceAlertInfoForStop()
 */
export type AlertSummary = {
    header: string;
    description: string;
    id: string;
    is_today: boolean;
    trip_ids: string[];
    start_time: number;
    end_time: number;
    image?: string;
    image_alternative_text?: string;
    pdf?: boolean;
    url?: string;
};

/**
 * An {@link AlertSummary} initialiser helper.
 * 
 * Example: const cake = { ...EmptyAlertSummary };
 */
export const EmptyAlertSummary = {
    header: '',
    description: '',
    id: '',
    is_today: false,
    trip_ids: [],
    start_time: 0,
    end_time: 0,
};

/**
 * Holds state for a single Stop component.
 */
export type ServiceAlerts = ServiceAlertsResponse & APIFetchTimeAndError & {
    // Collections of alerts related to the stop we care about right now.
    alertSummaries?: AlertSummary[]
};


export const extractServiceAlertInfoForStop = (
    service_alerts: ServiceAlerts, stopID: string, destinationID?: string
): AlertSummary[] => {
    return service_alerts?.entity?.
        filter(e => (findStopInAlert(e.alert, stopID) && (!destinationID || findStopInAlert(e.alert, destinationID))))
        .map(e => (getAlertSummaryFromAlert(e.alert, e.id)));
};

export const getAlertSummaryFromAlert = (alert: Alert, id: string): AlertSummary => {
    const alertSummary: AlertSummary = {
        header: '',
        description: '',
        id: id,
        is_today: false,
        trip_ids: [],
        start_time: 0,
        end_time: 0,
    };

    // In all cases we're presuming there's zero or one translation for all text, url and image
    // entries. That appears to be true right now at least.

    if (alert.header_text?.translation?.length) {
        alertSummary.header = alert.header_text.translation[0].text;
    }
    if (alert.description_text?.translation?.length) {
        alertSummary.description = alert.description_text.translation[0].text;
    }

    if (alert.image?.localized_image?.length) {
        alertSummary.image = alert.image.localized_image[0].url;
    }
    if (alert.image_alternative_text?.translation?.length) {
        alertSummary.image_alternative_text = alert.image_alternative_text.translation[0].text;
    }

    if (alert.url?.translation?.length) {
        alertSummary.url = alert.url.translation[0].text;
        alertSummary.pdf = alertSummary.url.toLowerCase().endsWith('pdf');
    }

    alertSummary.trip_ids = alert.informed_entity.
        filter((stopOrTrip) => (!!stopOrTrip.trip?.trip_id)).
        map((stopOrTrip) => (stopOrTrip.trip?.trip_id || ''));

    alertSummary.is_today = activePeriodIsToday(alert.active_period);

    alert.active_period?.forEach((period, index) => {
        if (index === 0) {
            alertSummary.start_time = period.start;
        }

        alertSummary.start_time = Math.min(period.start, alertSummary.start_time);
        alertSummary.end_time = Math.max(period.end, alertSummary.end_time);
    });

    return alertSummary;
};

export const findStopInAlert = (alert: Alert, stopID: string): boolean => {
    return alert.informed_entity.find(stopOrTrip => {
        return stopOrTrip.stop_id === stopID;
    }) !== undefined;
};

export const overlap = (p1: ActivePeriod, p2: ActivePeriod): boolean => (
    p1.start <= p2.end && p2.start <= p1.end
);

// activePeriodIsToday returns true if the start time is less than 3am this evening.
// Now value can be passed in for testing, normally it would be unset.
export const activePeriodIsToday = (periods: ActivePeriod[], now?: Date): boolean => {
    if (!now) {
        now = new Date();
    }
    const today = {
        start: now.getTime() / 1000,
        end: now.setHours(24 + 3, 0, 0, 0) / 1000,
    };

    for (let i = 0; i < periods.length; i++) {
        if (overlap(today, periods[i])) {
            return true;
        }
    }
    return false;
};


// tripAlertAnnotation returns a very short alert info prefix if there is one for this trip.
// Example: "Buses repl..." is enough to tell you that your train will be a bus today.
export const tripAlertAnnotation = (trip_id: string, alertSummaries?: AlertSummary[]): string => {
    for (let i = 0; alertSummaries && i < alertSummaries.length; i++) {
        const element = alertSummaries[i];
        if (element.is_today && element.trip_ids.findIndex((v) => (v === trip_id)) !== -1) {
            return element.header.substring(0, 10) + '…';
        }
    }
    return '';
};
