import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Pixel } from '../../constants/styleConstants';
import { commonStyles } from '../../styles/styles';
import { CartOrderIcon, StatusOrderIcon } from "../../../assets/Icons/Icons";
import { useNavigation } from "@react-navigation/native";

interface IOrderListItem {
    orderId: string;
    footerBtnTitle: string;
    price: string;
    date: string;
    time: string;
    details: string;
    status: string;
    store: string;
    note: string | null;
    source?: string
}

const OrderListItem: FC<IOrderListItem> = ({
    orderId,
    note,
    price,
    date,
    time,
    details,
    status,
    store,
    footerBtnTitle,
    source
}) => {
    const { navigate } = useNavigation();
    return (
        <View
            style={[styles.container]}>
            <View style={styles.box}>
                <Text style={styles.orderId}>{orderId}</Text>
                <Text style={styles.price}>{price}</Text>
            </View>
            <Text style={styles.orderDate}>{date} {time}</Text>
            <View style={[styles.box, styles.orderDetailsBox]}>
                <CartOrderIcon />
                <Text style={styles.orderDetails}>{details}
                    <TouchableOpacity style={styles.moreBtn}
                        onPress={() => navigate('OrderDetails', { orderId: orderId })}>
                        <Text style={styles.moreBtnText}>{'More Details ...'}</Text>
                    </TouchableOpacity>
                </Text>
            </View>
            {
                source != 'tracking' ?
                    <View style={styles.box}>
                        <View style={{ ...commonStyles.rowBox }}>
                            <StatusOrderIcon />
                            <Text style={styles.orderStatus}>{status}</Text>
                        </View>
                        <Text style={styles.orderStore}>
                            {store}
                        </Text>
                    </View>
                    :
                    null
            }

            {
                source != 'tracking' ?
                    <View style={[styles.box, styles.orderDetailsFooter, {
                        justifyContent: !note ? 'flex-end' : 'space-between'
                    }]}>
                        {!!note && <Text style={styles.orderNote}>{note}</Text>}
                        <TouchableOpacity style={{}} onPress={() => navigate('OrderDetails', { orderId: orderId })}>
                            <Text style={styles.trackBtnText}>
                                {footerBtnTitle}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
            }
        </View>
    );
};

export default OrderListItem;

const styles = StyleSheet.create({
    container: {
        borderBottomColor: Colors.grayDark,
        borderBottomWidth: Pixel(2),
        paddingTop: Pixel(30),
        backgroundColor: '#fff',
        ...commonStyles.boxShadow,
        marginBottom: Pixel(40),
        paddingHorizontal: Pixel(40),
    },
    box: {
        marginBottom: Pixel(10),
        ...commonStyles.rowBox,
        justifyContent: 'space-between',
    },
    orderId: {
        fontFamily: Fonts.bold,
        fontSize: Pixel(25),
    },
    orderDate: {
        fontFamily: Fonts.bold,
        fontSize: Pixel(35),
    },
    price: {
        fontFamily: Fonts.bold,
        fontSize: Pixel(30),
        color: Colors.colorSacand,
    },
    orderStore: {
        fontFamily: Fonts.bold,
        fontSize: Pixel(30),
        color: Colors.colorSacand,
    },
    orderStatus: {
        fontFamily: Fonts.bold,
        fontSize: Pixel(32),
        color: Colors.colorSacand,
        marginLeft: Pixel(10),
    },
    moreBtn: {},
    moreBtnText: {
        fontFamily: Fonts.bold,
        fontSize: Pixel(30),
        color: Colors.colorSacand,
    },
    orderDetailsBox: {
        paddingVertical: 5,
        marginTop: 6,
        paddingRight: 10,
    },
    orderDetails: {
        fontFamily: Fonts.medium,
        color: '#4D4D4D',
        fontSize: Pixel(26),
        marginLeft: 7,
    },
    orderDetailsFooter: {
        borderTopWidth: 1,
        borderTopColor: '#DCDCDC',
        paddingVertical: 13,
        marginTop: 12,
        width: '100%',

        // backgroundColor:'#f1f1f1'
    },
    orderNote: {
        color: '#4D4D4D',
        fontFamily: Fonts.bold,
        fontSize: Pixel(28),
    },
    trackBtnText: {
        color: '#FF5023',
        fontFamily: Fonts.bold,
        fontSize: Pixel(28),
    },
});
