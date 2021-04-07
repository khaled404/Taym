import React, {FC} from 'react';
import {
  Animated,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Colors, Fonts, Pixel, ScreenOptions,} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import {NavigationProps} from '../../constants/interfaces';
import {
  ArrowHeaderIcon,
  CartIcon,
  HeaderSearchIcon,
  LogoIcon,
  MenuIcon,
  NotificationIcon,
  SearchIcon,
} from '../../../assets/Icons/Icons';
import IconTouchableContainer from '../touchables/IconTouchableContainer';
import {useTranslation} from 'react-i18next';
import Input from '../textInputs/Input';

interface ICategoryHeader {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  toggleHeader: Boolean;
  handleToggleHeader: () => void;
  fadeAnim: Animated.Value;
}

const SearchSubmitBtn: FC = () => {
  return (
    <IconTouchableContainer style={styles.submitSearchBtn}>
      <SearchIcon width={17} height={17}/>
    </IconTouchableContainer>
  );
};

const CategoryHeader: FC<NavigationProps & ICategoryHeader> = ({
                                                                 navigate,
                                                                 goBack,
                                                                 name,
                                                                 title,
                                                                 containerStyle,
                                                                 titleStyle,
                                                                 toggleHeader,
                                                                 handleToggleHeader,
                                                                 fadeAnim
                                                               }) => {
  const {t} = useTranslation();
  console.log('fadeAnim', fadeAnim)
  return (
    <View style={[styles.mainContainer, containerStyle]}>
      <View style={[styles.rowConatiner]}>
        <View style={styles.right}>
          <Animated.View style={[styles.titleConatiner, {
            opacity: fadeAnim,
            visibility: hidden,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
              }),
            }]
          }]}>
            <LogoIcon width={56} height={30}/>
          </Animated.View>
          <IconTouchableContainer onPress={global.DrawerProps.openDrawer}>
            <MenuIcon/>
          </IconTouchableContainer>
        </View>

        <View style={styles.centerContainer}>
            <Animated.View style={{opacity: fadeAnim}}>
              <Text style={styles.addressTitle}>{t('Deliver To')}</Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.addressText}>Alexandria - Miami</Text>
                <ArrowHeaderIcon/>
              </TouchableOpacity>
            </Animated.View>
          {toggleHeader && (
            <View style={[styles.titleConatiner, {marginLeft: 0}]}>
              <Text
                style={[styles.title, titleStyle]}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {title ? title : ''}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.leftContainer}>

          {!toggleHeader ? (
            <IconTouchableContainer onPress={() => navigate('Cart')}>
              <CartIcon/>
            </IconTouchableContainer>
          ) : (
            <IconTouchableContainer onPress={handleToggleHeader}>
              <HeaderSearchIcon/>
            </IconTouchableContainer>
          )}

          <IconTouchableContainer>
            <NotificationIcon/>
          </IconTouchableContainer>
        </View>
      </View>

      {!toggleHeader && (<View style={styles.searchInputContainer}>
        <Input
          options={{
            placeholder: t('What You Are Looking For ?'),
            placeholderTextColor: '#949494',
          }}
          contentContainerStyle={{borderRadius: 22, borderWidth: 0, padding: 0}}
          rightContent={() => <SearchSubmitBtn/>}
          iconRightStyle={{top: 5}}
        />
      </View>)}

    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.sacandAppBackgroundColor,
    paddingTop: ScreenOptions.StatusBarHeight + 15,
    minHeight:
      Platform.OS === 'android'
        ? 56 + ScreenOptions.StatusBarHeight
        : 64 + ScreenOptions.StatusBarHeight,
    paddingHorizontal: 15,
    zIndex: 200,
    // paddingBottom: Pixel(30),
  },
  rowConatiner: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleConatiner: {
    ...commonStyles.rowBox,
    marginLeft: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: Pixel(10),
  },
  title: {
    color: Colors.colorSacand,
    fontSize: 20,
    fontFamily: Fonts.bold,
  },
  cartContainer: {
    backgroundColor: Colors.colorSacand,
    width: 20,
    height: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    position: 'absolute',
    zIndex: 3,
    right: -7,
    top: -4,
  },
  centerContainer: {
    // marginRight: 'auto',
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  addressTitle: {
    textAlign: 'center',
    color: Colors.dark,
    fontFamily: Fonts.regular,
    fontSize: Pixel(25),
  },
  addressText: {
    textAlign: 'center',
    color: Colors.colorSacand,
    fontFamily: Fonts.medium,
    fontSize: Pixel(25),
    marginRight: Pixel(15),
  },
  searchInputContainer: {
    marginTop: Pixel(50),
    paddingBottom: Pixel(20),
  },
  submitSearchBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Colors.sacandAppBackgroundColor,
    padding: 4,
    borderRadius: 15,
  },
});

export default CategoryHeader;
