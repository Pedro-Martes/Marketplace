import { Button as NativeButton } from "native-base"

type Props =  {
text: string
}
export function Button({text}: Props){
    return(
        <NativeButton
        background={'blue.primary'}
        
        >
            {text}
        </NativeButton>
    )
}