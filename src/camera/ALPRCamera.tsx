import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, runAsync, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import { OCRFrame, scanOCR } from '@DanInDev/vision-camera-ocr';
import { Worklets } from 'react-native-worklets-core';
import { applyFilters } from '../filtering/filterService';
import { callLimiter } from '../api/callLimiter';
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

export const ALPRCamera: React.FC<ALPRCameraProps> = ({
  OnPlateRecognized,
  OnCallLimitReached,
  OnPictureTaken,
  callLimit,
  defaultFilter,
  children,
  takePictureButtonStyle,
  takePictureButtonTextStyle,
}: ALPRCameraProps) => {

  // Camera permission hook
  const { hasPermission, requestPermission } = useCameraPermission();

  /**
  * @param device Reference to the specfic camera device, such as front, back wide etc.
  */
  const device = useCameraDevice('back');

  /**
  * @param camera Reference to the camera instance.
  */
  const camera = useRef<Camera>(null);

  // State for active filter
  const [activeFilter] = useState(defaultFilter || 'DK');


  // Ref for active filter to use in frame processor
  const activeFilterRef = useRef(activeFilter);

  /**
   * Finds license plates in the OCR frame, applies filters, and makes API calls.
   * 
   * @param {OCRFrame} ocrFrame - The OCR frame to process.
   */
  
    const findPlatesAndVerify = Worklets.createRunOnJS((ocrFrame: OCRFrame) => {
  
      // Recognize license plates in the OCR frame, iterating over the collection of filters
      const ocrResult = applyFilters(ocrFrame, activeFilterRef.current);
  
      if (OnPlateRecognized) { // Check if the callback function has been implemented
        OnPlateRecognized(ocrResult); // A licenseplate has been recognized on the frame, return the result
      }
  
      if (ocrResult !== null) {
  
        // Invoke OnCallLimitReached when a license plate has been recognized 'callLimit' times
        callLimiter(ocrResult, callLimit || 0, (result: string | null) => {
          if (result !== null) {
            console.log(
              'APILimiter[' + (callLimit || 0) + '] has recognized: ' + ocrResult + '\n'
            );
            if (OnCallLimitReached) { // Add null check
              OnCallLimitReached(result);
            }
          }
        });
      }
    });
  
    //const findPlatesFunction = Worklets.createRunOnJS(findPlatesAndVerify);


    /*
    // Function to make sure TS doesn't complain about the parameters and functions
  function findPlatesTS(ocrFrame: OCRFrame) {

    // Recognize license plates in the OCR frame, iterating over the collection of filters
    const ocrResult = applyFilters(ocrFrame, activeFilterRef.current);

    if (OnPlateRecognized) { // Check if the callback function has been implemented
      OnPlateRecognized(ocrResult); // A licenseplate has been recognized on the frame, return the result
    }

    if (ocrResult !== null) {

      // Invoke OnCallLimitReached when a license plate has been recognized 'callLimit' times
      callLimiter(ocrResult, callLimit || 0, (result: string | null) => {
        if (result !== null) {
          console.log(
            'APILimiter[' + (callLimit || 0) + '] has recognized: ' + ocrResult + '\n'
          );
          if (OnCallLimitReached) { // Add null check
            OnCallLimitReached(result);
          }
        }
      });
    }
  }
  */
  /**
   * Takes a picture using the provided camera reference and returns the image path.
   *
   * @returns {Promise<string | null>} The image path.
   */
  const takePicture = async (): Promise<string | null> => {

    if (camera.current !== null) {
      // Take a picture without shuttersound with the camera reference.
      const file = await camera.current.takePhoto({
        enableShutterSound: false,
      })

      // If function has been implemented, return the image path
      if (OnPictureTaken) {
        OnPictureTaken(file.path);
      }
      return file.path;
    }
    console.log('Camera not found')
    return null
  }


  // Main Frame processor to process camera frames
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'

    // Run the OCR frame processor in an async function
    runAsync(frame, () => {
      'worklet'

      // Scan the OCR frame with Vision-Camera-OCR
      const ocrFrame = scanOCR(frame);

      console.log('OCR Frame: ', ocrFrame);
      // Find license plates in the OCR frame and use the callback function to update the OCR result
      findPlatesAndVerify(ocrFrame);
    });
  }, []);

  // Render camera component or permission request message based on permission and device availability
  if (!hasPermission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{'Camera Permission Denied'}</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Request Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Camera Device Found</Text>
      </View>
    );
  }

  // Render camera component with frame processor
  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        photo={true}
      />
      {/* Additional children */}
      {children}

      {/* Take picture button with option to customize a style */}

      
     
        <TouchableOpacity
          onPress={takePicture}
          style={takePictureButtonStyle}
        ></TouchableOpacity>
        <Text style={takePictureButtonTextStyle}>Take Picture</Text>

    </View>
  );
};

export default ALPRCamera
