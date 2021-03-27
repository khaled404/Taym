import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FacebookIcon, GoogleIcon} from '../../../assets/Icons/Icons';
import {Fonts, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
interface ISocialLogin {
  title: string;
}
const SocialLogin: FC<ISocialLogin> = ({title}) => {
  return (
    <>
      {!!title && <Text style={styles.socialLoginLabel}>{title}</Text>}
      <View style={styles.socialLoginButtons}>
        <TouchableOpacity style={styles.socialLoginBtn}>
          <GoogleIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialLoginBtn}>
          <FacebookIcon />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({
  socialLoginLabel: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(33),
    textAlign: 'center',
  },
  socialLoginButtons: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  socialLoginBtn: {
    width: '48%',
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Pixel(25),
    borderRadius: Pixel(70),
  },
});
