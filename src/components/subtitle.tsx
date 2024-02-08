import { Text, ITextProps } from "native-base";

type Props = ITextProps & {
    text: string;
}
export function Subtitle({ text, ...rest }: Props) {
    return (
        <Text
            color={'gray.300'}
            fontFamily={'body'}
            {...rest}
           
        >
            {text}

        </Text>
    )
}