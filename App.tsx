
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Center, Flex, NativeBaseProvider, VStack } from 'native-base';
import { THEME } from './src/theme';
import { Input } from './src/components/input';
import { Button } from './src/components/button';
import { Subtitle } from './src/components/subtitle';
import { Title } from './src/components/title';
import { Check } from './src/components/checkbox';

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
          <VStack backgroundColor={'gray.100'} flex={1} paddingX={8} alignContent={'center'} justifyContent={'center'}>

            <Input placeholder='E-mail' />

            <Input placeholder='Senha' type='password' />
            <Button text='Entrar' type='blue' />
            <Title text='Boas Vindas!' fontSize={20}/>
            <Subtitle text='Seu espaço de compra e venda' fontSize={6} />
            <Check value= {'Teste'} />

          </VStack>
          :
          <>
          </>
        }

      </SafeAreaView>


    </NativeBaseProvider>
  );
}

