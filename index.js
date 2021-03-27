// @ts-nocheck
/**
 * @format
 */
import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/store';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';

enableScreens();
// if (!I18nManager.isRTL) {
//   I18nManager.allowRTL(true);
//   I18nManager.forceRTL(true);
//   RNRestart.Restart();
// }
LogBox.ignoreLogs([
  'Remote debugger',
  "Looks like you're passing an inline function",
  'Cannot update a component (`initNavgtion`) while rendering',
  'Warning: Cannot update a component from inside the function body of a different component',
  "Warning: Can't perform a React state update on an unmounted component.",
  'interpolate() was renamed to interpolateNode() in Reanimated 2. Please use interpolateNode() instead',
]);
const RNapp = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={false}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNapp);
