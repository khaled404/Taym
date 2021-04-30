import {Dispatch} from 'redux';
import {ActionType} from './actions';
import {AsyncKeys, getItem, saveItem} from '../../constants/helpers';
import {axiosAPI} from '../../constants/Config';
import {IDispatch} from '../../constants/interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {showMessage} from 'react-native-flash-message';

export const saveAddressList = (payload: []) => ({
  type: ActionType.SAVE_ADDRESSLIST,
  payload,
});
export const saveNewAddress = (payload: {}) => ({
  type: ActionType.SAVE_NEW_LOCATION_OBJ,
  payload,
});

export const getUserAddressApi = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.get(`user/user-addresses`);
      console.log('getUserAddressApi data',data)
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
      dispatch(saveAddressList(data.data.addresses));
      showMessage({
        message: data.data.message,
        type: 'success',
      });
      cb(true);
    } catch (error) {
      cb(false);
      showMessage({
        message: error?.response.data.error[0],
        type: 'danger',
      });
      console.log('deleteAddressApiError', error?.response);
    }
  };
};

interface IAddress {
  name: string;
  phone: string;
  area_id: string;
  street_name: string;
  building_no: string;
  floor_no: string;
  apartment_no: string;
  description: string;
  latitude: number;
  longitude: number;
}
export const addAddressApi = (
  addressData: IAddress,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post(
        `user/user-add-new-address`,
        addressData,
      );
      dispatch(saveAddressList(data.data.addresses));
      showMessage({
        message: data.data.message,
        type: 'success',
      });
      cb(true);
    } catch (error) {
      cb(false);
      // showMessage({
      //   message: error?.response,
      //   type: 'danger',
      // });
      console.log('addAddressApiError', error?.response);
    }
  };
};

export const editAddressApi = (
  addressId: string,
  addressData: IAddress,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post(
        `user/edit-user-address/${addressId}`,
        addressData,
      );
      dispatch(saveAddressList(data.data.addresses));
      showMessage({
        message: data.data.message,
        type: 'success',
      });
      cb(true);
    } catch (error) {
      cb(false);
      showMessage({
        message: error?.response.data.error[0],
        type: 'danger',
      });
      console.log('editAddressApiError', error?.response);
    }
  };
};
