import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,FlatList} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import {commonStyles} from '../styles/styles';
import {Colors, Fonts, Pixel,Images} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useNavigation} from '@react-navigation/native';
import Card from '../components/orderDone/card'
import NameCard from '../components/orderDone/nameCard'
import Progress from '../components/orderDone/progress'
import Button from '../components/touchables/Button'

const OrderDone: FC = () => {
  const categoryHomeData = [
    {
      id: 1,
      header: 'Order Placed',
      subHeader: 'Today 03 January 2021 - 1:30 PM',
    },

    {
      id: 2,
      header: 'Item Processed',
      subHeader: 'Bagged In Market',
    },

    {
      id: 3,
      header: 'Delivering',
      subHeader: 'Your Order Is On The Way',
    },

    {
      id: 4,
      header: 'Received',
      subHeader: 'Your Order Has Been Delivered',
    },
    

  ];
  
  
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  return (
    <Container style={styles.container}>
       <Content >

        <Card/>
        <View style={{
          height:Pixel(230),
          alignItems:'center',
        }} >

        <NameCard/>
        </View>
        <View style={{
          flex:1,
        }} >
          

          {
            categoryHomeData.map((item,index) => {
              return(
                  <Progress 
                  key={item.id}
                  header={item.header}
                  subHeader={item.subHeader}
                  index={item.id}
                  />
                )
            })
          }
              
          </View>
          <View style={styles.buttonsContainer} >
            <Button 
              title={'Home'}
              style={{
                width:'49%',
                backgroundColor:Colors.white
              }}
              styleTitle={{
                fontSize:Pixel(30),
                fontFamily:Fonts.bold
              }}
            />
            <Button 
              title={'Order Details'}
              style={{
                width:'49%',
                ...commonStyles.boxShadow,

              }}
              styleTitle={{
                fontSize:Pixel(30),
                fontFamily:Fonts.bold,
                
              }}
            />

          </View>
       </Content>

        
    </Container>
  );
};

export default OrderDone;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.minColor,
    //paddingHorizontal:Pixel(40),

  },
  buttonsContainer:{
    height:Pixel(250),
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',

  },
});
