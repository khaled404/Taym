import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Colors, Fonts, Pixel} from "../../constants/styleConstants";
import {commonStyles} from "../../styles/styles";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useNavigation} from "@react-navigation/native";

interface ICategoryStoreItem {
  index: number;
  selectedCategory: string;
  handleSelectedCategory: string;
  item: {};
}

const CategoryListItem: FC = ({item, selectedCategory, handleSelectedCategory}) => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  return (
    (
      <TouchableOpacity onPress={() => handleSelectedCategory(item.title)} style={[styles.headerCategoryListItem]}>
        <Text
          style={[styles.categoryTitle, {
            color: selectedCategory === item.title ? Colors.colorSacand : Colors.dark,
          }]}>{item.title}</Text>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  headerCategoryListItem: {
    // paddingHorizontal: 20,
    marginBottom: Pixel(20),
    marginRight: Pixel(20),
    alignItems: 'center'
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    ...commonStyles.boxShadow,
    height: Pixel(75),
    width: Pixel(140),
    marginBottom: Pixel(5),
  },
  categoryTitle: {
    fontFamily: Fonts.black,
    fontSize: Pixel(25),
    color: Colors.dark,
    textAlign: 'center',
    marginTop: Pixel(10),
    textTransform: 'uppercase',
    width: '100%',
  },
});

export default CategoryListItem;
