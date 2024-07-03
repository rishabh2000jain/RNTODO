import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeStack from './services/navigationService/HomeStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './redux/ReduxStore';
import { en, ar, registerTranslation } from 'react-native-paper-dates'
import messaging, { firebase, FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { firebaseAppConfig } from './firebaseConfig';
import { I18nManager, StyleSheet, View } from 'react-native';
import './internationlization/i18n';
import { ThemeProvider } from './internationlization/Theme';

const App = () => {
  const [initApp, setInitApp] = useState<boolean>(true);
  useEffect(() => {
    if (I18nManager.isRTL) {
      registerTranslation('ar', ar);
    } else {
      registerTranslation('en', en);
    }
    const initApp = async () => {
      if (firebase.apps.length == 0) {
        await firebase.initializeApp(firebaseAppConfig);
      }
    }
    initApp().then((e) => {
      setInitApp(false);
    }).catch(e => console.log(e));
  }, []);

  if (initApp) {
    return <View style={[StyleSheet.absoluteFill, { backgroundColor: 'white' }]} />
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <NavigationContainer>
              <HomeStack />
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  )
};


export default App;