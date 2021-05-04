import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Splash from './Splash';
import Navigation from '../navigation/Navigation';
import {RootState} from '../store/store';
import {initializApp} from '../store/actions/settings';
import Geolocation from "@react-native-community/geolocation";
import {saveCurrentLocation} from "../store/actions/address";

const AppInitializer: FC = () => {
  const appLoaded = useSelector((state: RootState) => state.settings.appLoaded);
  const dispatch = useDispatch();
  const LATITUDE_DELTA = 0.0922 / 5;
  const LONGITUDE_DELTA = 0.0421 / 5;
  useEffect(() => {
    if (!appLoaded) {
      Geolocation.getCurrentPosition(position => {
        console.log('getCurrentPosition info', position);
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
        dispatch(saveCurrentLocation(currentLocation));
        dispatch(initializApp());
      });

    }
  }, []);
  if (appLoaded) {
    return <Navigation/>;
  } else {
    return <Splash/>;
  }
};

export default AppInitializer;
