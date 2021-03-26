import {Dispatch} from 'redux';
import {axiosAPI} from '../../constants/Config';
import {IDispatch} from '../../constants/interfaces';
import {ActionType} from './actions';
import {AsyncKeys, getItem, saveItem} from '../../constants/helpers';
import {showMessage} from 'react-native-flash-message';

/**
 * save user data to redux state and  asyncstorage
 * @param payload object with user data
 */
export const SaveUserDataHandler = (payload: any) => ({
  type: ActionType.SAVE_USER_DATA,
  payload: payload,
});
/**
 * logout user
 * @param cb callback function
 */
export const LogoutHandler = (cb?: () => void) => {
  return (dispatch: Dispatch<IDispatch>) => {
    dispatch({type: ActionType.LOGOUT});
    cb && cb();
  };
};
