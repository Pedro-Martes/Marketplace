import { useEffect } from "react"
import { storageUserRemove } from "../storage/storageUser"
import { Loading } from "../components/loading"
import { useAuth } from "../hooks/useAuth"

export function Logout(){
    const {logOut} = useAuth()
    useEffect(()=> {
        logOut()
    }, [])

    return(
        <Loading></Loading>
    )
}