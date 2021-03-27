import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container, Content} from '../../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Input from '../../components/textInputs/Input';
import AuthHeader from '../../components/header/AuthHeader';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/touchables/Button';

const Forget2: FC = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {t} = useTranslation();
  const {navigate} = useNavigation();
  return (
    <Container style={styles.container}>
      <AuthHeader />
      <Content noPadding style={styles.contentContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>
            Your Identity Has Been Verified{' '}
          </Text>
          <Text style={styles.sectionTitle}>Set Your New Password</Text>
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>New Password</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setPassword(value);
                },
                value: password,
                secureTextEntry: secureTextEntry,
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm New Password</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setConfirmPassword(value);
                },
                value: confirmPassword,
                secureTextEntry: secureTextEntry,
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
    paddingHorizontal: 20,
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
