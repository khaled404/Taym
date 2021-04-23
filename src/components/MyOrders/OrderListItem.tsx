import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import {CartOrderIcon, StatusOrderIcon} from "../../../assets/Icons/Icons";
import {useNavigation} from "@react-navigation/native";
import {useTranslation} from "react-i18next";

interface IOrderListItem {
  orderId: string;
  footerBtnTitle: string;
  price: string;
  date: string;
  time: string;
  details: string;
  status: string;
  store: string;
  note: string | null;
  source?: string
}

const OrderListItem: FC<IOrderListItem> = ({
                                             orderId,
                                             note,
                                             price,
                                             date,
                                             time,
                                             details,
                                             status,
                                             store,
                                             footerBtnTitle,
                                             source
                                           }) => {
  const {navigate} = useNavigation();
  const {t} = useTranslation();
  return (
    <View
      style={[styles.container]}>
      <View style={styles.box}>
        <Text style={styles.orderId}>{t('Order #5478')}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <Text style={styles.orderDate}>{t('Today 03 January 2021') + '02:30 PM'}</Text>
      <View style={[styles.box, styles.orderDetailsBox]}>
        <CartOrderIcon/>
        <Text style={styles.orderDetails}>{t('KitKat Ruby Cocoa Beans 120ml (5) , Banana 1kg')}
          <TouchableOpacity style={styles.moreBtn}
                            onPress={() => navigate('OrderDetails', {orderId: orderId})}>
            <Text style={styles.moreBtnText}>{t('More Details')}</Text>
          </TouchableOpacity>
        </Text>
      </View>
      {
        source != 'tracking' ?
          <View style={styles.box}>
            <View style={{...commonStyles.rowBox}}>
              <StatusOrderIcon/>
              <Text style={styles.orderStatus}>{t('Out For Delivery')}</Text>
            </View>
            <Text style={styles.orderStore}>
              {t('Fresh Market')}
            </Text>
          </View>
          :
          null
      }

      {
        source != 'tracking' ?
          <View style={[styles.box, styles.orderDetailsFooter, {
            justifyContent: !note ? 'flex-end' : 'space-between'
          }]}>
            {!!note && <Text style={styles.orderNote}>{t('Order Will Delivered Within 30 Min')}</Text>}
            <TouchableOpacity style={{}} onPress={() => navigate('OrderDetails', {orderId: orderId})}>
              <Text style={styles.trackBtnText}>
                {t('See Details')}
              </Text>
            </TouchableOpacity>
          </View>
          :
          null
      }
    </View>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.grayDark,
    borderBottomWidth: Pixel(2),
    paddingTop: Pixel(30),
    backgroundColor: '#fff',
    ...commonStyles.boxShadow,
    marginBottom: Pixel(40),
    paddingHorizontal: Pixel(40),
  },
  box: {
    marginBottom: Pixel(10),
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
  },
  orderId: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(25),
  },
  orderDate: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(32),
    alignSelf:'flex-start',
    marginTop:5
  },
  price: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(30),
    color: Colors.colorSacand,
  },
  orderStore: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(30),
    color: Colors.colorSacand,
  },
  orderStatus: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(29),
    color: Colors.colorSacand,
    marginLeft: Pixel(10),
  },
  moreBtn: {},
  moreBtnText: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(30),
    color: Colors.colorSacand,
    marginTop:5
  },
  orderDetailsBox: {
    paddingVertical: 5,
    marginTop: 6,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent:'flex-start'
  },
  orderDetails: {
    fontFamily: Fonts.medium,
    color: '#4D4D4D',
    fontSize: Pixel(26),
    marginLeft: 7,
    // alignSelf:'flex-start',
    textAlign:'left'
  },
  orderDetailsFooter: {
    borderTopWidth: 1,
    borderTopColor: '#DCDCDC',
    paddingVertical: 13,
    marginTop: 12,
    width: '100%',

    // backgroundColor:'#f1f1f1'
  },
  orderNote: {
    color: '#4D4D4D',
    fontFamily: Fonts.bold,
    fontSize: Pixel(26),
  },
  trackBtnText: {
    color: '#FF5023',
    fontFamily: Fonts.bold,
    fontSize: Pixel(28),
  },
});
