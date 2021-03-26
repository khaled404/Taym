import React, {FC} from 'react';
import {Dimensions, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors, Images} from '../constants/styleConstants';
import {commonStyles} from '../styles/styles';
const {width, height} = Dimensions.get('window');
const Splash: FC = () => {
  return (
    <View
      style={{
        flex: 1,
        width,
        height,
        backgroundColor: Colors.minColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{width: 200, height: 200}}>
        <FastImage
          source={Images.splash}
          style={commonStyles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default Splash;
