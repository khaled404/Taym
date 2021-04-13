import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Header from '../components/header/Header';
import Input from '../components/textInputs/Input';
import {commonStyles} from '../styles/styles';
import Button from '../components/touchables/Button';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const AddLocation: FC = () => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [apartment, setApartment] = useState('');
  const [landmark, setLandmark] = useState('');
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  return (
    <Container style={styles.container}>
      <Header title={t('Add Location')} />
      <Content
        noPadding
        style={styles.contentContainer}
        contentContainerStyle={{paddingHorizontal: 25}}>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Name')}</Text>
            <Input
              textInputContainer={styles.textInput}
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
              textInputContainer={styles.textInput}
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
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setStreet(value);
                },
                value: street,
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Area')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setArea(value);
                },
                value: area,
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Building No')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setBuildingNumber(value);
                },
                value: buildingNumber,
              }}
            />
          </View>

          <View style={styles.box}>
            <View style={[styles.inputContainer, {flex: 0.47}]}>
              <Text style={styles.inputLabel}>{t('Floor')}</Text>
              <Input
                textInputContainer={styles.textInput}
                contentContainerStyle={styles.contentContainerStyle}
                options={{
                  onChangeText: value => {
                    setFloor(value);
                  },
                  value: floor,
                }}
              />
            </View>

            <View style={[styles.inputContainer, {flex: 0.47}]}>
              <Text style={styles.inputLabel}>{t('Apartment')}</Text>
              <Input
                textInputContainer={styles.textInput}
                contentContainerStyle={styles.contentContainerStyle}
                options={{
                  onChangeText: value => {
                    setApartment(value);
                  },
                  value: apartment,
                }}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('Landmark')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              options={{
                onChangeText: value => {
                  setLandmark(value);
                },
                value: landmark,
              }}
            />
          </View>
        </View>

        <View style={styles.submitContainer}>
          <Button
            style={{...commonStyles.boxShadow}}
            title={t('Save Address')}
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
  },
  contentContainerStyle: {
    borderRadius: 14,
    borderWidth: 0,
    padding: 0,
    paddingHorizontal: 15,
  },
});

export default AddLocation;
