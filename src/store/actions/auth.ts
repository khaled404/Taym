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
        payload: {phone: phone},
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

export const NewPhonePhoneHandler = (
  old_phone: string,
  new_phone: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('user/update-user-phone', {
        new_phone,
        old_phone,
      });
      console.log(data);

      saveItem(AsyncKeys.NEW_PHONE_DATA, {new_phone, old_phone});

      cb(true);
    } catch (error) {
      cb(false);
      showMessage({
        message: error?.response.data.message?.new_phone
          ? error?.response.data.message?.new_phone[0]
          : error?.response.data.message?.old_phone[0],
        type: 'danger',
      });
      console.log(error?.response.data);
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
      // dispatch({
      //   type: ActionType.SAVE_USER_DATA_STEP_3,
      // });

      cb(true);
    } catch (error) {
      cb(false);
      showMessage({
        message: error?.response.data.message,
        type: 'danger',
      });
      console.log('VerifyPhoneCodeHandler Error', error?.response.data.message);
    }
  };
};

export const ResendPhoneCodeHandler = (
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('user/resend-phone-code');
      console.log('ResendPhoneCodeHandler data', data);
      cb(true);
    } catch (error) {
      cb(false);
      showMessage({
        message: error?.response.data.message,
        type: 'danger',
      });
      console.log('ResendPhoneCodeHandler Error', error?.response.data.message);
    }
  };
};

export const VerifyNewPhoneCodeHandler = (
  old_phone: string,
  new_phone: string,
  code: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    console.log({old_phone, new_phone, code});

    try {
      const {data} = await axiosAPI.post('user/confirm-new-user-phone', {
        old_phone,
        new_phone,
        code,
      });
      console.log(data);
      showMessage({
        message: data.data.message,
        type: data.data.message === 'Code is Wrong' ? 'danger' : 'info',
      });

      cb(data.data.message !== 'Code is Wrong');
    } catch (error) {
      cb(false);
      showMessage({
        message: error?.response.data.message,
        type: 'danger',
      });
      console.log('VerifyPhoneCodeHandler Error', error?.response.data.message);
    }
  };
};
/**
 * Register user step 4
 * @param latitude
 * @param longitude
 * @param cb callback function with success is true or false
 * @param navigate
 */
export const VerifyUserLocationHandler = (
  // coords: {latitude: string; longitude: string},
  latitude: number,
  longitude: number,
  cb: (success?: boolean) => void,
  navigate: (screen: string) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('user/register-first-address', {
        latitude,
        longitude,
      });
      console.log('VerifyUserLocationHandler', data);
      showMessage({
        message: data.message,
        type: 'info',
      });

      dispatch({
        type: ActionType.SAVE_USER_DATA_STEP_3,
      });
      cb(true);
      navigate('Home');
    } catch (error) {
      cb(false);
      console.log('VerifyUserLocationHandler', error?.response);
      showMessage({
        message: error?.response.data.message,
        type: 'danger',
      });
    }
  };
};

/**
 * Login user
 * @param email user email
 * @param password user password
 * @param cb callback function with success is true or false
 * @param navigate
 */
export const LoginHandler = (
  email: string,
  password: string,
  cb: (success?: boolean) => void,
  navigate: (screen: string) => void,
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
      console.log('error?.response.data.error', error?.response.data.error);

      dispatch({
        type: ActionType.SAVE_LOGIN_ERORRS,
        payload: error?.response.data.message,
      });
      {
        error.response.data.error
          ? showMessage({
            message: error?.response.data.error,
            type: 'danger',
          })
          : null;
      }
      if (error?.response.data.error === 'Please Verify phone') {
        console.log('error?.response.data', error?.response.data.phone);
        await saveItem(AsyncKeys.USER_DATA, {
          phone: error?.response.data.phone,
          token: error?.response.data.token,
        });
        dispatch({
          type: ActionType.SAVE_USER_DATA_STEP_2,
          payload: {
            phone: error?.response.data.phone,
            token: error?.response.data.token,
          },
        });
        navigate('PhoneCode');
      }

      console.log('Loginerorr', error?.response);
    }
  };
};
//sayed@email.com
//Sayed@123
/**
 * Forget password step 1
 * @param phone user phone
 * @param cb callback function with success is true or false
 */
export const ForgetHandler = (
  phone: string,
  cb: (success?: boolean) => void,
  navigate: (screen: string) => void,
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
      navigate('ForgetPhoneCode');
    } catch (error) {
      cb(false);
      showMessage({
        message: error?.response.data.error,
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

export const SetNewPasswordHandler = (
  old_password: string,
  password: string,
  password_confirmation: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('user/update-user-password', {
        old_password,
        password,
        password_confirmation,
      });
      console.log('SetNewPasswordHandler', data.data.message[0]);
      showMessage({
        message: data.data.message[0],
        type:
          data.data.message[0] !== 'Check your old password.'
            ? 'success'
            : 'danger',
      });
      cb(data.data.message[0] !== 'Check your old password.');
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
 * @param navigate
 */
export const SocialLoginHandler = (
  social_id: string,
  name: string,
  email: string,
  type: string,
  cb: (success?: boolean) => void,
  navigate: (screen?: string) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('guest/social-register', {
        email: email,
        social_id: social_id,
        name: name,
        type: type,
      });
      console.log('SocialLoginHandlerdatadata.user', data.user)
      if (data.user.phone !== null) {
        showMessage({
          message: data.success.message,
          type: 'success',
        });
        dispatch({
          type: ActionType.SAVE_LOGIN_DATA,
          payload: data.user,
        });
        await saveItem(AsyncKeys.USER_DATA, data.user);
        cb && cb(true);
        navigate('RegisterLocation');
      } else {
        showMessage({
          message: 'need phone',
          type: 'danger',
        });
        dispatch({
          type: ActionType.SAVE_USER_DATA_STEP_1,
          payload: data.user,
        });
        await saveItem(AsyncKeys.USER_DATA, data.user);
        cb && cb(false);
        navigate('CompleteRegister');
      }
    } catch (error) {
      showMessage({
        message: error?.response.data.message,
        type: 'danger',
      });

      if (error?.response.data.message === 'need_phone') {
        dispatch({
          type: ActionType.SAVE_USER_DATA_STEP_1,
          payload: error?.response.data.user,
        });
        await saveItem(AsyncKeys.USER_DATA, error?.response.data.user);
        cb && cb(false);
        navigate('CompleteRegister');
      }

      if (error?.response.data.error === 'Please Verify phone') {
        console.log('error?.response.data', error?.response.data.phone);
        await saveItem(AsyncKeys.USER_DATA, {
          phone: error?.response.data.phone,
          token: error?.response.data.token,
        });
        dispatch({
          type: ActionType.SAVE_USER_DATA_STEP_2,
          payload: {
            phone: error?.response.data.phone,
            token: error?.response.data.token,
          },
        });
        cb && cb(false);
        navigate('PhoneCode');
      }
      console.log('SocialLoginHandler Error', error.response);
    }
  };
};

/**
 * Register user step 3
 * @param code otp code
 * @param cb callback function with success is true or false
 */
export const GetUserProfileData = () =>
  // cb: (success?: boolean) => void,
{
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.get('user/get-user-profile');
      // console.log(data);
      // console.log('GetUserProfileData data', data)
      dispatch({
        type: ActionType.SAVE_USER_DATA_AFTER_VERIFY,
        payload: data.data,
      });
    } catch (error) {
      showMessage({
        message: error?.response.data.message,
        type: 'danger',
      });
      console.log('GetUserProfileData Error', error?.response.data.message);
    }
  };
};

export const updateUserProfile = (
  name: string,
  email: string,
  birthdate: string,
  photo: string,
  cb: () => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      console.log({
        name,
        email,
        birthdate,
        photo,
      });
      const formData = new FormData();

      formData.append('name', name);
      formData.append('email', email);
      formData.append('birthdate', birthdate);
      photo && formData.append('photo', photo)

      // formData.append('photo', {
      //   uri: photo,
      //   type: 'image/jpeg',
      //   name: `${Math.random()}.jpg`,
      // });

      console.log('updateUserProfile formData', formData);

      const {data} = await axiosAPI.post('user/update-user-profile', formData);
      console.log('updateUserProfile response data',data.data);
      dispatch({
        type: ActionType.SAVE_USER_DATA_AFTER_VERIFY,
        payload: data.data.user.data,
      });
      showMessage({
        message: data.data.message,
        type: 'success',
      });
      cb && cb();
    } catch (error) {
      showMessage({
        message: error?.response.data.message?.email
          ? error?.response.data.message?.email[0]
          : error?.response.data.message?.photo[0],
        type: 'danger',
      });
      cb && cb();

      console.log('GetUserProfileData Error', error?.response.data.message);
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
