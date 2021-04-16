import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Container, Content } from '../components/containers/Containers';
import { commonStyles } from '../styles/styles';
import { Colors, Fonts, Pixel, Images } from '../constants/styleConstants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { TelephoneIcon } from '../../assets/Icons/Icons'
import NameCard from '../components/orderDone/nameCard'
import Progress from '../components/orderDone/progress'
import Button from '../components/touchables/Button'
import Header from '../components/header/Header'
import OrderListItem from "../components/MyOrders/OrderListItem";

const TrackingOrder: FC = () => {
  const categoryHomeData = [
    {
      id: 1,
      header: 'Order Placed',
      subHeader: 'Today 03 January 2021 - 1:30 PM',
    },

    {
      id: 2,
      header: 'Item Processed',
      subHeader: 'Bagged In Market',
    },

    {
      id: 3,
      header: 'Delivering',
      subHeader: 'Your Order Is On The Way',
    },

    {
      id: 4,
      header: 'Received',
      subHeader: 'Your Order Has Been Delivered',
    },


  ];

  const data =
  {
    orderId: 'Order #5478',
    footerBtnTitle: 'See Details',
    price: '150 LE',
    date: 'Today 03 January 2021',
    time: '02:30 PM',
    details: 'KitKat Ruby Cocoa Beans 120ml (5) , Banana 1kg , Water\n' +
      'Bottle Small (1)',
    status: 'Out For Delivery',
    store: 'Fresh Market',
    note: 'Order Will Delivered Within 30 Min',
  }


  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  return (
    <Container style={styles.container}>
      <Header title={t('Track Order')} />
      <Content noPadding >
        <View style={{
          height: Pixel(300),
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: Pixel(40)
        }} >

          <View style={styles.leftNameCard} >
            <View style={styles.nameLogo} >
              <Image
                source={Images.marketLogo}
              />
            </View>
            <View style={{
              width: '60%',
              height: '100%',
              alignItems: 'flex-start',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
              padding: Pixel(15)
            }} >

              <Text style={styles.nameText} >Refresh Market</Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }} >
                <TelephoneIcon height={Pixel(30)} width={Pixel(30)} />
                <Text style={styles.numberText} >011 123 1245</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{
          width: '100%'
        }} >

          <OrderListItem
            {...data}
            source={'tracking'}
          />
        </View>
        <View style={{
          flex: 1,
          paddingHorizontal: Pixel(40)
        }} >


          {
            categoryHomeData.map((item, index) => {
              return (
                <Progress
                  key={item.id}
                  header={item.header}
                  subHeader={item.subHeader}
                  index={item.id}
                  backGround={Colors.white}
                />
              )
            })
          }

        </View>

      </Content>


    </Container>
  );
};

export default TrackingOrder;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    //paddingHorizontal:Pixel(40),

  },
  buttonsContainer: {
    height: Pixel(250),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  leftNameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '55%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...commonStyles.boxShadow,

  },
  nameLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: '100%',
    ...commonStyles.boxShadow,
    backgroundColor: Colors.minColor,
    borderRadius: 10
  },
  nameText: {
    fontSize: Pixel(35),
    fontFamily: Fonts.black,
  },
  numberText: {
    fontSize: Pixel(30),
    fontFamily: Fonts.black,
    paddingLeft: Pixel(20),
    color: Colors.colorSacand,
  },
});
