import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
  userData: {},
  isLogin: false,
  onboarding: false,
};
export default (state = initialState, {type, payload}: IReduser) => {
  switch (type) {
    case ActionType.SAVE_USER_DATA:
      return {
        ...state,
        userData: payload,
        isLogin: true,
        onboarding: true,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        userData: {},
        isLogin: false,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        userData: {},
        isLogin: false,
      };
  }
  return state;
};
