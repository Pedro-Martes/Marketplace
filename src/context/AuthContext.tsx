import { createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import { storageUserLoad, storageUserRemove, storageUserSave } from "../storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenInsert, storageAuthTokenRemove } from "../storage/storageAuthToken";

export type AuthContextDataProps = {
    user: UserDTO;
    isLoadingStorage: boolean;
    signIn: (email: string, password: string) => void;
    logOut: () => void;

}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: React.ReactNode
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState({} as UserDTO)
    const [isLoadingStorage, setIsLoadingStorage] = useState(true)


    async function storageUserAndToken(userData: UserDTO, token: string) {
        try {
            api.defaults.headers.common[`Authorization`] = `Bearer ${token}`;
            setIsLoadingStorage(true)
            await storageUserSave(userData);
            await storageAuthTokenInsert(token)
            setUser(userData)

        } catch (error) {
            console.log(error);
            throw(error);

        }finally{
            setIsLoadingStorage(false)
        }
    }

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', { email, password })

            if (data.user && data.token) {

                storageUserAndToken(data.user, data.token)
            }

        } catch (error) {
            throw (error)
            console.log(error);
        }

    }

    async function loadUser() {
        try {
            const userLogged = await storageUserLoad()
            const token = await storageAuthTokenGet();
            if (userLogged) {
                setUser(userLogged)

                setIsLoadingStorage(false)
            }

        } catch (error) {
            throw (error)
        } finally {
            setIsLoadingStorage(false)
        }
    }
    async function logOut() {

        try {
            setIsLoadingStorage(true)
            setUser({} as UserDTO)
            await storageUserRemove()
            await storageAuthTokenRemove()
        } catch (error) {
            throw (error)
        } finally {
            setIsLoadingStorage(false)
        }

    }

    useEffect(
        () => {
            loadUser()
        }, []

    )
    return (
        <AuthContext.Provider value={{
            user,
            isLoadingStorage,
            signIn,
            logOut,
        }}>
            {children}
        </AuthContext.Provider>
    )
}