import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDTO } from "../dtos/UserDTO";
import { USER_STORAGE } from "./storageConfig";

export async function storageUserSave(user: UserDTO) {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}


export async function storageUserRemove() {
    await AsyncStorage.removeItem(USER_STORAGE);
}

export async function storageUserLoad() {
    const userStorage = await AsyncStorage.getItem(USER_STORAGE);
    const user: UserDTO = userStorage ? JSON.parse(userStorage) : {};
    return user;
}