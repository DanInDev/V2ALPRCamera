import { ReactNode } from 'react';
import { FilterOptions } from '../filtering/filterOptions';
import { TextStyle, ViewStyle } from 'react-native';
/**
  
  * The properties of the ALPR camera component.
  
 */
export interface ALPRCameraProps {
    /**
     * Function invoked when a plate is recognized.
     *
     * @param {string | null} result - The recognized plate.
     */
    OnPlateRecognized?: (result: string | null) => void;
    /**
     * Function invoked when a picture is taken.
     *
     * @param {string | null} string - The image path.
     */
    OnPictureTaken?: (string: string | null) => void;
    /**
     * @param takePictureButtonStyle ViewStyle for the take picture button
     */
    takePictureButtonStyle?: ViewStyle;
    /**
     * @param takePictureButtonTextStyle TextStyle for the take picture button's text
     */
    takePictureButtonTextStyle?: TextStyle;
    /**
     * Function invoked when the call limit is reached.
     *
     * @param {string | null} result - The result indicating API call limit reached.
     */
    OnCallLimitReached?: (result: string | null) => void;
    /**
     * The amount of times a license plate has to be read before it triggers this function.
     * See {@link callLimiter} for more specifics.
     */
    callLimit?: number;
    /**
     * Array of filter options to be applied for license plate recognition.
     * Each filter option defines the criteria for recognizing specific types of license plates.
     * See {@link FilterOptions} for the structure of each filter option.
     */
    filterOptions?: FilterOptions[];
    /**
     * Explicitly set the default filter to be applied if no FilterOptions are provided.
     * Choose between 'GENERAL' or 'DK' (Default).
     */
    defaultFilter?: 'GENERAL' | 'DK';
    /**
     *  Option to implement children nodes inside the ALPR camera.
     */
    children?: ReactNode;
}
export default ALPRCameraProps;
