import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import {Container, Content} from '../containers/Containers';
import {commonStyles} from '../../styles/styles';
import {Colors, Fonts, Pixel,Images} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {Done,TelephoneIcon} from '../../../assets/Icons/Icons'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Card: FC = () => {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  return (
    <Container style={styles.container}>
        <View style={styles.cardContainer} >
          <View style={styles.doneIconContainer} >
            <Done/>
          </View>
          
          <View style={styles.topCard} >
          <Text style={styles.topText} >Your Order Has Been Done</Text>
          </View>
          <View style={styles.bottomCard} >

          <Text style= {styles.bottomText} >Total Amount</Text>
          
          <Text style={styles.priceText} >100 EG</Text>
          </View>
          <View style={styles.rightCard} ></View>

        <View style={styles.leftCard} ></View>
        </View>


        <View style={styles.footerCard} >
          <Text style={styles.footerText} >1289</Text>
          <Text style={[styles.footerText,{
            paddingLeft:Pixel(30),

          }]} >Your Order Code</Text>
        </View>
    </Container>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.minColor,
  },
  cardContainer:{
    backgroundColor:Colors.white,
    width:'100%',
    height:Pixel(280),
    alignItems:'center',
    justifyContent:'center',
    marginTop:Pixel(250),
  },
  topCard:{
    width:'100%',
    height:Pixel(120),
    alignItems:'center',
    justifyContent:'center',
    marginTop:Pixel(40)
  },
  topText:{
    fontSize:Pixel(40),
    fontFamily:Fonts.black,
    
  },
  bottomCard:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderTopWidth:1,
    borderTopColor:Colors.lock,
    width:'80%',
    height:Pixel(120),

  },
  bottomText:{
    fontSize:Pixel(30),
    fontFamily:Fonts.medium,
  },
  priceText:{
    fontSize:Pixel(45),
    fontFamily:Fonts.bold,
    color:Colors.colorSacand,
    paddingLeft:Pixel(20)
  },
  doneIconContainer:{
    width:Pixel(120),
    height:Pixel(120),
    borderRadius:Pixel(120/2),
    backgroundColor:Colors.white,
    borderColor:Colors.colorSacand,
    borderWidth:1,
    position:'absolute',
    top:Pixel(-70),
    alignItems:'center',
    justifyContent:'center'
  },
  rightCard:{
    width:Pixel(80),
    height:Pixel(80),
    borderRadius:Pixel(80/2),
    backgroundColor:Colors.minColor,
    position:'absolute',
    top:Pixel(110),
    right:Pixel(-40)
  },
  leftCard:{
    width:Pixel(80),
    height:Pixel(80),
    borderRadius:Pixel(80/2),
    backgroundColor:Colors.minColor,
    position:'absolute',
    top:Pixel(110),
    left:Pixel(-40)
  },
  footerCard:{
    backgroundColor:Colors.colorSacand,
    height:Pixel(120),
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  footerText:{
    color:Colors.white,
    fontSize:Pixel(30),
    fontFamily:Fonts.bold
  },
});
