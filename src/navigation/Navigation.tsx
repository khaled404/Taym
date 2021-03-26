import React, {FC, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home, Voucher} from '../screens/index';
import Animated from 'react-native-reanimated';
import DrawerContent from '../components/drawer/DrawerContent';
import {I18nManager, StyleSheet} from 'react-native';
const {isRTL} = I18nManager;
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const navigationTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({current, next, layouts}: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    0,
                    isRTL
                      ? layouts.screen.width / 7
                      : -layouts.screen.width / 7,
                  ],
                })
              : current.progress.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [
                    isRTL ? -layouts.screen.width : layouts.screen.width,
                    isRTL
                      ? -layouts.screen.width / 2
                      : layouts.screen.width / 2,
                    0,
                  ],
                }),
          },
        ],
      },
      overlayStyle: {
        backgroundColor: 'transparent',
      },
    };
  },
};

const navigationSlideToTop = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({current, next, layouts}: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.93],
                })
              : 1,
          },
        ],
      },
    };
  },
};

const Stacks: FC<any> = ({style}) => {
  return (
    <Animated.View style={[styles.stacksStyles, style]}>
      <Stack.Navigator
        screenOptions={{headerShown: false, ...navigationTransition} as any}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Voucher" component={Voucher} />
      </Stack.Navigator>
    </Animated.View>
  );
};

const initNavgtion: FC = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 25],
  });

  const animatedStyle = {
    borderRadius,
    transform: [{scale}],
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'transparent',
          inactiveTintColor: 'transparent',
        }}
        drawerStyle={{backgroundColor: 'transparent'}}
        lazy
        drawerContent={props => {
          setProgress(props.progress as any);
          global.DrawerProps = props.navigation as any;
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen
          name="Stacks"
          component={() => <Stacks style={animatedStyle} />}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default initNavgtion;

const styles = StyleSheet.create({
  stacksStyles: {
    backgroundColor: 'white',
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    zIndex: 3,
    shadowRadius: 10.32,
    elevation: 5,
    overflow: 'hidden',
  },
});
