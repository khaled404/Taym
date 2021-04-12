import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors, Fonts, Images, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {ScreenProps} from '../../constants/interfaces';
import DrawerItem from './DrawerItem';
import FastImage from 'react-native-fast-image';
import {commonStyles} from '../../styles/styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {LogoutHandler} from '../../store/actions/auth';
import {
  HomeIcon,
  HeartIcon,
  VouchergIcon,
  ListIcon,
  OffersIcon,
  SettingsIcon,
  TelephoneIcon,
  EditIcon,
  LogOut,
} from '../../../assets/Icons/Icons';

const {height, width} = Dimensions.get('window');
const DrawerContent: FC<ScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLogin, userData}: any = useSelector(
    (state: RootState) => state.auth,
  );
  const {voucherData}: any = useSelector(
    (state: RootState) => state.voucher,
  );
  const {t}: any = useTranslation();

  const getLetter = (st: string) => {
    const fullName = st?.split(' ');
    const letters = fullName.shift().charAt(0) 
    return letters.toUpperCase();
  };

  const logOut = () => {
    dispatch(
      LogoutHandler(() => {
        navigation.closeDrawer();
      }),
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => {
            navigation?.navigate(isLogin ? 'Profile' : 'Login');
          }}>
          <View style={styles.userImage}>
            {isLogin ? (
              <View style={styles.editIcon}>
                <EditIcon />
              </View>
            ) : null}
            {/*   <FastImage
              source={isLogin? userData.image ? {uri: userData.image} : Images.userImage:Images.defAvatar}
              style={commonStyles.image}
              resizeMode="contain"
            /> */}

            {isLogin ? (
              <View style={styles.image}>
                <Text style={styles.imageText}>
                  {!!userData.name && getLetter(userData.name)}
                </Text>
              </View>
            ) : (
              <Image source={Images.defAvatar} resizeMode="contain" />
            )}
          </View>
          <View style={styles.userContent}>
            <Text style={styles.userTitle}>
              {!isLogin ? 'Login Or Sign up' : userData.name}
              {/* {isLogin ? userData.name : t('Login')} */}
            </Text>
            {isLogin ? (
              <Text style={styles.userSupTitle}>
                {userData.phone}
                {/* {isLogin ? userData.name : t('Login')} */}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
        <View style={styles.body}>
          <View>
            <DrawerItem
              Icon={HomeIcon}
              title={t('Home')}
              onPress={() => {
                navigation?.navigate('Home');
              }}
              isLogin={true}
            />
            <DrawerItem
              Icon={HeartIcon}
              title={t('Favorite')}
              onPress={() => {
                navigation?.navigate('Favorite');
              }}
              isLogin={isLogin}
            />
            <DrawerItem
              Icon={VouchergIcon}
              title={t('Voucher')}
              voucher={voucherData.user + ' LE'}
              onPress={() => {
                navigation?.navigate('Voucher');
              }}
              isLogin={isLogin}
            />
            <DrawerItem
              Icon={ListIcon}
              title={t('My Orders')}
              /* onPress={() => {
                navigation?.navigate('MyOrders');
              }} */
              isLogin={isLogin}
            />
            <DrawerItem
              Icon={OffersIcon}
              title={t('Offers')}
              onPress={() => {
                navigation?.navigate('Home');
              }}
              isLogin={true}
            />
            <DrawerItem
              Icon={SettingsIcon}
              title={t('Settings')}
              onPress={() => {
                navigation?.navigate('Settings');
              }}
              isLogin={true}
            />
            <DrawerItem
              Icon={TelephoneIcon}
              title={t('Suport')}
              onPress={() => {
                navigation?.navigate('Home');
              }}
              isLogin={true}
            />
          </View>
          {isLogin ? (
            <View
              style={{
                marginTop: 30,
              }}>
              <DrawerItem
                Icon={LogOut}
                title={t('Log Out')}
                onPress={() => {
                  logOut();
                }}
                isLogin={isLogin}
              />
            </View>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default DrawerContent;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingLeft: 15,
    paddingBottom: 20,
  },
  content: {
    width: '100%',
    paddingTop: '25%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: Pixel(140),
    height: Pixel(150),
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
    textAlign: 'left',
  },
  userSupTitle: {
    color: Colors.dark,
    fontFamily: Fonts.regular,
    fontSize: Pixel(35),
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
  body: {
    paddingTop: 30,
    paddingBottom: 15,
  },
  image: {
    backgroundColor: '#00000029',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Pixel(70),
    width: Pixel(140),
    height: Pixel(140),
  },
  imageText: {
    color: Colors.dark,
    fontFamily: Fonts.bold,
    fontSize: Pixel(45),
    textAlign: 'left',
  },
});
