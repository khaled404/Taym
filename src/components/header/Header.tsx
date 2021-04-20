import React, { FC } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  Colors,
  Fonts,
  Pixel,
  ScreenOptions,
} from '../../constants/styleConstants';
import { commonStyles } from '../../styles/styles';
import { ArrowLeftSmIcon } from '../../../assets/Icons/Icons';
import IconTouchableContainer from '../touchables/IconTouchableContainer';
import { useNavigation } from '@react-navigation/native';

interface IHeader {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}
const Header: FC<IHeader> = ({ title, containerStyle, titleStyle }) => {
  const { goBack } = useNavigation();
  return (
    <View style={[styles.conatiner, containerStyle]}>
      <View style={styles.right}>
        {!!title && (
          <View style={styles.titleConatiner}>
            <Text
              style={[styles.title, titleStyle]}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {title ? title : ''}
            </Text>
          </View>
        )}
        <IconTouchableContainer dark onPress={goBack} style={styles.icons}>
          <ArrowLeftSmIcon width={20} style={commonStyles.rtlRotate} />
        </IconTouchableContainer>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: Colors.minColor,
    paddingTop: ScreenOptions.StatusBarHeight,
    height:
      Platform.OS === 'android'
        ? 56 + ScreenOptions.StatusBarHeight
        : 64 + ScreenOptions.StatusBarHeight,
    paddingHorizontal: 15,
    justifyContent: 'center',
    ...commonStyles.rowBox,
    zIndex: 200,
  },
  left: {
    alignItems: 'flex-start',

  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    marginRight: 'auto',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  titleConatiner: {
    ...commonStyles.rowBox,
    //height: 28,
    //alignSelf: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: Pixel(35),
    color: Colors.dark,
    fontFamily: Fonts.bold,
    marginLeft: 5,
    marginRight: 'auto',
    marginTop: 5,
  },

  icons: {
    width: Pixel(55),
    height: Pixel(55),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
