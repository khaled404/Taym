import React, {FC} from 'react';
import {ImageBackground, StatusBar, StyleSheet, View,} from 'react-native';
import {Images, Pixel,} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import {AuthLogo, LogoIcon} from '../../../assets/Icons/Icons';

const AuthHeader: FC = () => {
    return (
        <View style={[styles.container]}>
            <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle="dark-content"
            />
            <ImageBackground
                source={Images.authHeader}
                style={[{width: '100%', height: '100%'}]}>

                <View style={styles.overlay}>
                    <AuthLogo />
                </View>
            </ImageBackground>
        </View>
    );
};

export default AuthHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        // paddingTop: ScreenOptions.StatusBarHeight,
        // height:
        //     Platform.OS === 'android'
        //         ? 56 + ScreenOptions.StatusBarHeight
        //         : 64 + ScreenOptions.StatusBarHeight,
        height: Pixel(380),
        // paddingHorizontal: 15,

        ...commonStyles.rowBox,
        zIndex: 200,
        borderBottomRightRadius: Pixel(100),
        borderBottomLeftRadius: Pixel(100),
        overflow: 'hidden',
        justifyContent: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems:'center',
        paddingBottom:Pixel(50)
    },
});
