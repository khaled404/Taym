import {register} from 'react-native-bundle-splitter';

export const Home = register({loader: () => import('./Home')});
export const Voucher = register({loader: () => import('./Voucher')});
export const Profile = register({loader: () => import('./Profile')});
export const MyOrders = register({loader: () => import('./MyOrders')});
export const Favorite = register({loader: () => import('./Favorite')});
export const Login = register({loader: () => import('./Login')});
export const Register = register({loader: () => import('./Register')});
export const CompleteRegister = register({loader: () => import('./CompleteRegister')});
export const Forget = register({loader: () => import('./Forget')});
export const Forget2 = register({loader: () => import('./Forget2')});
export const Forget3 = register({loader: () => import('./Forget3')});
