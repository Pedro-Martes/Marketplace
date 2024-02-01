import { Checkbox as NativeCheckbox, ICheckboxProps } from 'native-base'



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
        {...rest}
        >
           {value}
       </NativeCheckbox>
    )
}