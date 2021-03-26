import React, {FC} from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import {TouchableProps} from '../../constants/interfaces';

const {OS} = Platform;
const android = 'android';

const TouchableType: any =
  OS === android ? TouchableNativeFeedback : TouchableOpacity;

const Touchable: FC<TouchableProps> = ({dark, onPress, children}) => {
  return (
    <TouchableType
      onPress={onPress}
      background={
        OS === android
          ? TouchableNativeFeedback.Ripple(dark ? '0000007a' : '#ffffff66')
          : undefined
      }>
      {children}
    </TouchableType>
  );
};

export default Touchable;
