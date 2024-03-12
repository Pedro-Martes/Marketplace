import { HStack, Text, VStack, Image, FlatList, TextArea, ScrollView, Radio, useToast, Center } from "native-base";
import { ArrowLeft, ArrowRight, Plus, XCircle } from "phosphor-react-native";
import { Title } from "../components/title";
import { TouchableOpacity, View } from "react-native";
import { Subtitle } from "../components/subtitle";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useState } from "react";
import { Switch } from "../components/switch";
import { Check } from "../components/checkbox";
import ToggleSwitch, { ToggleSwitchProps } from "toggle-switch-react-native"
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useAuth } from "../hooks/useAuth";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type ProductFormDataProps = {
    name: string;
    description?: string | null;
    is_new: boolean;
    price: string;
    // accept_trade: boolean;
    // payment_methods: string[];
}

const ProductSchema = yup.object({
    name: yup.string().required('Nome obrigatório'),
    description: yup.string().nullable(),
    is_new: yup.boolean().required('Status obrigatório').default(true),
    price: yup.string().required('Preço obrigatório'),
    //accept_trade: yup.boolean(),
    // payment_methods: yup.array().required('Selecione no mínimo um método de pagamento.'),
})

export function CreateNewAdvertisement() {
    const PHOTO_SIZE = 100

    const ProductImages = ['https://source.unsplash.com/random/802x602', 'add']
    const [status, setStatus] = useState('Novo')
    const [trade, setTrade] = useState(false);
    const { user } = useAuth()
    const toast = useToast()

    const { control, handleSubmit, formState: { errors } } = useForm<ProductFormDataProps>({
        resolver: yupResolver(ProductSchema)
    })

    async function handleProducPhotoSelected() {
        try {
            const imageSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [PHOTO_SIZE, PHOTO_SIZE],
                quality: 1,
            })

            if (imageSelected.canceled) {
                return;
            }

            if (imageSelected.assets[0].uri) {
                const imageInfo = await FileSystem.getInfoAsync(imageSelected.assets[0].uri);

            }

        } catch (error) {

        }
    }

    function handleNewProduct(props: ProductFormDataProps) {
        console.log(JSON.stringify(props));
    }

    return (
        <ScrollView bg={'gray.200'} flex={1}>
            <VStack px={6} mb={8} >

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
                        mr={1.5}
                        scrollEnabled={false}

                        renderItem={({ item }) => (
                            item !== 'add' ?
                                <View style={{ width: PHOTO_SIZE, marginRight: 8 }}>
                                    <Image
                                        source={{ uri: item }}
                                        alt=''
                                        w={PHOTO_SIZE}
                                        h={PHOTO_SIZE}
                                        rounded={6}

                                    />
                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            right: 0,



                                        }}
                                    >
                                        <XCircle weight="fill" color="#3E3A40" />
                                    </TouchableOpacity>
                                </View>
                                : <>
                                    {
                                        ProductImages.length < 4 ?


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
                                </>
                        )}
                        contentContainerStyle={{ flexGrow: 1, }}
                    />
                </HStack>

                <Title text="Sobre o Produto" mt={'32px'} mb={3} />

                {/* ⬇ Name Input ⬇ */}
                <Controller
                    control={control}
                    name='name'
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Título do anúncio"
                            onChangeText={onChange}
                            value={value}
                            isRequired
                            errorMessage={errors.name?.message}

                        />
                    )}
                />

                {/* ⬇ Description Input ⬇ */}
                <Controller
                    control={control}
                    name='description'
                    render={({ field: { onChange, value } }) => (
                        <TextArea
                            autoCompleteType={false}
                            placeholder="Descrição completa do produto (opcional)"
                            mt={3}
                            backgroundColor={'white'}
                            borderWidth={0}
                            fontSize={'md'}
                            fontFamily={'body'}
                            placeholderTextColor={'gray.300'}
                            _focus={{
                                borderWidth: '1px',
                                borderColor: 'gray.300',
                                bg: "white"
                            }}
                            onChangeText={onChange}
                            value={value}

                        />
                    )}
                />

                {/* ⬇ Is_new Radio Buttons ⬇ */}
                <Controller
                    control={control}
                    name='is_new'
                    render={({ field: { onChange, value = 'true' } }) => (
                        <Radio.Group
                            name="is_new"
                            value={value}
                            flex={1}
                            onChange={onChange}

                        >


                            <HStack>
                                <Radio

                                    value='true'
                                    mt={3}
                                    alignItems={'center'}
                                    _text={{ color: 'gray.500' }}
                                    _icon={{
                                        color: 'blue.primary',
                                        borderColor: 'blue.primary',
                                        size: 3,
                                    }}
                                    _checked={{
                                        borderColor: 'blue.primary',

                                    }}

                                >
                                    <Text mt={3} color={'gray.400'} fontSize={16} fontFamily={'body'} mr={'20px'}>Produto Novo</Text>
                                </Radio>

                                <Radio
                                    value='false'
                                    mt={3}
                                    alignItems={'center'}
                                    _text={{ color: 'gray.500' }}
                                    _icon={{
                                        color: 'blue.primary',
                                        borderColor: 'blue.primary',
                                        size: 3,
                                    }}
                                    _checked={{
                                        borderColor: 'blue.primary',

                                    }}
                                    ml={'20px'}

                                >

                                    <Text mt={3} color={'gray.400'} fontSize={16} fontFamily={'body'} >Produto Usado</Text>

                                </Radio>

                            </HStack>
                        </Radio.Group>
                    )}

                />


                {/* ⬇ Price Input ⬇ */}
                <Title text="Venda" mt={'32px'} />
                <Title text={errors.price?.message ? errors.price?.message : ''} color={'red.500'} />
                <Controller
                    control={control}
                    name="price"
                    render={({ field: { onChange, value } }) => (
                        <HStack background={'white'} alignItems={'center'} rounded={10} px={5} mt={3}>

                            <Title text="R$" fontWeight={'hairline'} mt={0} />
                            <Input
                                placeholder={"Valor do produto"}
                                keyboardType="decimal-pad"
                                onChangeText={onChange}
                                value={value}

                            />


                        </HStack>
                    )}

                />
                {/* <Controller
            
            /> */}







                <Title text="Aceita troca?" mt={3} mb={3} />


                <ToggleSwitch
                    isOn={trade}
                    onColor={'#647AC7'}
                    offColor={'#d9d8da'}
                    onToggle={isOn => setTrade(isOn)}
                    animationSpeed={200}



                />

                <Title text="Meios de pagamento aceitos" mt={3} />
                <Check value="Boleto" mt={3} />
                <Check value="Pix" mt={3} />
                <Check value="Dinheiro" mt={3} />
                <Check value="Cartão de Crédito" mt={3} />
                <Check value="Boleto" mt={3} />


            </VStack >
            <HStack background={'white'} flex={1} py={6} justifyContent={'center'}>
                <Button type="gray" mr={6} mt={0} py={3} px={12}>Cancelar</Button>
                <Button type="black" mt={0} py={3} px={12} onPress={handleSubmit(handleNewProduct)}>Avançar</Button>

            </HStack>
        </ScrollView>
    )
}