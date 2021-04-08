import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import settings from '../store/reducers/settings';
import {PersistConfig} from '../constants/helpers';
import auth from './reducers/auth';
import voucher from './reducers/voucher';
const authConfig: any = new PersistConfig('auth', 'userData', 'isLogin');
const voucherConfig: any = new PersistConfig('voucher', 'voucherData');
const settingsConfig: any = new PersistConfig('settingsConfig', 'language');

const rootReducer = combineReducers({
  settings: persistReducer(settingsConfig, settings),
  auth: persistReducer(authConfig, auth),
  voucher: persistReducer(voucherConfig, voucher),
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
