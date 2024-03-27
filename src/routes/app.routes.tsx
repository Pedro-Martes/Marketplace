import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Center, HStack, View, useTheme } from "native-base";
import { Platform, ScrollView, TouchableOpacity } from "react-native";
import { House, SignOut, Tag } from "phosphor-react-native";
import { MyAdvertisement } from "../screens/myAdvertisement";
import React from "react";
import { SignIn } from "../screens/SingIn";
import { useAuth } from "../hooks/useAuth";
import { Logout } from "../screens/Logout";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateNewAdvertisement } from "../screens/CreateNewAdvertisement";
import { ProductPreview } from "../screens/preview";
import { ProductPropsDTO } from "../dtos/ProductDTO";
import { MyProduct } from "../screens/myProduct";


type AppRoutes = {
    Home: undefined,
    MyAdvertisement: undefined,
    logOut: undefined,
    Product: ProductPropsDTO,
    MyProduct: {id: string}
    CreateNewAdvertisement: undefined,
    ProductPreview: ProductPropsDTO,

}


export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();


export function AppRoutes() {

    const { sizes, colors } = useTheme();
    const iconsSize = sizes[6]
    const { logOut } = useAuth()
    return (
        <>

            <Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#d1d5db',
                    tabBarInactiveTintColor: colors.gray[100],
                    tabBarStyle: {
                        backgroundColor: colors.gray[100],
                        borderTopWidth: 0,
                        height: Platform.OS === "android" ? 'auto' : 96,
                        paddingBottom: sizes[7],
                        paddingTop: sizes[6]
                    }
                }}
            >

                <Screen
                    name='Home'
                    component={Home}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Center backgroundColor={color} h={52} w={'100%'}>
                                <House size={iconsSize} color={'#000'} weight="bold" />
                            </Center>

                        )
                    }}
                />

                <Screen
                    name="MyAdvertisement"
                    component={MyAdvertisement}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Center backgroundColor={color} h={52} w={'100%'}>
                                <Tag size={iconsSize} color={'#000'} weight="bold" />
                            </Center>
                        )
                    }}
                />

                <Screen
                    name="logOut"
                    component={Logout}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <SignOut size={iconsSize} color={colors.red[100]} weight="fill" />

                        )
                    }}
                />

                <Screen
                    name="CreateNewAdvertisement"
                    component={CreateNewAdvertisement}
                    options={{ tabBarButton: () => null }}
                />
                <Screen
                    name="ProductPreview"
                    component={ProductPreview}
                    options={{ tabBarButton: () => null }}

                />
                <Screen
                    name="MyProduct"
                    component={MyProduct}
                    options={{ tabBarButton: () => null }}

                />
                
                

              



            </Navigator>

        </>
    )
}