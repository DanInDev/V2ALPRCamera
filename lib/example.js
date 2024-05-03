import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ALPRCamera } from "./camera/ALPRCamera";
const example = () => {
    const [ocrResult, setOCRResult] = useState(null);
    const [callResult, setCallResult] = useState(null);
    const [imagePath, setImagePath] = useState();
    // Callback function to handle OCR result update
    const handleOCRResultUpdate = (result) => {
        console.log("OCRResultUpdate has the result:", result);
        setOCRResult(result);
    };
    // Callback function to handle call result update
    const handleCallResultUpdate = (result) => {
        console.log('CallResultUpdate has the result:', result);
        setCallResult(result);
    };
    // Callback function to handle image blob update
    const handleImageTaken = (path) => {
        setImagePath(path);
        console.log("Image has the path:", path); // Log the image 
    };
    return (<React.Fragment>
        <ALPRCamera OnPlateRecognized={handleOCRResultUpdate} OnCallLimitReached={handleCallResultUpdate} callLimit={5} OnPictureTaken={handleImageTaken} takePictureButtonStyle={buttonStyles.button} takePictureButtonTextStyle={buttonStyles.buttonText} defaultFilter="DK"/>

        <View>
            <Text>Current License Plate: {ocrResult}</Text>
            <Text>Last Called Result: {callResult}</Text>
            <Text>Last Image Path: {imagePath}</Text>
        </View>
    </React.Fragment>);
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
        display: 'none',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
});
export default example;
