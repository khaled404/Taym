import React, {FC, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import HomeHeader from '../components/header/HomeHeader';
import {Colors} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import CategoryList from '../components/Home/CategoryList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useNavigation} from '@react-navigation/native';
import NotSupported from '../components/Home/NotSupported';
import Geolocation from '@react-native-community/geolocation';
import {saveCurrentLocationData, userHomeApi} from '../store/actions/settings';
import Geocoder from "react-native-geocoding";

const Home: FC = () => {
  const {t} = useTranslation();
  const categoryHomeData = [
    {
      id: 1,
      title: t('Supermarket'),
      image: 'Voucher 12457',
    },

    {
      id: 2,
      title: t('Beef'),
      image: 'Voucher 12457',
    },

    {
      id: 3,
      title: t('Chicken'),
      image: 'Voucher 12457',
    },

    {
      id: 4,
      title: t('Fish'),
      image: 'Voucher 12457',
    },

    {
      id: 5,
      title: t('Fruit'),
      image: 'Voucher 12457',
    },

    {
      id: 6,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
  ];
  const carouselItems = [
    {
      id: 1,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
    {
      id: 2,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
    {
      id: 3,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
    {
      id: 4,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
    {
      id: 5,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
  ];
  const {categories}: any = useSelector((state: RootState) => state.categories);
  const {locationSupport}: any = useSelector((state: RootState) => state.auth);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {

    Geolocation.getCurrentPosition(position => {
      Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then(json => {
          let locationStreetName = json.results[0].address_components[0].long_name;
          if (locationStreetName !== undefined) {
            dispatch(
              saveCurrentLocationData(locationStreetName),
            );
          }
          console.log('result geocoder', json.results[0].address_components[0].long_name);
        })
        .catch(error => console.warn(error));
      dispatch(
        userHomeApi({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      );

    });

  }, []);
  return (
    <Container style={styles.container}>
      <HomeHeader navigate={navigate} title={t('Home')}/>
      <Content noPadding>
        {locationSupport && categories.length > 0 && (
          <View style={styles.contentContainer}>
            <CategoryList data={categories}/>
          </View>
        )}
        {!locationSupport && (
          <View style={styles.contentContainer}>
            <NotSupported/>
          </View>
        )}
        {/* <OfferSlider data={carouselItems} /> */}
        {/* <View style={styles.contentContainer}>
          <FavoriteList inHome data={categoryHomeData} />
        </View> */}
      </Content>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});
