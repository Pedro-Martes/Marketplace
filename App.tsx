
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import { Center, Flex, NativeBaseProvider, RadioContext, ScrollView, VStack, Text } from 'native-base';
import { THEME } from './src/theme';

import { Routes } from './src/routes';
import { AuthContext, AuthContextProvider } from './src/context/AuthContext';
import { Loading } from './src/components/loading';
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal';
import { useEffect } from 'react';


OneSignal.initialize("7585da1c-50d9-448e-bfff-09dbd2384d40")
OneSignal.Notifications.requestPermission(true)
export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Montserrat_400Regular

  })


  return (
    <NativeBaseProvider theme={THEME} >

      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={"transparent"}
        translucent
      />

      <SafeAreaView
        style={{
          flex: 1,

        }}
      >
        <AuthContextProvider>

          {fontsLoaded ? <Routes /> : <Loading/>}

        </AuthContextProvider>
      </SafeAreaView>


    </NativeBaseProvider>
  );
}

