import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import {getDateHandler} from '../../constants/helpers'
import Moment from 'react-moment';

interface IVoucherDetails {
  date: string;
  code: string;
  total_amount: string;
  ex: string;
  voucher_name: string | null;
  isLast: boolean;
  status: string;
}

const VoucherDetails: FC<IVoucherDetails> = ({
  code,
  date,
  ex,
  voucher_name,
  total_amount,
  isLast,
  status,
}) => {
  let switchData=new Date(date)
  let switchStatus=new Date(status)
  return (
    <View
      style={[styles.container, isLast && {borderBottomColor: 'transparent'}]}>
      <View style={styles.box}>
        <Text style={styles.date}>{switchData.toString().slice(0,15)}</Text>
        <Text style={styles.code}>{code}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.price}>{total_amount + ' LE'}</Text>
        <Text style={[styles.ex]}>
          {getDateHandler(date)}
          {/*{'EX. ' + switchStatus.toString().slice(0,15)}*/}
        </Text>
      </View>
      {!!voucher_name && <Text style={styles.note}>{voucher_name}</Text>}
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
    fontSize: Pixel(25),
  },
});
