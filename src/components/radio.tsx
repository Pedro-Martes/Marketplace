import { Radio as NativeRadio, IRadioProps, Text } from 'native-base';
import { ArrowArcLeft } from 'phosphor-react-native';

type Props = IRadioProps & {
    
    title?: string
}

export function RadioButton({ title, ...rest }: Props) {
    return (
        <NativeRadio
        mt={3}
        alignItems={'center'}
        _text={{ color: 'gray.500' }}
        _icon={{
            color: 'blue.primary',
            borderColor: 'blue.primary',
            size: 3,
        }}
        _checked={{
            borderColor: 'blue.primary',

        }}
        {...rest}
    >
        <Text mt={3} color={'gray.400'} fontSize={16} fontFamily={'body'} mr={'20px'}>{title}</Text>

    </NativeRadio>
    );
}
