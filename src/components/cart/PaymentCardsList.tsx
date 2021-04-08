import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {
  AddCardIcon,
  CheckedIcon,
  UnCheckedIcon,
  VisaIcon,
} from '../../../assets/Icons/Icons';
import {commonStyles} from '../../styles/styles';

interface IPaymentCardsList {
  data: Array<{
    id: string;
    cardType: string;
    cardNumber: number;
    exDate: string;
    cvv: string;
    onPress: () => void;
    selected: Boolean;
  }>;
}

interface IPaymentCard {
  id: string;
  cardType: string;
  cardNumber: number;
  exDate: string;
  cvv: string;
  onPress: () => void;
  selected: Boolean;
}

const Item: FC<IPaymentCard> = ({
  cardType,
  cardNumber,
  selected,
  cvv,
  exDate,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.paymentCardContainer]}>
    <View
      style={[
        styles.cardContainer,
        {backgroundColor: selected ? Colors.minColor : '#989898'},
      ]}>
      <VisaIcon
        fill={selected ? Colors.dark : Colors.sacandAppBackgroundColor}
      />
      <Text
        style={[
          styles.cardNumber,
          {color: selected ? Colors.dark : Colors.sacandAppBackgroundColor},
        ]}>
        {cardNumber}
      </Text>
      <Text
        style={[
          styles.exDate,
          {color: selected ? Colors.dark : Colors.sacandAppBackgroundColor},
        ]}>
        {exDate}
      </Text>
      <Text
        style={[
          styles.cvv,
          {color: selected ? Colors.dark : Colors.sacandAppBackgroundColor},
        ]}>
        CVV :{cvv}
      </Text>
    </View>
    <View style={styles.checkBtn}>
      {selected ? <CheckedIcon /> : <UnCheckedIcon />}
    </View>
  </TouchableOpacity>
);

const PaymentCardsList: FC<IPaymentCardsList> = ({data}) => {
  const [selectedId, setSelectedId] = useState(null);
  const {t} = useTranslation();

  return (
    <ScrollView
      contentContainerStyle={styles.paymentCardsList}
      horizontal
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {data.map((item, index) => (
        <Item
          {...item}
          onPress={() => setSelectedId(item.id)}
          selected={selectedId === item.id}
          key={index}
        />
      ))}
      <TouchableOpacity
        style={[
          styles.paymentCardContainer,
          {alignSelf: 'flex-start', marginTop: 1, ...commonStyles.boxShadow},
        ]}>
        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor: Colors.sacandAppBackgroundColor,
              height: Pixel(220),
              justifyContent: 'center',
            },
          ]}>
          <AddCardIcon />
          <Text style={[styles.cardNumber, styles.addCardBtnText]}>
            {t('Add Card')}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  paymentCardsList: {
    ...commonStyles.rowBox,
  },
  paymentCardContainer: {
    alignItems: 'center',
    marginLeft: Pixel(35),
  },
  checkBtn: {
    marginTop: Pixel(30),
  },
  cardContainer: {
    paddingTop: Pixel(40),
    paddingBottom: Pixel(20),
    paddingHorizontal: Pixel(60),
    backgroundColor: '#989898',
    borderRadius: 15,
    ...commonStyles.boxShadow,
    justifyContent: 'space-between',
    alignItems: 'center',
    // overflow: 'hidden',
  },
  cardNumber: {
    color: Colors.sacandAppBackgroundColor,
    marginTop: Pixel(15),
    fontSize: Pixel(26),
  },
  exDate: {
    color: Colors.sacandAppBackgroundColor,
    fontSize: Pixel(26),
    marginTop: Pixel(5),
  },
  cvv: {
    color: Colors.sacandAppBackgroundColor,
    fontSize: Pixel(27),
    marginTop: Pixel(5),
  },
  addCardBtnText: {
    color: Colors.dark,
    fontFamily: Fonts.bold,
    marginTop: 10,
    fontSize: Pixel(28),
    textAlign: 'center',
  },
});

export default PaymentCardsList;
