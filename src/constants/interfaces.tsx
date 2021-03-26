import {ActionType} from '../store/actions/actions';

export interface TouchableProps {
  dark?: boolean;
  onPress?: () => void;
}

export interface IReduser {
  type: ActionType;
  payload?: any;
}
export interface IDispatch extends IReduser {}

export interface NavigationProps {
  goBack?: () => void;
  openDrawer?: () => void;
  navigate?: any;
  replace?: any;
  reset?: any;
  params?: any;
  name?: string;
}

export interface ScreenProps {
  navigation?: NavigationProps;
  route?: NavigationProps;
}

export interface IModals {
  visible: boolean;
  onPress?: (arg?: any) => void;
}
