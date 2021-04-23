import React, {FC, useRef, useEffect, useState, useMemo} from 'react';
import {I18nManager, Platform, StyleSheet, View} from 'react-native';
import {Container, Content} from '../../components/containers/Containers';
import Header from '../../components/header/Header';
import {Colors} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import MapView, {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useTranslation} from 'react-i18next';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Button from '../../components/touchables/Button';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {VerifyUserLocationHandler} from '../../store/actions/auth';
import GooglePlacesInput from '../../components/MyAddresses/GooglePlacesInput';
import {MAP_API_KEY} from '../../constants/Config';
import {RootState} from '../../store/store';
const {isRTL} = I18nManager;
const RegisterLocation: FC = () => {

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const _map = useRef(null);
  const _marker = useRef(null);
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = 0.0421;
  Geocoder.init(MAP_API_KEY, {language: isRTL ? 'ar' : 'en'});
  //local state handler
  const [state, setstate] = useState({
    loader: false,
    region: new AnimatedRegion({
      latitude: 31.0449837,
      longitude: 31.3655877,
      latitudeDelta: LATITUDE_DELTA / 2,
      longitudeDelta: LONGITUDE_DELTA / 2,
    }),
    currentLocation: {
      latitude: 0,
      longitude: 0,
    },
    newLocationObj: {},
    areaName: null,
  });

  useEffect(() => {
    //get current location
    Geolocation.getCurrentPosition(position => {
      console.log('getCurrentPosition info', position);
      setstate(old => ({
        ...old,
        currentLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      }));
      getLocationDetails(position.coords.latitude, position.coords.longitude);
    });

    return () => {
      console.log('clean');
    };
  }, []);

  const getLocationDetails = async (latitude: number, longitude: number) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        let addressComponent = json.results[0].address_components[0];
        console.log('result geocoder', json.results[0].address_components[0]);
        setstate(old => ({
          ...old,
          newLocationObj: {
            latitude,
            longitude,
            areaName: addressComponent,
          },
        }));
        console.log('addressComponent', addressComponent);
      })
      .catch(error => console.warn(error));
  };
  console.log('_marker', _marker);
  const animateMap = (element: any, n_region: any) => {
    setstate(old => ({...old, loader: true}));
    const DURATION: number = 500;
    if (Platform.OS === 'android') {
      if (_marker) {
        _marker.current.animateMarkerToCoordinate(n_region, 500);
        setstate(old => ({...old, loader: false}));
      }
    } else {
      element
        .timing({...n_region, duration: DURATION, useNativeDriver: false})
        .start();

      setstate(old => ({...old, loader: false}));
    }
    getLocationDetails(n_region.latitude, n_region.longitude);
  };

  const handleRegionChange = (n_region: any, areaName: string = '') => {
    console.log('n_region', n_region);
    console.log('areaName', areaName);
    animateMap(state.region, n_region);
    if (areaName !== '') {
      setstate(old => ({
        ...old,
        newLocationObj: {
          latitude: n_region.latitude,
          longitude: n_region.longitude,
          areaName: areaName,
        },
      }));
    }
  };

  //save location handler
  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    if (
      state.currentLocation !== null &&
      Object.keys(state.currentLocation).length > 0
    ) {
      dispatch(
        VerifyUserLocationHandler(
          state.currentLocation.latitude,
          state.currentLocation.longitude,
          success => {
            setstate(old => ({...old, loader: false}));
            if (success) {
              navigate('Home');
            }
          },
        ),
      );
    } else {
      setstate(old => ({...old, loader: false}));
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

  const renderMap = useMemo(
    () => (
      <MapView.Animated
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={state.region}
        onRegionChangeComplete={handleRegionChange}>
        <Marker.Animated ref={_marker} coordinate={state.region} />
      </MapView.Animated>
    ),
    [state.region],
  );
  return (
    <Container style={{backgroundColor: Colors.sacandAppBackgroundColor}}>
      <Header title={t('Current Location')} />
      <View style={[styles.autoCompleteContainer]}>
        <GooglePlacesInput onSelectResult={handleRegionChange} />
      </View>
      {renderMap}
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
  autoCompleteContainer: {
    width: '85%',
    position: 'absolute',
    top: 150,
    alignSelf: 'center',
    zIndex: 10,
    ...commonStyles.boxShadow,
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    // ...StyleSheet.absoluteFillObject,
  },
  submitBtnContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '85%',
    ...commonStyles.boxShadow,
  },
});

export default RegisterLocation;
