import { Button, Center, FormControl, HStack, IInputProps, Input as NativeInput } from "native-base";
import {  Eye, EyeClosed } from "phosphor-react-native";
import { useState } from "react";

type Props = IInputProps & {
    errorMessage?: string | null,
    type?: 'text' | 'password'
}

export function Input({ errorMessage = null, type = 'text', isInvalid, ...rest }: Props) {

    const [visiblePassword, setVisiblePassword] = useState(true)
    const invalid = !!errorMessage || isInvalid;

    function handleEye() {
        setVisiblePassword(true)

    }
    function handleOpenEye() {
        setVisiblePassword(false)

    }
    return (
        <FormControl isInvalid= {invalid} mb={3} >
            <FormControl.ErrorMessage _text={{color: 'red.500'}}>
                {errorMessage}
            </FormControl.ErrorMessage>

            <HStack
                backgroundColor={"white"}
                alignItems={'center'}
                paddingRight={type == 'password' ? 6 : 0}
                borderRadius={8}

            >


                <NativeInput
                    bg={"white"}
                    borderWidth={0}
                    fontSize={'md'}
                    fontFamily={'body'}


                    placeholderTextColor={'gray.300'}
                    _focus={{
                        borderWidth: '1px',
                        borderColor: 'gray.300',
                        bg: "white"
                    }}
                    isInvalid= {invalid}
                    _invalid={{
                        borderWidth: 1,
                        borderColor:'red.500'
                    }}
                    secureTextEntry={type === 'password' ? visiblePassword : false}
                    {...rest}

                />


                {type === 'password' ? (visiblePassword ? (

                    // Se visiblePassword for true
                    <Button
                        bg={"transparent"}
                        h={'100%'}
                        padding={0}
                        _pressed={{ bg: "transparent" }}
                        onPress={handleOpenEye}>

                        <Eye color="#7C7C8A" size={20} />
                    </Button>

                ) : (
                    // Se visiblePassword for falso


                    <Button
                        bg={"transparent"}
                        padding={0}
                        _pressed={{ bg: "transparent" }}
                        onPress={handleEye}>

                        <EyeClosed color="#7C7C8A" size={20} />

                    </Button>
                )
                ) : null}



            </HStack>



        </FormControl>
    )
}