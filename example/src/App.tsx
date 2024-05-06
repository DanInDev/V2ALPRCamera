import React, { useState } from "react";
import { View, Text, StyleSheet} from "react-native";

import { ALPRCamera } from "@alprapp/v2alpr-camera";

const example: React.FC = () => {

  const [ocrResult, setOCRResult] = useState<string | null>(null);
  const [callResult, setCallResult] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>();

  // Callback function to handle OCR result update
  const handleOCRResultUpdate = (result: string | null) => {
    console.log("OCRResultUpdate has the result:", result);
    setOCRResult(result);
  };

  // Callback function to handle call result update
const handleCallResultUpdate = (result: string | null) => {
  console.log ('CallResultUpdate has the result:', result);
    setCallResult(result);
};

// Callback function to handle image blob update
const handleImageTaken = (path: string | null) => {
    setImagePath(path);
    console.log("Image has the path:", path); // Log the image 
};

return (
    <React.Fragment>
        <ALPRCamera
            OnPlateRecognized={handleOCRResultUpdate}
            OnCallLimitReached={handleCallResultUpdate}
            callLimit={5}
            OnPictureTaken={handleImageTaken} 

            takePictureButtonStyle={buttonStyles.button}
            takePictureButtonTextStyle={buttonStyles.buttonText}

            defaultFilter="DK"
        />

        <View>
            <Text>Current License Plate: {ocrResult}</Text>
            <Text>Last Called Result: {callResult}</Text>
            <Text>Last Image Path: {imagePath}</Text>
        </View>
    </React.Fragment>
);
};

const buttonStyles = StyleSheet.create({
  button: {
   // display: 'none', // Remove this line if you want the button to be visible
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    display: 'none', // Remove this line if you want the button text to be visible
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default example;
