import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
  userCurrentLocation: {},
  newLocationObj: {},
  addressList: [],
};
export default (state = initialState, action: IReduser) => {
  switch (action.type) {
    case ActionType.SAVE_ADDRESSLIST:
      return {...state, addressList: action.payload};
    case ActionType.SAVE_CURRENT_LOCATION:
      return {...state, userCurrentLocation: action.payload};
      case ActionType.SAVE_NEW_LOCATION_OBJ:
      return {...state, newLocationObj: action.payload};
    case ActionType.DELETE_ADDRESS:
      return {...state, addressList: action.payload};
  }
  return state;
};
