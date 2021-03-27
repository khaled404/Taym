import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {EyeIcon, FacebookIcon, GoogleIcon} from "../../assets/Icons/Icons";
import Input from "../components/textInputs/Input";
import IconTouchableContainer from "../components/touchables/IconTouchableContainer";
import AuthHeader from "../components/header/AuthHeader";
import {useNavigation} from "@react-navigation/native";
import Touchable from "../components/touchables/Touchable";
import {commonStyles} from "../styles/styles";


const Register: FC = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const PasswordIcon = () => {
        return (
            <IconTouchableContainer onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <EyeIcon/>
            </IconTouchableContainer>
        )
    }


    const {t} = useTranslation();
    const {navigate} = useNavigation();
    return (
        <Container style={styles.container}>
            <AuthHeader/>
            <Content noPadding style={styles.contentContainer}>
                <Text style={styles.mainTitle}>Register</Text>
                <View style={styles.inputsContainer}>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <Input
                            textInputContainer={styles.textInput}
                            contentContainerStyle={styles.contentContainerStyle}
                            options={{
                                onChangeText: (value) => {
                                    setUsername(value)
                                },
                                value: username,
                            }}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email Address</Text>
                        <Input
                            textInputContainer={styles.textInput}
                            contentContainerStyle={styles.contentContainerStyle}
                            options={{
                                onChangeText: (value) => {
                                    setEmail(value)
                                },
                                value: email,
                                keyboardType: 'email-address',
                            }}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <Input
                            textInputContainer={styles.textInput}
                            contentContainerStyle={styles.contentContainerStyle}
                            rightContent={PasswordIcon}
                            options={{
                                onChangeText: (value) => {
                                    setPassword(value)
                                },
                                value: password,
                                secureTextEntry: secureTextEntry,
                            }}
                        />
                    </View>

                    <View style={styles.submitContainer}>
                        <Touchable>
                            <View style={styles.buttonContent}>
                                <Text style={styles.submitTitle}>{t('Register')}</Text>
                            </View>
                        </Touchable>
                    </View>

                    <View style={styles.socialLoginContainer}>
                        <Text style={styles.socialLoginLabel}>Or Register With</Text>
                        <View style={styles.socialLoginButtons}>
                            <TouchableOpacity style={styles.socialLoginBtn}>
                                <GoogleIcon/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialLoginBtn}>
                                <FacebookIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{flexDirection: 'row', justifyContent: 'center', marginLeft: 3, marginTop: Pixel(60)}}
                        onPress={() => navigate('Login')}>
                        <Text style={{
                            color: Colors.dark,
                            fontFamily: Fonts.medium,
                            fontSize: Pixel(30)
                        }}>{`Already Registered?`}</Text>
                        <Text style={{
                            color: Colors.colorSacand,
                            fontFamily: Fonts.medium,
                            fontSize: Pixel(30),
                            marginLeft: 10
                        }}>{`Log In`}</Text>
                    </TouchableOpacity>

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
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.sacandAppBackgroundColor,
        flex: 1,
    },
    mainTitle: {
        color: Colors.dark,
        fontFamily: Fonts.bold,
        fontSize: Pixel(60),
        marginVertical: Pixel(25)
    },
    submitContainer: {
        height: Pixel(100),
        borderRadius: 30,
        backgroundColor: Colors.minColor,
        overflow: 'hidden',
        marginVertical: Pixel(80)
    },
    buttonContent: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    submitTitle: {
        fontFamily: Fonts.bold,
        fontSize: Pixel(40),
    },
    socialLoginLabel: {
        fontFamily: Fonts.bold,
        fontSize: Pixel(33),
        textAlign: 'center'
    },
    socialLoginButtons: {
        ...commonStyles.rowBox,
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 15
    },
    socialLoginBtn: {
        width: '48%',
        backgroundColor: '#E1E1E1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Pixel(25),
        borderRadius: Pixel(70),
    },
    inputsContainer: {
        paddingHorizontal: Pixel(20),
        paddingVertical: Pixel(10),
        paddingBottom: 40
    },
    inputContainer: {
        marginVertical: 7
    },
    inputLabel: {
        color: Colors.dark,
        fontFamily: Fonts.medium,
        marginBottom: Pixel(17)
    },
    textInput: {
        height: Pixel(100),
        padding: 0,
        fontFamily: Fonts.bold,
        fontSize: Pixel(33),
        color: '#070707'
    },
    contentContainerStyle: {
        borderRadius: 14,
        borderWidth: 0,
        padding: 0,
        paddingHorizontal: 15
    }
});

export default Register;
