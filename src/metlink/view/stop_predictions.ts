import { APIFetchTimeAndError } from '../api/api';
import { Departure, Destination, StopPredictionsResponse } from '../api/stop_predictions';

/**
 * Holds state for a single Stop component.
*/
export type StopPredictions = StopPredictionsResponse & APIFetchTimeAndError & {
    uniqueDestinations?: Destination[];
};

/**
 * Find the set of destinations referenced in the stop predictions.
 * 
 * This is used to create the "to $DEST" navigation buttons under a departures list.
 */
export const gatherUniqueDestinations = (stopPredictions: StopPredictions): Destination[] => {
    const valsmap = new Map<string, Destination>();
    stopPredictions?.
        departures?.
        map((departure: Departure) => valsmap.set(departure.destination.stop_id, departure.destination));
    return [...valsmap.values()];
};
