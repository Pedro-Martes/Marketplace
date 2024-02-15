import defaultImage from "../assets/iconUser.png";
import { Center, HStack, Input, ScrollView, VStack, Text, Button as ButtonNative, View } from "native-base";
import { Title } from "../components/title";
import { SafeAreaView } from "react-native";
import { UserImage } from "../components/userImage";
import { Subtitle } from "../components/subtitle";
import { Button } from "../components/button";
import { ArrowFatLineRight, ArrowRight, MagnifyingGlass, Plus, Sliders, Tag } from "phosphor-react-native";


interface HomeProps {

}
export function Home(props: HomeProps) {
    const PHOTO_SIZE = 45


    return (
        <ScrollView  background={'gray.200'}>
            <VStack px={26}>

                <HStack mt={16} alignItems={'center'} w="100%">
                    <UserImage
                        source={defaultImage}
                        alt=''
                        w={PHOTO_SIZE}
                        h={PHOTO_SIZE}
                    />
                    <VStack>
                        <Subtitle text={`Bem Vindo(a),`} />
                        <Title text={`Pedro!`} />


                    </VStack>
                    <Button type="black" flex={1} ml={8}>
                        <VStack>

                            <Title text="+ Criar Anúncio" color={'white'} fontSize={12} />

                        </VStack>
                    </Button>

                </HStack>
                <Subtitle text="Seus produtos anunciados para venda" mt={8} mb={3}/>

                <HStack background={'#e0e1eb'} paddingY={8} px={3} borderRadius={16} >
                    <HStack flex={1} alignItems={'center'} >

                        <Tag color="#364D9D"  />
                        <VStack ml={1} marginLeft={3} >
                            <Title text="4" fontSize={20} />
                            <Subtitle text="Anúncios" />
                        </VStack>

                    </HStack>

                    <HStack alignItems={"center"} >

                        <Title text="Meus anúncios" mr={1} mb={1} fontSize={12} color={'blue.secondary'}/>
                        <ArrowRight size={16} color="#364D9D" />
                    </HStack>
                </HStack>

                <VStack mt={8}>
                    <Subtitle text="Compre produtos variados" mb={3} />

                    <HStack background={'white'} alignItems={'center'}borderRadius={5} >

                        <Input placeholder="Buscar anúncio" flex={1} borderColor={'transparent'} _focus={{bg: 'transparent', borderColor: 'gray.300' }}/>

                        <ButtonNative background={'transparent'} _pressed={ {bg:'gray.200'} } my={1}>
                        <MagnifyingGlass weight="bold" size={20} />
                        </ButtonNative>

                        <View w={0.4}  h={'50%'} backgroundColor={'gray.400'} />

                        <ButtonNative  background={'transparent'} _pressed={ {bg:'gray.200'} } m={1}>
                        <Sliders weight="bold" size={20} />
                        </ButtonNative>
                      

                    </HStack>
                </VStack>

            </VStack>
        </ScrollView >
    )
}