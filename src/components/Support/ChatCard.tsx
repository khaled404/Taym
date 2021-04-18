import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Pixel, Fonts } from '../../constants/styleConstants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../../styles/styles';

const ChatCard: FC = () => {
  const { t } = useTranslation();


  const dispatch = useDispatch();
  const { isRTL }: any = useSelector((state: RootState) => state.settings);
  const { navigate } = useNavigation();
  return (

    <View style={styles.cardContainer} >
      <View style={styles.arrow} >

      </View>
      <Text style={{ fontFamily: Fonts.medium }} >
        Banana Item Is unfortunately Out Of Stock And We Suggest You Another Items Please Check It
          </Text>
      <View style={styles.timeContainer} >

        <Text>07:00</Text>
      </View>
    </View>


  );
};

export default ChatCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: Pixel(20),
    backgroundColor: Colors.minColor,
    ...commonStyles.boxShadow,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Pixel(40)
  },
  arrow: {
    position: 'absolute',
    left: Pixel(-20),
    top: 15,
    height: Pixel(40),
    width: Pixel(40),
    backgroundColor: Colors.minColor,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.minColor,
    transform: [{ rotate: '45deg' }]
  },
  timeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: Pixel(50),
    width: Pixel(150),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
