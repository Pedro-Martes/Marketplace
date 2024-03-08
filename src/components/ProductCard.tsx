import { Image, VStack, View, Text, HStack, Center } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Subtitle } from "./subtitle";
import { Title } from "./title";
import { ProductDTO } from "../dtos/ProductDTO";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

type ProductCardProps = TouchableOpacityProps & {
    data?: ProductDTO[];
}
export function ProductCard({ data, ...rest }: ProductCardProps) {
    const ImagemWidth = 153

    const navigator = useNavigation<AppNavigatorRoutesProps>()

    function handleProduct(){
        navigator.navigate('Product')
    }
   

    return (
        <TouchableOpacity {...rest} onPress={handleProduct}>
        
            <VStack mt={8} w={ImagemWidth} mr={3}  >
                
                
                <Text color={'white'}  zIndex={2} m={1} position={'absolute'} display={!data.ativo ? 'flex' : 'none'} fontWeight={'bold'} mt={35} >Anúncio desativado</Text>
                <View w={'100%'} h={100}  rounded={'lg'} background={'gray.700'} opacity={0.5} position={'absolute'} zIndex={1} display={!data.ativo ? 'flex' : 'none'} >

                    </View>
                    <Image
                        source={{ uri: data.ImageUri[0] }}
                        alt=""
                        w={ImagemWidth}
                        h={100}
                        rounded={'lg'}
                        mr={4}
                    />


                <View background={data.status === 'Novo' ? 'blue.primary' : 'gray.800'} rounded={'full'} w={'30%'} position="absolute" right={0} m={1}>
                    <Subtitle text={`${data.status}`} color={'white'} textAlign={'center'} fontSize={10} />
                </View>

                <Subtitle text={data.title} opacity={data.ativo ? 1 : 0.5} />
                <HStack alignItems={'center'} opacity={data.ativo ? 1 : 0.5}>

                    <Title text="R$" fontSize={12} mr={0.5} />
                    <Text fontWeight={'bold'} fontSize={16}>{(data.price.toFixed(2)).replace('.', ',')}</Text>

                </HStack>


            </VStack>
        </TouchableOpacity>
    )
}