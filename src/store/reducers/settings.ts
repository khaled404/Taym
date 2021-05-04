import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
  appLoaded: false,
  isRTL: false,
  language: null,
  currentLocationData: null,
};
export default (state = initialState, action: IReduser) => {
  switch (action.type) {
    case ActionType.APP_LOADED:
      return {...state, appLoaded: true};
    case ActionType.CHANGE_LANGUAGE:
      return {...state, isRTL: action.payload};
    case ActionType.SAVE_LANGUAGE:
      return {...state, language: action.payload};
    case ActionType.SAVE_CURRENT_LOCATION_DATA:
      return {...state, currentLocationData: action.payload};
  }
  return state;
};
