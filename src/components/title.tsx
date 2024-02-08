import { Text, ITextProps } from "native-base";

type Props = ITextProps & {
    text: string;
}
export function Title({ text , ...rest}: Props) {
    return (
        <Text
            color={'gray.600'}
            fontWeight={'extrabold'}
            letterSpacing={'1.3px'}

            {...rest}
           
        >
            {text}

        </Text>
    )
}