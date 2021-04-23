import React, {FC, useState} from 'react';
import {StyleSheet, Text, ImageBackground, View} from 'react-native';
import {Colors,Fonts,Images,Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {useNavigation} from '@react-navigation/native';
import { DeleteIcon} from '../../../assets/Icons/Icons';
import {commonStyles} from '../../styles/styles';
import LinearGradient from 'react-native-linear-gradient';
interface IVisaCard {
  image?: any;
}
const VisaCard: FC<IVisaCard> = ({image}) => {
  const {t} = useTranslation();
return(

      <ImageBackground 
      source={image}
      style={styles.container} 
      >

        <View style={styles.delete} >
          <DeleteIcon/>
        </View>

        <View style={styles.bankName} >
          <Text style={styles.creditText} >Credit Card</Text>
          <Text style={styles.bankNameText} >Bank Name</Text>
        </View>

          {/***** */}

        <View style={styles.imageContainer} >

        </View>

        {/********** */}

        <View style={styles.cardNum} >
          <Text style={styles.cardNumText} >1234  5678  9107  4568</Text>
        </View>

        {/*********** */}

        <View style={styles.validContainer} >
          <Text style={styles.passText} >0123</Text>
          <View style={styles.validRight} >

        <Text style={styles.validText} >{'VALID'} {'\n'} {'THRU'}</Text>


          <Text style={styles.dateText} >01/08</Text>
          </View>
        </View>

        {/********** */}
        <View style={styles.nameContainer} >
          <Text style={styles.nameText} t>Name Surname</Text>
        </View>
        

      </ImageBackground>
)
  };
  export default VisaCard

  const styles= StyleSheet.create({
    container:{
      width:Pixel(500),
      marginTop:Pixel(60),
      marginHorizontal:10,
      height:Pixel(300),
      borderRadius:10,
      flexDirection:'column',
      alignItems:'flex-start',
      justifyContent:'flex-start',
      paddingHorizontal:Pixel(40),
      paddingVertical:Pixel(30),
      backgroundColor:Colors.dark,
    },
    delete:{
      position:'absolute',
      backgroundColor:Colors.minColor,
      top:Pixel(-30),
      right:Pixel(-30),
      width:Pixel(70),
      height:Pixel(70),
      borderRadius:Pixel(70/2),
      alignItems:'center',
      justifyContent:'center'
    },
    bankName:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      alignItems:'center'
    },
    creditText:{
      color:Colors.white,
      fontSize:Pixel(25),
      fontFamily:Fonts.medium
    },
    bankNameText:{
      color:Colors.white,
      fontSize:Pixel(25),
      fontFamily:Fonts.black
    },
    imageContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      height:'35%',
      width:'100%',
      alignItems:'center'
    },
    cardNum:{
      flexDirection:'row',
      width:'100%',
      alignItems:'center'
    },
    cardNumText:{
      color:Colors.white,
      fontSize:Pixel(35),
      fontFamily:Fonts.regular
    },
    validContainer:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-between',
      alignItems:'flex-start',
    },
    passText:{
      color:Colors.white,
      fontSize:Pixel(20),
      fontFamily:Fonts.medium
    },
    validRight:{
      flexDirection:'row',
      alignItems:'center',
      paddingTop:Pixel(10)
    },
    validText:{
      color:Colors.white,
      fontSize:Pixel(12),
      fontFamily:Fonts.regular
    },
    dateText:{
      color:Colors.white,
      fontSize:Pixel(20),
      fontFamily:Fonts.regular,
      
    },
    nameContainer:{
      width:'100%',
      justifyContent:'flex-start',
    },
    nameText:{
      color:Colors.white,
      fontSize:Pixel(25),
      fontFamily:Fonts.regular,
      
    },
  })