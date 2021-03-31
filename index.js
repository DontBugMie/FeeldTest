// This has to be the first import in this file
// see: https://reactnavigation.org/docs/en/getting-started.html
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
