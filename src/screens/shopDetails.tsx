import React, {FC,useState} from 'react';
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
import {Container, Content} from '../components/containers/Containers';
import HomeHeader from '../components/header/HomeHeader';
import {Colors, Images, Pixel, Fonts} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import CategoryList from '../components/Home/CategoryList';
import OfferSlider from '../components/Home/OfferSlider';
import FavoriteList from '../components/Home/FavoriteList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useNavigation} from '@react-navigation/native';
import Input from '../components/textInputs/Input';
import IconTouchableContainer from '../components/touchables/IconTouchableContainer';
import {SearchIcon,CartIcon,ArrowLeftSmIcon,DeliveryIcon} from '../../assets/Icons/Icons';
import FavoriteItem from '../components/Home/FavoriteItem';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const heightHeader=(Dimensions.get('window').height)/4
const ShopDetails: FC = () => {
  const {t} = useTranslation();
  const animatedValue=useState(new Animated.Value(0))[0]

  const translateY = animatedValue.interpolate({
    inputRange: [0, heightHeader/1.7],
    outputRange: [0, -heightHeader/1.7],
    extrapolate: 'clamp',
  });

  const imageWidth = animatedValue.interpolate({
    inputRange: [-1, 250],
    outputRange: [1, -1],
  });


  

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

  const SearchSubmitBtn: FC = () => {
    return (
      <IconTouchableContainer style={styles.submitSearchBtn}>
        <SearchIcon width={17} height={17} />
      </IconTouchableContainer>
    );
  };
  return (
    <Container style={styles.container}>
      <ImageBackground
        source={Images.supermarket}
        style={styles.header}
        imageStyle={{}}
        >
        <View style={styles.overlay}>
        <View style={{
          height:heightHeader/2,
          paddingHorizontal:Pixel(50),
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          position:'relative',
        }} >
        

          <ArrowLeftSmIcon/>
          
          <CartIcon/>

        </View>

        </View>
      </ImageBackground>
      <Animated.View style={[styles.content, {transform: [{translateY}]}]}>
        <Animated.View
          style={{
            width: '100%',
            alignItems: 'center',
            height: 50,
          }}>
          <Animated.View style={[styles.imageContainer ,{
            opacity:imageWidth,
          }]}>
            <Animated.Image 
            source={Images.marketLogo} 
            resizeMode={'contain'} 
            style={[{width: Pixel(180), height: Pixel(180)},{
              opacity:imageWidth,
            }]} />
          </Animated.View>
        </Animated.View>

        <View
          style={{
            width: '95%',
            height: Pixel(100),
            borderBottomColor: '#707070',
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            //marginTop: 20,
          }}>
            <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            height:'100%'
          }} >

          <Text
            style={{
              fontSize: Pixel(45),
              fontFamily: Fonts.black,
            }}>
            Refresh Supermarket
          </Text>
              </View>
          <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            height:'100%'
          }} >
            <DeliveryIcon/>
          <Text
            style={{
              fontSize: Pixel(30),
              fontFamily: Fonts.medium,
              paddingLeft:Pixel(15)
            }}>
            30 Min
          </Text>
          </View>
        </View>

        <View style={styles.searchInputContainer}>
          <Input
            options={{
              placeholder: t('What You Are Looking For ?'),
              placeholderTextColor: '#949494',
            }}
            contentContainerStyle={{
              borderRadius: 22,
              borderWidth: 0,
              padding: 0,
            }}
            rightContent={() => <SearchSubmitBtn />}
            iconRightStyle={{top: 5}}
          />
        </View>
        <AnimatedFlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: animatedValue}}}],
          {useNativeDriver: true} // <-- Add this
        )}
        scrollEventThrottle={16}
          data={categoryHomeData}
          numColumns={2}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <FavoriteItem {...item} key={index} index={index} />
          )}
        />
      </Animated.View>
    </Container>
  );
};

export default ShopDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  header: {
    height:heightHeader,
    zIndex:1,
    position:'relative',
    justifyContent:'flex-start'
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(250,250,250,0.7)',
    zIndex:1,
    position:'relative'
  },
  content: {
    flex: 4,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex:1000,
    position:'relative',
    marginTop:-50,
    paddingHorizontal:Pixel(30)
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
  searchInputContainer: {
    marginTop: Pixel(30),
    paddingBottom: Pixel(20),
    width: '100%',
    alignSelf: 'center',
  },
  submitSearchBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: Colors.appBackgroundColor,
  },
});
