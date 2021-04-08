import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {commonStyles} from '../../styles/styles';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {AddCartIcon, FavoriteIcon} from '../../../assets/Icons/Icons';
import {useTranslation} from 'react-i18next';

interface IFavoriteItem {
  title: string;
  image: string;
  index: number;
}

const FavoriteItem: FC<IFavoriteItem> = ({title, image, index}) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <TouchableOpacity style={styles.favoriteBtn}>
        <FavoriteIcon />
      </TouchableOpacity>
      <View style={styles.productImageContainer}>
        <Image
          resizeMode={'contain'}
          source={require('../../../assets/images/product-1.png')}
        />
      </View>
      <View style={styles.productDetailsContainer}>
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{t('Green Apple')}</Text>
          <Text style={styles.productPrice}>12 LE</Text>
        </View>
        <TouchableOpacity style={styles.productActions}>
          <AddCartIcon />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    ...commonStyles.boxShadow,
    borderRadius: 15,
    width: '47.5%',
    backgroundColor: Colors.sacandAppBackgroundColor,
    // overflow: 'hidden',
    marginBottom: 15,
    paddingBottom: 3,
    position: 'relative',
  },
  productImageContainer: {
    width: '100%',
    height: Pixel(230),
    elevation: 3,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDetailsContainer: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginTop: 3,
  },
  productDetails: {},
  productTitle: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(30),
    color: Colors.dark,
    marginBottom: Pixel(10),
  },
  productPrice: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(27),
    color: Colors.colorSacand,
    textTransform: 'uppercase',
    marginTop: Pixel(10),
    textAlign: 'left',
  },
  productActions: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Colors.minColor,
    padding: 6,
    paddingBottom: 7,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  favoriteBtn: {
    width: Pixel(65),
    height: Pixel(65),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Pixel(17),
    position: 'absolute',
    right: Pixel(15),
    top: Pixel(15),
    backgroundColor: '#C9C9C9',
    zIndex: 200,
    elevation: 3,
  },
});

export default FavoriteItem;
