import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View, TextInputProps} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {RootState} from '../../store/store';
import {commonStyles} from '../../styles/styles';
import Touchable from '../touchables/Touchable';

interface IApplyInput {
  onPress?: () => void;
  options?: TextInputProps & {ref?: (ref: any) => void};
}

const ApplyInput: FC<IApplyInput> = ({onPress, options}) => {
  const {language}: any = useSelector((state: RootState) => state.settings);
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            {textAlign: language === 'ar' ? 'right' : 'left'},
          ]}
          placeholder={t('Add Voucher')}
          {...options}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Touchable onPress={onPress}>
          <View style={styles.buttonContent}>
            <Text style={styles.title}>{t('Apply')}</Text>
          </View>
        </Touchable>
      </View>
    </View>
  );
};

export default ApplyInput;

const styles = StyleSheet.create({
  container: {
    padding: Pixel(10),
    backgroundColor: Colors.white,
    ...commonStyles.boxShadow,
    ...commonStyles.rowBox,
    marginTop: Pixel(70),
    borderRadius: 20,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: Pixel(20),
  },
  buttonContainer: {
    flex: 0.5,
    height: Pixel(100),
    borderRadius: 15,
    backgroundColor: Colors.minColor,
    overflow: 'hidden',
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
  textInput: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(25),
  },
});
