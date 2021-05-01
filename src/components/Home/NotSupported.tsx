import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {WarningIcon} from '../../../assets/Icons/Icons';
import Button from '../touchables/Button';

const NotSupported: FC = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.offerItem}>
      <WarningIcon />
      <Text style={styles.sectionTitle}>{t('Attention')}</Text>
      <Text style={styles.content}>
        {t("we didn't support your current location for now")}
      </Text>
      <Button
        title={t('Select Location')}
        style={styles.selectLocationBtn}
        styleTitle={styles.selectLocationBtnText}
        onPress={() => {}}
        // loader={state.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  offerItem: {
    width: '100%',
    backgroundColor: Colors.minColor,
    borderRadius: 15,
    overflow: 'hidden',
    minHeight: Pixel(330),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: Pixel(48),
    fontFamily: Fonts.bold,
    color: Colors.colorSacand,
    textAlign: 'center',
    marginTop: 12,
  },
  content: {
    fontSize: Pixel(30),
    fontFamily: Fonts.regular,
    color: '#070707',
    textAlign: 'center',
    marginTop: 7,
  },
  selectLocationBtn: {
    backgroundColor: Colors.colorSacand,
    width: '44%',
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  selectLocationBtnText: {
    fontSize: Pixel(26),
    fontFamily: Fonts.bold,
    color: Colors.minColor,
    // textAlign: 'center',
  },
});

export default NotSupported;
