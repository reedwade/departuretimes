import { Translations, getHeaders } from './api';

const SERVICE_ALERTS_URL = 'https://api.opendata.metlink.org.nz/v1/gtfs-rt/servicealerts';

export const getServiceAlertsUrlAndHeaders = () => {
    return { url: SERVICE_ALERTS_URL, headers: getHeaders() };
};

export type Image = {
    url: string;
    language: string;
    media: string;
};

export type LocalizedImage = {
    localized_image: Image[];
};

/**
 * The informed_entity property of an {@link Alert} is a mixed list of
 * stop IDs or trips.
 */
export type StopsOrTrips = {
    stop_id?: string;
    trip?: {
        trip_id?: string;
    }
};

/**
 * Start and End are in seconds since 1970.
 * 
 * Indicates active alerts period in an {@link Alert}
 */
export type ActivePeriod = {
    start: number;
    end: number;
};

/**
 * Information related to a single alert in a {@link ServiceAlertsResponse}.
 */
export type Alert = {
    cause: string;
    effect: string;
    header_text: Translations;
    description_text: Translations;
    informed_entity: StopsOrTrips[];
    active_period: ActivePeriod[];
    url: Translations;
    image: LocalizedImage;
    image_alternative_text: Translations;
};

/**
 * Service Alerts API response 
 * 
 * @see https://opendata.metlink.org.nz/
 * 
 * Response data from a service alerts API call.
 */
export type ServiceAlertsResponse = {
    header: object;
    entity: {
        id: string;
        alert: Alert;
    }[];
};
