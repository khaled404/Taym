import React, {FC, useEffect, useState} from 'react';
import {I18nManager, Platform, StatusBar, StyleSheet, View,} from 'react-native';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import FlashMessage from 'react-native-flash-message';
import ar from './src/localization/ar';
import en from './src/localization/en';
import {Colors, Fonts, ScreenOptions} from './src/constants/styleConstants';
import AppInitializer from './src/screens/AppInitializer';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {firebaseConfig, MAP_API_KEY} from './src/constants/Config';
import {AsyncKeys, saveItem} from './src/constants/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {createUpdateDeviceApi} from './src/store/actions/settings';
import {RootState} from './src/store/store';
import {getUniqueId} from 'react-native-device-info';
import {GoogleAnalyticsTracker} from "react-native-google-analytics-bridge";
import Geocoder from "react-native-geocoding";

let tracker = new GoogleAnalyticsTracker("UA-195901314-1");
const payload = {session: "start"};
tracker.trackScreenView("Home", payload);
tracker.trackScreenView("Login", payload);
tracker.trackScreenView("Category", payload);

const {isRTL} = I18nManager;
Geocoder.init(MAP_API_KEY, {language: isRTL ? 'ar' : 'en'});
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

  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const [fcmToken, setFcmToken] = useState('');
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
        firebase.app();
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
        style={{
          paddingTop: Platform.OS !== 'ios' ? ScreenOptions.StatusBarHeight : 5,
        }}
        titleStyle={{
          fontFamily: Fonts.medium,
          paddingTop:
            Platform.OS !== 'ios' ? ScreenOptions.StatusBarHeight : 10,
          alignSelf: 'flex-start'
        }}
        textStyle={{
          fontFamily: Fonts.medium,
        }}
        floating={Platform.OS === 'ios'}
      />
    </>
  );
};

export default App;
