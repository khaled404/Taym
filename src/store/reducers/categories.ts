import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
 categories:[]
};
export default (state = initialState, {type, payload}: IReduser) => {
  switch (type) {
    case ActionType.SAVE_CATEGORIES:
      return {...state, categories: payload};
  }
  return state;
};
