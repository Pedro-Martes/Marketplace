
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import { Center, Flex, NativeBaseProvider, RadioContext, ScrollView, VStack, Text } from 'native-base';
import { THEME } from './src/theme';
import { Input } from './src/components/input';
import { Button } from './src/components/button';
import { Subtitle } from './src/components/subtitle';
import { Title } from './src/components/title';
import { Check } from './src/components/checkbox';
import { Radio } from './src/components/radio';
import { Switch } from './src/components/switch';
import { Select } from './src/components/select';
import { SignIn } from './src/screens/SingIn';
import { SignUp } from './src/screens/SignUp';
import { Home } from './src/screens/Home';
import { Product } from './src/screens/Product';
import { MyAdvertisement } from './src/screens/myAdvertisement';
import { MyProduct } from './src/screens/myProduct';
import CreateNewAd from './src/screens/CreateNewAdvertisement';
import { ProductPreview } from './src/screens/preview';
import { Routes } from './src/routes';
import { AuthContext, AuthContextProvider } from './src/context/AuthContext';
import { Loading } from './src/components/loading';

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

