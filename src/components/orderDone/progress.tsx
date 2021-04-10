import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import {Container, Content} from '../containers/Containers';
import {commonStyles} from '../../styles/styles';
import {Colors, Fonts, Pixel,Images} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {SolidDone,SuccessIcon} from '../../../assets/Icons/Icons'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

interface ProgressProps {
  header?: string;
  subHeader?: string;
  index?:number
}

const Progress:  FC<ProgressProps> = ({header, subHeader,index}) => {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  return (
        <View style={styles.container} >

<View style={{
            position:'absolute',
            left:Pixel(50),
            top:Pixel(0),
            height:'100%',
            borderStyle: 'dashed',
            borderWidth:.9,
            borderRadius: 1,
            borderColor:Colors.colorSacand,

          }} >

          </View>
          
          <View style={[styles.cardContainer,{
            marginBottom:index==4?Pixel(0):Pixel(50)
          }]} >
            <View style={styles.iconContainer} >
              <SolidDone/>
            </View>
            <View style={styles.textContainer} >
              <Text style={styles.header} >{header}</Text>

              <Text style={styles.subHeader} >{subHeader}</Text>
            </View>
          </View>



        </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container:{
    width:'100%',
    alignItems:'flex-start',
    //height:Pixel(170),
    justifyContent:'flex-end',
  },
  cardContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    width:'100%',
  },
  iconContainer:{
    width:Pixel(100),
    height:Pixel(100),
    borderRadius:Pixel(100/2),
    borderStyle: 'dashed',
    borderWidth:2,
    borderColor:Colors.colorSacand,
    backgroundColor:Colors.minColor,
    zIndex:111,
    alignItems:'center',
    justifyContent:'center',
  },
  textContainer:{
    flexDirection:'column',
    justifyContent:'center',
    paddingLeft:Pixel(30)
  },
  header:{
    fontSize:Pixel(35),
    fontFamily:Fonts.bold
  },
  subHeader:{
    fontSize:Pixel(25),
    color:Colors.lightGray,
    paddingTop:Pixel(15),
    fontFamily:Fonts.medium
  },
 });
