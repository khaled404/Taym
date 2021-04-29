import {ActionType} from './actions';
import {Dispatch} from "redux";
import {IDispatch} from "../../constants/interfaces";
import {axiosAPI} from "../../constants/Config";

export const saveVendors = (payload: []) => ({
  type: ActionType.SAVE_VENDORS,
  payload,
});


/**
 * Register user step 3
 * @param categoryId
 * @param cb callback function with success is true or false
 */
export const getCategoryVendors = (
  categoryId: number,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post(`guest/user-show-vendors/${categoryId}`);

      console.log('getCategoryVendors.data', data.data.vendors);

      // showMessage({
      //   message: data.message,
      //   type: 'info',
      // });
      dispatch(saveVendors(data.data.vendors))
      // dispatch({
      //   type: ActionType.SAVE_USER_DATA_STEP_3,
      // });

      cb(true);
    } catch (error) {
      cb(false);
      // showMessage({
      //   message: error?.response.data.message.code[0],
      //   type: 'danger',
      // });
      console.log('getCategoryVendors Error', error?.response.data.message);
    }
  };
};
