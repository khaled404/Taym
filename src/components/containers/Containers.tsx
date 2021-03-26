import React, {FC} from 'react';
import {View, ScrollView, StyleProp, ViewStyle} from 'react-native';
import {Colors} from '../../constants/styleConstants';

interface containerProps {
  children?: JSX.Element[] | JSX.Element;
  style?: StyleProp<ViewStyle>;
}
interface contentProps {
  noPadding?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  paddingVertical?: boolean;
  children?: JSX.Element[] | JSX.Element;
}
export const Container: FC<containerProps> = ({children, style}) => {
  return (
    <View
      style={[{flex: 1, backgroundColor: Colors.appBackgroundColor}, style]}>
      {children}
    </View>
  );
};
export const Content: FC<contentProps> = ({
  children,
  noPadding,
  style,
  contentContainerStyle,
  paddingVertical,
}) => {
  return (
    <ScrollView
      style={style}
      contentContainerStyle={[
        paddingVertical && {paddingVertical: 30},
        contentContainerStyle,
      ]}>
      <View style={{paddingHorizontal: noPadding ? undefined : 20}}>
        {children}
      </View>
    </ScrollView>
  );
};
