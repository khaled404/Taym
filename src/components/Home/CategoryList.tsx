import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CategoryItem from './CategoryItem';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {commonStyles} from '../../styles/styles';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useNavigation} from '@react-navigation/native';

interface ICategoryList {
  data: Array<{title: string; image: string}>;
}

const CategoryList: FC<ICategoryList> = ({data}) => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  return (
    <>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{t('Explore Category')}</Text>
        <TouchableOpacity
          onPress={() => {
            // navigate('Category')
          }}>
          <Text style={styles.viewAllBtnText}>{t('View All')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        {data.map((item, index) => {
          if (index <= 5) {
            return <CategoryItem {...item} key={index} index={index} />;
          }
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitleContainer: {
    justifyContent: 'space-between',
    ...commonStyles.rowBox,
    marginBottom: Pixel(20),
  },
  sectionTitle: {
    fontFamily: Fonts.black,
    fontSize: Pixel(45),
    color: Colors.colorSacand,
  },
  viewAllBtnText: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(30),
    color: Colors.dark,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  },
});
export default CategoryList;
