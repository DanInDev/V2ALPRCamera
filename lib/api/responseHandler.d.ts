export interface apiResponse {
    expirationTime?: string;
    warningMinutes?: string;
}
/**
 * Checks if the remaining time until expiration is within the warning period.
 *
 * @param {string} expirationTime - The expiration time in string format.
 * @param {string | undefined} warningMinutes - Optional warning minutes.
 * @returns {boolean} - True if remaining time is within warning minutes, otherwise false.
 */
export declare const isWithinWarningMinutes: (expirationTime: string, warningMinutes?: string) => boolean;
/**
 * Handles the API response, determining permission status and whether the remaining time
 * until expiration is within the warning period.
 *
 * @param {apiResponse | undefined} response - The API response object.
 * @returns {[boolean, boolean]} - A tuple with two booleans [0] indicating permission status and [1]
 *                                 whether the remaining time is within the warning period.
 */
export declare const handleResponse: (response: apiResponse | undefined) => [boolean, boolean];
