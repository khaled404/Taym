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

const {allowRTL, forceRTL, swapLeftAndRightInRTL} = I18nManager;

export const loadApp = () => ({
  type: ActionType.APP_LOADED,
});

export const toggleLanguage = (payload: boolean) => ({
  type: ActionType.CHANGE_LANGUAGE,
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

export const userHomeApi = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const {data} = await axiosAPI.post(`guest/user-home`);
      dispatch(saveCategories(data.data.categories));
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
  return async (dispatch: Dispatch<any>) => {
    try {
      const userData = await getItem(AsyncKeys.USER_DATA);
      if (userData !== null) {
        dispatch(getUserAddressApi());
        dispatch(updateUserVouchers());
      }
      dispatch(userHomeApi());
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
