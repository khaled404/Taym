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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {InputErorrHandler} from '../../constants/helpers';
import {LoginHandler} from '../../store/actions/auth';

const Login: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const {loginErorrs} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [state, setstate] = useState({
    email: '',
    password: '',
    secureTextEntry: true,
    loader: false,
  });
  const PasswordIcon = () => {
    return (
      <IconTouchableContainer
        onPress={() => {
          setstate(old => ({...old, secureTextEntry: !old.secureTextEntry}));
        }}>
        <EyeIcon />
      </IconTouchableContainer>
    );
  };
  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    console.log( state , ' state' )
    dispatch(
      LoginHandler(state.email, state.password, success => {
        setstate(old => ({...old,email:'',password:'', loader: false}));
        success && navigate('Home');
      }),
    );
  };
  return (
    <Container style={styles.container}>
      <AuthHeader />
      <Content style={styles.contentContainer}>
        <Text style={styles.mainTitle}>{t('Sign In')}</Text>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              {t('Phone Number / Email Address')}
            </Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setstate(old => ({
                    ...old,
                    email: value,
                  }));
                },
                value: state.email,
                keyboardType: 'email-address',
              }}
              erorrMessage={InputErorrHandler(loginErorrs, 'email')}
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
                  setstate(old => ({
                    ...old,
                    password: value,
                  }));
                },
                value: state.password,
                secureTextEntry: state.secureTextEntry,
                onSubmitEditing: submitHandler,
              }}
              erorrMessage={InputErorrHandler(loginErorrs, 'password')}
            />
          </View>

          <TouchableOpacity
            style={{flexDirection: 'row-reverse', marginLeft: 3, marginTop: 2}}
            onPress={() => navigate('Forget')}>
            <Text
              style={{
                color: Colors.dark,
                fontFamily: Fonts.regular,
                fontSize: Pixel(27),
              }}>
              {t('Forgot Password?')}
            </Text>
          </TouchableOpacity>

          <View style={styles.submitContainer}>
            <Button
              title={t('Sign In')}
              onPress={submitHandler}
              loader={state.loader}
            />
          </View>
          <SocialLogin title={t('Or Sign In With')} />

          <TouchableOpacity
            style={{
              flexDirection: 'row-reverse',
              marginLeft: 3,
              marginTop: Pixel(60),
            }}
            onPress={() => navigate('Home')}>
            <Text
              style={{
                color: Colors.dark,
                fontFamily: Fonts.bold,
                fontSize: Pixel(35),
              }}>
              {t(`Skip >>`)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginLeft: 3,
              marginTop: Pixel(60),
            }}
            onPress={() => navigate('Register')}>
            <Text
              style={{
                color: Colors.dark,
                fontFamily: Fonts.medium,
                fontSize: Pixel(30),
              }}>
              {t(`Don't Have An Account ?`)}
            </Text>
            <Text
              style={{
                color: Colors.colorSacand,
                fontFamily: Fonts.medium,
                fontSize: Pixel(30),
                marginLeft: 10,
              }}>
              {t(`Register`)}
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
    marginVertical: Pixel(25),
    textAlign: 'left',
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
});

export default Login;
