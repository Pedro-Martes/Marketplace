import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "../storage/storageConfig";

type storageAuthTokenProps = {
    token: string,
    refresh_token: string
}
export async function storageAuthTokenInsert({token, refresh_token}: storageAuthTokenProps) {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token, refresh_token }));
}


export async function storageAuthTokenGet() {
    const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
    const { refresh_token,token}: storageAuthTokenProps = response ? JSON.parse(response) : {};
    return { refresh_token,token};
}

export async function storageAuthTokenRemove() {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}

