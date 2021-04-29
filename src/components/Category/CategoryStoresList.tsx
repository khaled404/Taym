import React, {FC, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {StyleSheet, Text, View} from "react-native";
import CategoryStoreItem from "./CategoryStoreItem";
import {Colors, Fonts, Pixel} from "../../constants/styleConstants";

interface ICategoryStoresList {
  data: Array<{
    id: string;
    name_en: string;
    name_ar: string;
    logo: string;
    cover: string;
    delivery_time: string;
  }>;
}

const CategoryStoresList: FC<ICategoryStoresList> = ({data}) => {

  const {t} = useTranslation();
  const categoryStoresMemo = useMemo(
    () =>
      data.map((item, index) => {
        return <CategoryStoreItem key={index} isLast={index === data.length - 1} index={index} {...item}/>;
      }),
    [data],
  );

  const EmptyList = () => {
    return (
      <Text style={styles.emptyText}>{t('There is no vendors')}</Text>
    )
  }

  return (
    <View style={styles.categoryStoresList}>
      {data.length > 0 ? categoryStoresMemo : <EmptyList/>}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryStoresList: {
    marginTop: Pixel(25),
  },
  emptyText:{
    fontFamily: Fonts.bold,
    fontSize: Pixel(35),
    color: Colors.gray,
    textAlign: 'center'
  }
});

export default CategoryStoresList;
