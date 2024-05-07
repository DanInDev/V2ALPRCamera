import React, {useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';

export const ALPRCamera: React.FC = () => {

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
        photo={true}
      />
      {/* Take picture button with option to customize a style */}
    </View>
  );
};

export default ALPRCamera
