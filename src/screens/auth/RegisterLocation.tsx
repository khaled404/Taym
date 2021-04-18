import React, { FC, useRef, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content } from '../../components/containers/Containers';
import Header from '../../components/header/Header';
import { Colors } from '../../constants/styleConstants';
import { commonStyles } from '../../styles/styles';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import Geolocation from '@react-native-community/geolocation';
import Button from '../../components/touchables/Button';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { VerifyUserLocationHandler } from '../../store/actions/auth';
import GooglePlacesInput from '../../components/MyAddresses/GooglePlacesInput';

const RegisterLocation: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const _map = useRef(null);

  //local state handler
  const [state, setstate] = useState({
    loader: false,
    region: {
      latitude: 31.0449837,
      longitude: 31.3655877,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    currentLocation: {
      latitude: 0,
      longitude: 0,
    },
  });

  useEffect(() => {
    //get current location
    Geolocation.getCurrentPosition(info => {
      console.log('getCurrentPosition info', info);

      //save current location local state 
      setstate(old => ({
        ...old, currentLocation: {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        }
      }))
    });
    return () => {
      console.log('clean');
    }
  }, []);

  //save location handler
  const submitHandler = () => {
    setstate(old => ({ ...old, loader: true }));
    if (state.currentLocation !== null && Object.keys(state.currentLocation).length > 0) {
      dispatch(
        VerifyUserLocationHandler(state.currentLocation.latitude, state.currentLocation.longitude, success => {
          setstate(old => ({ ...old, loader: false }));
          if (success) {
            navigate('Home');
          }
        }),
      );
    } else {
      setstate(old => ({ ...old, loader: false }));
      showMessage({
        message: t("Couldn't save your location please try agian!"),
      });
    }
  };
  // useEffect(() => {
  //   if (_map.current) {
  //     _map.current.animateCamera(
  //       {
  //         center: {
  //           latitude: 50.1109221,
  //           longitude: 8.6821267
  //         },
  //         zoom: 15
  //       },
  //       5000
  //     );
  //   }
  // }, []);
  const handleRegionChange = (region: any) => {
    setstate(old => ({ ...old, region: region }));
  }
  return (
    <Container style={{ backgroundColor: Colors.sacandAppBackgroundColor }}>
      <Header title={t('Current Location')} />
      <View style={[{
        width: '85%',
        position: 'absolute',
        top: 150,
        alignSelf: 'center', zIndex: 10, ...commonStyles.boxShadow,

      }]}>
        <GooglePlacesInput />
      </View>
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={state.region}
        onRegionChangeComplete={handleRegionChange}
      >
        <Marker coordinate={{ latitude: state.region.latitude, longitude: state.region.longitude }} />
      </MapView>
      <View style={styles.submitBtnContainer}>
        <Button
          title={t('Save Location')}
          onPress={submitHandler}
          loader={state.loader}
        />
      </View>
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
    left: 0, right: 0, top: 0, bottom: 0, position: 'absolute'
    // ...StyleSheet.absoluteFillObject,
  },
  submitBtnContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '85%',
    ...commonStyles.boxShadow
  }
});

export default RegisterLocation;
