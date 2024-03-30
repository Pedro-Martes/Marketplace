import { Pressable, IPressableProps } from "native-base"

type Props = IPressableProps & {

    type?: "blue" | "gray" | "black"
}
export function IconButton({ type = "blue", ...rest }: Props) {
    return (
        <Pressable
            background={`${type}.primary`}
            borderRadius={6}
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            w={'100%'}
            py={3}
            mt={3}

            color={type == "gray" ? "gray.900" : "white"}
            fontFamily={'body'}
            fontWeight={'bold'}

            _pressed={
                {
                    background: `${type}.secondary`
                }
            }
            {...rest}
        />
    )
}