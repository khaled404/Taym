import React, {FC} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Pixel, Images} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import {useTranslation} from 'react-i18next';
import {BlackLine} from '../../../assets/Icons/Icons';
import LinearGradient from 'react-native-linear-gradient';

interface IBalance {
  value: string;
  date: string;
  name: string;
}
const Balance: FC<IBalance> = ({date, value, name}) => {
  const {t} = useTranslation();
  return (
    <ImageBackground source={Images.voucherBackground} style={styles.container}>
      <View
        style={{
          width: '100%',
          height: '65%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.title}>{t('Balance')}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {/*<Text style={styles.date}>{date}</Text>*/}
      <LinearGradient
        style={{
          width: '100%',
          height: '20%',
          backgroundColor: Colors.dark,
        }}
        colors={['#000000', '#363636', '#000000']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}></LinearGradient>
      <View
        style={{
          width: '100%',
          height: '15%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <Text style={styles.date}>{t(name)}</Text>
        <Text style={styles.date2}>{t('11 August')}</Text>
      </View>
    </ImageBackground>
  );
};

export default Balance;

const styles = StyleSheet.create({
  container: {
    //paddingVertical: Pixel(20),
    //paddingHorizontal: Pixel(35),
    // backgroundColor: Colors.minColor,
    height: Pixel(300),
    borderRadius: 15,

    ...commonStyles.boxShadow,
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: Pixel(35),
  },
  value: {
    fontFamily: Fonts.medium,
    fontSize: Pixel(75),
  },
  date: {
    fontFamily: Fonts.medium,
  },
  date2: {
    fontFamily: Fonts.medium,
    fontSize: Pixel(20),
  },
});
