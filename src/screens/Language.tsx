import React, {FC} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors, Images, Pixel} from '../constants/styleConstants';
import {commonStyles} from '../styles/styles';
import Button from "../components/touchables/Button";
import {toggleLangSwitcher} from "../store/actions/settings";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

const {width, height} = Dimensions.get('window');
const Language: FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const handleChangeLang = (rtl: boolean) => {
        dispatch(toggleLangSwitcher(rtl));
    }
    return (
        <View
            style={{
                flex: 1,
                width,
                height,
                backgroundColor: Colors.minColor,
                // alignItems: 'center',
                justifyContent: 'center',
            }}>
            <View style={{width: 200, height: 200, alignSelf: 'center'}}>
                <FastImage
                    source={Images.splash}
                    style={commonStyles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.langBtnsContainer}>
                <Button style={styles.langBtn} title={t('English')} onPress={() => handleChangeLang(false)}/>
                <Button style={styles.langBtn} title={t('Arabic')} onPress={() => handleChangeLang(true)}/>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    langBtnsContainer: {
        paddingHorizontal: 35
    },
    langBtn: {
        height: Pixel(120),
        backgroundColor: Colors.sacandAppBackgroundColor,
        ...commonStyles.boxShadow,
        marginBottom: 20,
    }
});
export default Language;
