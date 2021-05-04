import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from '../../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import AuthHeader from '../../components/header/AuthHeader';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/touchables/Button';
import CodeInput from '../../components/textInputs/CodeInput';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {ResendPhoneCodeHandler, VerifyPhoneCodeHandler} from '../../store/actions/auth';

const PhoneCode: FC = () => {
  const [state, setstate] = useState({
    loader: false,
    code: '',
    minutes: 1,
    seconds: 0
  });

  const dispatch = useDispatch();
  const {userData}: any = useSelector(
    (state: RootState) => state.auth,
    shallowEqual,
  );
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    dispatch(
      VerifyPhoneCodeHandler(state.code, success => {
        setstate(old => ({...old, loader: false}));
        success && navigate('RegisterLocation');
      }),
    );
  };
  // AboElela
  // sayed.aboelela96@gmail.com
  // Sayed@123

  useEffect(() => {
    const titTok = setInterval(() => {
      if (state.seconds > 0) {
        setstate(old => ({...old, seconds: state.seconds - 1}));
      }
      if (state.seconds === 0) {
        if (state.minutes === 0) {
          clearInterval(titTok)
        } else {
          setstate(old => ({
            ...old,
            minutes: state.minutes - 1,
            seconds: 59
          }));
        }
      }
    }, 1000);
    return () => {
      clearInterval(titTok)
    };
  });
  const resedCode = () => {
    dispatch(ResendPhoneCodeHandler((success) => {
      if (success) {
        setstate(old => ({
          ...old,
          minutes: 1,
          seconds: 0
        }));
        const timer = setInterval(() => {
          if (state.seconds > 0) {
            setstate(old => ({...old, seconds: state.seconds - 1}));
          }
          if (state.seconds === 0) {
            if (state.minutes === 0) {
              clearInterval(timer)
            } else {
              setstate(old => ({
                ...old,
                minutes: state.minutes - 1,
                seconds: 59
              }));
            }
          }
        }, 1000);
      }
    }))
  }
  return (
    <Container style={styles.container}>
      <AuthHeader/>
      <Content style={styles.contentContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>
            {t('Enter the 4-digit code sent to number')}
          </Text>
          <Text style={styles.sectionTitle}>{userData.phone}</Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <CodeInput
              onChangeText={text => {
                setstate(old => ({...old, code: text}));
              }}
              arrayWidth={4}
            />
          </View>
          <View style={styles.submitContainer}>
            <Button
              title={t('Verify And Proceed')}
              onPress={submitHandler}
              loader={state.loader}
            />
          </View>
          <View style={styles.codeTimerContainer}>
            <Text
              style={styles.codeTimerText}>{state.minutes}:{state.seconds < 10 ? `0${state.seconds}` : state.seconds} {t("Remaining")}</Text>
          </View>
          <View style={[styles.codeTimerContainer, {flexDirection: "row", alignItems: 'center', marginTop: 15}]}>
            <Text
              style={styles.resendText}>{t("Don't Receive The OPT ?")}</Text>
            <TouchableOpacity onPress={resedCode}>
              <Text style={styles.resendBtnText}> {t("RESEND OPT")}</Text>
            </TouchableOpacity>
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
    paddingVertical: 10,
    backgroundColor: Colors.sacandAppBackgroundColor,
    flex: 1,
  },
  mainTitle: {
    color: Colors.dark,
    fontFamily: Fonts.bold,
    fontSize: Pixel(40),
    marginVertical: Pixel(20),
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
    fontSize: Pixel(28),
    textAlign: 'center',
  },
  codeTimerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  codeTimerText: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(30),
  },
  resendText: {
    color: "#4D4D4D",
    fontFamily: Fonts.medium,
  },
  resendBtnText: {
    fontFamily: Fonts.medium,
    textTransform: 'uppercase',
    color: '#FF5023'
  }
});

export default PhoneCode;
