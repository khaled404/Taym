import React, {FC} from 'react';
import {I18nManager, StyleSheet, Text, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import {Colors, Fonts, Images, Pixel} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Header from "../components/header/Header";
import {commonStyles} from "../styles/styles";
import CartItem from "../components/cart/CartItem";


const data = [
  {
    id: 1,
    title: 'KitKat Ruby Cocoa Beans',
    price: '150 LE',
    specifications: '500 ml',
    offerValue: '-10%',
    quantity: 2,
    image: Images.cartItem,
  }, {
    id: 2,
    title: 'KitKat Ruby Cocoa Beans',
    price: '150 LE',
    specifications: '500 ml',
    offerValue: '-15%',
    quantity: 4,
    image: Images.cartItem1,
  },
  {
    id: 3,
    title: 'KitKat Ruby Cocoa Beans',
    price: '150 LE',
    specifications: '500 ml',
    offerValue: '-15%',
    quantity: 4,
    image: Images.cartItem1,
  },
  {
    id: 4,
    title: 'KitKat Ruby Cocoa Beans',
    price: '150 LE',
    specifications: '500 ml',
    offerValue: '-15%',
    quantity: 5,
    image: Images.cartItem1,
  },
];

const OrderDetails: FC = () => {
  const {t} = useTranslation();
  return (
    <Container style={styles.container}>
      <Header title={t('My Orders')}/>
      <Content noPadding style={{paddingVertical: Pixel(20)}}>
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.orderDetailsContainer}>
            <View style={styles.orderDetailsRow}>
              <Text style={[styles.orderDetailsText, {textAlign: 'left'}]}>{t('Market Name')}</Text>
              <Text style={{flex: 0.2}}> : </Text>
              <View style={styles.textCenter}>
                <Text style={[styles.orderDetailsText]}>{t('Refresh Market')}</Text>
              </View>
            </View>
            <View style={styles.orderDetailsRow}>
              <Text style={[styles.orderDetailsText, {textAlign: 'left'}]}>{t('Date')}</Text>
              <Text style={{flex: 0.2}}> : </Text>
              <View style={styles.textCenter}>
                <Text style={[styles.orderDetailsText]}>03 January 2021</Text>
              </View>
            </View>
            <View style={styles.orderDetailsRow}>
              <Text style={[styles.orderDetailsText, {textAlign: 'left'}]}>{t('Order Number')}</Text>
              <Text style={{flex: 0.2}}> : </Text>
              <View style={styles.textCenter}>
                <Text style={[styles.orderDetailsText]}>1546</Text>
              </View>
            </View>
            <View style={styles.orderDetailsRow}>
              <Text style={[styles.orderDetailsText, {textAlign: 'left'}]}>{t('Cart Total')}</Text>
              <Text style={{flex: 0.2}}> : </Text>
              <View style={styles.textCenter}>
                <Text style={[styles.orderDetailsText]}>130 EG</Text>
              </View>
            </View>
            <View style={styles.orderDetailsRow}>
              <Text style={[styles.orderDetailsText, {textAlign: 'left'}]}>{t('Services Charge')}</Text>
              <Text style={{flex: 0.2}}> : </Text>
              <View style={styles.textCenter}>
                <Text style={[styles.orderDetailsText]}>20 EG</Text>
              </View>
            </View>
            <View style={styles.orderDetailsRow}>
              <Text style={[styles.orderDetailsText, {textAlign: 'left'}]}>{t('Discount')}</Text>
              <Text style={{flex: 0.2}}> : </Text>
              <View style={styles.textCenter}>
                <Text style={[styles.orderDetailsText]}>50 EG</Text>
              </View>
            </View>
            <View style={styles.orderDetailsDivider}/>
            <View style={[styles.orderDetailsRow]}>
              <Text style={[styles.orderDetailsText, {color: '#622A7B', textAlign: 'left'}]}>{t('Total Amount')}</Text>
              <Text style={{flex: 0.2}}> : </Text>
              <View style={styles.textCenter}>
                <Text style={[styles.orderDetailsText, {color: '#622A7B'}]}>100 EG</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.orderItemsList}>
          {data.map((item, index) => <CartItem key={index} {...item} />)}
        </View>
      </Content>
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
    flex: 1,
  },
  orderDetailsContainer: {
    flex: 1,
    backgroundColor: Colors.sacandAppBackgroundColor,
    ...commonStyles.boxShadow,
    paddingVertical: Pixel(20),
    paddingHorizontal: Pixel(45),
    borderRadius: Pixel(30),
    marginTop: Pixel(10),

  },
  orderDetailsRow: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
    marginVertical: 7
  },
  orderDetailsText: {
    fontSize: Pixel(31),
    fontFamily: Fonts.medium,
    flex: 0.7,
    color: Colors.dark,
    textAlign:'left',
    marginLeft:15
  },
  textCenter: {
    flex: 0.7,
    textAlign: "center",
  },
  orderDetailsDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#707070',
    marginVertical: 5
  },
  orderItemsList: {
    marginVertical: 20,
    paddingVertical: 5
  },
});

export default OrderDetails;
