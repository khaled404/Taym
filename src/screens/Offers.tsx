import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import Header from '../components/header/Header';
import {Colors, Pixel, Fonts} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import CategoryList from '../components/Home/CategoryList';
import OfferSlider from '../components/Home/OfferSlider';
import FavoriteList from '../components/Home/FavoriteList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from '../styles/styles';
import CategoryStoresList from '../components/Category/CategoryStoresList';
const Offers: FC = () => {
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
  const [toggle, setToggle] = useState(false);
  const [displayShop, setDisplayShop] = useState('flex');
  const [displayOffer, setDisplayOffer] = useState('none');
  const dispatch = useDispatch();
  const {isRTL}: any = useSelector((state: RootState) => state.settings);
  const {navigate} = useNavigation();
  return (
    <Container style={styles.container}>
      <Header title="Offers" />
      <View
        style={{
          width: '100%',
          height: Pixel(150),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.langBtnsContainer}>
          <TouchableOpacity
            onPress={() => {
              setToggle(false);
              setDisplayShop('flex');
              setDisplayOffer('none');
            }}
            style={[
              styles.langBtn,
              {
                backgroundColor: toggle ? 'white' : Colors.minColor,
                borderRadius: !toggle ? Pixel(17) : 0,
              },
            ]}>
            <Text style={styles.langBtnText}>{t('Shops')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setToggle(true);
              setDisplayShop('none');
              setDisplayOffer('flex');
            }}
            style={[
              styles.langBtn,
              {
                backgroundColor: toggle ? Colors.minColor : 'white',
                borderRadius: toggle ? Pixel(17) : 0,
              },
            ]}>
            <Text style={styles.langBtnText}>{t('Products')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Content style={styles.contentContainer}>
        <View
          style={{
            display: displayShop,
          }}>
          <CategoryStoresList data={carouselItems} />
        </View>

        <View
          style={{
            display: displayOffer,
          }}>
          <FavoriteList data={categoryHomeData} />
        </View>
      </Content>
    </Container>
  );
};

export default Offers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  contentContainer: {},
  langBtnsContainer: {
    ...commonStyles.rowBox,
    width: '90%',
    overflow: 'hidden',
    borderRadius: Pixel(20),
    backgroundColor: Colors.white,
    ...commonStyles.boxShadow,
  },
  langBtn: {
    paddingVertical: Pixel(14),
    paddingHorizontal: Pixel(27),
    backgroundColor: 'transparent',
    //borderRadius: Pixel(17),
    width: '50%',
    height: Pixel(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  langBtnText: {
    fontFamily: Fonts.bold,
    color: Colors.dark,
    fontSize: Pixel(30),
  },
});
