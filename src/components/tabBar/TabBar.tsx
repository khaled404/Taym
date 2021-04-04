import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {Fonts, Pixel} from "../../constants/styleConstants";
import {CurrentTabIcon, StatusOrderIcon} from "../../../assets/Icons/Icons";

const TabBar: FC = ({state, descriptors, navigation, position}) => {
    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;
                let DoneTabBarIcon = (state.index < index && !isFocused) ? <></> : <StatusOrderIcon/>;
                let TabBarIcon = isFocused ? <CurrentTabIcon/> : DoneTabBarIcon;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={{flexDirection: "row", alignItems: 'center'}}
                    >
                        {TabBarIcon}
                        <Text style={[styles.labelStyle, {color: isFocused ? '#622A7B' : '#989898'}]}>{label}</Text>
                    </TouchableOpacity>
                );
            })}
            {/*<TouchableOpacity*/}
            {/*    accessibilityRole="button"*/}
            {/*    onPress={() => navigation.navigate('CartCheckout')}*/}
            {/*    style={{flexDirection: "row", alignItems: 'center'}}*/}
            {/*>*/}
            {/*    <Text style={[styles.labelStyle,{color:'#989898'}]}>{'Checkout'}</Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
    );
}

export default TabBar;

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        minHeight: Pixel(100),
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: "space-between",
    },
    labelStyle: {
        fontSize: Pixel(33),
        fontFamily: Fonts.bold,
        textTransform: 'capitalize',
        textAlign: 'center',
        marginLeft: 6
    },
    indicatorStyle: {
        backgroundColor: '#F2F2F2'
    },
});

