import {Dispatch} from 'redux';
import {axiosAPI} from '../../constants/Config';
import {IDispatch} from '../../constants/interfaces';
import {ActionType} from './actions';
import {AsyncKeys, saveItem} from '../../constants/helpers';
import {showMessage} from 'react-native-flash-message';

/**
 * Get Voucher Data
 * @param cb callback function with response
 **/

export const getVoucherData = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.get('user/get-user-vouchers');

      dispatch({
        type: ActionType.GET_USER_VOUCHERS_ERROR,
        payload: {},
      });
      await saveItem(AsyncKeys.GET_USER_VOUCHERS, data);
      dispatch({
        type: ActionType.GET_USER_VOUCHERS,
        payload: data,
      });
      await saveItem(AsyncKeys.GET_USER_VOUCHERS, data);
    } catch (error) {
      dispatch({
        type: ActionType.GET_USER_VOUCHERS_ERROR,
        payload: error?.response.data.message,
      });
      showMessage({
        message: error?.response.data.message,
        type: 'danger',
      });
      console.log(error?.response.data.message, 'erroe');
    }
  };
};

/**
 * Add Voucher
 * @param code Voucher Code
 * @param cb callback function with success is true or false
 **/

export const addVoucher = (code: string, cb: (success?: boolean) => void) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('user/add-user-voucher', {
        code,
      });
      {
        console.log('addVoucher', data);

        data.message !== 'Voucher Added'
          ? showMessage({
              message: data.message,
              type: 'danger',
            })
          : showMessage({
              message: data.message,
              type: 'success',
            });

        dispatch({
          type: ActionType.ADD_USER_VOUCHER,
          payload: data,
        });

        // showMessage({
        //   message: data.message,
        //   type: 'success',
        // });

        console.log(data, 'add voucher ...');
        cb(true);
      }
    } catch (error) {
      cb(false);
      dispatch({
        type: ActionType.ADD_USER_VOUCHER_ERROR,
        payload: error?.response.data.message,
      });
      console.log(error?.response.data.message);
    }
  };
};
