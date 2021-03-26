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
}
const DrawerItem: FC<Props> = ({onPress, Icon, title, active, voucher}) => (
  <View
    style={[
      styles.container,
      active && {backgroundColor: `${Colors.white}30`},
    ]}>
    <Touchable onPress={onPress}>
      <View style={styles.list}>
        <View style={styles.listIcon}>
          {Icon && <Icon width={Pixel(45)} height={Pixel(45)} />}
        </View>
        <Text style={styles.listText}>{title}</Text>
        {!!voucher && <Text style={styles.voucher}>{voucher}</Text>}
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
