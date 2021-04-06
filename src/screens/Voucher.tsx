import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import Header from '../components/header/Header';
import ApplyInput from '../components/Voucher/ApplyInput';
import Balance from '../components/Voucher/Balance';
import VoucherDetails from '../components/Voucher/VoucherDetails';
import {Colors} from '../constants/styleConstants';
import {commonStyles} from '../styles/styles';
import {useTranslation} from "react-i18next";


const Voucher: FC = () => {
    const {t} = useTranslation();
    const data = [
        {
            date: t('Today 03 January 2021'),
            code: t('Voucher 12457'),
            price: '400 LE',
            ex: t('Today 03 January 2021'),
            isExpired: false,
            note: t('With 10% From Total Purchases '),
        },
        {
            date: t('Today 03 January 2021'),
            code: t('Voucher 12457'),
            price: '400 LE',
            ex: t('Expired'),
            isExpired: true,
            note: null,
        },
        {
            date: t('Today 03 January 2021'),
            code: t('Voucher 12457'),
            price: '400 LE',
            ex: t('Today 03 January 2021'),
            isExpired: false,
            note: t('With 10% From Total Purchases '),
        },
    ];
    return (
        <Container style={{backgroundColor: Colors.sacandAppBackgroundColor}}>
            <Header title={t('Voucher')}/>
            <Content noPadding>
                <View style={styles.container}>
                    <Balance value="150 LE" date={t("Today 03 January 2021")}/>
                    <ApplyInput/>
                </View>
                <View style={styles.listContainer}>
                    {data.map((item, index) => (
                        <VoucherDetails
                            {...item}
                            key={index}
                            isLast={index === data.length - 1}
                        />
                    ))}
                </View>
            </Content>
        </Container>
    );
};

export default Voucher;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    listContainer: {
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        ...commonStyles.boxShadow,
    },
});
