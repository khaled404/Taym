import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import Header from '../components/header/Header';
import {Colors,Fonts,Pixel} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Input from '../components/textInputs/Input'
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useNavigation} from '@react-navigation/native';
import {EditIcon, ArrowHeaderIcon, CheckedIcon} from '../../assets/Icons/Icons';
import Button from "../components/touchables/Button";
import {commonStyles} from '../styles/styles';

const MyCards: FC = () => {
  const {t} = useTranslation();
  const [cardType , setCardType] = useState('')
  const [cardNumber , setCardNumber] = useState('')
  const [cardExData , setCardExData] = useState('')
  const [cardCvv , setCardCvv] = useState('')
  const [check , setCheck] = useState(false)
  



  const categoryHomeData = [
    {
      id: 1,
      title: t('Supermarket'),
      image: 'Voucher 12457',
    },

    {
      id: 2,
      title: t('Beef'),
      image: 'Voucher 12457',
    },

    {
      id: 3,
      title: t('Chicken'),
      image: 'Voucher 12457',
    },

    {
      id: 4,
      title: t('Fish'),
      image: 'Voucher 12457',
    },

    {
      id: 5,
      title: t('Fruit'),
      image: 'Voucher 12457',
    },

    {
      id: 6,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
  ];

  const dispatch = useDispatch();
  const {isRTL}: any = useSelector((state: RootState) => state.settings);
  const {navigate} = useNavigation();
  return (
    <Container style={styles.container}>
      <Header navigate={navigate} title="My Cards" />
      <View style={{
        width:'100%',
        height:Pixel(400),
        alignItems:'center',
        justifyContent:'center'
      }} >
        <View style={{
          width:'70%',
          height:Pixel(300),
          borderRadius:10,
          flexDirection:'column',
          alignItems:'flex-start',
          justifyContent:'flex-start',
          paddingHorizontal:Pixel(40),
          paddingVertical:Pixel(30),
          backgroundColor:Colors.dark,
        }} >

          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%',
            alignItems:'center'
          }} >
            <Text style={{
              color:Colors.white,
              fontSize:Pixel(25),
              fontFamily:Fonts.medium
            }} >Credit Card</Text>
            <Text style={{
              color:Colors.white,
              fontSize:Pixel(25),
              fontFamily:Fonts.black
            }} >Bank Name</Text>
          </View>

            {/***** */}

          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            height:'35%',
            width:'100%',
            alignItems:'center'
          }} >

          </View>

          {/********** */}

          <View style={{
            flexDirection:'row',
            width:'100%',
            alignItems:'center'
          }} >
            <Text style={{
              color:Colors.white,
              fontSize:Pixel(35),
              fontFamily:Fonts.regular
            }} >1234  5678  9107  4568</Text>
          </View>

          {/*********** */}

          <View style={{
            flexDirection:'row',
            width:'100%',
            justifyContent:'space-between',
            alignItems:'flex-start',
          }} >
            <Text style={{
              color:Colors.white,
              fontSize:Pixel(20),
              fontFamily:Fonts.medium
            }} >0123</Text>
            <View style={{
              flexDirection:'row',
              alignItems:'center',
              paddingTop:Pixel(10)
            }} >

          <Text style={{
              color:Colors.white,
              fontSize:Pixel(12),
              fontFamily:Fonts.regular
            }} >{'VALID'} {'\n'} {'THRU'}</Text>


            <Text style={{
              color:Colors.white,
              fontSize:Pixel(20),
              fontFamily:Fonts.regular,
              
            }} >01/08</Text>
            </View>
          </View>

          {/********** */}
          <View style={{
            width:'100%',
            justifyContent:'flex-start',
          }} >
            <Text style={{
              color:Colors.white,
              fontSize:Pixel(25),
              fontFamily:Fonts.regular,
              
            }} t>Name Surname</Text>
          </View>
          

        </View>
      </View>
      <Content >
      <View style={styles.inputContainer}>
        <View style={{
          width:'100%',
          height:Pixel(100),
          alignItems:'flex-start',
          justifyContent:'center'
        }} >
          <Text style={{
            fontSize:Pixel(50),
            color:Colors.colorSacand,
            fontFamily:Fonts.bold
          }} >Add New Card</Text>
        </View>

        {/***********Card Type******** */}
            <Text style={styles.inputLabel}>{t('Card Type')}</Text>
            <Input
              textInputContainer={styles.textInput}
              contentContainerStyle={styles.contentContainerStyle}
              //rightContent={() => <ArrowHeaderIcon width={Pixel(30)} height={Pixel(30)} />}
              options={{
                onChangeText: value => {
                  setCardType(value);
                },
                value: cardType,
              }}
            />

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
              }}
            />

            <View style={{
              width:'100%',
              flexDirection:'row',
              justifyContent:'space-between'
            }} >

            {/***********EX Date******** */}
           <View style={{
             flexDirection:'column',
             width:'48%'
           }} >

            <Text style={styles.inputLabel}>{t('EX Date')}</Text>
            <Input
              textInputContainer={[styles.textInput , {
                width:'100%'
              }]}
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

            <View style={{
             flexDirection:'column',
             width:'48%'

           }} >

            <Text style={styles.inputLabel}>{t('CVV')}</Text>
            <Input
              textInputContainer={[styles.textInput , {
                width:'100%'
              }]}              
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
          <View style={{
            flexDirection:'row',
            width:'100%',
            justifyContent:'flex-start',
            height:Pixel(150),
            alignItems:'center'
          }} >
            <CheckedIcon/>
            <Text style={{
              color:Colors.lightGray,
              fontSize:Pixel(30),
              fontFamily:Fonts.bold,
              marginLeft:Pixel(40)
            }} >Set As Default Payment Card</Text>
          </View>

          {/*********** */}
          <Button
                        style={{...commonStyles.boxShadow}}
                        title={t('Save Card')}
                    />
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
    marginTop:Pixel(30)
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
});
