import defaultImage from "../assets/iconUser.png";
import { Center, HStack, ScrollView, VStack } from "native-base";
import { Title } from "../components/title";
import { SafeAreaView } from "react-native";
import { UserImage } from "../components/userImage";
import { Subtitle } from "../components/subtitle";
import { Button } from "../components/button";
import { ArrowFatLineRight, Plus, Tag } from "phosphor-react-native";


interface HomeProps {

}
export function Home(props: HomeProps) {
    const PHOTO_SIZE = 45


    return (
        <ScrollView>
            <Center px={26}>

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

                            <Title text="Criar Anúncio" />
                            <Plus size={13} color="white" />
                        </VStack>
                    </Button>

                </HStack>
            <Subtitle text="Seus produtos anunciados para venda" />

            <HStack background={'blue.primary'} paddingY={12} px={16} >
                <Tag/>

                <VStack>
                    <Title text="4" />
                    <Subtitle  text="Anúncios" />
                </VStack>

                <Title text="Meus anúncios" />
                <ArrowFatLineRight  />
            </HStack>

            </Center>
        </ScrollView >
    )
}