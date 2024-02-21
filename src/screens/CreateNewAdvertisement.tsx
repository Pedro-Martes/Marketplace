import { HStack, Text, VStack, Image, FlatList } from "native-base";
import { ArrowLeft, ArrowRight, Plus } from "phosphor-react-native";
import { Title } from "../components/title";
import { TouchableOpacity } from "react-native";
import { Subtitle } from "../components/subtitle";
import { Button } from "../components/button";

interface CreateNewAddProps {

}
export default function CreateNewAd(props: CreateNewAddProps) {
    const PHOTO_SIZE = 100
    
    const ProductImages = ['https://source.unsplash.com/random/801x601', 'https://source.unsplash.com/random/802x602']

    return (
        <VStack bg={'gray.200'} flex={1} px={6}>
            <HStack mt={16} alignItems={'center'} justifyContent={'center'}>
                <TouchableOpacity >
                    <ArrowLeft />
                </TouchableOpacity>

                <Title text="Criar anúncio" fontSize={20} textAlign={'center'} w={'100%'} />
            </HStack>

            <Subtitle text="Imagens" mt={6} fontWeight={'bold'} fontSize={16} />
            <Subtitle text="Escolha até 3 imagens para mostrar o quando o seu produto é incrível!" />

            <HStack mt={'16px'} alignItems={'center'}>

                <FlatList
                    data={ProductImages}
                    keyExtractor={(item) => item}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <>
                            <Image
                                source={{ uri: item }}
                                alt=''
                                w={PHOTO_SIZE}
                                h={PHOTO_SIZE}
                                rounded={6}
                                mr={1.5}
                            />

                        </>
                    )}

                />

                {
                    ProductImages.length < 3 ?
                        <Button
                            w={PHOTO_SIZE}
                            h={PHOTO_SIZE}
                            mt={0}
                            type="gray"

                        >
                            <Plus color="#888889" />
                        </Button>
                        : null
                }



            </HStack>

        </VStack>
    )
}