import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import settings from '../store/reducers/settings';
import {PersistConfig} from '../constants/helpers';
import auth from './reducers/auth';
import categories from './reducers/categories';
import vendors from './reducers/vendors';
import voucher from './reducers/voucher';
import address from './reducers/address';
const authConfig: any = new PersistConfig('auth', 'userData', 'isLogin');
const voucherConfig: any = new PersistConfig('voucher', 'voucherData');
const settingsConfig: any = new PersistConfig('settingsConfig', 'language');
const addressConfig: any = new PersistConfig('addressConfig', 'addressList');

const rootReducer = combineReducers({
  settings: persistReducer(settingsConfig, settings),
  auth: persistReducer(authConfig, auth),
  voucher: persistReducer(voucherConfig, voucher),
  address: persistReducer(addressConfig, address),
  categories: categories,
  vendors: vendors,
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
