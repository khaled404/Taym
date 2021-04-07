/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FC, useEffect, useState} from 'react';
import {I18nManager, Platform, StatusBar, StyleSheet, View} from 'react-native';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import FlashMessage from 'react-native-flash-message';
import ar from './src/localization/ar';
import en from './src/localization/en';
import {Colors, Fonts, ScreenOptions} from './src/constants/styleConstants';
import AppInitializer from './src/screens/AppInitializer';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {firebaseConfig} from './src/constants/Config';
import {AsyncKeys, saveItem} from './src/constants/helpers';
import {useDispatch, useSelector} from "react-redux";
import {createUpdateDeviceApi} from "./src/store/actions/settings";
import {RootState} from "./src/store/store";
import {getUniqueId} from 'react-native-device-info';

const {isRTL, forceRTL, allowRTL} = I18nManager;

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: ar,
    },
    en: {
      translation: en,
    },
  },
  lng: isRTL ? 'ar' : 'en',
  fallbackLng: isRTL ? 'ar' : 'en',
  interpolation: {
    escapeValue: false,
  },
});

const App: FC = () => {
  const dispatch = useDispatch();

  const {isRTL}: any = useSelector((state: RootState) => state.settings);
  const {isLogin} = useSelector((state: RootState) => state.auth);
  const [fcmToken, setFcmToken] = useState<string>('');
  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      const token = await messaging().getToken();
      setFcmToken(token);
      await saveItem(AsyncKeys.NOTFICTION_TOKEN, token);
      if (enabled) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app(); // if already initialized, use that one
      }
    }
    requestUserPermission();
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage: any) => {
        if (remoteMessage) {
          console.log(remoteMessage);
        }
      });
  }, []);

  useEffect(() => {
    let uuid = getUniqueId();
    if (isLogin && uuid !== null && uuid !== undefined) {
      dispatch(createUpdateDeviceApi(fcmToken, uuid));
    }
  }, [fcmToken]);
  return (
    <>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: Colors.minColor,
        }}
      />
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <AppInitializer/>

      <FlashMessage
        position="top"
        hideOnPress={true}
        style={{paddingTop: ScreenOptions.StatusBarHeight}}
        titleStyle={{
          fontFamily: Fonts.medium,
          paddingTop: ScreenOptions.StatusBarHeight,
        }}
        textStyle={{
          fontFamily: Fonts.medium,
        }}
      />
    </>
  );
};

export default App;
