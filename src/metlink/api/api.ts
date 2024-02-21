
/**
 * Set API key from environment.
 * 
 * It should be set in a .env.local file (which must not land in the git repo).
 */
let api_key = import.meta.env.VITE_API_KEY;

export const getApiKey = () => api_key;

/**
 * This is only used for testing the unset key case.
 */
export const setApiKey = (key?: string) => {
    api_key = key;
};

/**
 * Get accept and api key headers for use in API calls.
 */
export const getHeaders = () => {
    const headers: { [key: string]: string } = {
        'accept': 'application/json',
    };
    if (api_key) {
        headers['x-api-key'] = api_key;
    }
    return headers;
};

export const ErrorHttp404 = new Error("Not found");

/**
 * Returns a handler to perform fetch and handle basic success/error responses.
 * 
 * HTTP 404's are returned as success with data set to ErrorHttp404.
 * 
 * Most errors are not introspectable because they tend to not have CORS headers
 * and so we don't get to see them. Instead, a generic TypeError is thrown by fetch().
 * 
 * Suitable for useQuery() queryFn option.
 */
export const queryFetch = ({ url, headers }: { url: string, headers: HeadersInit }) => (
    async () => {
        const response = await fetch(url, { headers: headers });
        if (!response.ok) {
            if (response.status == 404) {
                return ErrorHttp404;
            }
            throw new Error(`Request failed with ${response.statusText}`);
        }
        return await response.json();
    }
);

/**
 * Fetch time and any error are set upon api fetch completion
 * (success or failure).
 */
export type APIFetchTimeAndError = {
    fetchTime?: number;
    error?: Error;
};

/**
 * Example: "2024-01-22T14:10:00+13:00"
 */
export type ISO8601DateTime = string;

/**
 * Used to indicate how late/early a departure will be.
 * 
 * Examples: "PT0S", "-PT1M17S"
 * 
 * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
 */
export type Period = string;

export type Translation = {
    language: string;
    text: string;
};

export type Translations = {
    translation: Translation[];
};
