import React, {FC, useState} from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import Header from '../components/header/Header';
import {Colors, Fonts, Pixel, Images} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Input from '../components/textInputs/Input';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useNavigation} from '@react-navigation/native';
import {CheckedIcon, Visa, PikerArrow} from '../../assets/Icons/Icons';
import Button from '../components/touchables/Button';
import {commonStyles} from '../styles/styles';
import VisaCard from '../components/myCards/VisaCard';

const MyCards: FC = () => {
  const {t} = useTranslation();
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExData, setCardExData] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [check, setCheck] = useState(false);

  const categoryHomeData = [
    {
      id: 1,
      title: t('Supermarket'),
      image: Images.card1,
    },

    {
      id: 2,
      title: t('Beef'),
      image: Images.card2,
    },

    {
      id: 3,
      title: t('Chicken'),
      image: Images.card3,
    },
  ];

  const dispatch = useDispatch();
  const {isRTL}: any = useSelector((state: RootState) => state.settings);
  const {navigate} = useNavigation();
  return (
    <Container style={styles.container}>
      <Header navigate={navigate} title="My Cards" />

      <View style={styles.cardContainer}>
        <FlatList
          data={categoryHomeData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => <VisaCard image={item.image} />}
        />
      </View>
      <Content>
        <View style={styles.inputContainer}>
          <View style={styles.addTextConatiner}>
            <Text style={styles.addText}>{t('Add New Card')}</Text>
          </View>

          {/***********Card Type******** */}
          <Text style={styles.inputLabel}>{t('Card Type')}</Text>
          <View
            style={[
              styles.textInput,
              {
                backgroundColor: Colors.inputBackground,
                borderRadius: 14,
                paddingHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <Visa />
            <PikerArrow width={Pixel(30)} height={Pixel(30)} />
          </View>

          {/***********Card Number******** */}
          <Text style={styles.inputLabel}>{t('Card Number')}</Text>
          <Input
            textInputContainer={styles.textInput}
            contentContainerStyle={styles.contentContainerStyle}
            options={{
              onChangeText: value => {
                setCardNumber(value);
              },
              value: cardNumber,
              keyboardType: 'numeric',
            }}
          />

          <View style={styles.inputRowContainer}>
            {/***********EX Date******** */}
            <View style={styles.inputColumnContainer}>
              <Text style={styles.inputLabel}>{t('EX Date')}</Text>
              <Input
                textInputContainer={[
                  styles.textInput,
                  {
                    width: '100%',
                  },
                ]}
                contentContainerStyle={styles.contentContainerStyle}
                options={{
                  onChangeText: value => {
                    setCardExData(value);
                  },
                  value: cardExData,
                }}
              />
            </View>

            {/***********CVV******** */}

            <View style={styles.inputColumnContainer}>
              <Text style={styles.inputLabel}>{t('CVV')}</Text>
              <Input
                textInputContainer={[
                  styles.textInput,
                  {
                    width: '100%',
                  },
                ]}
                contentContainerStyle={styles.contentContainerStyle}
                options={{
                  onChangeText: value => {
                    setCardCvv(value);
                  },
                  value: cardCvv,
                }}
              />
            </View>
          </View>

          {/********* */}
          <View style={styles.checkContainer}>
            <CheckedIcon />
            <Text style={styles.checkText}>
              {t('Set As Default Payment Card')}
            </Text>
          </View>

          {/*********** */}
          <Button style={{...commonStyles.boxShadow}} title={t('Save Card')} />
        </View>
      </Content>
    </Container>
  );
};

export default MyCards;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginVertical: 7,
  },
  inputLabel: {
    color: Colors.lightGray,
    fontFamily: Fonts.medium,
    marginBottom: Pixel(17),
    textAlign: 'left',
    marginTop: Pixel(30),
  },
  textInput: {
    height: Pixel(100),
    padding: 0,
    fontFamily: Fonts.bold,
    fontSize: Pixel(33),
    color: Colors.dark,
  },
  contentContainerStyle: {
    borderRadius: 14,
    borderWidth: 0,
    padding: 0,
    paddingHorizontal: 15,
  },
  cardContainer: {
    width: '100%',
    height: Pixel(400),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTextConatiner: {
    width: '100%',
    height: Pixel(100),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  addText: {
    fontSize: Pixel(50),
    color: Colors.colorSacand,
    fontFamily: Fonts.bold,
  },
  inputRowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputColumnContainer: {
    flexDirection: 'column',
    width: '48%',
  },
  checkContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    height: Pixel(150),
    alignItems: 'center',
  },
  checkText: {
    color: Colors.lightGray,
    fontSize: Pixel(30),
    fontFamily: Fonts.bold,
    marginLeft: Pixel(40),
  },
});
