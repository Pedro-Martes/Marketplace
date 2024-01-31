
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Center, Flex, NativeBaseProvider, VStack } from 'native-base';
import { THEME } from './src/theme';
import { Input } from './src/components/input';
import { Button } from './src/components/button';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
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
        {fontsLoaded ?
          <VStack backgroundColor={'gray.200'} flex={1} paddingX={8} alignContent={'center'} justifyContent={'center'}>

            <Input placeholder='E-mail' />

            <Input placeholder='Senha' type='password' />
            <Button text='Entrar' />

          </VStack>
          :
          <>
          </>
        }

      </SafeAreaView>


    </NativeBaseProvider>
  );
}

