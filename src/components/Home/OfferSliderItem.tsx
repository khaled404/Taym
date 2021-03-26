import React, {FC} from "react";
import {Dimensions, ImageBackground, StyleSheet, Text, View} from "react-native";
import {Colors, Fonts, Images, Pixel} from "../../constants/styleConstants";

export const SLIDER_WIDTH: number = Dimensions.get('window').width + 80;
export const ITEM_WIDTH: number = Math.round(SLIDER_WIDTH * 0.7);

interface IOfferSliderItem {
    item: { title: string, image: string },
    index: number
}

const OfferSliderItem: FC<IOfferSliderItem> = ({item, index}) => {
    return (
        <View style={styles.offerItem} key={index}>
            <ImageBackground source={Images.offerSlider} style={[styles.image, {width: '100%', height: '100%'}]}>
                <View style={styles.overlay}>
                    <Text style={styles.offerItemText}>{item.title}</Text>
                </View>
            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    offerItem: {
        width: ITEM_WIDTH,
        backgroundColor: Colors.colorSacand,
        borderRadius: 15,
        overflow: 'hidden',
        minHeight: Pixel(300),
    },
    offerItemText: {
        fontSize: Pixel(55),
        paddingHorizontal: 45,
        fontFamily: Fonts.bold,
        color: '#fff',
        paddingVertical: Pixel(40)
    },
    image: {
        flex: 1,
        width: ITEM_WIDTH,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1,
    }
});

export default OfferSliderItem;
