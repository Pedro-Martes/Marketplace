import { View, FlatList, HStack, Image, VStack, Text, Center, ScrollView } from "native-base";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, PaintBrushHousehold, QrCode, WhatsappLogo } from "phosphor-react-native";
import { useRef, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Subtitle } from "../components/subtitle";
import { Title } from "../components/title";
import { Button } from "../components/button";
import { ProductPropsDTO } from "../dtos/ProductDTO";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { AppNavigatorRoutesProps } from "../routes/app.routes";


export function ProductPreview() {
    const widthScreen = Dimensions.get('window').width
    const [imageCounter, setImageCounter] = useState(1);
    const route = useRoute()
    const Props = route.params as ProductPropsDTO
    const navigator = useNavigation<AppNavigatorRoutesProps>()
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(false)



    async function handlePublishProduct() {
        setIsLoading(true)
        try {

            const product = await api.post("/products", {

                name: Props.name,
                description: Props.description,
                is_new: Props.is_new,
                price: Props.price,
                accept_trade: Props.accept_trade,
                payment_methods: Props.payment_methods,
            })

            //Upload Image
            
            
            const ImagesData = new FormData();
            Props.product_images.forEach((image) => {
                const ImageFile = {
                    ...image,
                    name: `${user.name}_${image.name}`,
                } as any
                ImagesData.append('images', ImageFile)
            })

            ImagesData.append('product_id', product.data.id);
            console.log(ImagesData);
            const imageUpload = await api.post("products/images",ImagesData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

           navigator.navigate('MyAdvertisement')
            
        } catch (error) {
            
            return console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    function handleGoBack() {
        navigator.goBack()
    }

    return (
        <VStack flex={1} bg={'gray.200'} >
            <Center background={'blue.primary'} p={8}>
                <Title text="Pré visualização do anúncio" color={'white'} />
                <Subtitle text="É assim que seu produto vai aparecer!" color={'gray.100'} />

            </Center>
            <ScrollView >

                <Center>
                    <FlatList
                        data={Props.product_images}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        renderItem={({ item }) => {
                            if (item == 'add') {
                                return null;
                            } else {

                                return (
                                    <>
                                        <Image
                                            source={{ uri: item.uri }}
                                            alt="Product image"
                                            w={widthScreen}
                                            h={280}

                                        />
                                    </>
                                )
                            }
                        }
                        }

                    />
                </Center>



                <View px={6} mb={12}>


                    <HStack mt={5} alignItems={'center'}>
                        <Image
                            source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
                            alt=" Avatar Image"
                            size={12}
                            rounded='full'
                            borderWidth={3}
                            borderColor={'blue.primary'}
                            mr={3}
                        />
                        <Subtitle text={user.name ? user.name : ''} />

                    </HStack>

                    <View bg={'gray.250'} rounded={'full'} w={'20%'} mt={8}>
                        <Text textAlign={'center'}>{Props.is_new ? 'Novo' : 'Usado'}</Text>
                    </View>

                    <HStack >

                        <Title text={Props.name} flex={1} fontSize={20} />
                        <Text fontSize={20} fontWeight={'bold'} color={'blue.primary'}>R$ {Props.price}</Text>

                    </HStack>

                    <Subtitle text={`${Props.description}`} mt={3} />
                    <HStack mt={8} mb={4}>
                        <Subtitle text="Aceita Troca?" fontWeight={'bold'} mr={2} />
                        <Subtitle text={Props.accept_trade ? 'Sim' : 'Não'} />
                    </HStack>

                    <Subtitle text="Meios de Pagamento:" fontWeight={'bold'} />
                    {Props.payment_methods.includes('boleto') ?
                        <HStack mt={2} alignItems={'center'}>
                            <Barcode size={18} />
                            <Subtitle text="Boleto" ml={1} />
                        </HStack>
                        : null
                    }

                    {Props.payment_methods.includes('pix') ?
                        <HStack mt={2} alignItems={'center'}>
                            <QrCode size={18} />
                            <Subtitle text="pix" ml={1} />
                        </HStack>
                        : null
                    }

                    {Props.payment_methods.includes('cash') ?
                        <HStack mt={2} alignItems={'center'}>
                            <Money size={18} />
                            <Subtitle text="Dinheiro" ml={1} />
                        </HStack>
                        : null
                    }

                    {Props.payment_methods.includes('card') ?
                        <HStack mt={2} alignItems={'center'}>
                            <CreditCard size={18} />
                            <Subtitle text="Cartão de Crédito" ml={1} />
                        </HStack>
                        : null
                    }


                </View>
                <HStack alignItems={'center'} background={'white'} flex={1} py={6} px={1} justifyContent={'center'}>





                    <Button display={'flex'} mt={0} py={3} px={10} type="gray" mr={3} onPress={handleGoBack}  >
                        ←Voltar a editar
                    </Button>


                    <Button display={'flex'} mt={0} py={3} px={12} flexDirection={'row'} onPress={handlePublishProduct} isLoading={isLoading} >
                        🏷 Publicar
                    </Button>

                </HStack>
            </ScrollView>


        </VStack>
    )
}