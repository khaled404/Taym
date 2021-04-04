import {Dispatch} from 'redux';
import {ActionType} from './actions';
import {I18nManager} from "react-native";
import {AsyncKeys, saveItem} from "../../constants/helpers";
import RNRestart from 'react-native-restart';

export const loadApp = () => ({
    type: ActionType.APP_LOADED,
});

export const toggleLanguage = (payload: boolean) => ({
    type: ActionType.CHANGE_LANGUAGE,
    payload
});

export const toggleLangSwitcher = (isRtl: boolean) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            console.log('dispatchisRtl',isRtl)
            I18nManager.forceRTL(isRtl);
            await saveItem(AsyncKeys.IS_RTL, isRtl);
            dispatch(toggleLanguage(isRtl));
            RNRestart.Restart()
        } catch (error) {
            console.log('toggleLangSwitcher', error);
        }

    };
}
export const initializApp = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(loadApp());
        } catch (error) {
            console.log('initializApp', error);
        }
    };
};
