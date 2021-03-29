import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import Header from '../components/header/Header';
import {Colors, Pixel} from '../constants/styleConstants';
import Address from "../components/MyAddresses/Address";
import Button from "../components/touchables/Button";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";
import {commonStyles} from "../styles/styles";

const data = [
    {
        id: 1,
        title: 'Home',
        address: 'Miami st.12 - Building 20 , Alexandria , Egypt',
        phone: '01212312345',
    },
    {
        id: 2,
        title: 'Office',
        address: 'Miami st.12 - Building 20 , Alexandria , Egypt',
        phone: '01212312345',
    },
    {
        id: 3,
        title: 'Club',
        address: 'Miami st.12 - Building 20 , Alexandria , Egypt',
        phone: '01212312345',
    },
];


const MyAddresses: FC = () => {
    const [selectedId, setSelectedId] = useState(null);
    const {t} = useTranslation();
    const {navigate} = useNavigation();
    return (
        <Container style={{backgroundColor: Colors.sacandAppBackgroundColor,}}>
            <Header title="My Addresses"/>
            <Content noPadding>
                <View style={styles.listContainer}>
                    {data.map((item, index) => (
                        <Address
                            {...item}
                            onPress={() => setSelectedId(item.id)}
                            selected={selectedId === item.id}
                            key={index}
                        />
                    ))}
                </View>
                <View style={styles.submitContainer}>
                    <Button
                        style={{borderRadius: 10, ...commonStyles.boxShadow}}
                        styleTitle={{fontSize:Pixel(30)}}
                        title={t('Add A New One +')}
                        onPress={() => navigate('AddAddress')}
                    />
                </View>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 35,
        backgroundColor: Colors.sacandAppBackgroundColor
    },
    listContainer: {
        paddingVertical: 20,
    },
    submitContainer: {
        marginVertical: Pixel(40),
        paddingHorizontal: 20
    },
});

export default MyAddresses;
