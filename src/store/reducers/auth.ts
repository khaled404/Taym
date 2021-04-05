import { IReduser } from '../../constants/interfaces';
import { ActionType } from '../actions/actions';

const initialState = {
  userData: {},
  isLogin: false,
  registerErorrs: {},
  loginErorrs: {},
  forgetPasswordErorrs: {},
  phoneNumber: '',
};
export default (state = initialState, { type, payload }: IReduser) => {
  switch (type) {
    case ActionType.SAVE_USER_DATA_STEP_1:
      return {
        ...state,
        userData: payload,
      };
    case ActionType.SAVE_USER_DATA_STEP_2:
      return {
        ...state,
        userData: { ...state.userData, phone: payload },
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

    case ActionType.LOGOUT:
      return {
        ...state,
        userData: {},
        isLogin: false,
      };
    case ActionType.SAVE_REGISTER_ERORRS:
      return { ...state, registerErorrs: payload };
    case ActionType.SAVE_LOGIN_ERORRS:
      return { ...state, loginErorrs: payload };
    case ActionType.SAVE_FORGET_PASSWORD_ERORRS:
      return { ...state, forgetPasswordErorrs: payload };
    case ActionType.SAVE_PHONE:
      return { ...state, phoneNumber: payload };
  }
  return state;
};
