import {StyleSheet, I18nManager} from 'react-native';
import {Colors, Fonts} from '../constants/styleConstants';
const {isRTL} = I18nManager;
export const commonStyles = StyleSheet.create({
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  boxShadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  minTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  rtlRotate: {transform: [{rotateY: isRTL ? '160deg' : '0deg'}]},
});
export const CartButton = {
  dark: true,
  style: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.minColor,
    paddingVertical: 10,
  },
  styleTitle: {color: Colors.minColor},
};

export const dir = isRTL ? 'left' : 'right';
