import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container, Content } from '../components/containers/Containers';
import Header from '../components/header/Header';
import { Colors, Pixel, Fonts } from '../constants/styleConstants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/styles';
import ChatCard from '../components/Support/ChatCard'
import Input from '../components/textInputs/Input'
import { Attache, Send } from '../../assets/Icons/Icons'

const Support: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  return (
    <Container style={styles.container}>
      <Header title="Contact Us" />
      <Content style={{ paddingVertical: Pixel(50), paddingHorizontal: Pixel(30) }} >

        <ChatCard />

      </Content>
      <View style={{
        width: '100%',
        height: Pixel(150),
        backgroundColor: Colors.inputBackground,
        alignItems: 'center',
        justifyContent: 'center'
      }} >
        <Input
          textInputContainer={[
            styles.textInput,
          ]}
          leftContent={() => <Attache width={Pixel(40)} height={Pixel(40)} />}
          rightContent={() => <Send width={Pixel(60)} height={Pixel(60)} />}
          contentContainerStyle={styles.contentContainerStyle}
          options={{
            placeholder: 'Type A Message'
            /* onChangeText: value => {
              setName(value);
            },
            value: name, */
          }} />
      </View>
    </Container>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  textInput: {
    height: '90%',
    padding: 0,
    fontFamily: Fonts.medium,
    fontSize: Pixel(30),
    color: Colors.lock,
    alignSelf:'flex-start'
  },
  contentContainerStyle: {
    width: '95%',
    height: '80%',
  },
});
