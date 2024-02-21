
/**
 * Localstorage key prefix for favorite stops.
 */
export const FAVS_KEY_PREFIX = 'favs/';

/**
 * Generate localstorage key for favorite for this stop and (optional) destination.
 * 
 * @todo hide this, instead expose get/set/clear (or just get/toggle) functions
 * which take a stop and destination.
 */
export const favsKey = (stopID: string, destinationID?: string): string =>
    `${FAVS_KEY_PREFIX}${stopID}${destinationID ? `/${destinationID}` : ''}`;

/**
 * Get list of favorite stop/destinations from localstorage. 
 */
export const getFavs = (): StopAndDestination[] => {
    const favs: StopAndDestination[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(FAVS_KEY_PREFIX)) {
            const stopAndDestination = key.substring(5).split('/');
            favs.push({
                stopID: stopAndDestination[0],
                 destinationID: stopAndDestination[1] || '', 
                 key: key,
            });
        }
    }
    return favs;
};

export type StopAndDestination = {
    stopID: string;
    destinationID?: string;

    key: string;
};
