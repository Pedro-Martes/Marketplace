import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box, useTheme } from "native-base";
import { AppRoutes } from "./app.routes";

export function Routes() {


    return (
        <Box flex={1} bg={'gray.200'}>

            <NavigationContainer >
                 <AuthRoutes /> 
            
            </NavigationContainer>
        </Box>
    )
}