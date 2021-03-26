import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts, Images, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import FastImage from 'react-native-fast-image';

interface ICategoryItem {
  title: string;
  image: string;
  index: number;
}

const CategoryItem: FC<ICategoryItem> = ({title, image, index}) => {
  const [categoryWidth, setCategoryWidth] = useState('100%');

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
    <TouchableOpacity style={{width: categoryWidth, marginBottom: 5}}>
      <View
        style={[
          styles.imageContainer,
          {height: index == 0 ? Pixel(240) : Pixel(210)},
        ]}>
        <FastImage
          source={Images.homeBanner}
          style={commonStyles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.categoryTitle}>{title}</Text>
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
    marginTop: Pixel(10),
    textTransform: 'uppercase',
    width: '100%',
  },
});

export default CategoryItem;
