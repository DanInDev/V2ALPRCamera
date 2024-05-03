import { OCRFrame, TextBlock } from '@DanInDev/vision-camera-ocr';
import { FilterOptions } from './filterOptions';
/**
 * Finds the TextBlock with the highest X coordinate in the OCRFrame.
 *
 * @param {TextBlock[]} blocks - The array of TextBlocks to search.
 * @returns {TextBlock | null} - The TextBlock with the highest X coordinate, or null if no blocks are provided.
 *
 * @NOTE Since camera stream is mirrored and flipped, highest X in this case is the point
 *       closest to the bottom of the screen when in portrait mode.
 */
export declare const findBlockWithHighestX: (blocks: TextBlock[]) => TextBlock | null;
/**
 * Filters OCRFrame results with multiple filter options.
 *
 * @param {OCRFrame} result - The OCRFrame to filter. @OCRFrame is the object returned from the vision-camera-ocr library when using SCANOCR(frame)
 * @param {FilterOptions[]} optionsList - The list of filter options to apply.
 * @returns {TextBlock[] | null} - The filtered TextBlocks, or null if no blocks pass any filters.
 */
export declare const filterWithMultipleOptions: (result: OCRFrame, optionsList: FilterOptions[]) => TextBlock[] | null;
/**
 * Applies the current filter to an OCRFrame, checks if there is multiple license plates,
 * which returns the sanitized license plate closest to the bottom of the screen.
 *
 * @param {OCRFrame} ocrFrame - The OCRFrame to apply the filter to.
 * @param {string} activeFilter - The currently active filter name.
 * @returns {string | null} - The sanitized recognized text, or null if no text is recognized.
 */
export declare function applyFilterFunctions(ocrFrame: OCRFrame, activeFilter: string): string | null;
