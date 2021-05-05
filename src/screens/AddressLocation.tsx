import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {I18nManager, Platform, StyleSheet, View} from 'react-native';
import {Container} from '../components/containers/Containers';
import Header from '../components/header/Header';
import {Colors} from '../constants/styleConstants';
import {commonStyles} from '../styles/styles';
import MapView, {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {useTranslation} from 'react-i18next';
import Geocoder from 'react-native-geocoding';
import GooglePlacesInput from '../components/MyAddresses/GooglePlacesInput';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/touchables/Button';
import {saveNewAddress} from '../store/actions/address';
import {RootState} from '../store/store';
import {saveCurrentLocationData} from '../store/actions/settings';

const {isRTL} = I18nManager;
const AddressLocation: FC = () => {
  const {userCurrentLocation} = useSelector(
    (state: RootState) => state.address,
  );
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const _map = useRef(null);
  const _marker = useRef(null);
  const LATITUDE_DELTA = 0.0922 / 5;
  const LONGITUDE_DELTA = 0.0421 / 5;
  console.log('userCurrentLocation', userCurrentLocation);
  //local state handler
  const [state, setstate] = useState({
    loader: false,
    region: new AnimatedRegion({
      latitude: userCurrentLocation.latitude,
      longitude: userCurrentLocation.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    markerRegion: new AnimatedRegion({
      latitude: userCurrentLocation.latitude,
      longitude: userCurrentLocation.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    currentLocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA / 2,
      longitudeDelta: LONGITUDE_DELTA / 2,
    },
    newLocationObj: {},
    areaName: null,
  });
  const [currentLocationData, setCurrentLocationData] = useState('');

  useEffect(() => {
    animateMap(state.region, userCurrentLocation);
    // animateMap(state.region, userCurrentLocation);
    getLocationDetails(
      userCurrentLocation.latitude,
      userCurrentLocation.longitude,
    );
    // dispatch(GetUserProfileData());
    return () => {
      console.log('clean');
    };
  }, [userCurrentLocation]);

  const getLocationDetails = async (latitude: number, longitude: number) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        let addressComponent = json.results[0].formatted_address;
        let locationStreetName =
          json.results[0].address_components[0].long_name;

        console.log(
          'getLocationDetailsresult geocoder',
          json.results[0].formatted_address,
        );
        setstate(old => ({
          ...old,
          newLocationObj: {
            latitude,
            longitude,
            areaName: addressComponent,
          },
        }));
        setCurrentLocationData(locationStreetName);
        console.log('addressComponent', addressComponent);
      })
      .catch(error => console.warn(error));
  };

  const DURATION: number = 500;
  const animateMap = useCallback(
    (element: any, n_region: any) => {
      setstate(old => ({...old, loader: true}));
      const DURATION: number = 500;
      if (Platform.OS === 'android') {
        console.log('_marker.current', _marker.current);
        if (_marker.current !== null) {
          _marker.current.animateMarkerToCoordinate(n_region, 500);
          setstate(old => ({...old, loader: false}));
        }
        if (_map.current !== null) {
          _map.current.animateToRegion(
            {
              n_region,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      } else {
        element
          .timing({...n_region, duration: DURATION, useNativeDriver: false})
          .start();

        setstate(old => ({...old, loader: false}));
      }
      getLocationDetails(n_region.latitude, n_region.longitude);
    },
    [_marker],
  );

  const handleRegionChange = (n_region: Region, areaName: string = '') => {
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

  // useEffect(() => {
  //   console.log('state.currentLocation', state.currentLocation)
  //   dispatch(GetUserProfileData());
  // animateMap(state.region, state.currentLocation);
  // animateMap(state.markerRegion, state.currentLocation);
  //   return () => {
  //     console.log('clean');
  //   };
  // }, [state.currentLocation]);

  //save location handler
  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    if (
      state.newLocationObj !== null &&
      Object.keys(state.newLocationObj).length > 0
    ) {
      dispatch(saveNewAddress(state.newLocationObj));
      dispatch(saveCurrentLocationData(currentLocationData));
      navigate('AddLocation');
    } else {
      setstate(old => ({...old, loader: false}));
      showMessage({
        message: t("Couldn't save your location please try agian!"),
      });
    }
  };
  const _onRegionChangeComplete = (region: Region): void => {
    animateMap(state.markerRegion, region);
  };
  const renderMap = useMemo(
    () => (
      <MapView.Animated
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        // initialRegion={state.currentLocation}
        region={state.region}
        onRegionChangeComplete={_onRegionChangeComplete}
        // onRegionChangeComplete={handleRegionChange}
      >
        <Marker.Animated ref={_marker} coordinate={state.markerRegion} />
      </MapView.Animated>
    ),
    [],
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

export default AddressLocation;
