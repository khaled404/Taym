import React, {FC, useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {commonStyles} from "../../styles/styles";
import {Colors, Fonts, Pixel} from "../../constants/styleConstants";
import {useTranslation} from "react-i18next";


const NotificationBtn: FC = () => {
    const {t} = useTranslation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.settingsItemContainer}>
            <Text style={styles.settingsItemText}>{t('Notification')}</Text>
            <Switch
                trackColor={{false: "#767577", true: Colors.minColor}}
                thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                ios_backgroundColor={Colors.minColor}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    settingsItemContainer: {
        ...commonStyles.rowBox,
        justifyContent: 'space-between',
        marginBottom: Pixel(45),
        alignItems: 'center',
    },
    settingsItemText: {
        fontFamily: Fonts.bold,
        color: Colors.dark,
        fontSize: Pixel(35),
    },
    settingsItemBtn: {
        paddingVertical: Pixel(17),
        paddingHorizontal: Pixel(28),
        backgroundColor: Colors.minColor,
        borderRadius: Pixel(35),
        ...commonStyles.boxShadow
    },
    settingsBtnText: {
        fontFamily: Fonts.regular,
        color: Colors.dark,
        fontSize: Pixel(23),
    },

});

export default NotificationBtn;
