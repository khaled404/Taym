import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {commonStyles} from '../../styles/styles';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {AsyncKeys, getItem} from '../../constants/helpers';

let isRtl: string;
getItem(AsyncKeys.IS_RTL).then(isRtlValue => (isRtl = isRtlValue));

const LangSwitcher: FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const handleChangeLang = (rtl: boolean) => {};
  return (
    <View style={styles.settingsItemContainer}>
      <Text style={styles.settingsItemText}>{t('Language')}</Text>
      <View style={styles.langBtnsContainer}>
        <TouchableOpacity
          onPress={() => {
            handleChangeLang(false);
            setToggle(false);
          }}
          style={[
            styles.langBtn,
            {
              backgroundColor: isRtl ? 'white' : Colors.minColor,
            },
          ]}>
          <Text style={styles.langBtnText}>{t('English')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleChangeLang(true);
            setToggle(true);
          }}
          style={[
            styles.langBtn,
            {
              backgroundColor: !isRtl ? 'white' : Colors.minColor,
            },
          ]}>
          <Text style={styles.langBtnText}>{t('Arabic')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsItemContainer: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
    marginBottom: Pixel(45),
    alignItems: 'center',
  },
  settingsItemText: {
    fontFamily: Fonts.bold,
    color: Colors.dark,
    fontSize: Pixel(35),
  },
  langBtnsContainer: {
    ...commonStyles.rowBox,
    borderWidth: 1,
    borderColor: Colors.minColor,
    overflow: 'hidden',
    borderRadius: Pixel(20),
  },
  langBtn: {
    paddingVertical: Pixel(14),
    paddingHorizontal: Pixel(27),
    backgroundColor: 'transparent',
    borderRadius: Pixel(17),
    // borderRadius: Pixel(35),
  },
  langBtnText: {
    fontFamily: Fonts.regular,
    color: Colors.dark,
    fontSize: Pixel(23),
  },
});

export default LangSwitcher;
