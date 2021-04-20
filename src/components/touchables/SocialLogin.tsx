import React, { FC, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FacebookIcon, GoogleIcon } from '../../../assets/Icons/Icons';
import { Fonts, Pixel } from '../../constants/styleConstants';
import { commonStyles } from '../../styles/styles';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  AccessToken,
  LoginManager,
  GraphRequestManager,
  GraphRequest,
  Settings,
} from 'react-native-fbsdk-next';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SocialLoginHandler } from '../../store/actions/auth';

interface ISocialLogin {
  title: string;
}
const SocialLogin: FC<ISocialLogin> = ({ title }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  useEffect(() => {
    Settings.initializeSDK();

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '226921527475-o64c9cief53ebakhnkcdl45nmi90tlot.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  }, []);
  const LoginWihGoogleHandler = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      dispatch(
        SocialLoginHandler(
          userInfo.user.id,
          userInfo.user.name as any,
          userInfo.user.email,
          'google',
          () => {
            navigate('Home');
          },
        ),
      );
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const responseInfoCallback = (error: any, result: any) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      dispatch(
        SocialLoginHandler(
          result.id,
          result.name,
          result.email,
          'facebook',
          () => {
            navigate('RegisterLocation');
          },
        ),
      );
    }
  };
  const infoRequest = new GraphRequest(
    '/me',
    {
      httpMethod: 'GET',
      version: 'v2.5',
      parameters: {
        fields: {
          string: 'email,name',
        },
      },
    },
    responseInfoCallback,
  );
  const LoginWihFacebookHandler = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (result: {
        isCancelled: any;
        grantedPermissions: { toString: () => string };
      }) => {
        console.log(result);
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
            result.grantedPermissions.toString(),
          );

          AccessToken.getCurrentAccessToken().then(() => {
            // let token = data.accessToken.toString();
            // let userId = data.userID.toString();
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error: string) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  return (
    <>
      {!!title && <Text style={styles.socialLoginLabel}>{title}</Text>}
      <View style={styles.socialLoginButtons}>
        <TouchableOpacity
          style={styles.socialLoginBtn}
          onPress={LoginWihGoogleHandler}>
          <GoogleIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialLoginBtn}
          onPress={LoginWihFacebookHandler}>
          <FacebookIcon />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({
  socialLoginLabel: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(33),
    textAlign: 'center',
  },
  socialLoginButtons: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  socialLoginBtn: {
    width: '48%',
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Pixel(25),
    borderRadius: Pixel(70),
  },
});
