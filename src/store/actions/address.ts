import {Dispatch} from 'redux';
import {ActionType} from './actions';
import {AsyncKeys, getItem, saveItem} from '../../constants/helpers';
import {axiosAPI} from '../../constants/Config';
import {IDispatch} from '../../constants/interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

export const saveAddressList = (payload: []) => ({
  type: ActionType.SAVE_ADDRESSLIST,
  payload,
});

export const getUserAddressApi = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.get(`user/user-addresses`);
      dispatch(saveAddressList(data.data.addresses));
    } catch (error) {
      console.log('getUserAddressApiError', error.response);
    }
  };
};

export const deleteAddress = (payload: []) => ({
  type: ActionType.DELETE_ADDRESS,
  payload,
});

export const deleteAddressApi = (
  addressId: number,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post(
        `user/delete-user-address/${addressId}`,
      );
      console.log('deleteAddressApi data', data);
      cb(true);
    } catch (error) {
      console.log('deleteAddressApiError', error?.response);
    }
  };
};
