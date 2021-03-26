import React, {FC} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {TouchableProps} from '../../constants/interfaces';
import Touchable from './Touchable';

interface ITouchableContainer {
  noPadding?: boolean;
}

const IconTouchableContainer: FC<
  TouchableProps & {style?: StyleProp<ViewStyle>} & ITouchableContainer
> = ({children, dark = true, onPress, style, noPadding}) => {
  return (
    <View style={[{overflow: 'hidden', borderRadius: 50}, style]}>
      <Touchable dark={dark} onPress={onPress}>
        <View style={{padding: noPadding ? undefined : 7}}>{children}</View>
      </Touchable>
    </View>
  );
};

export default IconTouchableContainer;
