import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import {CheckedIcon, UnCheckedIcon} from "../../../assets/Icons/Icons";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";

interface IPaymentOption {
    id: number;
    title: string;
    onPress: () => void;
    selected: boolean,
    price: number;
}

const PaymentOption: FC<IPaymentOption> = ({
                                               id,
                                               title,
                                               onPress,
                                               selected,
                                               price
                                           }) => {
    const {t} = useTranslation();
    const {navigate} = useNavigation();

    return (
        <TouchableOpacity style={[styles.container]} onPress={onPress}>
            <View style={styles.optionTitleContainer}>
                <Text style={styles.optionTitle}>{title}</Text>
                {selected && <Text style={styles.optionPrice}>{`${price} LE`}</Text>}
            </View>
            <View style={styles.checkBtn}>
                {selected ? <CheckedIcon/> : <UnCheckedIcon/>}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        ...commonStyles.rowBox,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: Pixel(60),
        paddingLeft: Pixel(40),
        marginBottom: Pixel(30),
    },
    detailsContainer: {
        paddingVertical: Pixel(37),
    },
    checkBtn: {
        ...commonStyles.rowBox,
        marginBottom: Pixel(10)
    },
    box: {
        marginBottom: Pixel(20),
        ...commonStyles.rowBox,
        justifyContent: 'space-between',

    },
    optionTitleContainer: {
        ...commonStyles.rowBox,
        alignItems: 'center',
    },
    optionPriceContainer: {},
    optionPrice: {
        fontFamily: Fonts.bold,
        fontSize: Pixel(33),
        color: Colors.colorSacand,
        marginLeft: Pixel(70),
    },
    optionTitle: {
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
    actionsContainer: {
        justifyContent: "space-between",
    }

});

export default PaymentOption;
