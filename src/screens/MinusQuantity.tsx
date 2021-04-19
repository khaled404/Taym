import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container, Content } from '../components/containers/Containers';
import Header from '../components/header/Header';
import { Colors, Fonts, Pixel, Images } from '../constants/styleConstants';
import { useTranslation } from 'react-i18next';
import CartItem from "../components/cart/CartItem";

import FavoriteList from '../components/Home/FavoriteList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/touchables/Button';

const MinusQuantity: FC = () => {
  const { t } = useTranslation();
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

  const data = [
    {
      id: 1,
      title: t('KitKat Ruby Cocoa Beans'),
      price: '150 LE',
      specifications: t('500 ml'),
      offerValue: '-10%',
      quantity: 2,
      image: Images.cartItem,
    },

  ];
  const dispatch = useDispatch();
  const { isRTL }: any = useSelector((state: RootState) => state.settings);
  const { navigate } = useNavigation();
  return (
    <Container style={styles.container}>
      <Header title="My Order" />
      <Content noPadding>
        <View style={styles.firstHeader} >

          <Text style={styles.text} >
            unfortunately This Item ( Kitkat ) Minus Quantity Only (2) Available</Text>
        </View>

        <View style={styles.orderItemsList}>
          {data.map((item, index) => <CartItem key={index} {...item} />)}
        </View>

        <View style={styles.secondHeader} >
          <Button title={'Confirm'} />
          <Text style={styles.text} >Or Replace It With Items We Recommend</Text>
        </View>

        <View style={styles.contentContainer}>
          <FavoriteList data={categoryHomeData} />
        </View>
      </Content>
    </Container>
  );
};

export default MinusQuantity;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  contentContainer: {
    paddingHorizontal: Pixel(40),
  },
  orderItemsList: {
    //paddingBottom: Pixel(10)
  },
  firstHeader: {
    width: '100%',
    height: Pixel(150),
    alignItems: 'flex-start',
    paddingHorizontal: Pixel(40),
    justifyContent: 'center',
    backgroundColor: Colors.sacandAppBackgroundColor
  },
  text: {
    fontSize: Pixel(30),
    fontFamily: Fonts.bold
  },
  secondHeader: {
    width: '100%',
    height: Pixel(250),
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingHorizontal: Pixel(40),
  },

});
