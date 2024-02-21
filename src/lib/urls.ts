
/**
 * Create a tidy partial URL for a stop page for the given stop and destination.
 * 
 * Examples: /stop?stop=CAKE&destination=TUNA, /stop?stop=CAKE
 */
export const composeStopURL = (stopID: string, destinationID?: string): string => {
    const searchParams = new URLSearchParams();
    searchParams.set('stop', stopID);

    // Underscore is used in the destinations toggle to indicate "all destinations".
    if (destinationID && destinationID !== '_') {
        searchParams.set('destination', destinationID);
    }

    return `/stop?${searchParams.toString()}`;
};
