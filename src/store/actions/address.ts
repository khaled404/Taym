import {Dispatch} from 'redux';
import {ActionType} from './actions';
import {AsyncKeys, getItem, saveItem} from '../../constants/helpers';
import {axiosAPI} from '../../constants/Config';
import {IDispatch} from '../../constants/interfaces';

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
