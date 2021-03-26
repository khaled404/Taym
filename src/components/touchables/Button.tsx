import React, {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Touchable from './Touchable';
import LottieView from 'lottie-react-native';

import {TouchableProps} from '../../constants/interfaces';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
interface Props extends TouchableProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  loader?: boolean;
}

const Button: FC<Props> = ({
  dark,
  onPress,
  title,
  style,
  styleTitle,
  children,
  loader,
}) => {
  return (
    <Touchable dark={dark} onPress={onPress}>
      <View style={[styles.container, style]}>
        {children}
        {loader ? (
          <LottieView
            source={require('../../../assets/animation/loader.json')}
            autoPlay
            loop
            style={{width: 20, height: 20, marginRight: 4}}
          />
        ) : (
          <Text style={[styles.title, styleTitle]}>{title}</Text>
        )}
      </View>
    </Touchable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    height: Pixel(100),
    backgroundColor: Colors.colorSacand,
    borderRadius: 12,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Pixel(28),
  },
});
