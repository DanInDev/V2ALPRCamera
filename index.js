/**
 * @format
 */

import {AppRegistry} from 'react-native';
import example from './example/src/App';
import ALPRCamera from './src/camera/ALPRCamera';
import {name as appName} from './app.json';

//AppRegistry.registerComponent(appName, () => ALPRCamera);

AppRegistry.registerComponent(appName, () => example);
