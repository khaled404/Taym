import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {NotificationItemIcon} from '../../../assets/Icons/Icons';
import {commonStyles} from '../../styles/styles';

interface INotificationItem {
  id: number;
  key: string;
  title: string;
  content: string;
  isLast: boolean;
  slideOpen: boolean;
  seen: boolean;
}

const NotificationItem: FC<INotificationItem> = ({
  id,
  seen,
  slideOpen,
  key,
  title,
  content,
  isLast,
}) => {
  // console.log('slideOpenslideOpen', slideOpen)
  return (
    <>
      <View
        key={id}
        style={[
          styles.container,
          isLast && {borderBottomColor: 'transparent'},
          slideOpen && {
            backgroundColor: '#fff',
            ...commonStyles.boxShadow,
            // marginBottom: 2,
          },
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!seen && <NotificationItemIcon />}
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.content}>{content}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: Colors.sacandAppBackgroundColor,
    paddingHorizontal: 25,
    borderBottomColor: Colors.grayDark,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(30),
    marginBottom: 7,
    color: Colors.dark,
    paddingRight: 6,
    marginLeft: 6,
  },
  content: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(27),
    color: '#4D4D4D',
    paddingRight: 11,
    paddingLeft: 13,
    textAlign: 'left',
    // marginBottom: 10
  },
});

export default NotificationItem;
