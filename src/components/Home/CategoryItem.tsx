import React, {FC, useEffect, useState} from 'react';
import {I18nManager, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import FastImage from 'react-native-fast-image';
import {useNavigation} from "@react-navigation/native";

const {isRTL} = I18nManager;

interface ICategoryItem {
  id: number;
  index: number;
  name_ar: string;
  name_en: string;
  icon: string;
  is_active: boolean;
}

const CategoryItem: FC<ICategoryItem> = ({id, name_ar, name_en, icon, is_active, index}) => {
  const [categoryWidth, setCategoryWidth] = useState('100%');
  const {navigate} = useNavigation();
  useEffect(() => {
    if (index == 0) {
      setCategoryWidth('100%');
    } else if (index <= 3) {
      setCategoryWidth('31%');
    } else {
      setCategoryWidth('48.5%');
    }
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{width: categoryWidth, marginBottom: 5}}
      onPress={() => navigate('Category', {categoryId: id,categoryName:isRTL ? name_ar : name_en})}
    >
      <View
        style={[
          styles.imageContainer,
          {height: index == 0 ? Pixel(240) : Pixel(210)},
        ]}>
        <FastImage
          source={{uri: icon}}
          style={commonStyles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.categoryTitle}>{isRTL ? name_ar : name_en}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    ...commonStyles.boxShadow,
    marginTop: Pixel(15),
  },

  categoryTitle: {
    fontFamily: Fonts.black,
    fontSize: Pixel(35),
    color: Colors.dark,
    textAlign: 'center',
    marginTop: Pixel(15),
    textTransform: 'uppercase',
    width: '100%',
  },
});

export default CategoryItem;
