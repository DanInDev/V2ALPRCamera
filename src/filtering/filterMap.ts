import { FilterOptions, DK, GENERAL } from "./filterOptions";

/**
 * Map to store filter options arrays with their respective names as keys.
 * @param Key: String, the filter name
 * @param Value: Array of filter options
 */
export const filterMap: Map<string, FilterOptions[]> = new Map();

// Add default filter functions to the map
filterMap.set('DK', DK);
filterMap.set('GENERAL', GENERAL);

/**
 * Adds a new filter function to the map.
 * 
 * @param filterName The name and key of the filter.
 * @param filterOptions The filter options to add.
 */
export function addFilterToMap(filterName: string, filterOptions: FilterOptions[]) {
  filterMap.set(filterName, filterOptions);
}

/**
 * Removes a filter function from the map from a key.
 * 
 * @param filterName The name and key of the filter.
 */
export function removeFilterFromMap(filterName: string) {
    filterMap.delete(filterName);
  }
