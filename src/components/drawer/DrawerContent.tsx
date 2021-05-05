import React, {FC, useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts, Images, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {ScreenProps} from '../../constants/interfaces';
import DrawerItem from './DrawerItem';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {GetUserProfileData, LogoutHandler} from '../../store/actions/auth';
import {
  EditIcon,
  HeartIcon,
  HomeIcon,
  ListIcon,
  LogOut,
  OffersIcon,
  SettingsIcon,
  TelephoneIcon,
  VouchergIcon,
} from '../../../assets/Icons/Icons';
import {OpenUrlHandler} from '../../constants/helpers';
import {commonStyles} from '../../styles/styles';

const {height, width} = Dimensions.get('window');
const DrawerContent: FC<ScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const {voucherData, user}: any = useSelector(
    (state: RootState) => state.voucher,
  );
  const {t}: any = useTranslation();
  // console.log('voucherData.user', voucherData);

  const getLetter = (st: string) => {
    const fullName = st?.split(' ');
    const letters = fullName.shift().charAt(0);
    return letters.toUpperCase();
  };

  const logOut = () => {
    dispatch(
      LogoutHandler(() => {
        navigation.closeDrawer();
      }),
    );
  };

  useEffect(() => {
    if (userData?.token !== undefined && userData?.name === undefined) {
      dispatch(GetUserProfileData());
    }
  }, []);

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
              userData.photo !== null ? (
                <View style={styles.image}>
                  <Image
                    source={{uri: userData.photo}}
                    style={commonStyles.image}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <View style={styles.image}>
                  <Text style={styles.imageText}>
                    {!!userData.name && getLetter(userData.name)}
                  </Text>
                </View>
              )
            ) : (
              <Image source={Images.defAvatar} resizeMode="contain" />
            )}
          </View>
          <View style={styles.userContent}>
            <Text style={styles.userTitle}>
              {!isLogin ? t('Login Or Sign up') : userData.name}
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
            {/* <DrawerItem
              Icon={HeartIcon}
              title={t('Favorite')}
              onPress={() => {
                navigation?.navigate('Favorite');
              }}
              isLogin={isLogin}
            /> */}
            <DrawerItem
              Icon={VouchergIcon}
              title={t('Voucher')}
              voucher={user ? user + ' LE' : '0 LE'}
              onPress={() => {
                navigation?.navigate('Voucher');
              }}
              isLogin={isLogin}
            />
            {/* <DrawerItem
              Icon={ListIcon}
              title={t('My Orders')}
              onPress={() => {
                navigation?.navigate('MyOrders');
              }}
              isLogin={isLogin}
            /> */}
            {/* <DrawerItem
              Icon={OffersIcon}
              title={t('Offers')}
              onPress={() => {
                navigation?.navigate('Offers');
              }}
              isLogin={true}
            /> */}
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
                OpenUrlHandler(`https://wa.me/+97335087827`);
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
    overflow: 'hidden',
  },
  imageText: {
    color: Colors.dark,
    fontFamily: Fonts.bold,
    fontSize: Pixel(45),
    textAlign: 'left',
  },
});
