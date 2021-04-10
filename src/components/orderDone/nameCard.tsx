import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import {Container, Content} from '../containers/Containers';
import {commonStyles} from '../../styles/styles';
import {Colors, Fonts, Pixel,Images} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {Done,TelephoneIcon} from '../../../assets/Icons/Icons'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const NameCard: FC = () => {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  return (
    

      

        <View style={styles.nameCardContainer} >
          <View style={styles.leftNameCard} >
            <View style={styles.nameLogo} >
                <Image
                  source={Images.marketLogo}
                />
            </View>
            <Text style={styles.nameText} >Refresh Market</Text>
          </View>
          <View style={styles.callContainer} >  
            <TelephoneIcon width={Pixel(50)} height={Pixel(50)} />
          </View>
        </View>


       
  );
};

export default NameCard;

const styles = StyleSheet.create({
  nameCardContainer:{
    width:'100%',
    height:Pixel(150),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:Pixel(30)
  },
  leftNameCard:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    height:'80%',
    width:'77%',
    backgroundColor:Colors.white,
    borderRadius:10
  },
  nameLogo:{
    alignItems:'center',
    justifyContent:'center',
    width:'40%',
    height:'100%',
    ...commonStyles.boxShadow,
    backgroundColor:Colors.minColor,
    borderRadius:10
  },
  nameText:{
    fontSize:Pixel(40),
    fontFamily:Fonts.black,
    paddingLeft:Pixel(10)
  },
  callContainer:{
    width:'20%',
    height:'80%',
    backgroundColor:Colors.white,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10
  },
});
