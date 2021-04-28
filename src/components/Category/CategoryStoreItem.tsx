import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {I18nManager, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts, Images, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import FastImage from 'react-native-fast-image';
import {DeliveryIcon} from '../../../assets/Icons/Icons';
import {useNavigation} from '@react-navigation/native';
const {isRTL} = I18nManager;
interface ICategoryStoreItem {
  index: number;
  id: string;
  name_en: string;
  name_ar: string;
  logo: string;
  cover: string;
  delivery_time: string;
  isLast: Boolean;
}

const CategoryStoreItem: FC<ICategoryStoreItem> = ({
                                                     index,
                                                     id,
                                                     name_en,
                                                     name_ar,
                                                     logo,
                                                     cover,
                                                     delivery_time,
                                                     isLast,
                                                   }) => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate('ShopDetails')}
      style={[styles.categoryStoreItem, {borderBottomWidth: isLast ? 0 : 1}]}>
      <View
        style={[styles.imageContainer, {height: Pixel(215), width: '100%'}]}>
        <FastImage
          source={{uri:cover}}
          style={commonStyles.image}
          resizeMode="cover"
        />
        <View style={styles.storeLogoContainer}>
          <FastImage
            source={{uri:logo}}
            style={commonStyles.image}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.storeDetail}>
        <Text style={[styles.storeTitle]}>{isRTL ? name_ar : name_en}</Text>
        <View style={styles.storeDeliveryDetails}>
          <DeliveryIcon/>
          <Text style={styles.storeDeliveryPeriod}>{delivery_time}{t(' Min')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryStoreItem: {
    borderBottomWidth: 1,
    borderColor: '#707070',
    width: '100%',
    marginBottom: Pixel(35),
    paddingBottom: 15,
  },
  imageContainer: {
    borderRadius: 13,
    overflow: 'hidden',
    ...commonStyles.boxShadow,
    // height: Pixel(75),
    // width: Pixel(140),
    marginBottom: Pixel(5),
    position: 'relative',
  },
  storeDetail: {
    width: '100%',
    ...commonStyles.rowBox,
    marginTop: Pixel(20),
    justifyContent: 'space-between',
  },
  storeTitle: {
    fontFamily: Fonts.black,
    fontSize: Pixel(30),
    color: Colors.dark,
  },
  storeDeliveryPeriod: {
    fontFamily: Fonts.medium,
    fontSize: Pixel(30),
    color: Colors.dark,
    marginLeft: Pixel(15),
  },
  storeDeliveryDetails: {
    ...commonStyles.rowBox,
  },
  storeLogoContainer: {
    height: Pixel(215),
    width: Pixel(215),
    padding: Pixel(25),
    borderRadius: 13,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.minColor,
    ...commonStyles.boxShadow,
    position: 'absolute',
    zIndex: 100,
    left: 0,
  },
});

export default CategoryStoreItem;
