import { BlockToString, isWithinFilterOption, sanitizeString } from './filterHelper';
import { filterMap } from './filterMap';
/*

      Defines main filter functions for processing OCR frames.

*/
/**
 * Finds the TextBlock with the highest X coordinate in the OCRFrame.
 *
 * @param {TextBlock[]} blocks - The array of TextBlocks to search.
 * @returns {TextBlock | null} - The TextBlock with the highest X coordinate, or null if no blocks are provided.
 *
 * @NOTE Since camera stream is mirrored and flipped, highest X in this case is the point
 *       closest to the bottom of the screen when in portrait mode.
 */
export const findBlockWithHighestX = (blocks) => {
    let highestX = 0;
    let blockWithHighestX = null;
    blocks.forEach(block => {
        if (block.frame.boundingCenterX > highestX) {
            highestX = block.frame.boundingCenterX;
            blockWithHighestX = block;
        }
    });
    // Return the block with the highest x value
    return blockWithHighestX;
};
/**
 * Filters OCRFrame results with multiple filter options.
 *
 * @param {OCRFrame} result - The OCRFrame to filter. @OCRFrame is the object returned from the vision-camera-ocr library when using SCANOCR(frame)
 * @param {FilterOptions[]} optionsList - The list of filter options to apply.
 * @returns {TextBlock[] | null} - The filtered TextBlocks, or null if no blocks pass any filters.
 */
export const filterWithMultipleOptions = (result, optionsList) => {
    // Define the blocks that passes through filter
    const filteredBlocks = [];
    // Print the amount of blocks to filter
    console.log('Amount of Blocks to Filter: ', result.result.blocks.length);
    // Loop through all blocks
    for (const block of result.result.blocks) {
        // Loop through all filter options
        for (const option of optionsList) {
            if (isWithinFilterOption(block, option)) {
                console.log('[', block.text, '] Passed Filter: ', option.name);
                filteredBlocks.push(block); // Keep the block in the result
                break; // Break the option loop if it is within a filter
            }
            else {
                console.log('[', block.text, '] Did not pass Filter: ', option.name);
            }
        }
    }
    // Check if there are any filtered blocks
    if (filteredBlocks.length > 0) {
        console.log(filteredBlocks.length, ' block(s) passed filter');
        return filteredBlocks;
    }
    else {
        console.log('No blocks passed filter or no blocks to filter');
        return null;
    }
};
/**
 * Applies the current filter to an OCRFrame, checks if there is multiple license plates,
 * which returns the sanitized license plate closest to the bottom of the screen.
 *
 * @param {OCRFrame} ocrFrame - The OCRFrame to apply the filter to.
 * @param {string} activeFilter - The currently active filter name.
 * @returns {string | null} - The sanitized recognized text, or null if no text is recognized.
 */
export function applyFilterFunctions(ocrFrame, activeFilter) {
    // Get the filter function from the map
    const filterAsArray = filterMap.get(activeFilter);
    if (!filterAsArray) {
        console.log('No filter found, returning null');
        return null;
    }
    // Iterate through each filter option
    for (const filterName of filterAsArray) {
        // Extract the name property from the filter options
        const { name } = filterName;
        // Print only the country property
        console.log('Filtering with:', name);
        // Filter the OCR frame with the specified filter
        const filteredResults = filterWithMultipleOptions(ocrFrame, filterAsArray);
        // Check if there are any filtered results
        if (filteredResults !== null) {
            // Check if there is only one filtered result
            if (filteredResults.length === 1) {
                const recognizedText = filteredResults[0] ? BlockToString(filteredResults[0]) : '';
                return sanitizeString(recognizedText);
            }
            else {
                // If there are multiple filtered results, return the one with the highest X coordinate
                const lowestBlock = findBlockWithHighestX(filteredResults);
                const recognizedText = lowestBlock ? BlockToString(lowestBlock) : '';
                return sanitizeString(recognizedText);
            }
        }
    }
    console.log('No filtered results, returning null');
    return null;
}
