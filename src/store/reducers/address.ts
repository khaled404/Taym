import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
  addressList: [],
};
export default (state = initialState, action: IReduser) => {
  switch (action.type) {
    case ActionType.SAVE_ADDRESSLIST:
      return {...state, addressList: action.payload};
  }
  return state;
};
