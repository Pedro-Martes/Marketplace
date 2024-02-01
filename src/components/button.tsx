import { Button as NativeButton, IButtonProps} from "native-base"

type Props =  IButtonProps & {
text: string
type?: "blue" | "gray" | "black" 
}
export function Button({text,  type="blue", ...rest} : Props) {
    return(
        <NativeButton
        background={`${type}.primary`}
        borderRadius={6}
        mt={8}
        _text={{
            color: type == "gray" ? "gray.900" : "white",
            fontFamily: 'body',
            fontWeight: 'bold',
        }}
        >
            {text}
        </NativeButton>
    )
}