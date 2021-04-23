import React, {FC} from 'react';
import {I18nManager, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts, Images, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import {CartItemOfferIcon, MinusIcon, PlusIcon,} from '../../../assets/Icons/Icons';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useTranslation} from "react-i18next";
const {isRTL} = I18nManager;

interface ICartItem {
  id: number;
  title: string;
  price: string;
  specifications: string;
  offerValue: string;
  quantity: number;
  image: Images;
}

const CartItem: FC<ICartItem> = ({
                                   id,
                                   title,
                                   price,
                                   specifications,
                                   offerValue,
                                   quantity,
                                   image,
                                 }) => {
  const {navigate} = useNavigation();
  const {t} = useTranslation();
  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.cartItemDetail}>
        <View style={styles.cartItemImage}>
          <FastImage source={image} style={[commonStyles.image]}/>
        </View>
        <View
          style={{
            paddingTop: Pixel(15),
            flex: 1,
            paddingLeft: Pixel(7),
          }}>
          <Text style={[styles.cartItemTitle, {textAlign: 'left'}]}>
            {t('Product Name')}
          </Text>
          <Text
            style={[
              styles.cartItemSpecifications,
              {marginTop: Pixel(20), textAlign: 'left'},
            ]}>
            {t('1 KG')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: Pixel(15),
            }}>
            <Text style={styles.cartItemPrice}>{price}</Text>
            <View style={[styles.cartItemActions, {flexDirection: isRTL ? 'row-reverse' : 'row',}]}>
              <TouchableOpacity
                style={[
                  styles.cartItemActionBtn,
                  {
                    padding: Pixel(15),
                    backgroundColor: Colors.warning,
                  },
                ]}>
                <MinusIcon/>
              </TouchableOpacity>
              <Text style={styles.cartItemQuantity}>{quantity}</Text>
              <TouchableOpacity
                style={[
                  styles.cartItemActionBtn,
                  {
                    backgroundColor: Colors.success,
                  },
                ]}>
                <PlusIcon/>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
      <View style={styles.cartItemOffer}>
        <CartItemOfferIcon/>
        <Text style={styles.cartItemOfferText}>{offerValue}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    backgroundColor: Colors.white,
    width: '100%',
    ...commonStyles.boxShadow,
    ...commonStyles.rowBox,
    paddingVertical: Pixel(20),
    paddingLeft: 15,
    paddingRight: 20,
    justifyContent: 'space-between',
    marginBottom: Pixel(35),
    flexDirection: 'column',
  },
  cartItemDetail: {
    ...commonStyles.rowBox,
    alignItems: 'flex-start',
  },
  cartItemImage: {
    width: 100,
    height: 100,
    borderRadius: 30,
    overflow: 'hidden',
    // paddingVertical:10
    // marginTop:Pixel(10),
  },
  cartItemTitle: {
    width: '70%',
    fontFamily: Fonts.bold,
    fontSize: Pixel(31),
    marginBottom: Pixel(5),
  },
  cartItemSpecifications: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(27),
    color: '#4D4D4D',
    marginBottom: Pixel(5),
  },
  cartItemPrice: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(33),
    color: Colors.colorSacand,
  },
  cartItemActions: {

    justifyContent: 'space-between',
  },
  cartItemOffer: {
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    right: 20,
  },
  cartItemOfferText: {
    fontSize: Pixel(23),
    position: 'absolute',
    top: Pixel(10),
    right: Pixel(7),
    zIndex: 2222,
    color: '#fff',
  },
  cartItemActionBtn: {
    padding: Pixel(16),
    backgroundColor: '#989898',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Pixel(10),
    marginLeft: Pixel(15),
  },
  cartItemActionBtnText: {
    fontSize: Pixel(25),
    color: Colors.sacandAppBackgroundColor,
  },
  cartItemQuantity: {
    color: Colors.dark,
    fontFamily: Fonts.medium,
    marginLeft: Pixel(15),
    marginTop: Pixel(10),
  },
});

export default CartItem;
