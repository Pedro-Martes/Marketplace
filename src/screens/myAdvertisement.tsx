import { Center, CheckIcon, FlatList, HStack, Select, VStack } from "native-base";
import { Title } from "../components/title";
import { Check, Plus } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { Subtitle } from "../components/subtitle";
import { useState } from "react";
import { ProductCard } from "../components/ProductCard";

interface MyAdvertisementProps {

}
export function MyAdvertisement(props: MyAdvertisementProps) {
    const [service, setService] = useState("Todos")

    const Product = [
        {
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
            ativo: false,

        },
        {
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
            status: 'usado',
            price: 100.90,
            troca: true,
            boleto: true,
            pix: true,
            dinheiro: true,
            deposito: true,
            credito: true,
            ativo: true,


        }
    ]




    return (

        <VStack px={8} bg={'gray.200'} flex={1}>

            <HStack mt={16}>

                <Title text="Meus Anúncios" fontSize={20} textAlign={'center'} flex={1} />
                <TouchableOpacity>

                    <Plus />
                </TouchableOpacity>

            </HStack>

            <HStack mt={58}>
                <Subtitle text={`9 anúncios`} flex={1} />


                <Select selectedValue={service} minWidth={111} accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                    bg: "blue.primary",
                    endIcon: <Check color="#ffff" />,
                    borderRadius: 'md'

                }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                    <Select.Item label="Todos" value="Todos" />
                    <Select.Item label="Ativos" value="Ativos" />
                    <Select.Item label="Inativos" value="Inativos" />

                </Select>
            </HStack>

            <FlatList
                data={Product}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <>
                            <ProductCard
                                product={item}
                            />
                        </>
                    )
                }
            }
        />
  

        </VStack>

    )
}