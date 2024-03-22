import { Center, CheckIcon, FlatList, HStack, Select, VStack, Text } from "native-base";
import { Title } from "../components/title";
import { Check, Plus } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { Subtitle } from "../components/subtitle";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { api } from "../services/api";
import { Loading } from "../components/loading";
import { ProductPropsDTO } from "../dtos/ProductDTO";


export function MyAdvertisement() {
    const [service, setService] = useState("Todos")
    const [isLoading, setIsLoading] = useState(false)
    const [userProducts, setUserProducts] = useState<ProductPropsDTO[]>([])


  

    async function fetchUserProducts() {
        setIsLoading(true);
        try {
            const fetchUserProducts:any = await api.get('/users/products')
            console.log(fetchUserProducts.data);
           setUserProducts(fetchUserProducts.data)

        } catch (error) {
            console.log("Myproducts error: " + error);
        } finally {
            setIsLoading(false)
        }
    }



    useEffect(() => {
        fetchUserProducts()
    }, [])



    return (

        <VStack px={8} bg={'gray.200'} flex={1}>

            <HStack mt={16}>

                <Title text="Meus Anúncios" fontSize={20} textAlign={'center'} flex={1} />
                <TouchableOpacity>

                    <Plus />
                </TouchableOpacity>

            </HStack>

            <HStack mt={58}>
                <Subtitle text={`${userProducts.length} anúncios`} flex={1} />


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

            {isLoading ?

                <Loading />
                : 
            <FlatList
            data={userProducts}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({ item }) => {
                console.log(item);
                return (
                    <>
                            <ProductCard data={item} />
                        </>
                    )
                }
            }
            />

        }

        </VStack>

    )
}