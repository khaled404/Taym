import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
    appLoaded: false,
    isRTL: false,
};
export default (state = initialState, action: IReduser) => {
    switch (action.type) {
        case ActionType.APP_LOADED:
            return {...state, appLoaded: true};
        case ActionType.CHANGE_LANGUAGE:
            return {...state, isRTL: action.payload};
    }
    return state;
};
