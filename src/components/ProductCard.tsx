import { Image, VStack, View, Text, HStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Subtitle } from "./subtitle";
import { Title } from "./title";
import { ProductDTO } from "../dtos/ProductDTO";

type ProductCardProps = TouchableOpacityProps & {
    data?: ProductDTO[];
}
export function ProductCard({ data, ...rest }: ProductCardProps) {
    const ImagemWidth = 153
    return (
        <TouchableOpacity {...rest} >
            <VStack mt={8} w={ImagemWidth} mr={5}>
                <Image
                    source={{ uri: data.image }}
                    alt=""
                    w={ImagemWidth}
                    h={100}
                    rounded={'lg'}
                    mr={4}

                />

                <View background={data.status === 'Novo' ? 'blue.primary' : 'gray.800'} rounded={'full'} w={'30%'} position="absolute" right={0} m={1}>
                    <Subtitle text={`${data.status}`} color={'white'} textAlign={'center'} fontSize={10} />
                </View>
                <Subtitle text={data.title} />
                <HStack alignItems={'center'}>

                    <Title text="R$" fontSize={12} mr={0.5} />
                    <Text fontWeight={'bold'} fontSize={16}>{(data.price.toFixed(2)).replace('.' ,',')}</Text>

                </HStack>

            </VStack>
        </TouchableOpacity>
    )
}