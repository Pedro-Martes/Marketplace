import { HStack, Text, VStack, Image, FlatList, TextArea, ScrollView, Radio } from "native-base";
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


export function CreateNewAdvertisement() {
    const PHOTO_SIZE = 100

    const ProductImages = ['https://source.unsplash.com/random/802x602', 'add']
    const [status, setStatus] = useState('Novo')
    const [trade, setTrade] = useState(false);
    const { user } = useAuth()

    
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

                <Title text="Sobre o Produto" mt={'32px'} />
                <Input placeholder="Título do anúncio" />

                {/* ⬇ TextArea Input ⬇ */}
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
                />

                {/* ⬇ Radio Buttons ⬇ */}
                <Radio.Group
                    name="Status"
                    value={status}
                    flex={1}

                    onChange={NextValue => {
                        setStatus(NextValue)
                    }}>


                    <HStack>
                        <Radio
                            value="Novo"
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
                            value="Usado"
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

                <Title text="Venda" mt={'32px'} />
                <HStack background={'white'} rounded={10} alignItems={'center'} px={5} mt={3}>
                    <Title text="R$" fontWeight={'hairline'} mt={0} />
                    <Input placeholder="Valor do produto" mt={0} />

                </HStack>

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
                <Button type="black" mt={0} py={3} px={12} >Avançar</Button>

            </HStack>
        </ScrollView>
    )
}