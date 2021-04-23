import React, {FC, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  I18nManager,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts, Images, Pixel} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import IconTouchableContainer from '../components/touchables/IconTouchableContainer';
import {
  ArrowLeftSmIcon,
  CartIcon,
  DeliveryIcon,
  FavoriteIcon,
  SearchIcon,
} from '../../assets/Icons/Icons';
import {commonStyles} from '../styles/styles';
import {useNavigation} from '@react-navigation/native';
import Input from '../components/textInputs/Input';
import ProductListItem from '../components/products/ProductListItem';
import Footer from '../components/ShopDetails/Footer';

const {isRTL} = I18nManager;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const heightHeader = Dimensions.get('window').height / 4;
const HEADER_MIN_HEIGHT = Pixel(150);
const HEADER_SCROLL_DISTANCE = heightHeader - HEADER_MIN_HEIGHT;
const ShopDetails: FC = () => {
  const {t} = useTranslation();
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
    },
  ];
  const DATA = [
    {
      id: 1,
      title: t('Supermarket'),
      image: 'Voucher 12457',
    },

    {
      id: 2,
      title: t('Beef'),
      image: 'Voucher 12457',
    },

    {
      id: 3,
      title: t('Chicken'),
      image: 'Voucher 12457',
    },

    {
      id: 4,
      title: t('Fish'),
      image: 'Voucher 12457',
    },

    {
      id: 5,
      title: t('Fruit'),
      image: 'Voucher 12457',
    },

    {
      id: 6,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
  ];
  const {goBack, navigate} = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  };
  const handleSelectedSubCategory = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };
  const Item = ({item, selectedCategory, handleSelectedCategory}) => (
    <TouchableOpacity
      onPress={() => handleSelectedCategory(item.title)}
      style={[
        styles.headerCategoryListItem,
        selectedCategory === item.title && {
          borderWidth: 2,
          borderColor: Colors.colorSacand,
          borderRadius: 7,
          padding: 5,
        },
      ]}>
      <Text
        style={[
          styles.categoryTitle,
          {
            color:
              selectedCategory === item.title
                ? Colors.colorSacand
                : Colors.dark,
          },
        ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const SubCategoryItem = ({
    item,
    selectedSubCategory,
    handleSelectedSubCategory,
  }) => (
    <TouchableOpacity
      onPress={() => handleSelectedSubCategory(item.title)}
      style={[
        styles.headerCategoryListItem,
        selectedSubCategory === item.title && {
          borderBottomWidth: 1,
          borderColor: Colors.colorSacand,
        },
      ]}>
      <Text
        style={[
          styles.subCategoryTitle,
          {
            color:
              selectedSubCategory === item.title
                ? Colors.colorSacand
                : Colors.dark,
          },
        ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  const translateContent = animatedValue.interpolate({
    inputRange: [0, Pixel(220)],
    outputRange: [0, Pixel(-220)],
    extrapolate: 'clamp',
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, Pixel(40), Pixel(80)],
    outputRange: [1, 0.7, 0],
    extrapolate: 'clamp',
  });

  const imageTranslateY = animatedValue.interpolate({
    inputRange: [0, heightHeader / 2, heightHeader / 1.7],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const translateList = animatedValue.interpolate({
    inputRange: [0, heightHeader / 2, heightHeader / 1.7],
    outputRange: [0, Pixel(50), Pixel(120)],
    extrapolate: 'clamp',
  });

  const translateHeader = animatedValue.interpolate({
    inputRange: [0, heightHeader / 1.7],
    outputRange: [0, Pixel(-60)],
    extrapolate: 'clamp',
  });

  const translateCategorySection = animatedValue.interpolate({
    inputRange: [0, heightHeader / 5],
    outputRange: [0, Pixel(-190)],
    extrapolate: 'clamp',
  });

  const translateHeaderDetails = animatedValue.interpolate({
    inputRange: [0, heightHeader / 1.7],
    outputRange: [0, Pixel(-60)],
    extrapolate: 'clamp',
  });
  const translateHeaderActions = animatedValue.interpolate({
    inputRange: [Pixel(-30), Pixel(130)],
    outputRange: [0, Pixel(-180)],
    extrapolate: 'clamp',
  });
  const translateHeaderActionsReverse = animatedValue.interpolate({
    inputRange: [Pixel(50), Pixel(90), Pixel(180)],
    outputRange: [0, 20, 80],
    extrapolate: 'clamp',
  });
  const reverseOpacity = animatedValue.interpolate({
    inputRange: [0, Pixel(50), Pixel(80), Pixel(100)],
    outputRange: [0, 0.2, 0.5, 1],
    extrapolate: 'clamp',
  });

  const SearchSubmitBtn: FC = () => {
    return (
      <IconTouchableContainer style={styles.submitSearchBtn}>
        <SearchIcon width={17} height={17} />
      </IconTouchableContainer>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={Images.supermarket} style={styles.header}>
          <View style={styles.overlay}>
            <View
              style={{
                height: heightHeader / 2,
                paddingHorizontal: Pixel(50),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
              }}>
              <IconTouchableContainer
                dark
                onPress={goBack}
                style={styles.headerBackBtn}>
                <ArrowLeftSmIcon width={20} style={commonStyles.rtlRotate} />
              </IconTouchableContainer>
              <IconTouchableContainer
                onPress={() => {
                  navigate('Cart');
                }}>
                <CartIcon />
              </IconTouchableContainer>
            </View>
          </View>
        </ImageBackground>
        <Animated.View
          style={[
            styles.content,
            {transform: [{translateY: translateContent}]},
          ]}>
          <Animated.View
            style={[
              {
                width: '100%',
                alignItems: 'center',
                height: 50,
              },
              {transform: [{scaleY: imageTranslateY}]},
            ]}>
            <Animated.View
              style={[
                styles.imageContainer,
                {
                  opacity: opacity,
                },
              ]}>
              <Animated.Image
                source={Images.marketLogo}
                resizeMode={'contain'}
                style={[
                  {width: Pixel(180), height: Pixel(180)},
                  {
                    opacity: opacity,
                  },
                ]}
              />
            </Animated.View>
          </Animated.View>

          <Animated.View
            style={[
              {
                transform: [{translateY: translateHeader}],
                paddingHorizontal: 20,
                width: '100%',
              },
            ]}>
            <View style={[styles.storeDetail, {overflow: 'hidden'}]}>
              <Text style={[styles.storeTitle, {textAlign: 'right'}]}>
                {t('Supermarket')}
              </Text>
              <View style={{...commonStyles.rowBox}}>
                <Animated.View
                  style={[
                    styles.storeDeliveryDetails,
                    {
                      transform: [
                        {
                          translateX: isRTL
                            ? translateHeaderActions
                            : translateHeaderActionsReverse,
                        },
                      ],
                      opacity: reverseOpacity,
                    },
                  ]}>
                  <IconTouchableContainer style={styles.submitSearchBtn}>
                    <SearchIcon width={17} height={17} />
                  </IconTouchableContainer>
                  <IconTouchableContainer style={styles.submitSearchBtn}>
                    <FavoriteIcon width={20} height={20} />
                  </IconTouchableContainer>
                </Animated.View>

                <Animated.View
                  style={[
                    styles.storeDeliveryDetails,
                    {
                      transform: [{translateY: translateHeaderDetails}],
                      opacity: opacity,
                    },
                  ]}>
                  <DeliveryIcon />
                  <Text style={styles.storeDeliveryPeriod}>30{t(' Min')}</Text>
                </Animated.View>
              </View>
            </View>
          </Animated.View>

          <View
            style={{
              width: '100%',
              overflow: 'hidden',
              position: 'absolute',
              top: 123,
            }}>
            <Animated.View
              style={[
                styles.searchInputContainer,
                {
                  transform: [{translateY: translateCategorySection}],
                  opacity: opacity,
                },
              ]}>
              <Input
                options={{
                  placeholder: t('What You Are Looking For ?'),
                  placeholderTextColor: '#949494',
                }}
                contentContainerStyle={{
                  borderRadius: 22,
                  borderWidth: 0,
                  padding: Pixel(33),
                }}
                textInputContainer={{
                  alignSelf: 'flex-start',
                  // paddingVertical: Pixel(33),
                }}
                rightContent={() => <SearchSubmitBtn />}
                iconRightStyle={{top: 4.5}}
              />
            </Animated.View>
          </View>

          <Animated.View
            style={[
              {
                transform: [{translateY: translateCategorySection}],
                position: 'absolute',
                top: 200,
                zIndex: 200,
                backgroundColor: Colors.white,
              },
            ]}>
            <View
              style={[
                {
                  height: 35,
                  marginTop: 10,
                  marginBottom: 5,
                  paddingLeft: 20,
                },
              ]}>
              <FlatList
                data={DATA}
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                renderItem={({item, index}) => (
                  <Item
                    selectedCategory={selectedCategory}
                    handleSelectedCategory={title =>
                      handleSelectedCategory(title)
                    }
                    item={item}
                  />
                )}
                keyExtractor={item => item.id}
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View
              style={[
                {
                  height: 35,
                  marginBottom: 10,
                  paddingLeft: 20,
                  // marginVertical: 10
                },
              ]}>
              <FlatList
                data={DATA}
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                renderItem={({item, index}) => (
                  <SubCategoryItem
                    selectedSubCategory={selectedSubCategory}
                    handleSelectedSubCategory={(title: any) =>
                      handleSelectedSubCategory(title)
                    }
                    item={item}
                  />
                )}
                keyExtractor={item => item.id}
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </Animated.View>

          <AnimatedScrollView
            style={{flex: 1}}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: animatedValue}}}],
              {
                useNativeDriver: true,
              },
            )}
            scrollEventThrottle={16}>
            {/* <FlatList
          data={categoryHomeData}
          numColumns={2}
          contentContainerStyle={{
            // flexDirection: 'row',
            backgroundColor: '#000',
            justifyContent: 'space-between',
            // flexWrap: 'wrap',
            // marginTop: 7,
            // paddingBottom: 15,
          }}
          renderItem={({item, index}) => ( */}
            {categoryHomeData.map((item, index) => (
              <ProductListItem {...item} key={index} index={index} />
            ))}
            {/* )}
        /> */}
            {/* <ProductsList data={} /> */}
          </AnimatedScrollView>
        </Animated.View>
      </View>
      <Footer />
    </>
  );
};

export default ShopDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  contentContainer: {
    paddingTop: 200,

    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 7,
    paddingBottom: 50,
  },
  header: {
    height: heightHeader,
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'flex-start',
    right: 0,
    width: '100%',
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(250,250,250,0.7)',
    zIndex: 1,
    position: 'relative',
  },
  content: {
    marginTop: 150,
    marginBottom: -100,
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 1000,
    position: 'relative',
    alignItems: 'center',
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
    paddingBottom: 10,
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
  headerCategoryListItem: {
    // paddingHorizontal: 20,
    // marginBottom: Pixel(20),
    marginRight: Pixel(20),
    // alignItems: 'center'
  },
  categoryTitle: {
    fontFamily: Fonts.black,
    fontSize: Pixel(30),
    color: Colors.dark,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
  },
  subCategoryTitle: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(25),
    color: Colors.dark,
    textAlign: 'center',
    textTransform: 'capitalize',
    width: '100%',
  },
});
