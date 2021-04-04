import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors, Fonts, Images, Pixel} from "../../constants/styleConstants";
import {commonStyles} from "../../styles/styles";
import FastImage from "react-native-fast-image";
import {DeliveryIcon} from "../../../assets/Icons/Icons";

interface ICategoryStoreItem {
    index: number;
    id: string;
    title: string;
    image: string;
    isLast: Boolean;
}

const CategoryStoreItem: FC<ICategoryStoreItem> = ({index, id, title, image, isLast}) => {
    const {t} = useTranslation();
    return (
        <TouchableOpacity style={[styles.categoryStoreItem, {borderBottomWidth: isLast ? 0 : 1}]}>
            <View
                style={[
                    styles.imageContainer,
                    {height: Pixel(215), width: '100%'}
                ]}>
                <FastImage
                    source={Images.offerSlider}
                    style={commonStyles.image}
                    resizeMode="cover"
                />
                <View style={styles.storeLogoContainer}>
                    <FastImage
                        source={Images.storelogo1}
                        style={commonStyles.image}
                        resizeMode="contain"
                    />
                </View>
            </View>
            <View style={styles.storeDetail}>
                <Text style={styles.storeTitle}>{title}</Text>
                <View style={styles.storeDeliveryDetails}>
                    <DeliveryIcon/>
                    <Text style={styles.storeDeliveryPeriod}>{'30 Min'}</Text>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    categoryStoreItem: {
        borderBottomWidth: 1,
        borderColor: '#707070',
        width: '100%',
        marginBottom: Pixel(35),
        paddingBottom: 15
    },
    imageContainer: {
        borderRadius: 13,
        overflow: 'hidden',
        ...commonStyles.boxShadow,
        // height: Pixel(75),
        // width: Pixel(140),
        marginBottom: Pixel(5),
        position: "relative",
    },
    storeDetail: {
        width: '100%',
        ...commonStyles.rowBox,
        marginTop: Pixel(20),
        justifyContent: 'space-between'
    },
    storeTitle: {
        fontFamily: Fonts.black,
        fontSize: Pixel(35),
        color: Colors.dark,
    },
    storeDeliveryPeriod: {
        fontFamily: Fonts.medium,
        fontSize: Pixel(30),
        color: Colors.dark,
        marginLeft: Pixel(15),
    },
    storeDeliveryDetails: {
        ...commonStyles.rowBox,
    },
    storeLogoContainer: {
        height: Pixel(215),
        width: Pixel(215),
        padding: Pixel(25),
        borderRadius: 13,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.minColor,
        ...commonStyles.boxShadow,
        position: "absolute",
        zIndex: 100,
        left: 0
    }
});

export default CategoryStoreItem;
