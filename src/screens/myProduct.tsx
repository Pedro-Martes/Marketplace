import { View, FlatList, HStack, Image, VStack, Text, Center, ScrollView } from "native-base";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, Pencil, PencilSimple, PencilSimpleLine, Power, QrCode, Trash, WhatsappLogo } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Subtitle } from "../components/subtitle";
import { Title } from "../components/title";
import { Button } from "../components/button";
import { Product } from "./Product";
import { useRoute } from "@react-navigation/native";
import { api } from "../services/api";


export function MyProduct() {
    const widthScreen = Dimensions.get('window')
    const [imageCounter, setImageCounter] = useState(1);
    const route = useRoute()
    const Props = route.params as any;
    const [product, setProduct] = useState();

  

    async function fetchProduct(){
        try {
            console.log(Props);
            const response = await api.get(`/products/${Props}`)
            setProduct(response.data)
            console.log(product);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchProduct()
    }, [])

    // return (
    //     <VStack flex={1} py={8} bg={'gray.200'} paddingY={8}>

    //         <ScrollView >

    //             <HStack>


    //                 <TouchableOpacity style={{ margin: 10, flex: 1 }} >
    //                     <ArrowLeft />

    //                 </TouchableOpacity>

    //                 <TouchableOpacity style={{ margin: 10, }}  >
    //                     <PencilSimpleLine />
    //                 </TouchableOpacity>
    //             </HStack>

    //             <Center>
    //                 <Text position={'absolute'} color={'white'} zIndex={2} fontWeight={'bold'} fontSize={18} display={product.ativo ? 'none' : 'flex'} >Anúncio pausado</Text>
    //                 <View w={'100%'} h={'100%'} position={'absolute'} zIndex={1} bg={'gray.700'} opacity={0.5} display={product.ativo ? 'none' : 'flex'} />


    //                 <FlatList
    //                     data={product.ImageUri}
    //                     keyExtractor={item => item}
    //                     horizontal={true}
    //                     showsHorizontalScrollIndicator={false}
    //                     pagingEnabled={true}
    //                     renderItem={({ item, index }) => {
    //                         return (
    //                             <>

    //                                 <View background={'gray.800'} position={'absolute'} zIndex={1} py={1} px={2} rounded={'full'} opacity={0.5} bottom={1} m={2} >
    //                                     <Text textAlign={'center'} color={'white'} fontWeight={'bold'} >{index + 1 + '/' + product.ImageUri.length}	</Text>

    //                                 </View>
    //                                 <Image
    //                                     source={{ uri: item }}
    //                                     alt="Product image"
    //                                     w={widthScreen.width}
    //                                     h={280}

    //                                 />
    //                             </>
    //                         )
    //                     }
    //                     }

    //                 />
    //             </Center>



    //             <View px={6} mb={12}>


    //                 <HStack mt={5} alignItems={'center'}>
    //                     <Image
    //                         source={{ uri: 'https://source.unsplash.com/random/800x600' }}
    //                         alt=" Avatar Image"
    //                         size={12}
    //                         rounded='full'
    //                         borderWidth={3}
    //                         borderColor={'blue.primary'}
    //                         mr={3}
    //                     />
    //                     <Subtitle text={product.seller} />

    //                 </HStack>

    //                 <View bg={'gray.250'} rounded={'full'} w={'20%'} mt={8}>
    //                     <Text textAlign={'center'}>{product.status}</Text>
    //                 </View>

    //                 <HStack >

    //                     <Title text={product.title} flex={1} fontSize={20} />
    //                     <Text fontSize={20} fontWeight={'bold'} color={'blue.primary'}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>

    //                 </HStack>

    //                 <Subtitle text={product.description} mt={3} />
    //                 <HStack mt={8} mb={4}>
    //                     <Subtitle text="Aceita Troca?" fontWeight={'bold'} mr={2} />
    //                     <Subtitle text={product.troca ? 'Sim' : 'Não'} />
    //                 </HStack>

    //                 <Subtitle text="Meios de Pagamento:" fontWeight={'bold'} />
    //                 {product.boleto ?
    //                     <HStack mt={2} alignItems={'center'}>
    //                         <Barcode size={18} />
    //                         <Subtitle text="Boleto" ml={1} />
    //                     </HStack>
    //                     : null
    //                 }

    //                 {product.pix ?
    //                     <HStack mt={2} alignItems={'center'}>
    //                         <QrCode size={18} />
    //                         <Subtitle text="pix" ml={1} />
    //                     </HStack>
    //                     : null
    //                 }

    //                 {product.dinheiro ?
    //                     <HStack mt={2} alignItems={'center'}>
    //                         <Money size={18} />
    //                         <Subtitle text="Dinheiro" ml={1} />
    //                     </HStack>
    //                     : null
    //                 }

    //                 {product.credito ?
    //                     <HStack mt={2} alignItems={'center'}>
    //                         <CreditCard size={18} />
    //                         <Subtitle text="Cartão de Crédito" ml={1} />
    //                     </HStack>
    //                     : null
    //                 }

    //                 {product.deposito ?
    //                     <HStack mt={2} alignItems={'center'} >
    //                         <Bank size={18} />
    //                         <Subtitle text=" Depósito em Conta" ml={1} />
    //                     </HStack>
    //                     : null
    //                 }
    //             </View>
    //         </ScrollView>

    //         <VStack position={'absolute'} alignItems={'center'} background={'white'} w={'100%'} bottom={0} py={3} px={4}>


    //             <HStack background={product.ativo ? 'gray.700' : 'blue.primary'} alignItems={'center'} justifyContent={'center'} p={1} borderRadius={6} w={'100%'}   >

    //                 <Power weight="regular" color="#ffff" />
    //                 <Button display={'flex'} mt={0} type={product.ativo ? 'black' : 'blue'} >
    //                     {product.ativo ? 'Desativar anúncio' : 'Ativar anúncio'}
    //                 </Button>
    //             </HStack>

    //             <HStack background={'gray.primary'} alignItems={'center'} justifyContent={'center'} p={1} borderRadius={6} mt={2} w={'100%'}  >

    //                 <Trash weight="regular" color="#000" />
    //                 <Button display={'flex'} mt={0} type="gray" >
    //                     Excluir anúncio
    //                 </Button>
    //             </HStack>
    //         </VStack>


    //     </VStack>
    // )
}