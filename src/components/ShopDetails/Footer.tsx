import React, {FC, useEffect} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {CartIcon} from '../../../assets/Icons/Icons';
import Button from '../touchables/Button';
import {useNavigation} from '@react-navigation/native';

const Footer: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <CartIcon width={Pixel(60)} height={Pixel(60)} />
      <View style={styles.mid}>
        <Text style={styles.text1}>{t('30 LE To Reach Min Order')}</Text>
        <Text style={styles.text2}>120 LE</Text>
      </View>
      <Button
        style={styles.button}
        title={t('View Cart')}
        onPress={() => {
          navigate('Cart');
        }}
      />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.minColor,
    width: '100%',
    height: 84,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Pixel(50),
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  mid: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text1: {
    fontSize: 9,
    fontFamily: Fonts.bold,
    color: Colors.warning,
  },
  text2: {
    fontSize: 20,
    fontFamily: Fonts.black,
    color: Colors.dark,
    marginTop:5
  },
  button: {
    backgroundColor: Colors.white,
    width: Pixel(270),
    height: Pixel(85),
  },
});
