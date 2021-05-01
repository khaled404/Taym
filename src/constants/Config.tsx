import axios from 'axios';
import {I18nManager} from 'react-native';
import {AsyncKeys, getItem} from './helpers';
const {isRTL} = I18nManager;
export const MAP_API_KEY = 'AIzaSyDmfm9uFCdrlYQGek9WhcQ2mxMYpH1SdJs';
export const baseUrl = 'https://staging.backend.trytaym.com/api/App/v1/';
export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Language': isRTL ? 'ar' : 'en',
  Lang: isRTL ? 'ar' : 'en',
};

export const axiosAPI = axios.create({
  baseURL: baseUrl,
  headers: headers,
});
axiosAPI.interceptors.request.use(
  async config => {
    const {token} = (await getItem(AsyncKeys.USER_DATA)) || '';
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
);

export const firebaseConfig = {
  apiKey: 'AIzaSyAc-v0ZUwf9iCYOBu2Eg4UYCBW0qyzH1S0',
  // authDomain: 'your-auth-domain-b1234.firebaseapp.com',
  databaseURL: 'https://taym-978cc.firebaseapp.com',
  projectId: 'taym-978cc',
  storageBucket: 'taym-978cc.appspot.com',
  messagingSenderId: '1092909459597',
  appId: '1:1092909459597:ios:594c64ae4ac042d8f9dac4',
};
