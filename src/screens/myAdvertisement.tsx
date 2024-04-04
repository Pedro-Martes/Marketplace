import { Center, CheckIcon, FlatList, HStack, Select, VStack, Text } from "native-base";
import { Title } from "../components/title";
import { Check, Plus, SmileyMeh } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { Subtitle } from "../components/subtitle";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { api } from "../services/api";
import { Loading } from "../components/loading";
import { ProductPropsDTO } from "../dtos/ProductDTO";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";


export function MyAdvertisement() {
    const [filter, setFilter] = useState("Todos")
    const [isLoading, setIsLoading] = useState(false)
    const [userProducts, setUserProducts] = useState<ProductPropsDTO[]>([])
    const navigator = useNavigation<AppNavigatorRoutesProps>()



    async function fetchUserProducts() {
        setIsLoading(true);
        try {
            const fetchUserProducts: any = await api.get('/users/products')
            if (filter === "Ativos") {
                const filteredProducts = fetchUserProducts.data.filter(newProducts => { return newProducts.is_active === true })
                return setUserProducts(filteredProducts)
            }

            if (filter === "Inativos") {

                const filteredProducts = fetchUserProducts.data.filter(newProducts => { return newProducts.is_active === false })
                return setUserProducts(filteredProducts)
            }

            setUserProducts(fetchUserProducts.data)

        } catch (error) {
            console.log("Myproducts error: " + error);
        } finally {
            setIsLoading(false)
        }
    }

    function handleProductCard(productId: string) {
        navigator.navigate('MyProduct', {
            id: productId,
        })
    }



    useEffect(() => {
        fetchUserProducts()
    }, [filter])

   

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


                <Select selectedValue={filter} minWidth={111} accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                    bg: "blue.primary",
                    endIcon: <Check color="#ffff" />,
                    borderRadius: 'md'

                }} mt={1} onValueChange={itemValue => setFilter(itemValue)}>
                    <Select.Item label="Todos" value="Todos" />
                    <Select.Item label="Ativos" value="Ativos" />
                    <Select.Item label="Inativos" value="Inativos" />

                </Select>
            </HStack>

            {isLoading ?

                <Loading />
                :

                userProducts.length == 0 ?
                  
                        <Center flex={1}>
                            <HStack>
            
                                <SmileyMeh color="#C4C4CC"/>
                                <Subtitle ml={2} text="Parece que não há nenhum anuncio cadastrado"  color={'#C4C4CC'}/>
                            </HStack>
                        </Center>
                    
                :

                <FlatList
                    data={userProducts}
                    keyExtractor={(item, index) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => {
                        console.log(item);
             
                        return (
                            <>
                                <ProductCard data={item} onPress={() => handleProductCard(item.id)} />
                            </>
                        )
                    }
                    }
                />

            }

        </VStack>

    )
}