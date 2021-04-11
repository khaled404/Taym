import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from '../../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {EyeIcon} from '../../../assets/Icons/Icons';
import Input from '../../components/textInputs/Input';
import IconTouchableContainer from '../../components/touchables/IconTouchableContainer';
import AuthHeader from '../../components/header/AuthHeader';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/touchables/Button';
import SocialLogin from '../../components/touchables/SocialLogin';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RegisterHandler} from '../../store/actions/auth';
import {RootState} from '../../store/store';
import {InputErorrHandler} from '../../constants/helpers';

const Register: FC = () => {
  const [state, setstate] = useState({
    name: '',
    email: '',
    password: '',
    secureTextEntry: true,
    loader: false,
  });
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {registerErorrs} = useSelector(
    (state: RootState) => state.auth,
    shallowEqual,
  );
  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    dispatch(
      RegisterHandler(state.name, state.email, state.password, success => {
        setstate(old => ({...old,name:'',email:'' , password:'',loader: false}));
        success && navigate('CompleteRegister');
      }),
    );
  };
  const PasswordIcon = () => {
    return (
      <IconTouchableContainer
        dark
        onPress={() => {
          setstate(old => ({...old, secureTextEntry: !old.secureTextEntry}));
        }}>
        <EyeIcon />
      </IconTouchableContainer>
    );
  };

  return (
    <Container style={styles.container}>
      <AuthHeader />
      <Content style={styles.contentContainer}>
        <Text style={styles.mainTitle}>{t('Register')}</Text>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Full Name')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setstate(old => ({...old, name: value}));
                },
                value: state.name,
              }}
              erorrMessage={InputErorrHandler(registerErorrs, 'name')}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Email Address')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setstate(old => ({...old, email: value}));
                },
                value: state.email,
                keyboardType: 'email-address',
              }}
              erorrMessage={InputErorrHandler(registerErorrs, 'email')}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Password')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              rightContent={PasswordIcon}
              iconRightStyle={{top: 10}}
              options={{
                onChangeText: value => {
                  setstate(old => ({...old, password: value}));
                },
                value: state.password,
                secureTextEntry: state.secureTextEntry,
                onSubmitEditing: submitHandler,
              }}
              erorrMessage={InputErorrHandler(registerErorrs, 'password')}
            />
          </View>
          <View style={styles.submitContainer}>
            <Button
              title={t('Register')}
              onPress={submitHandler}
              loader={state.loader}
            />
          </View>
          <SocialLogin title={t('Or Register With')} />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginLeft: 3,
              marginTop: Pixel(60),
            }}
            onPress={() => navigate('Login')}>
            <Text
              style={{
                color: Colors.dark,
                fontFamily: Fonts.medium,
                fontSize: Pixel(30),
              }}>
              {t('Already Registered?')}
            </Text>
            <Text
              style={{
                color: Colors.colorSacand,
                fontFamily: Fonts.medium,
                fontSize: Pixel(30),
                marginLeft: 10,
              }}>
              {t('Log In')}
            </Text>
          </TouchableOpacity>
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
    paddingVertical: 10,
    backgroundColor: Colors.sacandAppBackgroundColor,
    flex: 1,
  },
  mainTitle: {
    color: Colors.dark,
    fontFamily: Fonts.bold,
    fontSize: Pixel(60),
    textAlign: 'left',
    marginVertical: Pixel(25),
  },
  submitContainer: {
    marginVertical: Pixel(80),
  },

  inputsContainer: {
    paddingHorizontal: Pixel(20),
    paddingVertical: Pixel(10),
    paddingBottom: 40,
  },
  inputContainer: {
    marginVertical: 7,
  },
  inputLabel: {
    color: Colors.dark,
    fontFamily: Fonts.medium,
    textAlign: 'left',
    marginBottom: Pixel(17),
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
    padding: 0,
    paddingHorizontal: 15,
  },
});

export default Register;
