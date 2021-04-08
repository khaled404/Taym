import React, {FC, useState} from 'react';
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
import {NewPasswordHandler} from '../../store/actions/auth';

const Forget2: FC = () => {
  const [state, setstate] = useState({
    confirmPassword: '',
    password: '',
    secureTextEntry: true,
  });
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const {phoneNumber}: any = useSelector(
    (state: RootState) => state.auth,
    shallowEqual,
  );
  const dispatch = useDispatch();
  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    dispatch(
      NewPasswordHandler(
        phoneNumber,
        state.password,
        state.confirmPassword,
        success => {
          console.log(
            phoneNumber,
            state.password,
            state.confirmPassword,
            success,
            'succ',
          );
          setstate(old => ({...old, loader: false}));
          success && navigate('Forget3');
        },
      ),
    );
  };

  return (
    <Container style={styles.container}>
      <AuthHeader />
      <Content style={styles.contentContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>
            {t('Your Identity Has Been Verified')}
          </Text>
          <Text style={styles.sectionTitle}>{t('Set Your New Password')}</Text>
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('New Password')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setstate(old => ({
                    ...old,
                    password: value,
                  }));
                },
                value: state.password,
                secureTextEntry: state.secureTextEntry,
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Confirm New Password')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setstate(old => ({
                    ...old,
                    confirmPassword: value,
                  }));
                },
                value: state.confirmPassword,
                secureTextEntry: state.secureTextEntry,
              }}
            />
          </View>
          <View style={styles.submitContainer}>
            <Button
              title={t('Update')}
              onPress={() => {
                navigate('Forget3');
              }}
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
    paddingVertical: 10,
    backgroundColor: Colors.sacandAppBackgroundColor,
    flex: 1,
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
  sectionTitleContainer: {
    marginVertical: 15,
  },
  sectionTitle: {
    textAlign: 'center',
    fontFamily: Fonts.medium,
    color: Colors.dark,
    marginVertical: 5,
  },
});

export default Forget2;
