import React, {FC} from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Header from '../components/header/Header';
import Touchable from '../components/touchables/Touchable';
import {Colors, Fonts, Images, Pixel} from '../constants/styleConstants';
import {commonStyles} from '../styles/styles';
import Button from '../components/touchables/Button';
const {width, height} = Dimensions.get('window');
const ComingSoon: FC = () => {
  const {t} = useTranslation();
  const {goBack} = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        width,
        height,
        backgroundColor: Colors.minColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{width: 200, height: 200}}>
        <FastImage
          source={Images.splash}
          style={commonStyles.image}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 35,
            fontFamily: Fonts.bold,
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 25,
          }}>
          {t('Coming Soon')}
        </Text>
        <Button
          style={{backgroundColor: Colors.white}}
          title={t('Go Back')}
          onPress={goBack}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 10,
    backgroundColor: Colors.sacandAppBackgroundColor,
    flex: 1,
  },
  mainTitle: {
    color: Colors.dark,
    fontFamily: Fonts.bold,
    fontSize: Pixel(60),
    marginVertical: Pixel(25),
    textAlign: 'left',
  },
  submitContainer: {
    marginVertical: Pixel(80),
  },
});

export default ComingSoon;
