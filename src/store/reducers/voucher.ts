import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
  voucherData: {},
  voucherError: {},
  transaction: [],
  user: '',
};
export default (state = initialState, {type, payload}: IReduser) => {
  switch (type) {
    case ActionType.GET_USER_VOUCHERS:
      return {
        ...state,
        transaction: payload.transaction,
        voucherData: payload,
        user: payload.user,
      };
    case ActionType.ADD_USER_VOUCHER:
      return {
        ...state,
        transaction: payload.transaction,
        user: payload.user,
      };
    case ActionType.ADD_USER_VOUCHER_ERROR:
      return {
        ...state,
        voucherError: payload,
      };
  }
  return state;
};
