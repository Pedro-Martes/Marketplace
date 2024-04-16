
import { Center, HStack, Input, ScrollView, VStack, Text, Button as ButtonNative, View, FlatList, Divider, Modal, Checkbox, Radio } from "native-base";
import { Title } from "../components/title";
import { SafeAreaView } from "react-native";
import { UserImage } from "../components/userImage";
import { Subtitle } from "../components/subtitle";
import { Button } from "../components/button";
import { ArrowFatLineRight, ArrowRight, MagnifyingGlass, Plus, Sliders, SmileyMeh, Tag, WhatsappLogo } from "phosphor-react-native";
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
import ToggleSwitch from "toggle-switch-react-native";
import { Check } from "../components/checkbox";
import { RadioButton } from "../components/radio";

type FormSearch = {
    query?: string | null;
    is_new: string;
    accept_trade: string;
    payment_methods?: any[] | null;
}


const searchSchema = yup.object({
    query: yup.string().nullable(),
    is_new: yup.string().default(null),
    accept_trade: yup.string().default('false'),
    payment_methods: yup.array().default(null).nullable(),
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


    async function handleSearchProducts(search: FormSearch) {
        const trade = search.accept_trade === 'false' ? null : 'true'

        setIsLoading(true)
        try {
            const response = await api.get('/products', {
                params: {
                    query: search.query,
                    accept_trade: trade,
                    is_new: search.is_new === 'all' ? null : search.is_new,
                    payment_methods: search.payment_methods ? search.payment_methods : null,
                }
            })
            const respinseWithActiveProduct = response.data.map(product => ({ ...product, is_active: 'true' }))
            return setProduct(respinseWithActiveProduct)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
            setOpenModal(false)
        }
    }

   
console.log(user.products);

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
                                    value={value ? value : null}
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
                                                onPress={() => setOpenModal(true)}
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

                {Products.length == 0 ?

                    <Center flex={1}>
                        <HStack>

                            <SmileyMeh color="#C4C4CC" />
                            <Subtitle ml={2} text="Nenhum Produto Encontrado" color={'#C4C4CC'} />
                        </HStack>
                    </Center>
                    :

                    <FlatList
                        data={Products}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        renderItem={({ item }) => (
                            item ?

                                <ProductCard
                                    data={item}
                                    onPress={() => handleProduct(item.id)}

                                />
                                :
                                <Title text="Ops, não foi encontrado nenhum produto ainda..🤗" />

                        )}
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{
                            paddingBottom: 20
                        }}
                    />
                }
                <Modal
                    isOpen={openModel}
                    avoidKeyboard
                    onClose={() => setOpenModal(false)}
                    size={'lg'}
                    bottom={0}
                    w={"100%"}

                    justifyContent={'flex-end'}
                    animationPreset="slide"

                >
                    <Modal.Content
                        w={"100%"}

                    >
                        <Modal.CloseButton />


                        <Modal.Body       >
                            <Center>

                                <Divider h={1} w={'20%'} borderRadius={2} />
                            </Center>

                            <Text fontWeight={'bold'} fontSize={18} color={'gray.700'} mt={8}>Filtrar anúncios</Text>

                            <Controller
                                control={control}
                                name="is_new"
                                render={({ field: { onChange, value = 'all' } }) => (
                                    <>
                                        <Subtitle text="Condição" mt={4} />
                                        <Radio.Group
                                            name="is_new"
                                            value={value}
                                            flex={1}
                                            onChange={onChange}
                                        >
                                            <HStack>
                                                <RadioButton
                                                    value="all"
                                                    title="Todos"

                                                />
                                                <RadioButton
                                                    value="true"
                                                    title="Novo"

                                                />
                                                <RadioButton
                                                    value="false"
                                                    title="Usados"

                                                />

                                            </HStack>
                                        </Radio.Group>
                                    </>)}
                            />

                            <Controller
                                control={control}
                                name="accept_trade"
                                render={({ field: { onChange, value = false } }) => (
                                    <>
                                        <Subtitle text="Aceita troca?" mt={4} />
                                        <ToggleSwitch
                                            isOn={value}
                                            onColor={'#647AC7'}
                                            offColor={'#d9d8da'}
                                            onToggle={onChange}
                                            animationSpeed={200}
                                        />
                                    </>
                                )}
                            />

                            <Controller
                                control={control}
                                name="payment_methods"
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Subtitle text="Meios de pagamento aceitos" mt={3} />

                                        <Checkbox.Group
                                            value={value}
                                            onChange={onChange}
                                        >

                                            <Check
                                                value={'boleto'}
                                                title={"Boleto"}
                                                mt={3}
                                            />
                                            <Check
                                                value={"pix"}
                                                title={"Pix"}
                                                mt={3}
                                            />

                                            <Check
                                                value={"cash"}
                                                title={"Dinheiro"}
                                                mt={3}
                                            />
                                            <Check
                                                value={"card"}
                                                title={"Cartão de Crédito"}
                                                mt={3}
                                            />

                                        </Checkbox.Group>
                                    </>
                                )}
                            />

                            <HStack mt={2}>

                                <Button
                                    flex={1}
                                    type="gray"
                                    mr={2}
                                    onPress={() => {
                                        handleSearchProducts({
                                            query: null,
                                            is_new: 'all',
                                            accept_trade: 'false',
                                            payment_methods: null
                                        })
                                    }}
                                >
                                    Limpar  filtros

                                </Button>

                                <Button
                                    flex={1}
                                    type="black"
                                    onPress={handleSubmit(handleSearchProducts)}
                                >
                                    Aplicar

                                </Button>
                            </HStack>


                        </Modal.Body>

                    </Modal.Content>

                </Modal>

            </VStack>
        </ >
    )
}