import React, {FC, useRef} from 'react';
import {Animated, Dimensions, FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import {Colors, Fonts, Images, Pixel} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import Input from '../components/textInputs/Input';
import IconTouchableContainer from '../components/touchables/IconTouchableContainer';
import {ArrowLeftSmIcon, CartIcon, DeliveryIcon, SearchIcon} from '../../assets/Icons/Icons';
import {commonStyles} from "../styles/styles";
import {useNavigation} from "@react-navigation/native";
import ProductsList from "../components/products/ProductsList";


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const heightHeader = (Dimensions.get('window').height) / 4
const HEADER_MIN_HEIGHT = Pixel(150);
const HEADER_SCROLL_DISTANCE = heightHeader - HEADER_MIN_HEIGHT;
const ShopDetails: FC = () => {
  const {t} = useTranslation();
  const {goBack} = useNavigation();
  const {language}: any = useSelector((state: RootState) => state.settings);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const inputTextAlign = language === 'ar' ? 'right' : 'left';
  const translateContent = animatedValue.interpolate({
    inputRange: [0, Pixel(220)],
    outputRange: [0, Pixel(-220)],
    extrapolate: 'clamp',
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, heightHeader / 2, heightHeader / 1.7],
    outputRange: [1, .5, 0],
    extrapolate: 'clamp',
  });

  const imageTranslateY = animatedValue.interpolate({
    inputRange: [0, heightHeader / 2, heightHeader / 1.7],
    outputRange: [1, .5, 0],
    extrapolate: 'clamp',
  });

  const translateList = animatedValue.interpolate({
    inputRange: [0, heightHeader / 2, heightHeader / 1.7],
    outputRange: [0, Pixel(50), Pixel(120)],
    extrapolate: 'clamp',
  })
  const translateHeader = animatedValue.interpolate({
    inputRange: [0, heightHeader / 1.7],
    outputRange: [0, Pixel(-60)],
    extrapolate: 'clamp',
  })

  const categoryHomeData = [
    {
      id: 1,
      key: 1,
      title: t('Supermarket'),
      image: 'Voucher 12457',
    },

    {
      id: 2,
      key: 2,
      title: t('Beef'),
      image: 'Voucher 12457',
    },

    {
      id: 3,
      key: 3,
      title: t('Chicken'),
      image: 'Voucher 12457',
    },

    {
      id: 4,
      key: 4,
      title: t('Fish'),
      image: 'Voucher 12457',
    },

    {
      id: 5,
      key: 5,
      title: t('Fruit'),
      image: 'Voucher 12457',
    },

    {
      id: 6,
      key: 6,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
    {
      id: 7,
      key: 7,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
    {
      id: 8,
      key: 8,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
    {
      id: 9,
      key: 9,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
    {
      id: 10,
      key: 10,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
    {
      id: 11,
      key: 11,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
    {
      id: 12,
      key: 12,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
    {
      id: 13,
      key: 13,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
    {
      id: 14,
      key: 14,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    }
  ];

  const SearchSubmitBtn: FC = () => {
    return (
      <IconTouchableContainer style={styles.submitSearchBtn}>
        <SearchIcon width={17} height={17}/>
      </IconTouchableContainer>
    );
  };
  return (
    <Container style={styles.container}>
      <ImageBackground
        source={Images.supermarket}
        style={styles.header}
        imageStyle={{}}
      >
        <View style={styles.overlay}>
          <View style={{
            height: heightHeader / 2,
            paddingHorizontal: Pixel(50),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}>
            <IconTouchableContainer dark onPress={goBack} style={styles.headerBackBtn}>
              <ArrowLeftSmIcon width={20} style={commonStyles.rtlRotate}/>
            </IconTouchableContainer>
            <CartIcon/>
          </View>
        </View>
      </ImageBackground>
      <Animated.View style={[styles.content, {transform: [{translateY: translateContent}]}]}>
        <Animated.View
          style={[{
            width: '100%',
            alignItems: 'center',
            height: 50,
          }, {transform: [{scaleY: imageTranslateY}]}]}>
          <Animated.View style={[styles.imageContainer, {
            opacity: opacity,
          }]}>
            <Animated.Image
              source={Images.marketLogo}
              resizeMode={'contain'}
              style={[{width: Pixel(180), height: Pixel(180)}, {
                opacity: opacity,
              }]}/>
          </Animated.View>
        </Animated.View>

        <Animated.View style={[{transform: [{translateY: translateHeader}], paddingHorizontal: 20,width:'100%'}]}>
          <View style={[styles.storeDetail]}>
            <Text
              style={[styles.storeTitle, {textAlign: language === 'ar' ? 'left' : 'right'}]}>{t('Supermarket')}</Text>
            <View style={styles.storeDeliveryDetails}>
              <DeliveryIcon/>
              <Text style={styles.storeDeliveryPeriod}>30{t(' Min')}</Text>
            </View>
          </View>
        </Animated.View>


        <Animated.View style={[styles.searchInputContainer, {
          opacity: opacity
        }]}>
          <Input
            options={{
              placeholder: t('What You Are Looking For ?'),
              placeholderTextColor: '#949494',
            }}
            contentContainerStyle={{borderRadius: 22, borderWidth: 0, padding: Pixel(33)}}
            textInputContainer={{
              textAlign: inputTextAlign,
              // paddingVertical: Pixel(33),
            }}
            rightContent={() => <SearchSubmitBtn/>}
            iconRightStyle={{top: 4.5}}
          />
        </Animated.View>

        {/*<Animated.View style={[{transform: [{translateY: translateList}], padding: 0}]}>*/}

          {/*<AnimatedFlatList*/}
          {/*  onScroll={Animated.event(*/}
          {/*    [{nativeEvent: {contentOffset: {y: animatedValue}}}],*/}
          {/*    {useNativeDriver: true} // <-- Add this*/}
          {/*  )}*/}
          {/*  scrollEventThrottle={16}*/}
          {/*  //style={[{ transform: [{ translateY: translateList }] }]}*/}
          {/*  data={categoryHomeData}*/}
          {/*  numColumns={2}*/}
          {/*  horizontal={false}*/}
          {/*  showsVerticalScrollIndicator={false}*/}
          {/*  */}
          {/*  columnWrapperStyle={{justifyContent: 'space-between', backgroundColor: 'red',}}*/}
          {/*  keyExtractor={item => item.id.toString()}*/}
          {/*  renderItem={({item, index}) => (*/}
          {/*    <FavoriteItem {...item} key={index} index={index}/>*/}
          {/*  )}*/}
          {/*/>*/}
          <Content noPadding
                   contentContainerStyle={styles.contentContainer}
                   onScroll={Animated.event(
                     [{nativeEvent: {contentOffset: {y: animatedValue}}}],
                     {
                       // listener: (event) => handleOnScroll(event),
                       useNativeDriver: true
                     }
                   )}
                   options={{scrollEventThrottle: 16}}
          >
            <ProductsList data={categoryHomeData}/>
          </Content>
        {/*</Animated.View>*/}

      </Animated.View>
    </Container>
  );
};

export default ShopDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.minColor,

  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  header: {
    height: heightHeader,
    zIndex: 1,
    position: 'relative',
    justifyContent: 'flex-start'
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(250,250,250,0.7)',
    zIndex: 1,
    position: 'relative'
  },
  content: {
    // flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 1000,
    position: 'relative',
    marginTop: -50,
    alignItems: 'center'
  },
  imageContainer: {
    width: 110,
    height: 110,
    backgroundColor: Colors.minColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    ...commonStyles.boxShadow,
    // overflow: 'hidden',
    top: -70,

  },
  searchInputContainer: {
    marginTop: Pixel(30),
    paddingBottom: Pixel(20),
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
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
  headerBackBtn: {
    width: Pixel(55),
    height: Pixel(55),
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeDetail: {
    ...commonStyles.rowBox,
    width: '100%',
    marginTop: Pixel(20),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#707070',
    paddingBottom:10
    // paddingHorizontal: 20,
  },
  storeTitle: {
    fontFamily: Fonts.black,
    fontSize: Pixel(40),
    color: Colors.dark,
  },
  storeDeliveryPeriod: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(30),
    color: Colors.dark,
    marginLeft: Pixel(15),
  },
  storeDeliveryDetails: {
    ...commonStyles.rowBox,
  },
});
