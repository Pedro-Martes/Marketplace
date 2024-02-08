import { Radio as NativeRadio, IRadioProps } from 'native-base';
import { ArrowArcLeft } from 'phosphor-react-native';

type Props = IRadioProps & {
    name: string,
    valueList: string[],
}

export function Radio({ name, valueList, ...rest }: Props) {
    return (
        <NativeRadio.Group name={name} defaultValue={valueList[0]} mt={2} >
            {valueList.map((item, index) => (
                <NativeRadio key={index} value={item}  mt={2} 
                _text={{ color: 'gray.500' }}
                _icon= {{
                    color: 'blue.primary',
                    borderColor: 'blue.primary',
                    size: 3,
                }}
                _checked={{
                    borderColor: 'blue.primary',
                    
                }}
                
                >
                    {item}
                </NativeRadio>
            ))}
        </NativeRadio.Group>
    );
}
