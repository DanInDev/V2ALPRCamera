import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Camera,
  runAsync,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {scanOCR} from '@DanInDev/vision-camera-ocr';

function App() {
  // Ask for Camera Permissions via. React-Native hook
  const { hasPermission, requestPermission } = useCameraPermission();

  // Specify we are using the back camera
  const device = useCameraDevice('back');

  // Main frame processor, doing OCR async away from the camera thread
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    runAsync(frame, () => {
      'worklet'

      // vision-camera-ocr to scan all text in the frame
      const ocrFrame = scanOCR(frame);

      console.log (ocrFrame)

    });
  }, []);


  // If camera permission is denied, render a message to request permission
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

  // If no camera device is found, render a message indicating so
  if (device == null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Camera Device Found</Text>
      </View>
    );
  }

  // Render the camera view, toggle filter button, and OCR result if available
  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        frameProcessor={frameProcessor}
        isActive={true}
        photo={true}
        video={true}
      />
    </>
  );
}

export default App;
