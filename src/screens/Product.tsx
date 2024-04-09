import { View, FlatList, HStack, Image, VStack, Text, Center, ScrollView } from "native-base";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, QrCode, WhatsappLogo } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Linking, TouchableOpacity } from "react-native";
import { Subtitle } from "../components/subtitle";
import { Title } from "../components/title";
import { Button } from "../components/button";
import { ProductPropsDTO } from "../dtos/ProductDTO";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { api } from "../services/api";
import { Loading } from "../components/loading";
import { IconButton } from "../components/iconButton";
import { ProductSkeleton } from "../components/productSkeleton";

interface RouteParms {
    id: string;
}
export function Product() {
    const widthScreen = Dimensions.get('window')
    const [imageCounter, setImageCounter] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<ProductPropsDTO>();
    const route = useRoute()
    const { id } = route.params as RouteParms;
    const navigator = useNavigation<AppNavigatorRoutesProps>()

    async function fetchProduct() {
        setIsLoading(true)
        try {
            const ProductData = await api.get(`/products/${id}`)
            setProduct(ProductData.data)

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    function handleGoBack() {
        navigator.goBack()
    }
    
    function handleGoToWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=55${product!.user.tel}&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20o%20produto%20${product!.name}`)
    }
    useEffect(() => {
        fetchProduct()
    }, [id])

    if (isLoading) {
        return (
            <ProductSkeleton />
        )
    }
    return (
        <VStack flex={1} py={8} bg={'gray.200'} paddingY={8}>

            <ScrollView >

                <TouchableOpacity style={{ margin: 8, }} onPress={handleGoBack} >
                    <ArrowLeft />

                </TouchableOpacity>
                <Center>
                    <FlatList
                        data={product?.product_images}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <View background={'gray.800'} position={'absolute'} zIndex={1} py={1} px={2} rounded={'full'} opacity={0.5} bottom={1} m={2} >
                                        <Text textAlign={'center'} color={'white'} fontWeight={'bold'} >{index + 1 + '/' + product!.product_images.length}	</Text>

                                    </View>
                                    <Image
                                        source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }}
                                        alt="Product image"
                                        w={widthScreen.width}
                                        h={280}

                                    />
                                </>
                            )
                        }
                        }

                    />
                </Center>



                <View px={6} mb={12}>


                    <HStack mt={5} alignItems={'center'}>
                        <Image
                            source={{ uri: `${api.defaults.baseURL}/images/${product!.user.avatar}` }}
                            alt="Avatar Image"
                            size={12}
                            rounded='full'
                            borderWidth={3}
                            borderColor={'blue.primary'}
                            mr={3}
                        />
                        <Subtitle text={product!.user.name} />

                    </HStack>

                    <View bg={'gray.250'} rounded={'full'} w={'20%'} mt={8}>
                        <Text textAlign={'center'}>{product?.is_new ? 'Novo' : 'Usado'}</Text>
                    </View>

                    <HStack >

                        <Title text={product!.name} flex={1} fontSize={20} />
                        <Text fontSize={20} fontWeight={'bold'} color={'blue.primary'}>R$ {product?.price}</Text>

                    </HStack>

                    <Subtitle text={product!.description} mt={3} />
                    <HStack mt={8} mb={4}>
                        <Subtitle text="Aceita Troca?" fontWeight={'bold'} mr={2} />
                        <Subtitle text={product?.accept_trade ? 'Sim' : 'Não'} />
                    </HStack>

                    <Subtitle text="Meios de Pagamento:" fontWeight={'bold'} />
                    {product!.payment_methods.some((method: any) => method.name === 'Boleto') ?
                        <HStack mt={2} alignItems={'center'}>
                            <Barcode size={18} />
                            <Subtitle text="Boleto" ml={1} />
                        </HStack>
                        : null
                    }

                    {product!.payment_methods.some((method: any) => method.name === 'Pix') ?
                        <HStack mt={2} alignItems={'center'}>
                            <QrCode size={18} />
                            <Subtitle text="Pix" ml={1} />
                        </HStack>
                        : null
                    }

                    {product!.payment_methods.some((method: any) => method.name === 'Dinheiro') ?
                        <HStack mt={2} alignItems={'center'}>
                            <Money size={18} />
                            <Subtitle text="Dinheiro" ml={1} />
                        </HStack>
                        : null
                    }

                    {product!.payment_methods.some((method: any) => method.name === 'Cartão de Crédito') ?
                        <HStack mt={2} alignItems={'center'}>
                            <CreditCard size={18} />
                            <Subtitle text="Cartão de Crédito" ml={1} />
                        </HStack>
                        : null
                    }
                </View>
            </ScrollView>

            <HStack position={'absolute'} alignItems={'center'} background={'white'} flex={1} bottom={0} py={3} px={4}>
                <Text color={'blue.primary'} fontSize={14} mb={0.5}>R$</Text>
                <Title color={'blue.primary'} fontSize={24} text={`${product!.price}`} flex={1} />

               <IconButton w={'50%'} mt={0}px={2} onPress={handleGoToWhatsApp}>
                <WhatsappLogo color="white" />
                <Title text="Entrar em Contato" color={'white'} ml={2}/>
               </IconButton>

                </HStack>


        </VStack>
    )
}