import defaultImage from "../assets/iconUser.png";
import { Center, HStack, Input, ScrollView, VStack, Text, Button as ButtonNative, View, FlatList } from "native-base";
import { Title } from "../components/title";
import { SafeAreaView } from "react-native";
import { UserImage } from "../components/userImage";
import { Subtitle } from "../components/subtitle";
import { Button } from "../components/button";
import { ArrowFatLineRight, ArrowRight, MagnifyingGlass, Plus, Sliders, Tag } from "phosphor-react-native";
import { ProductCard } from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";



export function Home() {
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const PHOTO_SIZE = 45

    const { user, logOut } = useAuth()


    const Products = [
        {
            id: 1,
            ImageUri: ['https://source.unsplash.com/random/800x600',
                'https://source.unsplash.com/random/800x600',
                'https://source.unsplash.com/random/800x600'],
            title: 'Tênis Vermelho',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A consequuntur cum ducimus possimus. Voluptatum aliquam adipisci labore dignissimos quis saepe illum, molestias excepturi, nesciunt minima quos ratione soluta sequi cum?',
            seller: 'Vinícius Morais',
            status: 'Novo',
            price: 100.90,
            troca: true,
            boleto: true,
            pix: true,
            dinheiro: true,
            deposito: true,
            credito: true,
            ativo: false,

        },
        {
            id: 2,
            ImageUri: ['https://source.unsplash.com/random/800x600',
                'https://source.unsplash.com/random/800x600',
                'https://source.unsplash.com/random/800x600'],

            title: 'Bicicleta',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A consequuntur cum ducimus possimus. Voluptatum aliquam adipisci labore dignissimos quis saepe illum, molestias excepturi, nesciunt minima quos ratione soluta sequi cum?',
            seller: 'Maria Souza',
            status: 'usado',
            price: 250.90,
            troca: true,
            boleto: true,
            pix: true,
            dinheiro: true,
            deposito: true,
            credito: true,
            ativo: true,


        }
    ]

  

    function handleNewAd() {
        console.log('objects.handleNewAd()');
        navigation.navigate('CreateNewAd');
    }


    return (
        <>
            <VStack flex={1} px={26} background={'gray.200'}>

                <HStack mt={16} alignItems={'center'} w="100%">
                    <UserImage
                        source={{ uri: `http://192.168.1.48:3333/images/${user.avatar}` }}
                        alt=''
                        w={PHOTO_SIZE}
                        h={PHOTO_SIZE}
                    />
                    <VStack flex={1} >
                        <Subtitle text={`Bem Vindo(a),`} />
                        <Title text={`${user.name}`} />


                    </VStack>
                    <Button type="black" onPress={ logOut}>
                        <VStack>

                            <Title text="+ Criar Anúncio" color={'white'} fontSize={12} />

                        </VStack>
                    </Button>

                </HStack>
                <Subtitle text="Seus produtos anunciados para venda" mt={5} mb={3} />

                <HStack background={'#e0e1eb'} paddingY={8} px={3} borderRadius={16} >
                    <HStack flex={1} alignItems={'center'} >

                        <Tag color="#364D9D" />
                        <VStack ml={1} marginLeft={3} >
                            <Title text="4" fontSize={20} />
                            <Subtitle text="Anúncios" />
                        </VStack>

                    </HStack>

                    <HStack alignItems={"center"} >

                        <Title text="Meus anúncios" mr={1} mb={1} fontSize={12} color={'blue.secondary'} />
                        <ArrowRight size={16} color="#364D9D" />
                    </HStack>
                </HStack>

                <VStack mt={8}>
                    <Subtitle text="Compre produtos variados" mb={3} />

                    <HStack background={'white'} alignItems={'center'} borderRadius={5} >

                        <Input placeholder="Buscar anúncio" flex={1} borderColor={'transparent'} _focus={{ bg: 'transparent', borderColor: 'gray.300' }} />

                        <ButtonNative background={'transparent'} _pressed={{ bg: 'gray.200' }} my={1}>
                            <MagnifyingGlass weight="bold" size={20} />
                        </ButtonNative>

                        <View w={0.4} h={'50%'} backgroundColor={'gray.400'} />

                        <ButtonNative background={'transparent'} _pressed={{ bg: 'gray.200' }} m={1}>
                            <Sliders weight="bold" size={20} />
                        </ButtonNative>


                    </HStack>
                </VStack>


                <FlatList
                    data={Products}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (


                        <ProductCard
                            data={item}

                        />

                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{
                        paddingBottom: 20
                    }}
                />



            </VStack>
        </ >
    )
}