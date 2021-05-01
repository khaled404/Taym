import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container, Content} from '../../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Header from '../../components/header/Header';
import {useDispatch} from 'react-redux';
import Input from '../../components/textInputs/Input';
import Button from "../../components/touchables/Button";
import {SetNewPasswordHandler} from "../../store/actions/auth";
import {useNavigation} from "@react-navigation/native";
import {showMessage} from "react-native-flash-message";

const NewPassword: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  // const userData = useSelector((state: RootState) => state.auth.userData);
  // console.log('Profile userData',userData)


  const [loader, setLoader] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const submitHandler = () => {
    if (oldPassword !== '' && newPassword !== '' && newPasswordConfirm !== '') {
      if (newPassword === newPasswordConfirm) {
        setLoader(true);
        dispatch(
          SetNewPasswordHandler(
            'Sayed@123',
            'Ssayed@123',
            'Ssayed@123',
            success => {
              setLoader(false);
              success && navigate('Profile');
            },
          ),
        );
      }else{
        showMessage({
          message: t('Password and password confirmation does not match'),
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: t('Please fill all fields'),
        type: 'danger',
      });
    }

  };
  return (
    <Container style={styles.container}>
      <Header title={t('New Password')}/>
      <Content
        noPadding
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        style={styles.contentContainer}>
        {/*<View style={styles.profileHeader}>*/}
        {/*  <TouchableOpacity style={styles.userImage}>*/}
        {/*    <View style={styles.editIcon}>*/}
        {/*      <EditIcon/>*/}
        {/*    </View>*/}
        {/*    <FastImage*/}
        {/*      source={userData.image ? {uri: userData.image} : Images.userImage}*/}
        {/*      style={commonStyles.image}*/}
        {/*      resizeMode="contain"*/}
        {/*    />*/}
        {/*  </TouchableOpacity>*/}
        {/*  <View style={styles.userContent}>*/}
        {/*    <Text style={styles.userTitle}>{userData.name}</Text>*/}
        {/*    <Text style={styles.userSupTitle}>{userData.phone}</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}

        <View style={styles.inputsContainer}>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Old password')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              // rightContent={PasswordIcon}
              // iconRightStyle={{top: 9,right:5}}
              options={{
                editable: true,
                onChangeText: value => {
                  setOldPassword(value);
                },
                value: oldPassword,
                secureTextEntry: secureTextEntry,
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('New password')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              // rightContent={PasswordIcon}
              // iconRightStyle={{top: 9,right:5}}
              options={{
                editable: true,
                onChangeText: value => {
                  setNewPassword(value);
                },
                value: newPassword,
                secureTextEntry: secureTextEntry,
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('New password confirmation')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              // rightContent={PasswordIcon}
              // iconRightStyle={{top: 9,right:5}}
              options={{
                editable: true,
                onChangeText: value => {
                  setNewPasswordConfirm(value);
                },
                value: newPasswordConfirm,
                secureTextEntry: secureTextEntry,
              }}
            />
          </View>
          <View style={styles.submitContainer}>
            <Button
              title={t('Save')}
              onPress={submitHandler}
              loader={loader}
            />
          </View>
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

export default NewPassword;
