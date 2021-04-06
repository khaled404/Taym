import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content } from '../../components/containers/Containers';
import { Colors, Fonts, Pixel } from '../../constants/styleConstants';
import { useTranslation } from 'react-i18next';
import AuthHeader from '../../components/header/AuthHeader';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/touchables/Button';
import CodeInput from '../../components/textInputs/CodeInput';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { VerifyPhoneForgetHandler } from '../../store/actions/auth';

const ForgetPhoneCode: FC = () => {
  const [state, setstate] = useState({
    code: '',
    loader: false,
  });

  const dispatch = useDispatch();
  const { phoneNumber }: any = useSelector(
    (state: RootState) => state.auth,
    shallowEqual,
  );
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const submitHandler = () => {
    setstate(old => ({ ...old, loader: true }));
    dispatch(
      VerifyPhoneForgetHandler(state.code, success => {
        setstate(old => ({ ...old, loader: false }));
        success && navigate('Forget2');
      }),
    );
  };
  return (
    <Container style={styles.container}>
      <AuthHeader />
      <Content noPadding style={styles.contentContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>
            {t('Enter the 6-digit code sent to number')}
          </Text>
          <Text style={styles.sectionTitle}>{phoneNumber}</Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <CodeInput
              onChangeText={text => {
                setstate(old => ({ ...old, code: text }));
              }}
            //numOfInputs={6}
            />
          </View>
          <View style={styles.submitContainer}>
            <Button
              title={t('Verify And Proceed')}
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
});

export default ForgetPhoneCode;
