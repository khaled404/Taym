import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container, Content} from '../../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import AuthHeader from '../../components/header/AuthHeader';
import {useNavigation} from '@react-navigation/native';
import {SuccessIcon} from '../../../assets/Icons/Icons';
import Button from '../../components/touchables/Button';

const Forget3: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  return (
    <Container style={styles.container}>
      <AuthHeader />
      <Content style={styles.contentContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.mainTitle}>{t('Congratulations')}</Text>
          <Text style={styles.sectionTitle}>
            {t('Your Password Has Been Updated')}
          </Text>
        </View>
        <View style={styles.successIconContainer}>
          <SuccessIcon />
        </View>
        <View style={styles.submitContainer}>
          <Button
            title={t('Login')}
            onPress={() => {
              navigate('Login');
            }}
          />
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
    fontSize: Pixel(43),
    marginVertical: Pixel(20),
    textAlign: 'left',
  },
  submitContainer: {
    marginVertical: Pixel(80),
  },
  sectionTitleContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontFamily: Fonts.medium,
    color: Colors.dark,
    marginLeft: 5,
    fontSize: Pixel(32),
    textAlign: 'left',
  },
  successIconContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
});

export default Forget3;
