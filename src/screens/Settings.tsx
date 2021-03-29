import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import Header from '../components/header/Header';
import {Colors} from '../constants/styleConstants';
import {commonStyles} from "../styles/styles";
import SettingsItem from "../components/Settings/SettingsItem";
import LangSwitcher from "../components/Settings/LangSwitcher";
import NotificationBtn from "../components/Settings/NotificationBtn";

const Settings: FC = () => {
    return (
        <Container style={{backgroundColor: Colors.sacandAppBackgroundColor}}>
            <Header title="Settings"/>
            <Content noPadding>
                <View style={styles.container}>
                    <SettingsItem title={'Addresses'} btnTitle={'Check Out  >'} btnAction={'MyAddresses'}/>
                    <SettingsItem title={'My Cards'} btnTitle={'Check Out  >'} btnAction={'MyCards'}/>
                    <LangSwitcher/>
                    <NotificationBtn/>
                </View>
            </Content>
        </Container>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    settingsItemContainer: {
        ...commonStyles.rowBox,
        justifyContent: 'space-between'
    },
});

export default Settings;
