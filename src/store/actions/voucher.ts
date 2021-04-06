import { Dispatch } from 'redux';
import { axiosAPI } from '../../constants/Config';
import { IDispatch } from '../../constants/interfaces';
import { ActionType } from './actions';
import { AsyncKeys, getItem } from '../../constants/helpers';
import axios from 'axios';

/**
 * Get Voucher Data
 * @param cb callback function with response 
 **/

export const getVoucherData = () => {
    console.log('...........')

    return async (dispatch: Dispatch<IDispatch>) => {
        console.log('...........')
        try {
            const { data } = await axiosAPI.get('user/get-user-vouchers') // response

            dispatch({
                type: ActionType.GET_USER_VOUCHERS_ERROR,
                payload: {},
            });
            dispatch({
                type: ActionType.GET_USER_VOUCHERS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ActionType.GET_USER_VOUCHERS_ERROR,
                payload: error?.response.data.message,
            });
            console.log(error?.response.data.message);
        }
    };
};

/**
* Add Voucher 
* @param code Voucher Code 
* @param cb callback function with success is true or false
**/

export const addVoucher = (
    code: string,
    cb: (success?: boolean) => void,

) => {

    return async (dispatch: Dispatch<IDispatch>) => {
        console.log('...........')
        try {
            const { data } = await axiosAPI.post('user/add-user-voucher', {
                code
            })

            dispatch({
                type: ActionType.ADD_USER_VOUCHER_ERROR,
                payload: {},
            });
            dispatch({
                type: ActionType.ADD_USER_VOUCHER,
                payload: data,
            });
            console.log(data);
            cb(true);
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