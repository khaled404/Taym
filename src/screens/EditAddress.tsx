import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content } from '../components/containers/Containers';
import { Colors, Fonts, Pixel } from '../constants/styleConstants';
import { useTranslation } from 'react-i18next';
import Header from '../components/header/Header';
import Input from '../components/textInputs/Input';
import { commonStyles } from '../styles/styles';
import Button from '../components/touchables/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  addAddressApi,
  editAddressApi,
  saveAddressList,
} from '../store/actions/address';
import { RootState } from '../store/store';
import { useRoute } from '@react-navigation/native';

const EditAddress: FC = () => {
  const route = useRoute();
  const { address } = route.params;
  const { addressList }: any = useSelector((state: RootState) => state.address);
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(address.name);
  const [phone, setPhone] = useState(address.phone);
  const [street, setStreet] = useState(address.street_name);
  const [area, setArea] = useState(address.area);
  const [buildingNumber, setBuildingNumber] = useState(address.building_no);
  const [floor, setFloor] = useState(address.floor_no);
  const [apartment, setApartment] = useState(address.apartment_no);
  const [description, setDescription] = useState(address.description);

  console.log('route.params.address', address);

  const handlSubmit = () => {
    setLoader(true);
    const addressData = {
      name: name,
      phone: phone,
      area: area,
      street_name: street,
      building_no: buildingNumber,
      floor_no: floor,
      apartment_no: apartment,
      latitude: 875856,
      longitude: 7867687,
    };
    let aa = [...addressList, addressData];
    console.log('new addressList', aa);

    dispatch(
      editAddressApi(address.id, addressData, success => {
        setLoader(false);
        if (success) {
          navigate('MyAddresses');
        }
      }),
    );
  };
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <Container style={styles.container}>
      <Header title={t('Edit Location')} />
      <Content
        noPadding
        style={styles.contentContainer}
        contentContainerStyle={{ paddingHorizontal: 25 }}>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Name')}</Text>
            <Input
              textInputContainer={[
                styles.textInput,
              ]}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setName(value);
                },
                value: name,
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Mobile Number')}</Text>
            <Input
              textInputContainer={[
                styles.textInput,
              ]}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setPhone(value);
                },
                value: phone,
                keyboardType: 'number-pad',
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Street Number')}</Text>
            <Input
              textInputContainer={[
                styles.textInput,
              ]}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setStreet(value);
                },
                value: street,
                keyboardType: 'number-pad',
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Area')}</Text>
            <Input
              textInputContainer={[
                styles.textInput,
              ]}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setArea(value);
                },
                value: area,
                keyboardType: 'number-pad',
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Building No')}</Text>
            <Input
              textInputContainer={[
                styles.textInput,
              ]}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setBuildingNumber(value);
                },
                value: buildingNumber,
                keyboardType: 'number-pad',
              }}
            />
          </View>

          <View style={styles.box}>
            <View style={[styles.inputContainer, { flex: 0.47 }]}>
              <Text style={styles.inputLabel}>{t('Floor')}</Text>
              <Input
                textInputContainer={[
                  styles.textInput,
                ]}
                contentContainerStyle={styles.contentContainerStyle}
                options={{
                  onChangeText: value => {
                    setFloor(value);
                  },
                  value: floor,
                  keyboardType: 'number-pad',
                }}
              />
            </View>

            <View style={[styles.inputContainer, { flex: 0.47 }]}>
              <Text style={styles.inputLabel}>{t('Apartment')}</Text>
              <Input
                textInputContainer={[
                  styles.textInput,
                ]}
                contentContainerStyle={styles.contentContainerStyle}
                options={{
                  onChangeText: value => {
                    setApartment(value);
                  },
                  value: apartment,
                  keyboardType: 'number-pad',
                }}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Landmark')}</Text>
            <Input
              textInputContainer={[
                styles.textInput,
              ]}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setDescription(value);
                },
                value: description,
              }}
            />
          </View>
        </View>

        <View style={styles.submitContainer}>
          <Button
            style={{ ...commonStyles.boxShadow }}
            title={t('Save Address')}
            onPress={handlSubmit}
            loader={loader}
          />
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
    // paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  submitContainer: {
    marginVertical: Pixel(80),
  },
  box: {
    // marginBottom: Pixel(20),
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
  },
  inputsContainer: {
    // paddingHorizontal: Pixel(20),
    paddingVertical: Pixel(10),
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputLabel: {
    color: '#070707',
    fontFamily: Fonts.medium,
    marginBottom: Pixel(17),
    textAlign: 'left',
  },
  textInput: {
    height: Pixel(100),
    padding: 0,
    fontFamily: Fonts.bold,
    fontSize: Pixel(33),
    color: '#070707',
    alignSelf:'flex-start'
  },
  contentContainerStyle: {
    borderRadius: 14,
    borderWidth: 0,
    padding: 0,
    paddingHorizontal: 15,
  },
});

export default EditAddress;
