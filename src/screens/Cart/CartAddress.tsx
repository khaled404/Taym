import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Content} from '../../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import Address from '../../components/MyAddresses/Address';
import Button from '../../components/touchables/Button';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from '../../styles/styles';
import Input from '../../components/textInputs/Input';
import {CurrentLocationIcon} from '../../../assets/Icons/Icons';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const CartAddress: FC = () => {
  const [selectedId, setSelectedId] = useState(null);
  const {language}: any = useSelector((state: RootState) => state.settings);
  const {t} = useTranslation();

  const data = [
    {
      id: 1,
      title: t('House'),
      address: t('Miami st.12 - Building 20 , Alexandria , Egypt'),
      phone: '01212312345',
    },
    {
      id: 2,
      title: t('Office'),
      address: t('Miami st.12 - Building 20 , Alexandria , Egypt'),
      phone: '01212312345',
    },
    {
      id: 3,
      title: t('Club'),
      address: t('Miami st.12 - Building 20 , Alexandria , Egypt'),
      phone: '01212312345',
    },
  ];

  const {navigate} = useNavigation();
  return (
    <Content noPadding style={styles.contentContainer}>
      <View style={styles.currentLocation}>
        <Input
          contentContainerStyle={styles.inputContentContainerStyle}
          // textInputContainer={styles.locationInput}
          //   contentContainerStyle={{borderRadius: 22, borderWidth: 0, padding: 0}}
          textInputContainer={[
            styles.locationInput,
            {
              textAlign: language === 'ar' ? 'right' : 'left',
              paddingVertical: Pixel(35),
            },
          ]}
          leftContent={() => <CurrentLocationIcon />}
          iconLeftStyle={styles.iconLeftStyle}
          options={{
            placeholder: t('Current Location'),
          }}
        />
      </View>
      <View style={styles.listContainer}>
        {data.map((item, index) => (
          <Address
            {...item}
            inCart
            onPress={() => setSelectedId(item.id)}
            selected={selectedId === item.id}
            key={index}
          />
        ))}
      </View>
      <View style={styles.submitContainer}>
        <Button
          style={{borderRadius: 10, ...commonStyles.boxShadow}}
          styleTitle={{fontSize: Pixel(30)}}
          title={t('Add A New One +')}
          onPress={() => navigate('AddAddress')}
        />
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
          onPress={() => navigate('CartCheckout')}>
          <Text style={styles.actionBtnText}>{t('Next')}</Text>
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
  listContainer: {
    paddingVertical: 20,
  },
  currentLocation: {
    // paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContentContainerStyle: {
    padding: 0,
    backgroundColor: Colors.white,
    ...commonStyles.boxShadow,
  },
  locationInput: {
    paddingLeft: 40,
    fontFamily: Fonts.bold,
    color: '#989898',
    fontSize: Pixel(30),
  },
  iconLeftStyle: {
    paddingLeft: 20,
    top: 13,
  },
  submitContainer: {
    marginVertical: Pixel(40),
    paddingHorizontal: 20,
  },
  actionBtnsContainer: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginTop: Pixel(60),
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

export default CartAddress;
