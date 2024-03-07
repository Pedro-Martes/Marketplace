import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box, useTheme } from "native-base";
import { AppRoutes } from "./app.routes";

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/loading";

export function Routes() {

    const {user, isLoadingStorage} = useAuth()
    console.log(user);

    if(isLoadingStorage){
        return <Loading />;
    } 

    return (
        <Box flex={1} bg={'gray.200'}>

            <NavigationContainer >
                {user.id ?  <AppRoutes /> : <AuthRoutes />  }

            </NavigationContainer>
        </Box>
    )
}