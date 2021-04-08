import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Touchable from '../touchables/Touchable';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import {SvgProps} from 'react-native-svg';

interface Props {
  onPress: () => void;
  Icon?: (arg: SvgProps) => JSX.Element;
  title: string;
  active?: boolean;
  voucher?: string;
  isLogin?: boolean;
}
const DrawerItem: FC<Props> = ({
  onPress,
  Icon,
  title,
  active,
  voucher,
  isLogin,
}) => (
  <View
    style={[
      styles.container,
      active && {backgroundColor: `${Colors.white}30`},
    ]}>
    <Touchable onPress={isLogin ? onPress : null}>
      <View style={styles.list}>
        <View style={styles.listIcon}>
          {Icon && (
            <Icon
              width={Pixel(45)}
              height={Pixel(45)}
              color={isLogin ? undefined : Colors.lock}
            />
          )}
        </View>
        <Text
          style={[
            styles.listText,
            {
              color: isLogin ? Colors.dark : Colors.lock,
            },
          ]}>
          {title}
        </Text>
        {!!voucher && (
          <Text
            style={[
              styles.voucher,
              {
                backgroundColor: isLogin ? Colors.colorSacand : Colors.lock,
                color: isLogin ? Colors.white : Colors.dark,
              },
            ]}>
            {isLogin ? voucher : '0 LE'}
          </Text>
        )}
      </View>
    </Touchable>
  </View>
);

export default DrawerItem;
const styles = StyleSheet.create({
  list: {
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginTop: 4,
    ...commonStyles.rowBox,
  },
  listIcon: {
    marginRight: 10,
  },
  listText: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(28),
    color: Colors.dark,
    textAlign: 'left',
  },
  container: {
    marginBottom: 5,
  },
  voucher: {
    marginLeft: 10,
    backgroundColor: Colors.colorSacand,
    borderRadius: 7,
    paddingHorizontal: Pixel(20),
    paddingVertical: Pixel(10),
    color: Colors.white,
    fontSize: Pixel(25),
    ...commonStyles.boxShadow,
  },
});
