import { createContext, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";

export type AuthContextDataProps = {
    user: UserDTO

}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: React.ReactNode
}
export function AuthContextProvider({ children } : AuthContextProviderProps) {
    const [user,setUser] = useState({
        id: '1',
        name: 'pedro',
        email: '<EMAIL>',
        tel: '12126',
        avatar: 'https://img.freepik.com/free-vector/man-avatar-silhouette_23-2148850593.jpg?size=338&ext=jpg',})

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}