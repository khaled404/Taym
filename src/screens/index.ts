import {register} from 'react-native-bundle-splitter';

export const Home = register({loader: () => import('./Home')});
export const Voucher = register({loader: () => import('./Voucher')});
export const Profile = register({loader: () => import('./Profile')});
export const MyOrders = register({loader: () => import('./MyOrders')});
export const Favorite = register({loader: () => import('./Favorite')});
