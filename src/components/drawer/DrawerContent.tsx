import React, {FC, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
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
//import { useNavigation } from '@react-navigation/native';

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
  //const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const {isLogin, userData}: any = useSelector(
    (state: RootState) => state.auth,
  );

  const logOut = () => {
    dispatch(
      LogoutHandler(success => {
        success && navigation?.navigate('Login');
      }),
    );
  };

  const getLetter = (st: string) => {
    const fullName = st.split(' ');
    const letters = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return letters.toUpperCase();
  };

  const {t}: any = useTranslation();
  console.log(userData, 'userData');
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => {
            navigation?.navigate('Profile');
          }}>
          <View style={styles.userImage}>
            <View style={styles.editIcon}>
              <EditIcon />
            </View>

            {/* <FastImage
              source={userData.image ? { uri: userData.image } : Images.userImage}
              style={commonStyles.image}
              resizeMode="contain"
            /> */}

            <View style={styles.image}>
              <Text style={styles.imageText}>
                {userData.name && getLetter(userData.name)}
              </Text>
            </View>
          </View>
          <View style={styles.userContent}>
            <Text style={styles.userTitle}>
              {userData.name}
              {/* {isLogin ? userData.name : t('Login')} */}
            </Text>
            <Text style={styles.userSupTitle}>
              {userData.phone}
              {/* {isLogin ? userData.name : t('Login')} */}
            </Text>
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
            />
            <DrawerItem
              Icon={HeartIcon}
              title={t('Favorite')}
              onPress={() => {
                navigation?.navigate('Favorite');
              }}
            />
            <DrawerItem
              Icon={VouchergIcon}
              title={t('Voucher')}
              voucher="120 LE"
              onPress={() => {
                navigation?.navigate('Voucher');
              }}
            />
            <DrawerItem
              Icon={ListIcon}
              title={t('My Orders')}
              onPress={() => {
                navigation?.navigate('MyOrders');
              }}
            />
            <DrawerItem
              Icon={OffersIcon}
              title={t('Offers')}
              onPress={() => {
                navigation?.navigate('Home');
              }}
            />
            <DrawerItem
              Icon={SettingsIcon}
              title={t('Settings')}
              onPress={() => {
                navigation?.navigate('Settings');
              }}
            />
            <DrawerItem
              Icon={TelephoneIcon}
              title={t('Suport')}
              onPress={() => {
                navigation?.navigate('Home');
              }}
            />
          </View>
          <View></View>
        </View>
        <DrawerItem
          Icon={LogOut}
          title={t('Log Out')}
          onPress={() => {
            logOut();
          }}
        />
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
