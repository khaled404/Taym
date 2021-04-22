import {StyleSheet, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {commonStyles} from '../../styles/styles';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useNavigation} from "@react-navigation/native";
import ProductListItem from "./ProductListItem";

interface IProductsList {
  data: Array<{ title: string; image: string }>;
}

const ProductsList: FC<IProductsList> = ({data}) => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const productsListMemo = useMemo(
    () =>
      data.map((item, index) => {
        return <ProductListItem {...item} key={index} index={index}/>;
      }),
    [data],
  );
  return (
    <>
      <View style={styles.listContainer}>
        {productsListMemo}
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
    fontSize: Pixel(50),
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
    marginTop: 7,
    paddingBottom: 15,
  },
});
export default ProductsList;
