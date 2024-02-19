import { Box, Select as NativeSelect } from "native-base"
import { useState } from "react"

type Props = {
    placeHolder?: string
    itens: string[]
}

export function Select({ itens, placeHolder }: Props) {
    const [service, setService] = useState()
    return (
        <Box maxW={300}>

            <NativeSelect
                placeholder={placeHolder ? `${placeHolder}` : ""}
                selectedValue={service}
                backgroundColor={'gray.100'}
                borderWidth={2}
                defaultValue={itens[0]}
                _selectedItem={{
                    bgColor: "gray.900",
                    _text: {
                        color: "gray.900"
                    }
                }} 
                onValueChange={itemValue => setService(itemValue)}
                >


                {itens.map((item, index) => (
                    <NativeSelect.Item key={index} label={item} value={item}/>
                ))}
            </NativeSelect>
        </Box>



    )
}