import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
  userData: {},
  isLogin: false,
  registerErorrs: {
    password:['the password must be 8 ']
  },
  loginErorrs: {},
  forgetPasswordErorrs: {},
  phoneNumber: '',
  locationSupport: false,
};
export default (state = initialState, {type, payload}: IReduser) => {
  switch (type) {
    case ActionType.SAVE_USER_DATA_STEP_1:
      return {
        ...state,
        userData: payload,
      };
    case ActionType.SAVE_USER_DATA_STEP_2:
      return {
        ...state,
        userData: {...state.userData, phone: payload.phone, token: payload.token},
      };
    case ActionType.SAVE_USER_DATA_STEP_3:
      return {
        ...state,
        isLogin: true,
      };
    case ActionType.SAVE_LOGIN_DATA:
      return {
        ...state,
        userData: payload,
        isLogin: true,
      };
    case ActionType.SAVE_USER_DATA_AFTER_VERIFY:
      return {
        ...state,
        isLogin: true,
        userData: {...state.userData, ...payload},
        // userData: {},
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        userData: {},
        isLogin: false,
      };
    case ActionType.SAVE_REGISTER_ERORRS:
      return {...state, registerErorrs: payload};
    case ActionType.SAVE_LOGIN_ERORRS:
      return {...state, loginErorrs: payload};
    case ActionType.SAVE_FORGET_PASSWORD_ERORRS:
      return {...state, forgetPasswordErorrs: payload};
    case ActionType.SAVE_PHONE:
      return {...state, phoneNumber: payload};
    case ActionType.SAVE_USER_LOCATION_SUPPORT:
      return {...state, locationSupport: payload};
  }
  return state;
};
