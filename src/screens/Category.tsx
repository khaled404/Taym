import React, {FC, useEffect, useRef, useState} from 'react';
import {Animated, FlatList, I18nManager, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Container} from '../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import CategoryHeader from '../components/header/CategoryHeader';
import FastImage from 'react-native-fast-image';
import {commonStyles} from '../styles/styles';
import CategoryStoresList from '../components/Category/CategoryStoresList';
import {useNavigation, useRoute} from '@react-navigation/native';
import Input from '../components/textInputs/Input';
import {SearchIcon} from '../../assets/Icons/Icons';
import IconTouchableContainer from '../components/touchables/IconTouchableContainer';
import {getCategoryVendors} from "../store/actions/vendors";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";

const {isRTL} = I18nManager;

const SearchSubmitBtn: FC = () => {
  return (
    <IconTouchableContainer style={styles.submitSearchBtn}>
      <SearchIcon width={17} height={17}/>
    </IconTouchableContainer>
  );
};
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);


const Category: FC = () => {

  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [toggleHeader, setToggleHeader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const slideInOut = useRef(new Animated.Value(0)).current;
  const _scrollRef = useRef<ScrollView>();
  const {categories}: any = useSelector((state: RootState) => state.categories);
  const {vendors}: any = useSelector((state: RootState) => state.vendors);

  const Item = ({item, selectedCategory, handleSelectedCategory}) => (
    <TouchableOpacity
      onPress={() => handleSelectedCategory(item.title)}
      style={[styles.headerCategoryListItem]}>
      <View style={[styles.imageContainer]}>
        <FastImage
          source={{uri: item.icon}}
          style={commonStyles.image}
          resizeMode="cover"
        />
      </View>
      <Text
        style={[
          styles.categoryTitle,
          {
            color:
              selectedCategory
                ? Colors.colorSacand
                : Colors.dark,
          },
        ]}>
        {isRTL ? item.name_ar : item.name_en}
      </Text>
    </TouchableOpacity>
  );

  const opacity = slideInOut.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const reverseOpacity = slideInOut.interpolate({
    inputRange: [0, Pixel(40), Pixel(80)],
    outputRange: [0, 0.7, 1],
    extrapolate: 'clamp',
  });

  const translate1 = slideInOut.interpolate({
    inputRange: [0, Pixel(40), Pixel(80)],
    outputRange: [0, Pixel(-40), Pixel(-120)],
    extrapolate: 'clamp',
  });

  const translateCategoryTitleContainer = slideInOut.interpolate({
    inputRange: [-70, -20, 120],
    outputRange: [-120, -60, -20],
    // inputRange: [Pixel(-100), Pixel(-60), 0],
    // outputRange: [-50, 20, 50],
    extrapolate: 'clamp',
  });
  const translateCategoryTitle = slideInOut.interpolate({
    inputRange: [Pixel(-150), 0],
    outputRange: [Pixel(-500), 0],
    extrapolate: 'clamp',
  });

  const translate2 = slideInOut.interpolate({
    inputRange: [0, Pixel(150)],
    outputRange: [0, Pixel(-500)],
    extrapolate: 'clamp',
  });

  const translate3 = slideInOut.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Pixel(-60)],
    extrapolate: 'clamp',
  });

  const translatex = slideInOut.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Pixel(70)],
    extrapolate: 'clamp',
  });
  const translateXLeftContainer = slideInOut.interpolate({
    inputRange: [0, Pixel(40), Pixel(80)],
    outputRange: [0, -20, -30],
    extrapolate: 'clamp',
  });
  const translateXLeftContainerReverse = slideInOut.interpolate({
    inputRange: [Pixel(80), Pixel(90), Pixel(180)],
    outputRange: [0, 20, 30],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    if (route.params.categoryId !== undefined && route.params.categoryName !== undefined) {
      setSelectedCategory(route.params.categoryName);
      dispatch(getCategoryVendors(route.params.categoryId, (success) => {
        console.log('getCategoryVendors success')
      }));
    }
  }, [route.params.categoryId, route.params.categoryName])

  const handleToggleHeader = () => {
    setToggleHeader(!toggleHeader);
    _scrollRef.current.scrollTo({y: 0, animated: true});
  };

  const handleSelectedCategory = (categoryId: number, categoryName: string) => {
    setSelectedCategory(categoryName);
    dispatch(getCategoryVendors(categoryId, (success) => {
      console.log('getCategoryVendors success')
    }));
  };

  return (
    <Container style={styles.container}>
      <CategoryHeader
        navigate={navigate}
        handleToggleHeader={handleToggleHeader}
        translateY={translate3}
        translateX={translatex}
        translateCategoryTitleContainer={translateCategoryTitleContainer}
        translateCategoryTitle={translateCategoryTitle}
        translateXLeftContainer={
          isRTL ? translateXLeftContainer : translateXLeftContainerReverse
        }
        reverseOpacity={reverseOpacity}
        opacity={opacity}
        toggleHeader={toggleHeader}
        title={selectedCategory}
      />
      <Animated.View
        style={[
          styles.headerCategoryList,
          {transform: [{translateY: translate1}]},
        ]}>
        <Animated.View
          style={[
            styles.searchInputContainer,
            {transform: [{translateY: translate2}]},
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
            }}
            rightContent={() => <SearchSubmitBtn/>}
            iconRightStyle={{top: 4.5}}
          />
        </Animated.View>
        <FlatList
          data={categories}
          style={{paddingBottom: 10}}
          renderItem={({item, index}) => (
            <Item
              selectedCategory={selectedCategory === (isRTL ? item.name_ar : item.name_en)}
              handleSelectedCategory={() => handleSelectedCategory(item.id, isRTL ? item.name_ar : item.name_en)}
              item={item}
            />
          )}
          keyExtractor={item => item.id}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <AnimatedScrollView
          contentContainerStyle={styles.contentContainer}
          ref={_scrollRef}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: slideInOut}}}],
            {
              useNativeDriver: true,
            },
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}>
          <View>
            <Text style={[styles.sectionTitle]}>{selectedCategory}</Text>
            <CategoryStoresList data={vendors}/>
          </View>
        </AnimatedScrollView>
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  contentContainer: {
    paddingVertical: Pixel(20),
    paddingBottom: 200,
    borderTopWidth: 1,
    borderColor: '#707070',

  },
  headerCategoryList: {
    // paddingHorizontal: 20,
    marginHorizontal: 20,
    // borderBottomWidth: 1,
    // borderColor: '#707070',
    paddingTop: Pixel(10),
    paddingBottom: Pixel(20),
    // backgroundColor:'red'
    //marginTop:Pixel(320)
  },
  headerCategoryListItem: {
    // paddingHorizontal: 20,
    marginBottom: Pixel(20),
    marginRight: Pixel(20),
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    ...commonStyles.boxShadow,
    height: Pixel(75),
    width: Pixel(140),
    marginBottom: Pixel(5),
  },
  categoryTitle: {
    fontFamily: Fonts.black,
    fontSize: Pixel(25),
    color: Colors.dark,
    textAlign: 'center',
    marginTop: Pixel(10),
    textTransform: 'uppercase',
    width: '100%',
  },
  sectionTitle: {
    fontFamily: Fonts.black,
    fontSize: Pixel(47),
    color: Colors.colorSacand,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  searchInputContainer: {
    marginTop: 0,
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

export default Category;
