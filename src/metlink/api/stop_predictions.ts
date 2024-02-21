import { ISO8601DateTime, Period, getHeaders } from './api';

const STOP_PREDICTIONS_URL = 'https://api.opendata.metlink.org.nz/v1/stop-predictions';


export const getStopPredictionsUrlAndHeaders = (stopID: string) => {
    const url = new URL(STOP_PREDICTIONS_URL);
    url.searchParams.set('stop_id', stopID);
    return { url: url.toString(), headers: getHeaders() };
};

/**
 * The planned and (optional) actual expected departure time.
 * 
 * @property aimed - planned timetable departure time
 * @property expected - set when realtime information is available
 */
export type AimedExpected = {
    aimed: ISO8601DateTime;
    expected: ISO8601DateTime | null;
};

export type Destination = {
    stop_id: string;
    name: string;
};

export type Departure = {
    trip_id: string;
    departure: AimedExpected;
    status: string | null;
    monitored: boolean;
    delay: Period;
    destination: Destination;
    vehicle_id: string;

    [key: string]: unknown;
};

/**
 * Stop Predictions API Response
 * 
 * @see https://opendata.metlink.org.nz/
 */
export type StopPredictionsResponse = {
    departures: Departure[];

    // [key: string]: unknown; // Allow for bulk test data.
};
