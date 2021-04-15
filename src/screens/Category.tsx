import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated, FlatList, StyleSheet, Text, TouchableOpacity, View, Platform,
} from 'react-native';
import { Container, Content } from '../components/containers/Containers';
import { Colors, Fonts, Images, Pixel, ScreenOptions } from '../constants/styleConstants';
import { useTranslation } from 'react-i18next';
import CategoryHeader from "../components/header/CategoryHeader";
import FastImage from "react-native-fast-image";
import { commonStyles } from "../styles/styles";
import CategoryStoresList from "../components/Category/CategoryStoresList";
import { useNavigation } from "@react-navigation/native";
import Input from '../components/textInputs/Input';
import {
  SearchIcon,
} from '../../assets/Icons/Icons';
import IconTouchableContainer from '../components/touchables/IconTouchableContainer';


const SearchSubmitBtn: FC = () => {
  return (
    <IconTouchableContainer style={styles.submitSearchBtn}>
      <SearchIcon width={17} height={17} />
    </IconTouchableContainer>
  );
};
const Item = ({ item, selectedCategory, handleSelectedCategory }) => (
  <TouchableOpacity onPress={() => handleSelectedCategory(item.title)} style={[styles.headerCategoryListItem]}>
    <View
      style={[
        styles.imageContainer,
      ]}>
      <FastImage
        source={Images.offerSlider}
        style={commonStyles.image}
        resizeMode="cover"
      />
    </View>
    <Text
      style={[styles.categoryTitle, { color: selectedCategory === item.title ? Colors.colorSacand : Colors.dark }]}>{item.title}</Text>
  </TouchableOpacity>
);


const Category: FC = () => {
  const { t } = useTranslation();

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

    {
      id: 7,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
  ];
  const STORES_DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: t('Refresh Market'),
      image: 'Text 1',
      category: t('Supermarket')
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: t('Smile Market'),
      image: 'Text 1',
      category: t('Supermarket')
    },
    {
      id: "3ac682afc-c605-48d3-a4f8-fbd91aa97f63",
      title: t('Smile Market'),
      image: 'Text 1',
      category: t('Beef')
    },
    {
      id: "3ac682afc-c605-48dw3-a4f8-fbd91aa97f63",
      title: t('Smile Market'),
      image: 'Text 1',
      category: t('Chicken')
    },
    {
      id: "3ac68afc-c60s5-48d3-a4f8-fbd91aa97f63",
      title: t('Smile Market'),
      image: 'Text 1',
      category: t('Supermarket')
    },
    {
      id: "3ac68afc-c605-48df3-a4f8-fbd91aa97f63",
      title: t('Smile Market'),
      image: 'Text 1',
      category: t('Supermarket')
    },
    {
      id: "3ac68afc-c60asd5-48d3-a4f8-fbd91aa97f63",
      title: t('Smile Market'),
      image: 'Text 1',
      category: t('Supermarket')
    },
    {
      id: "3ac68dsaafc-c605-48d3-a4f8-fbd91aa97f63",
      title: t('Smile Market'),
      image: 'Text 1',
      category: t('Supermarket')
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: t('Restaurant Market'),
      image: 'Text 1',
      category: t('Fruit')
    },
    {
      id: "58694a0f-3da1-471f-bsd96-145571e29d72",
      title: t('Refresh Market'),
      image: 'Text 1',
      category: t('Fish')
    },
    {
      id: "58694a0f-3da1-471f-bsdad96-145571e29d72",
      title: t('Restaurant Market'),
      image: 'Text 1',
      category: t('Vegetables')
    },
  ];

  const { navigate } = useNavigation();
  // const [contentOffsetY, setContentOffsetY] = useState(0);
  const [toggleHeader, setToggleHeader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const slideInOut = useRef(new Animated.Value(0)).current;
  const [active, setActive] = useState(true);
  const [scrollValue, setScrollValue] = useState(0);

  const toggleActive = useCallback(() => {
    setActive((e) => !e);
    // onValueChange && onValueChange(active);
    Animated.timing(slideInOut, {
      toValue: active ? 0 : 1,
      useNativeDriver: true,
    }).start();
  }, [active]);

  const translate = {
    transform: [
      {
        translateX: slideInOut.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 18.5],
        }),
      },
    ],
  };

  const opacity = slideInOut.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const reverseOpacity = slideInOut.interpolate({
    inputRange: [0, Pixel(150), Pixel(320)],
    outputRange: [0, .5, 1],
    extrapolate: 'clamp',
  });

  const translate1 = slideInOut.interpolate({
    inputRange: [0, Pixel(60), Pixel(120)],
    outputRange: [0, Pixel(-60), Pixel(-120)],
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

  const handleOnScroll = (event: Object) => {
    setScrollValue(event.nativeEvent.contentOffset.y)
    if (event.nativeEvent.contentOffset.y >= 40) {
      setToggleHeader(true);
      toggleActive();

    } else {
      setToggleHeader(false);
      toggleActive();
    }
  }

  const handleToggleHeader = () => {
    setToggleHeader(!toggleHeader);
  }

  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
    let data = STORES_DATA.filter(store => store.category === category);
    setFilteredData(data);
  }

  useEffect(() => {
    setSelectedCategory(t('Supermarket'));
    let data = STORES_DATA.filter(store => store.category === t('Supermarket'));
    setFilteredData(data);
  }, []);

  return (
    <Container style={styles.container}>
      <CategoryHeader
        navigate={navigate}
        handleToggleHeader={handleToggleHeader}
        translateY={translate3}
        translatex={translatex}
        reverseOpacity={reverseOpacity}
        opacity={opacity}
        toggleHeader={toggleHeader}
        title={selectedCategory} />
      <Animated.View style={[styles.headerCategoryList, { transform: [{ translateY: translate1 }] }]}>
        <Animated.View style={[styles.searchInputContainer, { transform: [{ translateY: translate2 }] }]}>
          <Input
            options={{
              placeholder: t('What You Are Looking For ?'),
              placeholderTextColor: '#949494',
            }}
            contentContainerStyle={{ borderRadius: 22, borderWidth: 0, padding: 0 }}
            rightContent={() => <SearchSubmitBtn />}
            iconRightStyle={{ top: 5 }}
          />
        </Animated.View>
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => <Item
            selectedCategory={selectedCategory}
            handleSelectedCategory={(title) => handleSelectedCategory(title)} item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <Content noPadding
          style={styles.contentContainer}

          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: slideInOut } } }],
            { useNativeDriver: true }
          )}
        >
          <Text style={styles.sectionTitle}>{selectedCategory}</Text>
          <CategoryStoresList data={filteredData} />
        </Content>
      </Animated.View>

    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,

  },
  headerCategoryList: {
    // paddingHorizontal: 20,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#707070',
    paddingTop: Pixel(10),
    paddingBottom: Pixel(20),
    //marginTop:Pixel(320)
  },
  headerCategoryListItem: {
    // paddingHorizontal: 20,
    marginBottom: Pixel(20),
    marginRight: Pixel(20),
    alignItems: 'center'
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
  },
  searchInputContainer: {
    marginTop: Pixel(20),
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
