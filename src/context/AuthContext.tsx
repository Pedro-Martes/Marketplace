import { createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import { storageUserLoad, storageUserSave } from "../storage/storageUser";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => void;

}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: React.ReactNode
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState({} as UserDTO)

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', { email, password })
            if (data.user) {
                setUser(data.user)
                storageUserSave(data.user)
            }

        } catch (error) {
            throw (error)
            console.log(error);
        }

    }

    async function loadUser() {
        const userLogged = await storageUserLoad()

        if (userLogged) {
            setUser(userLogged)
        }
    }

    useEffect(
        () => {
            loadUser()
        }, []

    )
    return (
        <AuthContext.Provider value={{ user, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}