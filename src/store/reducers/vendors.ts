import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
  vendors: []
};
export default (state = initialState, {type, payload}: IReduser) => {
  switch (type) {
    case ActionType.SAVE_VENDORS:
      return {...state, vendors: payload};
  }
  return state;
};
