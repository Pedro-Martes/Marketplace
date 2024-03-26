import { Image, VStack, View, Text, HStack, Center } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Subtitle } from "./subtitle";
import { Title } from "./title";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { api } from "../services/api";
import { ProductPropsDTO } from "../dtos/ProductDTO";

type ProductCardProps = TouchableOpacityProps & {
    data?: ProductPropsDTO;
    filter?: string;
}
export function ProductCard({ data, ...rest }: ProductCardProps) {
    const ImagemWidth = 153

    const navigator = useNavigation<AppNavigatorRoutesProps>()
   


    return (
        <TouchableOpacity {...rest} >

            <VStack mt={8} w={ImagemWidth} mr={3}  >


                <Text
                    color={'white'}
                    zIndex={2}
                    m={1}
                    position={'absolute'}
                    display={data!.is_active ? 'none' : 'flex'}
                    fontWeight={'bold'}
                    mt={35}
                >
                    Anúncio desativado
                </Text>

                <View w={'100%'} h={100} rounded={'lg'} background={'gray.700'} opacity={0.5} position={'absolute'} zIndex={1} display={data!.is_active ? 'none' : 'flex'} >

                </View>
                
                <Image
                        source={{ uri: `${api.defaults.baseURL}/images/${data?.product_images[0].path}`}}
                        alt=""
                        w={ImagemWidth}
                        h={100}
                        rounded={'lg'}
                        mr={4}
                    />  


                <View background={data!.is_new  ? 'blue.primary' : 'gray.800'} rounded={'full'} w={'30%'} position="absolute" right={0} m={1}>
                    <Subtitle text={`${data?.is_new ? 'Novo' : 'Usado'}`} color={'white'} textAlign={'center'} fontSize={10} />
                </View>

                <Subtitle text={data!.name} opacity={data!.is_active ? 1 : 0.5} />
                <HStack alignItems={'center'} opacity={data!.is_active ? 1 : 0.5}>

                    <Title text="R$" fontSize={12} mr={0.5} />
                    <Text fontWeight={'bold'} fontSize={16}>{(data?.price)}</Text>

                </HStack>


            </VStack>
        </TouchableOpacity>
    )
}