import axios from 'axios';
import { I18nManager } from 'react-native';
import { AsyncKeys, getItem } from './helpers';
const { isRTL } = I18nManager;
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
    const { token } = (await getItem(AsyncKeys.USER_DATA)) || '';
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
);

export const firebaseConfig = {
  apiKey: 'AIzaSyBITXu2-R64qnxBqfeEQN-wuA_rz5bwALU',
  // authDomain: 'your-auth-domain-b1234.firebaseapp.com',
  databaseURL: 'https://taym-app.firebaseio.com',
  projectId: 'taym-app',
  storageBucket: 'taym-app.appspot.com',
  messagingSenderId: '12345-insert-yourse',
  appId: '1:226921527475:ios:06480b227cac08368898c6',
};
