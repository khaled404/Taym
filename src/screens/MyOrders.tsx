import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import {Colors, Pixel} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Header from "../components/header/Header";
import OrderListItem from "../components/MyOrders/OrderListItem";

const data = [
    {
        orderId: 'Order #5478',
        footerBtnTitle: 'See Details',
        price: '150 LE',
        date: 'Today 03 January 2021',
        time: '02:30 PM',
        details: 'KitKat Ruby Cocoa Beans 120ml (5) , Banana 1kg',
        status: 'Out For Delivery',
        store: 'Fresh Market',
        note: 'Order Will Delivered Within 30 Min',
    },
    {
        orderId: 'Order #5478',
        footerBtnTitle: 'Track Your Order',
        price: '140 LE',
        date: 'Today 03 January 2021',
        time: '02:30 PM',
        details: 'KitKat Ruby Cocoa Beans 120ml (5) , Banana 1kg , Water\n' +
            'Bottle Small (1)',
        status: 'Processing Order',
        store: 'Grocery Market',
        note: 'Order Will Delivered Within 30 Min',
    },
    {
        orderId: 'Order #5478',
        footerBtnTitle: 'See Details',
        price: '120 LE',
        date: 'Today 03 January 2021',
        time: '02:30 PM',
        details: 'KitKat Ruby Cocoa Beans 120ml (5) , Banana 1kg , Water\n' +
            'Bottle Small (1)',
        status: 'Received',
        store: 'Fresh Market',
        note: '',
    },
];

const MyOrders: FC = () => {
    const {t} = useTranslation();
    return (
        <Container style={styles.container}>
            <Header title={t("My Orders")}/>
            <Content noPadding style={{paddingVertical: Pixel(20)}}>
                <View style={styles.listContainer}>
                    {data.map((item, index) => (
                        <OrderListItem
                            {...item}
                            key={index}
                        />
                    ))}
                </View>
            </Content>
        </Container>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.sacandAppBackgroundColor,
        flex: 1,
    },
    listContainer: {
        flex: 1,
        backgroundColor: Colors.sacandAppBackgroundColor,
        paddingVertical: 10,
        paddingBottom:Pixel(50)
    },
});

export default MyOrders;
