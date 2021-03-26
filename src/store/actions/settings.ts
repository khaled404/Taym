import {Dispatch} from 'redux';
import {AsyncKeys, getItem} from '../../constants/helpers';
import {ActionType} from './actions';

export const loadApp = () => ({
  type: ActionType.APP_LOADED,
});
export const initializApp = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(loadApp());
    } catch (error) {
      console.log('initializApp', error);
    }
  };
};
