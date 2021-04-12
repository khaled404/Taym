import React, {FC, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  AddLocation,
  AddressLocation,
  Cart,
  Category,
  CompleteRegister,
  Favorite,
  Forget,
  Forget2,
  Forget3,
  Home,
  Language,
  Login,
  MyAddresses,
  MyOrders,
  OrderDetails,
  PhoneCode,
  Profile,
  Register,
  Settings,
  Voucher,
  ForgetPhoneCode,
  ShopDetails,
  OrderDone,
  OrderOut,
  MyCards,
} from '../screens/index';
import Animated from 'react-native-reanimated';
import DrawerContent from '../components/drawer/DrawerContent';
import {I18nManager, StyleSheet} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from '../store/store';

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
  const {isLogin} = useSelector((state: RootState) => state.auth);
  const {language} = useSelector((state: RootState) => state.settings);

  return (
    <Animated.View style={[styles.stacksStyles, style]}>
      <Stack.Navigator
        screenOptions={{headerShown: false, ...navigationTransition} as any}
        initialRouteName={
          language === null ? 'Language' : isLogin ? 'Home' : 'Login'
        }>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Voucher" component={Voucher} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="OrderDone" component={OrderDone} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="CompleteRegister" component={CompleteRegister} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="Forget2" component={Forget2} />
        <Stack.Screen name="Forget3" component={Forget3} />
        <Stack.Screen name="ForgetPhoneCode" component={ForgetPhoneCode} />
        <Stack.Screen name="PhoneCode" component={PhoneCode} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="MyAddresses" component={MyAddresses} />
        <Stack.Screen name="AddLocation" component={AddLocation} />
        <Stack.Screen name="AddressLocation" component={AddressLocation} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="ShopDetails" component={ShopDetails} />
        <Stack.Screen name="OrderOut" component={OrderOut} />
        <Stack.Screen name="MyCards" component={MyCards} />
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
