import { useEffect } from "react"
import { storageUserRemove } from "../storage/storageUser"

export function Logout(){
    useEffect(( )=>{
        storageUserRemove()
    }, [])
    return(
        <></>
    )
}