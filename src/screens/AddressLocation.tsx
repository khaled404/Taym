import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import Header from '../components/header/Header';
import {Colors} from '../constants/styleConstants';
import {commonStyles} from '../styles/styles';
import MapView from 'react-native-maps';
import {useTranslation} from "react-i18next";

const data = [
    {
        date: 'Today 03 January 2021',
        code: 'Voucher 12457',
        price: '400 LE',
        ex: 'EX. 11 Ferbruary 2021',
        isExpired: false,
        note: 'With 10% From Total Purchases ',
    },
    {
        date: 'Today 03 January 2021',
        code: 'Voucher 12457',
        price: '400 LE',
        ex: 'Expired',
        isExpired: true,
        note: null,
    },
    {
        date: 'Today 03 January 2021',
        code: 'Voucher 12457',
        price: '400 LE',
        ex: 'EX. 11 Ferbruary 2021',
        isExpired: false,
        note: 'With 10% From Total Purchases ',
    },
];


const AddressLocation: FC = () => {
    const {t} = useTranslation();
    return (
        <Container style={{backgroundColor: Colors.sacandAppBackgroundColor}}>
            <Header title={t('Current Location')}/>
            <Content noPadding>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </Content>
        </Container>
    );
};


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
    map: {
        flex:1,
        ...StyleSheet.absoluteFillObject,
    },
});

export default AddressLocation;
