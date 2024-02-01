import { Text, ITextProps } from "native-base";

type Props = ITextProps & {
    text: string;
}
export function Subtitle({ text }: Props) {
    return (
        <Text
            color={'gray.300'}
            fontFamily={'body'}
           
        >
            {text}

        </Text>
    )
}