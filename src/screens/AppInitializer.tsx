import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Splash from './Splash';
import Navigation from '../navigation/Navigation';
import {RootState} from '../store/store';
import {initializApp, userHomeApi} from '../store/actions/settings';

const AppInitializer: FC = () => {
  const appLoaded = useSelector((state: RootState) => state.settings.appLoaded);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!appLoaded) {
      dispatch(initializApp());
    }
  }, []);
  if (appLoaded) {
    return <Navigation />;
  } else {
    return <Splash />;
  }
};

export default AppInitializer;
