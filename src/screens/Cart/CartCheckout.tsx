import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Content} from '../../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import CheckoutAddress from '../../components/cart/CheckoutAddress';
import PaymentOption from '../../components/cart/PaymentOption';
import PaymentCardsList from '../../components/cart/PaymentCardsList';
import {commonStyles} from '../../styles/styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const DATA = [
  {
    id: 1,
    cardType: 'visa',
    cardNumber: '* * * * * 124',
    exDate: '08/21',
    cvv: '123',
  },
  {
    id: 2,
    cardType: 'visa',
    cardNumber: '* * * * * 124',
    exDate: '08/21',
    cvv: '123',
  },
  {
    id: 3,
    cardType: 'visa',
    cardNumber: '* * * * * 124',
    exDate: '08/21',
    cvv: '123',
  },
];

const CartCheckout: FC = () => {
  const [selectedId, setSelectedId] = useState(null);
  const {language}: any = useSelector((state: RootState) => state.settings);
  const {t} = useTranslation();

  const data = [
    {
      id: 1,
      title: t('Cash By Deliver'),
      price: 120,
    },
    {
      id: 2,
      title: t('Online Payment'),
      price: 100,
    },
  ];

  const {navigate} = useNavigation();

  return (
    <Content noPadding style={styles.contentContainer}>
      <CheckoutAddress
        address={t('Miami st.12 - Building 20 , Alexandria , Egypt')}
        phone={'012 123 12345'}
        username={'Yassin Ahmed'}
      />
      <View style={styles.paymentOptionsList}>
        {data.map((item, index) => (
          <PaymentOption
            {...item}
            onPress={() => setSelectedId(item.id)}
            selected={selectedId === item.id}
            key={index}
          />
        ))}
      </View>
      <View style={styles.paymentCardsList}>
        <PaymentCardsList data={DATA} />
      </View>
      <View style={{paddingHorizontal: 20, paddingBottom: Pixel(50)}}>
        <View style={styles.orderDetailsContainer}>
          <View style={styles.orderDetailsRow}>
            <Text
              style={[
                styles.orderDetailsText,
                {textAlign: language === 'ar' ? 'left' : 'right'},
              ]}>
              {t('Cart Total')}
            </Text>
            <Text style={{flex: 0.2}}> : </Text>
            <View style={styles.textCenter}>
              <Text style={[styles.orderDetailsText, {textAlign: 'center'}]}>
                130 EG
              </Text>
            </View>
          </View>
          <View style={styles.orderDetailsRow}>
            <Text
              style={[
                styles.orderDetailsText,
                {textAlign: language === 'ar' ? 'left' : 'right'},
              ]}>
              {t('Services Charge')}
            </Text>
            <Text style={{flex: 0.2}}> : </Text>
            <View style={styles.textCenter}>
              <Text style={[styles.orderDetailsText, {textAlign: 'center'}]}>
                20 EG
              </Text>
            </View>
          </View>
          <View style={styles.orderDetailsRow}>
            <Text
              style={[
                styles.orderDetailsText,
                {textAlign: language === 'ar' ? 'left' : 'right'},
              ]}>
              {t('Discount')}
            </Text>
            <Text style={{flex: 0.2}}> : </Text>
            <View style={styles.textCenter}>
              <Text style={[styles.orderDetailsText, {textAlign: 'center'}]}>
                50 EG
              </Text>
            </View>
          </View>
          <View style={styles.orderDetailsDivider} />
          <View style={[styles.orderDetailsRow]}>
            <Text
              style={[
                styles.orderDetailsText,
                {
                  color: '#622A7B',
                  textAlign: language === 'ar' ? 'left' : 'right',
                },
              ]}>
              {t('Total Amount')}
            </Text>
            <Text style={{flex: 0.2}}> : </Text>
            <View style={styles.textCenter}>
              <Text
                style={[
                  styles.orderDetailsText,
                  {color: '#622A7B', textAlign: 'center'},
                ]}>
                100 EG
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.actionBtnsContainer}>
        <TouchableOpacity
          style={[
            styles.actionBtn,
            {
              borderWidth: 1,
              borderColor: '#FFDE00',
            },
          ]}
          onPress={() => navigate('Home')}>
          <Text style={styles.actionBtnText}>{t('Cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionBtn,
            {
              backgroundColor: '#FFDE00',
            },
          ]}>
          <Text style={styles.actionBtnText}>{t('Check Out')}</Text>
        </TouchableOpacity>
      </View>
    </Content>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom: Pixel(50),
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  paymentOptionsList: {
    // paddingVertical: 20,
  },
  paymentCardsList: {
    ...commonStyles.boxShadow,
    backgroundColor: Colors.white,
    paddingVertical: 20,
    marginBottom: 10,
  },
  orderDetailsContainer: {
    flex: 1,
    backgroundColor: Colors.sacandAppBackgroundColor,
    ...commonStyles.boxShadow,
    paddingVertical: Pixel(25),
    paddingHorizontal: Pixel(45),
    borderRadius: Pixel(30),
    marginTop: Pixel(10),
  },
  orderDetailsRow: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  orderDetailsText: {
    fontSize: Pixel(31),
    fontFamily: Fonts.medium,
    flex: 0.7,
    color: Colors.dark,
  },
  textCenter: {
    flex: 0.7,
    textAlign: 'center',
  },
  orderDetailsDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#707070',
    marginVertical: 5,
  },
  actionBtnsContainer: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  actionBtn: {
    width: '48%',
    borderRadius: 30,
    paddingVertical: 13,
    ...commonStyles.boxShadow,
    backgroundColor: Colors.sacandAppBackgroundColor,
    // padding: 15,
  },
  actionBtnText: {
    textAlign: 'center',
    fontFamily: Fonts.bold,
    fontSize: Pixel(29),
  },
});

export default CartCheckout;
