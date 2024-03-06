import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box, useTheme } from "native-base";
import { AppRoutes } from "./app.routes";

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useAuth } from "../hooks/useAuth";

export function Routes() {

    const {user} = useAuth()
    console.log(user);
    return (
        <Box flex={1} bg={'gray.200'}>

            <NavigationContainer >
                {user.id ?  <AppRoutes /> : <AuthRoutes />  }

            </NavigationContainer>
        </Box>
    )
}