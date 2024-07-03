import React from 'react';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { DrawerTabParamList } from './NavigationParam';
import HomeTab from './HomeTab';
import { I18nManager, Linking, Text, TouchableOpacity, View } from 'react-native';
import '../../internationlization/i18n'
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

const Drawer = createDrawerNavigator<DrawerTabParamList>();

const AppDrawer = () => {

    const { t, i18n } = useTranslation();

    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={(props) => {
                return (
                    <DrawerContentScrollView {...props}>
                        <DrawerItem
                            label="Help"
                            onPress={() => Linking.openURL('https://mywebsite.com/help')}
                        />
                        <View style={{ backgroundColor: 'red', height: 90, width: 'auto' }} />
                    </DrawerContentScrollView>
                );
            }}
        >
            <Drawer.Screen
                name='Home'
                component={HomeTab}
                options={{
                    title: t('appName'),
                    headerRight: ({ pressColor, pressOpacity, tintColor }) => {
                        return <TouchableOpacity
                            style={{
                                marginHorizontal: 12
                            }}
                            onPress={() => {
                                if (i18n.language === 'en') {
                                    i18n.changeLanguage('ar').then(()=>{
                                        I18nManager.forceRTL(true)
                                    });
                                } else {
                                    i18n.changeLanguage('en').then(()=>{
                                        I18nManager.forceRTL(false)
                                    });
                                }
                                console.log(i18n.language);
                                
                                RNRestart.restart();
                            }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight:'700',
                                color:'grey'
                            }}>{(() => {
                                if (i18n.language === 'en') {
                                    return 'ar';
                                }
                                return 'en';
                            })()}</Text>
                        </TouchableOpacity>
                    }
                }}
            />
        </Drawer.Navigator>
    );
};

export default AppDrawer;