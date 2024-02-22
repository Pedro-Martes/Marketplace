import { HStack, Text, VStack, Image, FlatList, TextArea, ScrollView, Radio } from "native-base";
import { ArrowLeft, ArrowRight, Plus, XCircle } from "phosphor-react-native";
import { Title } from "../components/title";
import { TouchableOpacity, View } from "react-native";
import { Subtitle } from "../components/subtitle";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useState } from "react";

interface CreateNewAddProps {

}
export default function CreateNewAd(props: CreateNewAddProps) {
    const PHOTO_SIZE = 100

    const ProductImages = ['https://source.unsplash.com/random/802x602', 'add']
    const [status, setStatus] = useState('Novo')

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
                <TextArea
                    autoCompleteType={false}
                    placeholder="Descrição completa do produto (opcional)"
                    mt={3}
                    backgroundColor={'white'}
                    fontSize={'md'}
                    fontFamily={'body'}
                    placeholderTextColor={'gray.300'}
                    _focus={{
                        borderWidth: '1px',
                        borderColor: 'gray.300',
                        bg: "white"
                    }}
                />

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
                            Produto Novo
                        </Radio>

                        <Radio
                            value="Usado"
                            mt={3}
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

                            Produto  Usado

                        </Radio>

                    </HStack>
                </Radio.Group>


            </VStack >
        </ScrollView>
    )
}