import React, { FC, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  FlatList,
  Animated,
  Dimensions
} from 'react-native';
import { Container, Content } from '../components/containers/Containers';
import Input from '../components/textInputs/Input'
import { Colors, Images, Pixel, Fonts } from '../constants/styleConstants';
import { useTranslation } from 'react-i18next';
import {
  UnCheckedIcon,
  CartIcon,
  ArrowLeftSmIcon,
  FavoriteIcon,
  MinusIcon,
  PlusIcon,
} from '../../assets/Icons/Icons';
import Button from '../components/touchables/Button';


const heightHeader = (Dimensions.get('window').height) / 4

const ProductPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Container style={styles.container}>
      <ImageBackground
        source={Images.product}
        style={styles.header}
        imageStyle={{}}
      >
        <View style={styles.overlay}>
          <View style={{
            height: heightHeader / 2,
            paddingHorizontal: Pixel(50),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }} >


            <ArrowLeftSmIcon />

            <CartIcon />

          </View>

        </View>
      </ImageBackground>

      <View style={styles.content}>
        {/********headerConent********** */}
        <Content noPadding style={styles.headerContent}  >

          <View  >
            <View style={styles.contentHead1} >
              <Text style={[styles.headText]} >American Strawberry</Text>
              <FavoriteIcon width={Pixel(50)} height={Pixel(50)} />
            </View>
            <View style={styles.contentHead2} >
              <Text style={[styles.headText, {
                color: Colors.colorSacand
              }]} >14 LE</Text>
              <Text style={{
                fontSize: Pixel(20),
                fontFamily: Fonts.regular,
                color: Colors.dark
              }} >Fresh Market</Text>
            </View>
          </View>

          {/*********desc********* */}
          <View style={{
            borderBottomColor: Colors.CommonBorderColor,
            borderBottomWidth: 1,
            paddingVertical: Pixel(40)
          }} >
            <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy reod tempor invidunt ut labore et dolore ma aliquyam ,
            sed diam voluptua. At eos et accusam et justodolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanct est Lorem ipsum dolor sit amet.
            Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.</Text>
          </View>

          {/***********size************** */}
          <View style={styles.sizeContainer} >
            <Text style={styles.sizeText} >Sizes</Text>
            <View style={styles.optionsContainer} >
              <View style={styles.option} >
                <Text style={styles.optionText} >1 kg</Text>
                <UnCheckedIcon height={Pixel(30)} width={Pixel(30)} />
              </View>

              <View style={styles.option} >
                <Text style={styles.optionText} >3 kg</Text>
                <UnCheckedIcon height={Pixel(30)} width={Pixel(30)} />
              </View>
            </View>
          </View>


          {/**************notes***************** */}
          <View style={styles.sizeContainer} >
            <Text style={styles.sizeText} >Add Notes</Text>
            <View style={{
              width: '100%',
              height: Pixel(250),
              marginTop: Pixel(30)
            }} >
              <Input
                contentContainerStyle={styles.contentContainerStyle}
                textInputContainer={styles.textInput}
                options={{
                  placeholder: t('Write Your Notes Here'),
                  placeholderTextColor: Colors.lock,
                }}
              />
            </View>
          </View>

          {/******************* */}
          <View style={styles.footer} >
            <View style={styles.cartItemActions}>
              <TouchableOpacity
                style={[
                  styles.cartItemActionBtn,
                  {
                    backgroundColor: Colors.warning,
                  },
                ]}>
                <MinusIcon width={Pixel(22)} height={Pixel(22)} />
              </TouchableOpacity>
              <Text style={styles.cartItemQuantity}>20</Text>
              <TouchableOpacity
                style={[
                  styles.cartItemActionBtn,
                  {
                    backgroundColor: Colors.success,
                  },
                ]}>
                <PlusIcon width={Pixel(22)} height={Pixel(22)} />
              </TouchableOpacity>
            </View>


            <Text style={{
              fontFamily: Fonts.black,
              fontSize: Pixel(30)
            }} >28 LE</Text>





            <Button
              style={{
                width: Pixel(350)
              }}
              styleTitle={{
                fontFamily: Fonts.black,
                fontSize: Pixel(40)
              }}
              title={'Add To Cart'} />



          </View>
        </Content>
      </View>
    </Container>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  header: {
    height: heightHeader,
    zIndex: 1,
    position: 'relative',
    justifyContent: 'flex-start'
  },
  overlay: {
    width: '100%',
    height: '100%',

    zIndex: 1,
    position: 'relative'
  },
  content: {
    flex: 4,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 1000,
    position: 'relative',
    marginTop: -50,
    paddingHorizontal: Pixel(40),
    alignItems: 'center'
  },
  imageContainer: {
    width: 110,
    height: 120,
    backgroundColor: Colors.minColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    top: -70,
  },
  headerContent: {
    flexDirection: 'column',
    //alignItems: 'flex-start',
    width: '100%',
    paddingTop: Pixel(50),
    borderBottomWidth: 1,
    borderBottomColor: Colors.CommonBorderColor
  },
  contentHead1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  contentHead2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: Pixel(20)
  },
  headText: {
    fontSize: Pixel(40),
    fontFamily: Fonts.black
  },
  sizeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    paddingTop: Pixel(20)
  },
  sizeText: {
    fontSize: Pixel(40),
    fontFamily: Fonts.bold
  },
  optionsContainer: {
    flexDirection: 'row',
    height: Pixel(120),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  option: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  optionText: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(30),
    paddingRight: Pixel(20)
  },
  contentContainerStyle: {
    borderRadius: 14,
    borderWidth: 0,
    padding: 0,
    paddingHorizontal: 15,
    height: '100%'
  },
  textInput: {
    height: Pixel(100),
    padding: 0,
    fontFamily: Fonts.bold,
    fontSize: Pixel(33),
    color: Colors.dark,
  },

  cartItemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%'
  },
  cartItemOffer: {
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
  },
  cartItemOfferText: {
    fontSize: Pixel(23),
    color: Colors.white,
  },
  cartItemActionBtn: {
    width: Pixel(60),
    height: Pixel(60),
    backgroundColor: '#989898',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Pixel(10),
  },
  cartItemActionBtnText: {
    fontSize: Pixel(25),
    color: Colors.sacandAppBackgroundColor,
  },
  cartItemQuantity: {
    color: Colors.dark,
    fontFamily: Fonts.bold,
    paddingHorizontal: Pixel(20),
    fontSize: Pixel(30)
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(40),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: Pixel(200),
  },
});
