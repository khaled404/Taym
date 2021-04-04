import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import {CheckedIcon, DeleteIcon, InputEditIcon, UnCheckedIcon} from "../../../assets/Icons/Icons";
import {useTranslation} from "react-i18next";
import IconTouchableContainer from "../touchables/IconTouchableContainer";
import {useNavigation} from "@react-navigation/native";

interface IAddress {
    id: number;
    title: string;
    address: string;
    phone: string;
    onPress: () => void;
    selected: boolean,
    inCart?: boolean,
}

const Address: FC<IAddress> = ({
                                   id,
                                   title,
                                   address,
                                   phone,
                                   onPress,
                                   selected,
                                   inCart
                               }) => {
    const {t} = useTranslation();
    const {navigate} = useNavigation();

    const EditBtn = () => {
        return (
            <IconTouchableContainer
                style={{marginBottom: 5}}
                onPress={() => navigate('EditAddress')}>
                <InputEditIcon/>
            </IconTouchableContainer>
        );
    };


    const DeleteBtn = () => {
        return (
            <IconTouchableContainer
                style={{marginTop: 5}}
                onPress={() => {
                    console.log('Delete Address!')
                }}>
                <DeleteIcon/>
            </IconTouchableContainer>
        );
    };

    return (
        <TouchableOpacity style={[styles.container]} onPress={onPress}>
            <View style={styles.detailsContainer}>
                <View style={styles.checkBtn}>
                    {selected ? <CheckedIcon/> : <UnCheckedIcon/>}
                    <Text style={styles.addressTitle}>{title}</Text>
                </View>
                <View style={{paddingLeft: Pixel(60)}}>
                    <Text style={styles.address}>{address}</Text>
                    <Text style={styles.address}>{t('Mobile Number')} {phone}</Text>
                </View>
            </View>
            <View style={styles.actionsContainer}>
                {!inCart &&
                <>
                    <EditBtn/>
                    <DeleteBtn/>
                </>}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        // borderBottomColor: Colors.grayDark,
        // borderBottomWidth: Pixel(2),

        ...commonStyles.rowBox,
        ...commonStyles.boxShadow,
        marginBottom: Pixel(30),
        paddingHorizontal: Pixel(30),
        paddingLeft: Pixel(60),
        justifyContent: 'space-around',
        backgroundColor: Colors.white,
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
    actionsContainer: {
        justifyContent: "space-between",
    }

});

export default Address;
