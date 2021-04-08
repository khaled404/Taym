import React, {FC, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Container, Content} from '../../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Input from '../../components/textInputs/Input';
import AuthHeader from '../../components/header/AuthHeader';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/touchables/Button';
import {useDispatch} from 'react-redux';
import {ForgetHandler} from '../../store/actions/auth';

const Forget: FC = () => {
  const [state, setstate] = useState({
    phone: '',
    loader: false,
  });
  const dispatch = useDispatch();
  const submitHandler = () => {
    console.log('success1');
    setstate(old => ({...old, loader: true}));
    dispatch(
      ForgetHandler(state.phone, success => {
        console.log(success, '   ', state.phone, 'success');
        setstate(old => ({...old, loader: false}));
        success && navigate('ForgetPhoneCode');
      }),
    );
  };
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  return (
    <Container style={styles.container}>
      <AuthHeader />
      <Content style={styles.contentContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.mainTitle}>
            {t('Enter Email / Mobile Number')}
          </Text>
          <Text style={styles.sectionTitle}>
            {t("And We'll Send You The Instructions")}
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Mobile Nember')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setstate(old => ({
                    ...old,
                    phone: value,
                  }));
                },
                value: state.phone,
                onSubmitEditing: submitHandler,
              }}
            />
          </View>
          <View style={styles.submitContainer}>
            <Button title={t('Next')} onPress={submitHandler} />
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

export default Forget;
