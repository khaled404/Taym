import React, {FC} from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {CartAddress, CartCheckout, CartDetails} from "../screens";
import TabBar from "../components/tabBar/TabBar";
import {useTranslation} from "react-i18next";


const Tab = createMaterialTopTabNavigator();

const CartTabs: FC = () => {
    const {t} = useTranslation();
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
            <Tab.Screen options={{title: t('Order Details'),}} name="CartDetails" component={CartDetails}/>
            <Tab.Screen
                options={{title: t('Address'),}}
                name="CartAddress" component={CartAddress}/>
            <Tab.Screen
                options={{title: t('Checkout'),}}
                name="CartCheckout" component={CartCheckout}/>
        </Tab.Navigator>
    );
}


export default CartTabs;
