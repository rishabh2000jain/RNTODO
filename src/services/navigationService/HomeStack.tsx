import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParamList } from "./NavigationParam";
import HomeTab from './HomeTab';
import AppDrawer from './AppDrawer';
import AddTodoPage from '../../screens/addTodo';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator<HomeStackParamList>();


const HomeStack = () => {
    const {t} = useTranslation();
    return (
        <Stack.Navigator initialRouteName='HomePage'>
            <Stack.Screen
                name="HomePage"
                component={AppDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddTodo"
                component={AddTodoPage}
                options={{ headerShown: true, title: t('addTodo'), headerBackTitle: 'Home' }}
            />
        </Stack.Navigator>
    );

};

export default HomeStack;