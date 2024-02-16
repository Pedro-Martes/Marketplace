import { HStack, Image, VStack } from "native-base";
import { ArrowLeft } from "phosphor-react-native";

export function Product(){
    return(
        <VStack flex={1} py={8}  bg={'gray.200'}>
            <HStack px={3} mb={12} mt={1}>
            <ArrowLeft  />

            </HStack>
            <Image
            source={{uri: 'https://source.unsplash.com/random/800x600'}}
            alt="Product image"
            w={'100%'}
            h={280}
             />

        </VStack>
    )
}