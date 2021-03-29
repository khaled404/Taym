import {register} from 'react-native-bundle-splitter';

export const Home = register({loader: () => import('./Home')});
export const Voucher = register({loader: () => import('./Voucher')});
export const Profile = register({loader: () => import('./auth/Profile')});
export const MyOrders = register({loader: () => import('./MyOrders')});
export const Favorite = register({loader: () => import('./Favorite')});
export const Login = register({loader: () => import('./auth/Login')});
export const Register = register({loader: () => import('./auth/Register')});
export const CompleteRegister = register({
  loader: () => import('./auth/CompleteRegister'),
});
export const Forget = register({loader: () => import('./auth/Forget')});
export const Forget2 = register({loader: () => import('./auth/Forget2')});
export const Forget3 = register({loader: () => import('./auth/Forget3')});
export const PhoneCode = register({loader: () => import('./auth/PhoneCode')});
export const OrderDetails = register({loader: () => import('./OrderDetails')});
export const Settings = register({loader: () => import('./Settings')});
export const MyAddresses = register({loader: () => import('./MyAddresses')});
export const AddLocation = register({loader: () => import('./AddLocation')});
export const AddressLocation = register({loader: () => import('./AddressLocation')});


