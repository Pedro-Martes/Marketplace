
import { Center, HStack, Input, ScrollView, VStack, Text, Button as ButtonNative, View, FlatList, Divider, Modal } from "native-base";
import { Title } from "../components/title";
import { SafeAreaView } from "react-native";
import { UserImage } from "../components/userImage";
import { Subtitle } from "../components/subtitle";
import { Button } from "../components/button";
import { ArrowFatLineRight, ArrowRight, MagnifyingGlass, Plus, Sliders, Tag, WhatsappLogo } from "phosphor-react-native";
import { ProductCard } from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps, } from "../routes/app.routes";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import { ProductPropsDTO } from "../dtos/ProductDTO";
import * as yup from 'yup'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loading } from "../components/loading";

type FormSearch = {
    query: string;
}

const searchSchema = yup.object({
    query: yup.string().required('')
})

export function Home() {
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const PHOTO_SIZE = 45
    const [isLoading, setIsLoading] = useState(false)
    const { user, logOut } = useAuth()
    const [Products, setProduct] = useState<ProductPropsDTO[]>([])
    const [openModel, setOpenModal] = useState(false)

    const { control, handleSubmit } = useForm<FormSearch>({
        resolver: yupResolver(searchSchema)
    })

    function handleNewAd() {

        navigation.navigate('CreateNewAdvertisement');
    }

    function handleProduct(productId: string) {
        navigation.navigate('Product', {
            id: productId
        });
    }

    async function fetchProducts() {

        setIsLoading(true)
        try {
            const response = await api.get('/products')
            const respinseWithActiveProduct = response.data.map(product => ({ ...product, is_active: 'true' }))
            return setProduct(respinseWithActiveProduct)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }


    async function handleSearchProducts({ query }: FormSearch) {
        setIsLoading(true)
        try {
            const response = await api.get('/products', {
                params: {
                    query: query
                }
            })
            const respinseWithActiveProduct = response.data.map(product => ({ ...product, is_active: 'true' }))
            return setProduct(respinseWithActiveProduct)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }



    useEffect(() => {
        fetchProducts()
    }, [])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <VStack flex={1} px={26} background={'gray.200'}>

                <HStack mt={16} alignItems={'center'} w="100%">
                    <UserImage
                        source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
                        alt=''
                        w={PHOTO_SIZE}
                        h={PHOTO_SIZE}
                    />
                    <VStack flex={1} >
                        <Subtitle text={`Bem Vindo(a),`} />
                        <Title text={`${user.name}`} />


                    </VStack>
                    <Button type="black" onPress={() => handleNewAd()}>
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
                        <Controller
                            control={control}
                            name="query"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Buscar anúncio"
                                    flex={1}
                                    borderColor={'transparent'}
                                    _focus={{ bg: 'transparent', borderColor: 'gray.300' }}
                                    onChangeText={onChange}
                                    value={value}
                                    InputRightElement={
                                        <>
                                            <ButtonNative
                                                background={'transparent'}
                                                my={1}
                                                _pressed={{ bg: 'gray.200' }}
                                                onPress={handleSubmit(handleSearchProducts)}
                                            >

                                                <MagnifyingGlass weight="bold" size={20} />

                                            </ButtonNative>
                                            <Divider
                                                orientation="vertical"
                                                h={8}

                                            />

                                            <ButtonNative
                                                background={'transparent'}
                                                _pressed={{ bg: 'gray.200' }}
                                                m={1}
                                                onPress={()=> setOpenModal(true)}
                                            >

                                                <Sliders weight="bold" size={20} />
                                            </ButtonNative>


                                        </>
                                    }
                                />
                            )}
                        />






                    </HStack>
                </VStack>


                <FlatList
                    data={Products}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (


                        <ProductCard
                            data={item}
                            onPress={() => handleProduct(item.id)}

                        />

                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{
                        paddingBottom: 20
                    }}
                />

                <Modal
                    isOpen={openModel}
                    avoidKeyboard 
                    onClose={() => setOpenModal(false)}
                    size={'lg'}
                    bottom={0}
                    w={"100%"}
                    justifyContent={'flex-end'}
                >
                    <Modal.Content
                     w={"100%"}>
                        <Modal.CloseButton />
                        <Modal.Header>Filtros</Modal.Header>

                        <Modal.Body>
                            Teste de filtragem'
                            <Button onPress={() => setOpenModal(false)}>Fechar</Button>
                            <Input />
                        </Modal.Body>

                    </Modal.Content>

                </Modal>

            </VStack>
        </ >
    )
}