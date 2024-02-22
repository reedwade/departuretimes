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

/**
 * Return stop ID and name without stutter. Omit stop ID if the name already prefixes it.
 * 
 * Example: "JOHN All stops" instead of "JOHN JOHN All stops"
 */
export const destinationStopAndName = (destination: Destination) => (
    destination.name.startsWith(destination.stop_id)
        ?
        destination.name
        :
        `${destination.stop_id} ${destination.name}`
);
