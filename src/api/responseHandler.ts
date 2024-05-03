// Define the apiResponse interface
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

export const isWithinWarningMinutes = (expirationTime: string, warningMinutes?: string): boolean => {
 
  // If warningMinutes is not defined, return false
  if (!warningMinutes) {
    return false;
  }

  // Parse expirationTime string into a Date object
  const expirationDate = new Date(expirationTime);

  // Calculate remaining time in minutes
  const currentTime = new Date();
  const millisecondsDifference = expirationDate.getTime() - currentTime.getTime();
  const remainingTimeMinutes = Math.floor(millisecondsDifference / 60000);

  // Check if remaining time is within warningMinutes
  return remainingTimeMinutes <= parseInt(warningMinutes);
};

/**
 * Handles the API response, determining permission status and whether the remaining time
 * until expiration is within the warning period.
 * 
 * @param {apiResponse | undefined} response - The API response object.
 * @returns {[boolean, boolean]} - A tuple with two booleans [0] indicating permission status and [1] 
 *                                 whether the remaining time is within the warning period.
 */

export const handleResponse = (response: apiResponse | undefined): [boolean, boolean] => {
  try {
    if (!response) {
      return [false, false]; // Return false for both values if response is null
    }

    switch (true) {
      case !response.expirationTime:
        return [true, false]; // Return true for hasPermission, but false for isWithinWarning if expirationTime is missing
      
      default:
        // Check if remaining time is within warning minutes
        if (response.expirationTime && response.warningMinutes) {
          const isWithinWarning = isWithinWarningMinutes(response.expirationTime, response.warningMinutes);
          return [true, isWithinWarning];
        } else {
          return [true, false];
        }
    }
  } catch (error: unknown) {
    console.error('Error handling response:', (error as Error).message);
    return [false, false]; // Return false for both values if there is an error
  }
};