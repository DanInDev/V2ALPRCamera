import React from 'react';
import { ALPRCameraProps } from './ALPRCameraProps';
/**
 * Automatic Licenseplate Reader (ALPR) Camera component that recognizes license plates in real-time.
 * Utilizing the Vision-Camera-OCR library to scan OCR frames and applies custom reg-ex filters apply filters
 * to recognize license plates. Default start values are set to Danish license plates.
 *
 * You can customize the filters by providing an array of filter options in the style of {@link ALPRCameraProps | filterOptions} prop.
 *
 * @param {ALPRCameraProps} - The properties of the ALPR camera component.
 * @param {Function} [OnPlateRecognized] - Function invoked when a plate is recognized.
 * @param {Function} [OnPictureTaken] - Function invoked when a picture is taken.
 * @param {ViewStyle} [takePictureButtonStyle] - ViewStyle for the take picture button.
 * @param {TextStyle} [takePictureButtonTextStyle] - TextStyle for the take picture button's text.
 * @param {Function} OnCallLimitReached - Function invoked when the call limit is reached.
 * @param {number} callLimit - The amount of times a license plate has to be read before it triggers this function.
 * @param {FilterOptions[]} [filterOptions] - Array of filter options to be applied for license plate recognition.
 * @param {'GENERAL' | 'DK'} [defaultFilter] - Explicitly set the default filter to be applied if no FilterOptions are provided.
 *
 * @param {ReactNode} [children] - Option to implement children nodes inside the ALPR camera.
 */
export declare const ALPRCamera: React.FC<ALPRCameraProps>;
export default ALPRCamera;
