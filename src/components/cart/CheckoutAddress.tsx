import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';

interface ICheckoutAddress {
    contentContainerStyle?: StyleProp<ViewStyle>;
    username?: string;
    address?: string;
    phone?: string;
}

const CheckoutAddress: FC<ICheckoutAddress> = (
    {
        contentContainerStyle,
        username,
        address,
        phone
    }) => {
    const {t} = useTranslation();
    return (
        <View style={[styles.container, contentContainerStyle]}>
            <Text style={styles.username}>{username}</Text>
            <View style={{paddingLeft: Pixel(60)}}>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.mobile}>{t('Mobile Number')} {phone}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: Pixel(10),
        paddingVertical: Pixel(30),
        backgroundColor: Colors.white,
        ...commonStyles.boxShadow,
        marginTop: Pixel(45),
        marginBottom: Pixel(45),
        alignItems: "center",
    },
    username: {
        fontFamily: Fonts.bold,
        fontSize: Pixel(33),
        marginBottom: Pixel(15),
    },
    addressTitle: {
        fontFamily: Fonts.bold,
        fontSize: Pixel(33),
        marginLeft: Pixel(25),
    },
    address: {
        fontFamily: Fonts.medium,
        fontSize: Pixel(25),
        color: '#4D4D4D',
        marginBottom: Pixel(5),
    },
    mobile: {
        fontFamily: Fonts.medium,
        fontSize: Pixel(25),
        color: '#4D4D4D',
        marginTop: Pixel(5),
        textAlign: "center"
    }
});

export default CheckoutAddress;
