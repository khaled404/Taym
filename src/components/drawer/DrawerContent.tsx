import React, {FC} from 'react';
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
import {
  HomeIcon,
  HeartIcon,
  VouchergIcon,
  ListIcon,
  OffersIcon,
  SettingsIcon,
  TelephoneIcon,
  EditIcon,
} from '../../../assets/Icons/Icons';

const {height, width} = Dimensions.get('window');
const DrawerContent: FC<ScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLogin, userData}: any = useSelector(
    (state: RootState) => state.auth,
  );
  const {t}: any = useTranslation();

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
            <FastImage
              source={userData.image ? {uri: userData.image} : Images.userImage}
              style={commonStyles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.userContent}>
            <Text style={styles.userTitle}>
              Yassin Ahmed
              {/* {isLogin ? userData.name : t('Login')} */}
            </Text>
            <Text style={styles.userSupTitle}>
              0123456789
              {/* {isLogin ? userData.name : t('Login')} */}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.body}>
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
});
