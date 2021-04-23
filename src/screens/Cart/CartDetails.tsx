import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Content} from '../../components/containers/Containers';
import {Colors, Fonts, Images, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import CartItem from '../../components/cart/CartItem';
import ApplyInput from '../../components/Voucher/ApplyInput';
import {commonStyles} from '../../styles/styles';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../store/store';
import {useSelector} from 'react-redux';

const CartDetails: FC = () => {
  const {t} = useTranslation();
  const data = [
    {
      id: 1,
      title: t('KitKat Ruby Cocoa Beans'),
      price: '150 LE',
      specifications: t('500 ml'),
      offerValue: '-10%',
      quantity: 2,
      image: Images.cartItem,
    },
    {
      id: 2,
      title: t('KitKat Ruby Cocoa Beans'),
      price: '150 LE',
      specifications: t('500 ml'),
      offerValue: '-15%',
      quantity: 4,
      image: Images.cartItem1,
    },
  ];

  const {navigate} = useNavigation();
  return (
    <Content noPadding style={styles.contentContainer}>
      {/*<View style={styles.listContainer}>*/}
      <View style={styles.orderItemsList}>
        {data.map((item, index) => (
          <CartItem key={index} {...item} />
        ))}
      </View>
      {/*</View>*/}
      <View style={{paddingHorizontal: 20, paddingBottom: Pixel(20)}}>
        <ApplyInput
          contentContainerStyle={{marginTop: 0}}
          options={{placeholder: t('Enter Promo Code')}}
        />
      </View>
      <View style={{paddingHorizontal: 20, paddingBottom: Pixel(50)}}>
        <View style={styles.orderDetailsContainer}>
          <View style={styles.orderDetailsRow}>
            <Text
              style={[
                styles.orderDetailsText,
                {textAlign: "left"}
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
                {textAlign: "left"}
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
                {textAlign: "left"}
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
                  textAlign: "left"
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
          <Text style={styles.actionBtnText}>{t('Add More Items')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionBtn,
            {
              backgroundColor: '#FFDE00',
            },
          ]}
          onPress={() => navigate('CartAddress')}>
          <Text style={styles.actionBtnText}>{t('Next')}</Text>
        </TouchableOpacity>
      </View>
    </Content>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: Pixel(50),
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.sacandAppBackgroundColor,
    paddingVertical: 10,
    paddingBottom: Pixel(50),
  },
  orderItemsList: {
    paddingBottom: Pixel(10),
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
    // alignSelf:'flex-start'
    // textAlign: "left",
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
    paddingBottom: 10,
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

export default CartDetails;
