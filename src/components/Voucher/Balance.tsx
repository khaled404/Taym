import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, Pixel } from '../../constants/styleConstants';
import { commonStyles } from '../../styles/styles';
interface IBalance {
  value: string;
  date: string;
}
const Balance: FC<IBalance> = ({ date, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Balance</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Pixel(20),
    paddingHorizontal: Pixel(35),
    backgroundColor: Colors.minColor,
    height: Pixel(280),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.boxShadow,
  },
  title: {
    fontFamily: Fonts.black,
    fontSize: Pixel(40),
  },
  value: {
    fontFamily: Fonts.black,
    fontSize: Pixel(75),
  },
  date: {
    marginLeft: 'auto',
    marginTop: Pixel(15),
    fontFamily: Fonts.black,
  },
});
