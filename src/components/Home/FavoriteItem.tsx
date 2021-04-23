import React, { FC , useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { Colors, Fonts, Pixel } from '../../constants/styleConstants';
import { AddCartIcon, FavoriteIcon,  MinusIcon,PlusIcon, } from '../../../assets/Icons/Icons';
import { useTranslation } from 'react-i18next';

interface IFavoriteItem {
  title: string;
  image: string;
  index: number;
}

const FavoriteItem: FC<IFavoriteItem> = ({ title, image, index }) => {
  const { t } = useTranslation();
  const [quantity , setQuantity] = useState(0)
  const [showQuantity , setShowQuantity] = useState(false)
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <TouchableOpacity style={styles.favoriteBtn}>
        <FavoriteIcon />
      </TouchableOpacity>
      <View style={styles.productImageContainer}>
        {showQuantity&&<View style={{
          position:'absolute',
          top:0,
          height:Pixel(230),
          width:'100%',
          backgroundColor:'rgba(0,0,0,0.3)',
          zIndex:100,
          borderRadius: 15,
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'row'
        }} >
          <TouchableOpacity
                onPress={() => setQuantity(quantity-1)}
                style={[
                  styles.cartItemActionBtn,
                  {
                    marginRight:20,
                    backgroundColor: Colors.warning,
                  },
                ]}>
                <MinusIcon width={Pixel(25)} height={Pixel(25)} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setQuantity(quantity+1)}
                style={[
                  styles.cartItemActionBtn,
                  {
                    backgroundColor: Colors.success,
                  },
                ]}>
                  {
                    quantity<=0?
                    <PlusIcon width={Pixel(25)} height={Pixel(25)} />
                    :
                    <Text style={{
                      color:Colors.white,
                      fontSize:Pixel(40),
                      fontFamily:Fonts.medium
                    }} >{quantity}</Text>
                  }
              </TouchableOpacity>
        </View>}
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
        <TouchableOpacity 
        onPress={() => setShowQuantity(!showQuantity) }
        style={styles.productActions}>
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
    shadowOffset: { width: 0, height: 1 },
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
    zIndex: 1,
    elevation: 3,
  },
  cartItemActionBtn: {
    width:31,
    height:32,
    backgroundColor: '#989898',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Pixel(10),
    marginLeft: Pixel(15),
    marginTop:10
  },
  cartItemActionBtnText: {
    fontSize: Pixel(25),
    color: Colors.sacandAppBackgroundColor,
  },
});

export default FavoriteItem;
