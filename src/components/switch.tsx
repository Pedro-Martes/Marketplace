import { Switch as NativeSwitch, ISwitchProps } from 'native-base';

type Props = ISwitchProps 

export function Switch({...rest} : Props) {
  return (
    <NativeSwitch
      size={12}
      trackColor={{ false: '#C4C4CC', true: '#647AC7' }}
      style={{
        borderColor: '#647AC7' ,

      }}
      {...rest}
    />


  );
}
