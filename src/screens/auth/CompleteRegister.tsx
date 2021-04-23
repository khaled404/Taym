import React, {FC, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container, Content} from '../../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Input from '../../components/textInputs/Input';
import AuthHeader from '../../components/header/AuthHeader';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/touchables/Button';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {InputErorrHandler} from '../../constants/helpers';
import {RegisterPhoneHandler} from '../../store/actions/auth';
import {showMessage} from 'react-native-flash-message';

const CompleteRegister: FC = () => {
  const [state, setstate] = useState({
    phone: '',
    loader: false,
  });
  const phone = useRef<string>('');

  const registerErorrs = useSelector(
    (state: RootState) => state.auth.registerErorrs,
    shallowEqual,
  );
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    if (phone.current.length === 11) {
      dispatch(
        RegisterPhoneHandler(
          phone.current,
          success => {
            setstate(old => ({...old, loader: false}));
            success && navigate('PhoneCode');
          },
          () => navigate('PhoneCode'),
        ),
      );
    } else {
      setstate(old => ({...old, loader: false}));
      showMessage({
        message: t('Please enter a valid mobile number'),
      });
    }
  };

  return (
    <Container style={styles.container}>
      <AuthHeader />
      <Content noPadding contentContainerStyle={styles.contentContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.mainTitle}>{t('Enter Mobile Number')}</Text>
          <Text style={styles.sectionTitle}>
            {t('To Complete Your Registeration')}
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Mobile Number')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  phone.current = value;
                },
                keyboardType: 'number-pad',
                onSubmitEditing: submitHandler,
              }}
              erorrMessage={InputErorrHandler(registerErorrs, 'phone')}
            />
          </View>

          <View style={styles.submitContainer}>
            <Button
              title={t('Get OTP')}
              onPress={submitHandler}
              loader={state.loader}
            />
          </View>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.sacandAppBackgroundColor,
    flex: 1,
  },
  mainTitle: {
    color: Colors.dark,
    fontFamily: Fonts.bold,
    fontSize: Pixel(40),
    marginVertical: Pixel(20),
    textAlign: 'left',
  },
  submitContainer: {
    marginVertical: Pixel(80),
  },
  inputsContainer: {
    paddingHorizontal: Pixel(20),
    paddingVertical: Pixel(25),
    paddingBottom: 40,
  },
  inputContainer: {
    marginVertical: 7,
  },
  inputLabel: {
    color: '#4D4D4D',
    fontFamily: Fonts.medium,
    marginBottom: Pixel(17),
    textAlign: 'left',
  },
  textInput: {
    height: Pixel(100),
    padding: 0,
    fontFamily: Fonts.bold,
    fontSize: Pixel(33),
    color: '#070707',
  },
  contentContainerStyle: {
    borderRadius: 14,
    borderWidth: 0,
    padding: 0,
    paddingHorizontal: 15,
  },
  sectionTitleContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontFamily: Fonts.medium,
    color: '#4D4D4D',
    marginLeft: 10,
    textAlign: 'left',
  },
});

export default CompleteRegister;
