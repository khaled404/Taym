import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from '../../components/containers/Containers';
import {Colors, Fonts, Images, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Header from '../../components/header/Header';
import {EditIcon, InputEditIcon} from '../../../assets/Icons/Icons';
import FastImage from 'react-native-fast-image';
import {commonStyles} from '../../styles/styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import Input from '../../components/textInputs/Input';
import IconTouchableContainer from '../../components/touchables/IconTouchableContainer';
import Button from "../../components/touchables/Button";
import {useNavigation} from "@react-navigation/native";

const Profile: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const userData = useSelector((state: RootState) => state.auth.userData);
  console.log('Profile userData', userData)
  const [username, setUsername] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [password, setPassword] = useState(userData.password);
  const [birthdate, setBirthdate] = useState(userData.birthday);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const PasswordIcon = () => {
    return (
      <IconTouchableContainer
        onPress={() => navigate('NewPassword')}>
        <InputEditIcon/>
      </IconTouchableContainer>
    );
  };
  return (
    <Container style={styles.container}>
      <Header title={t('Profile')}/>
      <Content
        noPadding
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        style={styles.contentContainer}>
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.userImage}>
            <View style={styles.editIcon}>
              <EditIcon/>
            </View>
            <FastImage
              source={userData.image ? {uri: userData.image} : Images.userImage}
              style={commonStyles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.userContent}>
            <Text style={styles.userTitle}>{userData.name}</Text>
            <Text style={styles.userSupTitle}>{userData.phone}</Text>
          </View>
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Full Name')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              rightContent={() => <InputEditIcon/>}
              options={{
                editable: false,
                onChangeText: value => {
                  setUsername(value);
                },
                value: username,
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Email')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              rightContent={() => <InputEditIcon/>}
              options={{
                editable: false,
                onChangeText: value => {
                  setEmail(value);
                },
                value: email,
                keyboardType: 'email-address',
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Mobile Number')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              rightContent={() => <InputEditIcon/>}
              options={{
                editable: false,
                onChangeText: value => {
                  setPhone(value);
                },
                value: phone,
                keyboardType: 'number-pad',
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Password')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              rightContent={PasswordIcon}
              iconRightStyle={{top: 9, right: 5}}
              options={{
                editable: false,
                onChangeText: value => {
                  setPassword(value);
                },
                value: password,
                secureTextEntry: secureTextEntry,
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Birth Date')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              rightContent={() => <InputEditIcon/>}
              options={{
                editable: false,
                onChangeText: value => {
                  setBirthdate(value);
                },
                value: birthdate,
              }}
            />
          </View>

        </View>
        <View style={styles.submitContainer}>
          <Button
            title={t('Save')}
            // onPress={submitHandler}
            // loader={state.loader}
          />
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.sacandAppBackgroundColor,
    backgroundColor: '#313131',
  },
  contentContainer: {
    // paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  profileHeader: {
    alignItems: 'center',
    paddingBottom: Pixel(45),
    borderBottomWidth: 1,
    borderBottomColor: '#B8B8B8',
    marginBottom: Pixel(15),
  },
  userImage: {
    width: Pixel(160),
    height: Pixel(170),
    position: 'relative',
    borderRadius: 50,
  },
  userContent: {
    paddingLeft: 15,
  },
  userTitle: {
    color: Colors.dark,
    fontFamily: Fonts.bold,
    fontSize: Pixel(35),
    textAlign: 'center',
  },
  userSupTitle: {
    color: Colors.dark,
    fontFamily: Fonts.regular,
    fontSize: Pixel(30),
    textAlign: 'center',
  },
  editIcon: {
    width: Pixel(35),
    height: Pixel(35),
    backgroundColor: Colors.white,
    borderRadius: 50,
    position: 'absolute',
    right: Pixel(5),
    top: Pixel(10),
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    paddingHorizontal: Pixel(20),
    paddingVertical: Pixel(10),
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
    fontFamily: Fonts.medium,
    fontSize: Pixel(33),
    color: '#070707',
  },
  contentContainerStyle: {
    borderRadius: 14,
    borderWidth: 0,
    padding: 0,
    paddingHorizontal: 15,
  },
  submitContainer: {
    marginTop: 30
  }
});

export default Profile;
