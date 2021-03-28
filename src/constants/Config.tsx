import axios from 'axios';
import {I18nManager} from 'react-native';
import {AsyncKeys, getItem} from './helpers';
const {isRTL} = I18nManager;
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
