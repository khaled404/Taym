import {Dispatch} from 'redux';
import {ActionType} from './actions';
import {I18nManager} from 'react-native';
import {AsyncKeys, getItem} from '../../constants/helpers';
import RNRestart from 'react-native-restart';
import {axiosAPI} from '../../constants/Config';
import {IDispatch} from '../../constants/interfaces';
import {getVoucherData} from './voucher';
import {saveCategories} from './categories';
import {getUserAddressApi} from './address';
import Geolocation from '@react-native-community/geolocation';
import {RootState} from '../store';

const {allowRTL, forceRTL, swapLeftAndRightInRTL} = I18nManager;

export const loadApp = () => ({
  type: ActionType.APP_LOADED,
});

export const toggleLanguage = (payload: boolean) => ({
  type: ActionType.CHANGE_LANGUAGE,
  payload,
});

export const saveCurrentLocationData = (payload: string) => ({
  type: ActionType.SAVE_CURRENT_LOCATION_DATA,
  payload,
});

export const createUpdateDevice = (payload: boolean) => ({
  type: ActionType.CREATE_UPDATE_DEVICE,
  payload,
});

export const createUpdateDeviceApi = (fcm_token: string, uuid: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const {data} = await axiosAPI.post(`user/update-or-create-device`, {
        fcm_token,
        uuid,
      });
      console.log('createUpdateDeviceApidata', data);
    } catch (error) {
      console.log('createUpdateDeviceApiError', error.response);
    }
  };
};

const getCurrentLocation = async (latLong: any) => {
  Geolocation.getCurrentPosition(position => {
    console.log('getCurrentPosition info', position);
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  });
};

export const userHomeApi = (latLong: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log(`${latLong.latitude},${latLong.longitude}`);
      const {data} = await axiosAPI.post(`guest/user-home`, {
        // latLong: `30.880490,29.565331`,
        latLong: `${latLong.latitude},${latLong.longitude}`,
      });
      dispatch(saveCategories(data.data.categories));
      console.log('data.data', data.data);
      dispatch({
        type: ActionType.SAVE_USER_LOCATION_SUPPORT,
        payload: data.data.locationSupport,
      });
    } catch (error) {
      console.log('userHomeApiError', error?.response);
    }
  };
};

const updateUserVouchers = () => {
  return async (dispatch: Dispatch<any>) => {
    let userVouchers = await getItem(AsyncKeys.GET_USER_VOUCHERS);
    console.log('userV', userVouchers);
    if (userVouchers !== null) {
      dispatch({
        type: ActionType.GET_USER_VOUCHERS,
        payload: userVouchers,
      });
    } else {
      dispatch(getVoucherData());
    }
  };
};

export const initializApp = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    try {
      if (getState().auth.userData?.token !== undefined) {
        dispatch(getUserAddressApi());
        dispatch(updateUserVouchers());
      }
      dispatch(loadApp());
    } catch (error) {
      console.log('initializApp', error);
    }
  };
};

export const LanguageHandler = (lang: string) => {
  return (dispatch: Dispatch<IDispatch>) => {
    dispatch({type: ActionType.SAVE_LANGUAGE, payload: lang});
    allowRTL(lang === 'ar');
    forceRTL(lang === 'ar');
    swapLeftAndRightInRTL(lang === 'ar');
    setTimeout(() => {
      RNRestart.Restart();
    }, 500);
  };
};
