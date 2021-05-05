import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from '../../components/containers/Containers';
import {Colors, Fonts, Images, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Header from '../../components/header/Header';
import {EditIcon, InputEditIcon} from '../../../assets/Icons/Icons';
import FastImage from 'react-native-fast-image';
import {commonStyles} from '../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import Input from '../../components/textInputs/Input';
import IconTouchableContainer from '../../components/touchables/IconTouchableContainer';
import Button from '../../components/touchables/Button';
import {useNavigation} from '@react-navigation/native';
import {getDateHandler} from '../../constants/helpers';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {GetUserProfileData, updateUserProfile} from '../../store/actions/auth';

const Profile: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const userData: any = useSelector((state: RootState) => state.auth.userData);
  const dispatch = useDispatch();
  const [state, setstate] = useState({
    username: userData.name,
    email: userData.email,
    phone: userData.phone,
    photo: userData.photo,
    image: '',
    password: 'userData.password',
    birthdate: userData.birthday ? userData.birthday : getDateHandler(),
    isDatePickerVisible: false,
    loader: false,
    editUsername: false,
    editEmail: false,
  });
  const getLetter = (st: string) => {
    const fullName = st?.split(' ');
    const letters = fullName.shift().charAt(0);
    return letters.toUpperCase();
  };
  useEffect(() => {
    dispatch(GetUserProfileData());
    console.log('ProfileuserData', userData);
  }, []);
  const picImageHandler = async () => {
    try {
      launchImageLibrary(
        {
          includeBase64: true,
          mediaType: 'photo',
          quality: 0.5,
        },
        response => {
          console.log('responsepicImageHandler', response);
          setstate((old: any) => ({
            ...old,
            image: response.uri,
            photo: response.base64,
          }));
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const PasswordIcon = () => {
    return (
      <IconTouchableContainer onPress={() => navigate('NewPassword')}>
        <InputEditIcon />
      </IconTouchableContainer>
    );
  };
  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));

    dispatch(
      updateUserProfile(
        state.username,
        state.email,
        state.birthdate,
        state.photo,
        () => {
          setstate(old => ({...old, loader: false}));
        },
      ),
    );
  };
  return (
    <Container style={styles.container}>
      <Header title={t('Profile')} />
      <Content
        noPadding
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 50,
        }}
        style={styles.contentContainer}>
        <DateTimePickerModal
          isVisible={state.isDatePickerVisible}
          mode="date"
          onConfirm={(date: any) => {
            setstate(old => ({
              ...old,
              isDatePickerVisible: false,
              birthdate: getDateHandler(date),
            }));
          }}
          onCancel={() => {
            setstate(old => ({...old, isDatePickerVisible: false}));
          }}
          maximumDate={new Date()}
        />

        <View style={styles.profileHeader}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.editIcon}>
              <EditIcon />
            </View>
            <TouchableOpacity
              style={styles.userImage}
              onPress={picImageHandler}>
              <FastImage
                source={
                  userData.photo
                    ? {uri: userData.photo}
                    : state.image
                    ? {uri: state.image}
                    : Images.userImage
                }
                style={commonStyles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
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
              rightContent={() => (
                <TouchableOpacity
                  onPress={() =>
                    setstate((old: any) => ({
                      ...old,
                      editUsername: !state.editUsername,
                    }))
                  }>
                  <InputEditIcon />
                </TouchableOpacity>
              )}
              options={{
                onChangeText: value => {
                  setstate(old => ({...old, username: value}));
                },
                value: state.username,
                editable: state.editUsername,
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Email')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              rightContent={() => (
                <TouchableOpacity
                  onPress={() =>
                    setstate((old: any) => ({
                      ...old,
                      editEmail: !state.editEmail,
                    }))
                  }>
                  <InputEditIcon />
                </TouchableOpacity>
              )}
              options={{
                onChangeText: value => {
                  setstate(old => ({...old, email: value}));
                },
                value: state.email,
                keyboardType: 'email-address',
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Mobile Number')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              rightContent={() => (
                <TouchableOpacity
                  onPress={() => {
                    navigate('NewPhoneNumber');
                  }}>
                  <InputEditIcon />
                </TouchableOpacity>
              )}
              options={{
                editable: false,
                onChangeText: value => {
                  setstate(old => ({...old, phone: value}));
                },
                value: state.phone,
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
                  setstate(old => ({...old, password: value}));
                },
                value: state.password,
                secureTextEntry: true,
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Birth Date')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              rightContent={() => (
                <TouchableOpacity
                  onPress={() => {
                    setstate(old => ({...old, isDatePickerVisible: true}));
                  }}>
                  <InputEditIcon />
                </TouchableOpacity>
              )}
              options={{
                editable: false,

                onChangeText: value => {
                  setstate(old => ({...old, birthdate: value}));
                },
                value: state.birthdate,
              }}
            />
          </View>
        </View>
        <View style={styles.submitContainer}>
          <Button
            title={t('Save')}
            onPress={submitHandler}
            loader={state.loader}
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
    height: Pixel(160),
    position: 'relative',
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    alignSelf: 'center',
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
    right: Pixel(0),
    top: Pixel(5),
    zIndex: 150,
    elevation: 3,
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
    marginTop: 30,
  },
  image: {
    backgroundColor: '#00000029',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Pixel(70),
    width: Pixel(140),
    height: Pixel(140),
    alignSelf: 'center',
  },
  imageText: {
    color: Colors.dark,
    fontFamily: Fonts.bold,
    fontSize: Pixel(45),
    // textAlign: 'left',
  },
});

export default Profile;
