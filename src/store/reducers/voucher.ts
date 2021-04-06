import { IReduser } from '../../constants/interfaces';
import { ActionType } from '../actions/actions';

const initialState = {
    voucherData: [],
};
export default (state = initialState, { type, payload }: IReduser) => {
    switch (type) {
        case ActionType.GET_USER_VOUCHERS:
            return {
                ...state,
                voucherData: payload,
            };
        case ActionType.ADD_USER_VOUCHER:
            return {
                ...state,
                voucherData: { ...state.voucherData, transaction: payload },
            };
    }
    return state;
}