import {Dispatch} from 'redux';
import {axiosAPI} from '../../constants/Config';
import {IDispatch} from '../../constants/interfaces';
import {ActionType} from './actions';
import {AsyncKeys, saveItem} from '../../constants/helpers';
import {showMessage} from 'react-native-flash-message';

/**
 * Register user step 1
 * @param name uer name
 * @param email user email
 * @param password user password
 * @param phone user phone number
 * @param cb callback function with success is true or false
 */
export const RegisterHandler = (
  name: string,
  email: string,
  password: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('guest/register-new-user', {
        name,
        email,
        password,
      });
      console.log('RegisterHandler data', data);

      dispatch({
        type: ActionType.SAVE_REGISTER_ERORRS,
        payload: {},
      });
      await saveItem(AsyncKeys.USER_DATA, data);
      dispatch({
        type: ActionType.SAVE_USER_DATA_STEP_1,
        payload: data,
      });
      await saveItem(AsyncKeys.USER_DATA, data);
      console.log(data);
      cb(true);
    } catch (error) {
      cb(false);
      dispatch({
        type: ActionType.SAVE_REGISTER_ERORRS,
        payload: error?.response.data.message,
      });
      console.log(error?.response.data.message);
    }
  };
};
/**
 * Register user step 2
 * @param phone uer phone number
 * @param cb callback function with success is true or false
 */
export const RegisterPhoneHandler = (
  phone: string,
  cb: (success?: boolean) => void,
  navigate: (screen: string) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('user/register-phone', {
        phone,
      });
      console.log('RegisterPhoneHandler', data);
      dispatch({
        type: ActionType.SAVE_REGISTER_ERORRS,
        payload: {},
      });
      dispatch({
        type: ActionType.SAVE_USER_DATA_STEP_2,
        payload: phone,
      });
      navigate('PhoneCode');
      cb(true);
    } catch (error) {
      cb(false);
      dispatch({
        type: ActionType.SAVE_REGISTER_ERORRS,
        payload: error?.response.data.message,
      });
      console.log(error?.response.data.message);
    }
  };
};

/**
 * Register user step 3
 * @param code otp code
 * @param cb callback function with success is true or false
 */
export const VerifyPhoneCodeHandler = (
  code: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('user/verify-phone', {
        code,
      });
      console.log(data);
      showMessage({
        message: data.message,
        type: 'info',
      });
      dispatch({
        type: ActionType.SAVE_USER_DATA_STEP_3,
      });

      cb(true);
    } catch (error) {
      cb(false);
      showMessage({
        message: error?.response.data.message.code[0],
        type: 'danger',
      });
      console.log(error?.response);
    }
  };
};

/**
 * Login user
 * @param email user email
 * @param password user password
 * @param cb callback function with success is true or false
 */
export const LoginHandler = (
  email: string,
  password: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('guest/login-user', {
        email,
        password,
      });
      console.log('LoginHandler data', data);
      dispatch({
        type: ActionType.SAVE_LOGIN_ERORRS,
        payload: {},
      });

      showMessage({
        message: data.success.message,
        type: 'success',
      });
      dispatch({
        type: ActionType.SAVE_LOGIN_DATA,
        payload: data.user,
      });
      await saveItem(AsyncKeys.USER_DATA, data.user);
      cb(true);
    } catch (error) {
      cb(false);
      dispatch({
        type: ActionType.SAVE_LOGIN_ERORRS,
        payload: error?.response.data.message,
      });
      {
        error.response.data.error?
        showMessage({
          message: error?.response.data.error,
          type: 'danger',
        })
        :null
      }
      console.log('Loginerorr', error?.response);
    }
  };
};

/**
 * Forget password step 1
 * @param phone user phone
 * @param cb callback function with success is true or false
 */
export const ForgetHandler = (
  phone: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('guest/forget-password-code', {
        phone,
      });
      showMessage({
        message: data.message,
        type: 'success',
      });
      dispatch({
        type: ActionType.SAVE_PHONE,
        payload: phone,
      });
      await saveItem(AsyncKeys.USER_DATA, data.user);
      cb(true);
    } catch (error) {
      cb(false);
      showMessage({
        message: error?.response.data.message,
        type: 'danger',
      });

      console.log(error?.response);
    }
  };
};

/**
 * Forget password step 2
 * @param code otp code
 * @param cb callback function with success is true or false
 */
export const VerifyPhoneForgetHandler = (
  token: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('guest/confirm-forget-password-code', {
        token,
      });
      console.log(data);
      showMessage({
        message: data.message,
        type: 'success',
      });

      cb(true);
    } catch (error) {
      console.log(error.response, 'err');
      cb(false);
      showMessage({
        message: error?.response.data.message.code[0],
        type: 'danger',
      });
      console.log(error?.response);
    }
  };
};

/**
 * Forget password step 3
 * @param phone user phone
 * @param password
 * @param password_confirmation
 * @param cb callback function with success is true or false
 */
export const NewPasswordHandler = (
  phone: string,
  password: string,
  password_confirmation: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('guest/forget-password-new-password', {
        phone,
        password,
        password_confirmation,
      });
      console.log(data);
      showMessage({
        message: data.message,
        type: 'success',
      });

      cb(true);
    } catch (error) {
      cb(false);

      console.log(error?.response);
    }
  };
};

/**
 * login user with social media apis
 * @param social_id Social user id
 * @param name user name
 * @param email user email
 * @param type Social type  facebook | google
 * @param cb callback function with success is true or false
 */
export const SocialLoginHandler = (
  social_id: string,
  name: string,
  email: string,
  type: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('guest/social-register', {
        email: email,
        social_id: social_id,
        name: name,
        type: type,
      });
      showMessage({
        message: data.message,
        type: 'success',
      });
      dispatch({
        type: ActionType.SAVE_LOGIN_DATA,
        payload: data.user,
      });
      await saveItem(AsyncKeys.USER_DATA, data.user);
      cb && cb();
    } catch (error) {
      showMessage({
        message: error?.response.data.message,
        type: 'danger',
      });

      console.log(error.response);
    }
  };
};

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
