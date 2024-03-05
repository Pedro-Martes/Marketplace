import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box, useTheme } from "native-base";
import { AppRoutes } from "./app.routes";

import { AuthContext } from "../context/AuthContex";
import { useContext } from "react";

export function Routes() {

    const contextData = useContext(AuthContext);
    console.log(`Usuario logado =>`, contextData);
    return (
        <Box flex={1} bg={'gray.200'}>

            <NavigationContainer >
                <AuthRoutes />

            </NavigationContainer>
        </Box>
    )
}