import React, { FC } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
  Animated
} from 'react-native';
import { Colors } from '../../constants/styleConstants';

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
  options?: ScrollViewProps;
  onScroll?: any
}

export const Container: FC<containerProps> = ({ children, style }) => {
  return (
    <View
      style={[{ flex: 1, backgroundColor: Colors.appBackgroundColor }, style]}>
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
  options,
  onScroll,
}) => {
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
  return (
    <AnimatedScrollView
      style={style}
      contentContainerStyle={[
        paddingVertical && { paddingVertical: 30 },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      //scrollEventThrottle={16}
      onScroll={onScroll}
      {...options}>
      <View style={{ paddingHorizontal: noPadding ? undefined : 20 }}>
        {children}
      </View>
    </AnimatedScrollView>
  );
};
