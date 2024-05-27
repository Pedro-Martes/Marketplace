import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box, useTheme } from "native-base";
import { AppRoutes } from "./app.routes";

import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/loading";
import { NotificationWillDisplayEvent, OSNotification, OneSignal } from "react-native-onesignal";
import { Notification } from "../components/Notifications";

export function Routes() {

    const [notification, setNotification] = useState<OSNotification>();
    const { user, isLoadingStorage } = useAuth()

    if (isLoadingStorage) {
        return <Loading />;
    }
    const linking = {
        prefixes: [ 'com.martesStudios.Barganha://','Barganha://','exp+barganha://'],
        config: {
            screens: {
                Product: {
                    path: 'Product/:id',
                    parse: {
                        id: (id: string) => id,
                    },
                }
            },
        },
    }
    


    return (
        <Box flex={1} bg={'gray.200'}>

            <NavigationContainer linking={linking} >
                {user.id ? <>
                    {
                        notification ?

                            <Notification data={notification ?? null} onClose={() => { setNotification(undefined) }} />
                            : null
                    }
                    <AppRoutes />

                </>
                    : <AuthRoutes />}


            </NavigationContainer>
        </Box>
    )
}