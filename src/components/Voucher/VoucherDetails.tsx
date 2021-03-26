import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
interface IVoucherDetails {
  date: string;
  code: string;
  price: string;
  ex: string;
  note: string | null;
  isLast: boolean;
  isExpired: boolean;
}

const VoucherDetails: FC<IVoucherDetails> = ({
  code,
  date,
  ex,
  note,
  price,
  isLast,
  isExpired,
}) => {
  return (
    <View
      style={[styles.container, isLast && {borderBottomColor: 'transparent'}]}>
      <View style={styles.box}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.code}>{code}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.price}>{price}</Text>
        <Text style={[styles.ex, isExpired && {color: Colors.warning}]}>
          {ex}
        </Text>
      </View>
      {!!note && <Text style={styles.note}>{note}</Text>}
    </View>
  );
};

export default VoucherDetails;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.grayDark,
    borderBottomWidth: Pixel(2),
    paddingVertical: Pixel(25),
  },
  box: {
    marginBottom: Pixel(20),
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
  },
  date: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(30),
  },
  code: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(25),
  },
  price: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(30),
    color: Colors.colorSacand,
  },
  ex: {
    color: Colors.success,
    fontFamily: Fonts.bold,
    fontSize: Pixel(28),
  },
  note: {
    color: Colors.dark,
    fontFamily: Fonts.regular,
    fontSize: Pixel(20),
  },
});
