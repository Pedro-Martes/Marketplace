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


type AppRoutes = {
    Home: undefined,
    myAdvertisement: undefined,
    logOut: undefined,
    CreateNewAd: undefined,
    Product: undefined,
    ProductPreview: undefined,
    MyProduct: undefined



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
                    name="myAdvertisement"
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



            </Navigator>

        </>
    )
}