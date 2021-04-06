import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Container} from '../../components/containers/Containers';
import {Colors, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Header from "../../components/header/Header";
import CartTabs from "../../navigation/CartTabs";

const Cart: FC = () => {
    const {t} = useTranslation();
    return (
        <Container style={styles.container}>
            <Header title={t('Shopping Cart')}/>
            <CartTabs/>
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
        paddingBottom: Pixel(50)
    },
    orderItemsList: {
        marginVertical: 5,
        paddingVertical: 5
    },
});

export default Cart;
