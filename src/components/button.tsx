import { Button as NativeButton, IButtonProps} from "native-base"

type Props =  IButtonProps & {

type?: "blue" | "gray" | "black" 
}
export function Button({ type="blue", ...rest} : Props) {
    return(
        <NativeButton
        background={`${type}.primary`}
        borderRadius={6}
        flexDirection={'row'}
       
        
        mt={3}
        _text={{
            color: type == "gray" ? "gray.900" : "white",
            fontFamily: 'body',
            fontWeight: 'bold',
        }}
        _pressed={
            {
                background: `${type}.secondary`
            }
        }
        {...rest}
        />
    )
}