import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import HomeHeader from '../components/header/HomeHeader';
import {Colors, Images, Pixel, Fonts} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import CategoryList from '../components/Home/CategoryList';
import OfferSlider from '../components/Home/OfferSlider';
import FavoriteList from '../components/Home/FavoriteList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useNavigation} from '@react-navigation/native';
import Input from '../components/textInputs/Input';
import IconTouchableContainer from '../components/touchables/IconTouchableContainer';
import {SearchIcon} from '../../assets/Icons/Icons';
import FavoriteItem from '../components/Home/FavoriteItem';
const ShopDetails: FC = () => {
  const {t} = useTranslation();

  const categoryHomeData = [
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
  const carouselItems = [
    {
      id: 1,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
    {
      id: 2,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
    {
      id: 3,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
    {
      id: 4,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
    {
      id: 5,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
  ];

  const SearchSubmitBtn: FC = () => {
    return (
      <IconTouchableContainer style={styles.submitSearchBtn}>
        <SearchIcon width={17} height={17} />
      </IconTouchableContainer>
    );
  };

  return (
    <Container style={styles.container}>
      <ImageBackground
        source={Images.supermarket}
        style={styles.header}
        imageStyle={{}}>
        <View style={styles.overlay}></View>
      </ImageBackground>
      <View style={styles.content}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            height: 50,
          }}>
          <View style={styles.imageContainer}>
            <Image source={Images.logo} style={{width: 70, height: 70}} />
          </View>
        </View>

        <View
          style={{
            width: '95%',
            height: 40,
            borderBottomColor: '#707070',
            borderBottomWidth: 1,
            marginHorizontal: Pixel(20),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: Pixel(40),
              fontFamily: Fonts.bold,
            }}>
            Refresh Supermarket
          </Text>
          <Text
            style={{
              fontSize: Pixel(40),
              fontFamily: Fonts.regular,
            }}>
            30 Min
          </Text>
        </View>

        <View style={styles.searchInputContainer}>
          <Input
            options={{
              placeholder: t('What You Are Looking For ?'),
              placeholderTextColor: '#949494',
            }}
            contentContainerStyle={{
              borderRadius: 22,
              borderWidth: 0,
              padding: 0,
            }}
            rightContent={() => <SearchSubmitBtn />}
            iconRightStyle={{top: 5}}
          />
        </View>
        <FlatList
          data={categoryHomeData}
          numColumns={2}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <FavoriteItem {...item} key={index} index={index} />
          )}
        />
      </View>
    </Container>
  );
};

export default ShopDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  header: {
    flex: 1,
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(250,250,250,0.6)',
  },
  content: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  imageContainer: {
    width: 110,
    height: 120,
    backgroundColor: Colors.minColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    top: -70,
  },
  searchInputContainer: {
    marginTop: Pixel(30),
    paddingBottom: Pixel(20),
    width: '95%',
    alignSelf: 'center',
  },
  submitSearchBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: Colors.appBackgroundColor,
  },
});
