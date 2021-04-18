import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container, Content } from '../components/containers/Containers';
import { Colors, Pixel, Fonts } from '../constants/styleConstants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { TelephoneIcon } from '../../assets/Icons/Icons';
import Button from '../components/touchables/Button';
import { commonStyles } from '../styles/styles';
const CallNow: FC = () => {
  const { t } = useTranslation();



  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  return (
    <Container style={styles.container}>
      <View style={styles.top} >
        <Text style={[styles.text, {
          paddingBottom: Pixel(30)
        }]} >You Are Going To Call</Text>
        <Text style={[styles.text, {
          paddingBottom: Pixel(50)
        }]} >Refresh Market</Text>
        <Text style={[styles.phoneText, {
          paddingBottom: Pixel(100)
        }]} >0123 456 7894</Text>
        <TelephoneIcon width={Pixel(200)} height={Pixel(200)} />
      </View>

      <View style={styles.bottom} >
        <Button
          title={'Home'}
          style={{
            width: '48%',
            backgroundColor: Colors.white
          }}
        />
        <Button
          title={'Order Details'}
          style={{
            width: '48%',
            ...commonStyles.boxShadow,
          }}
        />
      </View>
    </Container>
  );
};

export default CallNow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.minColor,
  },
  top: {
    width: '100%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Pixel(-50)
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(40),
  },
  phoneText: {
    fontFamily: Fonts.medium,
    fontSize: Pixel(30),
  },
  bottom: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Pixel(30)
  },
});
