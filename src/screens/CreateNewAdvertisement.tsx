import { HStack, VStack } from "native-base";
import { ArrowLeft, ArrowRight } from "phosphor-react-native";
import { Title } from "../components/title";
import { TouchableOpacity } from "react-native";

interface CreateNewAddProps {

}
export default function CreateNewAd(props : CreateNewAddProps){
    return(
        <VStack bg={'gray.200'} flex={1}>
            <HStack mt={16} alignItems={'center'} >
                <TouchableOpacity style={{flex: 1}}>

            <ArrowLeft />
                </TouchableOpacity>
            <Title text="Criar anúncio" fontSize={20} flex={1} />
            </HStack>

        </VStack>
    )
}