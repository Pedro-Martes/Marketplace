import { Checkbox as NativeCheckbox, ICheckboxProps, Text } from 'native-base'



type Props = ICheckboxProps & {
    value: string
}

export function Check({ value, ...rest }: Props) {
    return (

        <NativeCheckbox
            value={value}
            mt={1}
            colorScheme={'blue'}
            size={'md'}
            _checked={
                {
                    background: 'blue.primary',
                    borderColor: 'gray.100',
                }
            }
            {...rest}
        >
            <Text fontFamily={'body'} fontSize={16} color={'gray.400'} >

                {value}
            </Text>
        </NativeCheckbox>
    )
}