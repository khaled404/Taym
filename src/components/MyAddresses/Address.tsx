import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import {
  CheckedIcon,
  DeleteIcon,
  InputEditIcon,
  UnCheckedIcon,
} from '../../../assets/Icons/Icons';
import {useTranslation} from 'react-i18next';
import IconTouchableContainer from '../touchables/IconTouchableContainer';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {deleteAddressApi, saveAddressList} from '../../store/actions/address';

interface IAddress {
  id: number;
  name: string;
  building_no: string;
  floor_no: string;
  street_name: string;
  area_ar: string;
  area_en: string;
  apartment_no: string;
  phone: string;
  onPress: () => void;
  selected: boolean;
  inCart?: boolean;
}

const Address: FC<IAddress> = ({
  id,
  name,
  phone,
  building_no,
  floor_no,
  street_name,
  area_ar,
  area_en,
  apartment_no,
  onPress,
  selected,
  inCart,
}) => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const {language}: any = useSelector((state: RootState) => state.settings);
  const {addressList}: any = useSelector((state: RootState) => state.address);
  const dispatch = useDispatch();
  const EditBtn = () => {
    return (
      <IconTouchableContainer
        style={{marginBottom: 5}}
        onPress={() =>
          navigate('EditAddress', {
            address: {
              id,
              name,
              phone,
              building_no,
              floor_no,
              street_name,
              area_ar,
              area_en,
              apartment_no,
            },
          })
        }>
        <InputEditIcon />
      </IconTouchableContainer>
    );
  };
  const handleDeleteAddress = (addressId: number) => {
    dispatch(
      deleteAddressApi(addressId, success => {
        if (success) {
          let addressListFilter = addressList.filter(
            address => address.id != addressId,
          );
          dispatch(saveAddressList(addressListFilter));
        }
      }),
    );
  };
  const DeleteBtn = () => {
    return (
      <IconTouchableContainer
        style={{marginTop: 5}}
        onPress={() => {
          handleDeleteAddress(id);
        }}>
        <DeleteIcon />
      </IconTouchableContainer>
    );
  };
  console.log('ididid', id);

  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <View style={styles.detailsContainer}>
        <View style={styles.checkBtn}>
          {selected ? <CheckedIcon /> : <UnCheckedIcon />}
          <Text style={styles.addressTitle}>{name}</Text>
        </View>
        <View style={{paddingLeft: Pixel(60)}}>
          <Text
            style={[
              styles.address,
              {textAlign: language === 'ar' ? 'left' : 'right'},
            ]}>
            {language === 'ar' ? area_ar : area_en}{' '}
            {street_name != undefined && t('st') + '.'} {street_name}{' '}
            {building_no != undefined && ` - ` + t('Building No')} {building_no}
          </Text>
          <Text style={styles.address}>
            {t('Mobile Number')} {phone}
          </Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        {!inCart && (
          <>
            <EditBtn />
            <DeleteBtn />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderBottomColor: Colors.grayDark,
    // borderBottomWidth: Pixel(2),

    ...commonStyles.rowBox,
    ...commonStyles.boxShadow,
    marginBottom: Pixel(30),
    paddingHorizontal: Pixel(30),
    paddingLeft: Pixel(60),
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
  },
  detailsContainer: {
    paddingVertical: Pixel(37),
  },
  checkBtn: {
    ...commonStyles.rowBox,
    marginBottom: Pixel(15),
  },
  box: {
    marginBottom: Pixel(20),
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
  },
  addressTitle: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(33),
    marginLeft: Pixel(25),
  },
  address: {
    fontFamily: Fonts.medium,
    fontSize: Pixel(25),
    color: '#4D4D4D',
    marginBottom: Pixel(10),
  },
  actionsContainer: {
    justifyContent: 'space-between',
  },
});

export default Address;
