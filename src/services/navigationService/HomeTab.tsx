import React from "react";
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import PendingTodo from "../../screens/pendingTodo";
import CompletedTodo from "../../screens/completedTodo";
import { HomeTabParamList } from "./NavigationParam";
import { useTranslation } from "react-i18next";


const Tab = createMaterialTopTabNavigator<HomeTabParamList>();

const tabOptions: MaterialTopTabNavigationOptions = {
    lazy: true,
    tabBarLabelStyle: { textTransform: 'none',fontSize:14},
    tabBarInactiveTintColor:'grey',
    tabBarActiveTintColor:'black',
    tabBarAllowFontScaling:true,
    tabBarIndicatorStyle:{
        backgroundColor:'red',
    },
};

const HomeTab = () => {
    const {t} = useTranslation();
    return (
        <Tab.Navigator initialRouteName="PendingTodo">
            <Tab.Screen
                name="PendingTodo"
                component={PendingTodo}
                options={{ title: t('pending'), ...tabOptions }}
            />
            <Tab.Screen name="CompletedTodo"
                component={CompletedTodo}
                options={{
                    tabBarLabel: t('completed'),
                    ...tabOptions
                }} />
        </Tab.Navigator>
    );
};

export default HomeTab;