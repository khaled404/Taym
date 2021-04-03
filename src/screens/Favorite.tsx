import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import {Colors} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import FavoriteList from '../components/Home/FavoriteList';
import Header from '../components/header/Header';

const categoryHomeData = [
  {
    title: 'Supermarket',
    image: 'Voucher 12457',
  },

  {
    title: 'Beef',
    image: 'Voucher 12457',
  },

  {
    title: 'Chicken',
    image: 'Voucher 12457',
  },

  {
    title: 'Fish',
    image: 'Voucher 12457',
  },

  {
    title: 'Fruit',
    image: 'Voucher 12457',
  },

  {
    title: 'Vegetables',
    image: 'Voucher 12457',
  },

  {
    title: 'Vegetables',
    image: 'Voucher 12457',
  },
];

const Favorite: FC = () => {
  const {t} = useTranslation();
  return (
    <Container style={styles.container}>
      <Header title="Favorite" />
      <Content noPadding>
        <View style={styles.contentContainer}>
          <FavoriteList data={categoryHomeData} />
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

export default Favorite;
