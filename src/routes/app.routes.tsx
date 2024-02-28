import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { useTheme } from "native-base";
import { Platform } from "react-native";
import { House } from "phosphor-react-native";


type AppRoutes = {
    Home: undefined,
    myAdvertisement: undefined,

}
export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>; 

const {Navigator, Screen} = createBottomTabNavigator<AppRoutes>();


export function AppRoutes() {
    
    const { sizes, colors } = useTheme();
    const iconsSize = sizes[6]
    return (
        <Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.green[500],
            tabBarInactiveTintColor: colors.gray[200],
            tabBarStyle: {
              backgroundColor: colors.gray[100],
              borderTopWidth: 0,
              height: Platform.OS === "android" ? 'auto' : 96,
              paddingBottom: sizes[10],
              paddingTop: sizes[6]
            }
        }}
        >

            <Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({colors}) => (
                        <House size={iconsSize}  />
                    )
                }}
            />
        </Navigator>
    )
}