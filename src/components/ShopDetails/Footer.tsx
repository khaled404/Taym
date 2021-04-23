import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors , Fonts,Pixel } from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';


const Footer: FC = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.container} ></View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.minColor,
    width:'100%',
    height:84,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:Pixel(40),
    position:'absolute',
    
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});
