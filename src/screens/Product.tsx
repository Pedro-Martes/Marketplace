import { View, FlatList, HStack, Image, VStack, Text, Center, ScrollView } from "native-base";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, QrCode, WhatsappLogo } from "phosphor-react-native";
import { useRef, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Subtitle } from "../components/subtitle";
import { Title } from "../components/title";
import { Button } from "../components/button";


export function Product() {
    const widthScreen = Dimensions.get('window')
    const [imageCounter, setImageCounter] = useState(1);

   

    const product = {
        id: 1,
        ImageUri: [{
            imgId: 1,
            uri: 'https://source.unsplash.com/random/800x600'
        },
        {
            imgId: 2,
            uri: 'https://source.unsplash.com/random/800x600'
        },
        {
            imgId: 3,
            uri: 'https://source.unsplash.com/random/800x600'
        },

        ],
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


    }




    return (
        <VStack flex={1} py={8} bg={'gray.200'} paddingY={8}>

            <ScrollView >

                <TouchableOpacity style={{ margin: 8, }}  >
                    <ArrowLeft />

                </TouchableOpacity>
                <Center>
                    <FlatList
                        data={product.ImageUri}
                        keyExtractor={item => item.imgId.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <Image
                                        source={{ uri: item.uri }}
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
                            source={{ uri: 'https://source.unsplash.com/random/800x600' }}
                            alt=" Avatar Image"
                            size={12}
                            rounded='full'
                            borderWidth={3}
                            borderColor={'blue.primary'}
                            mr={3}
                        />
                        <Subtitle text={product.seller} />

                    </HStack>

                    <View bg={'gray.250'} rounded={'full'} w={'20%'} mt={8}>
                        <Text textAlign={'center'}>{product.status}</Text>
                    </View>

                    <HStack >

                        <Title text={product.title} flex={1} fontSize={20} />
                        <Text fontSize={20} fontWeight={'bold'} color={'blue.primary'}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>

                    </HStack>

                    <Subtitle text={product.description} mt={3} />
                    <HStack mt={8} mb={4}>
                        <Subtitle text="Aceita Troca?" fontWeight={'bold'} mr={2} />
                        <Subtitle text={product.troca ? 'Sim' : 'Não'} />
                    </HStack>

                    <Subtitle text="Meios de Pagamento:" fontWeight={'bold'} />
                    {product.boleto ?
                        <HStack mt={2} alignItems={'center'}>
                            <Barcode size={18} />
                            <Subtitle text="Boleto" ml={1} />
                        </HStack>
                        : null
                    }

                    {product.pix ?
                        <HStack mt={2} alignItems={'center'}>
                            <QrCode size={18} />
                            <Subtitle text="pix" ml={1} />
                        </HStack>
                        : null
                    }

                    {product.dinheiro ?
                        <HStack mt={2} alignItems={'center'}>
                            <Money size={18} />
                            <Subtitle text="Dinheiro" ml={1} />
                        </HStack>
                        : null
                    }

                    {product.credito ?
                        <HStack mt={2} alignItems={'center'}>
                            <CreditCard size={18} />
                            <Subtitle text="Cartão de Crédito" ml={1} />
                        </HStack>
                        : null
                    }

                    {product.deposito ?
                        <HStack mt={2} alignItems={'center'} >
                            <Bank size={18} />
                            <Subtitle text=" Depósito em Conta" ml={1} />
                        </HStack>
                        : null
                    }
                </View>
            </ScrollView>
            <HStack position={'absolute'} alignItems={'center'} background={'white'} flex={1} bottom={0} py={3} px={4}>
                <Text color={'blue.primary'} fontSize={14} mb={0.5}>R$</Text>
                <Title color={'blue.primary'} fontSize={24} text={`${product.price.toFixed(2).replace('.', ',')}`} flex={1} />

                <HStack background={'blue.primary'} alignItems={'center'} p={1} borderRadius={6} >


                    <WhatsappLogo weight="fill" color="#ffff" />
                    <Button display={'flex'} flexDirection={'row'} mt={0}  >
                        Entrar em contato
                    </Button>
                </HStack>
            </HStack>


        </VStack>
    )
}