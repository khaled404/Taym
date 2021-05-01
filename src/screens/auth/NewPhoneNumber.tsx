import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container, Content} from '../../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Input from '../../components/textInputs/Input';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/touchables/Button';
import {useDispatch} from 'react-redux';
import {NewPhonePhoneHandler} from '../../store/actions/auth';
import {showMessage} from 'react-native-flash-message';
import Header from '../../components/header/Header';

const NewPhoneNumber: FC = () => {
  const [state, setstate] = useState({
    phone: '',
    newPhone: '',
    loader: false,
  });

  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    if (state.phone.length === 11) {
      dispatch(
        NewPhonePhoneHandler(state.phone, state.newPhone, success => {
          setstate(old => ({...old, loader: false}));
          success &&
            navigate('NewPhoneCode', {
              oldPhone: state.phone,
              newPhone: state.phone,
            });
        }),
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
      <Header title={t('New Mobile Number')} />
      <Content noPadding contentContainerStyle={styles.contentContainer}>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Old Mobile Number')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: (value: string) => {
                  setstate(old => ({...old, phone: value}));
                },
                value: state.phone,
                keyboardType: 'number-pad',
                onSubmitEditing: submitHandler,
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('New Mobile Number')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: (value: string) => {
                  setstate(old => ({...old, newPhone: value}));
                },
                keyboardType: 'number-pad',
                onSubmitEditing: submitHandler,
              }}
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

export default NewPhoneNumber;
