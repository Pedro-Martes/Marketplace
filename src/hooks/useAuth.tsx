import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";

export function useAuth(){
    const contextData = useContext(AuthContext);
    return contextData;
}