import { Center, Image, ScrollView, VStack } from "native-base";
import logo from "../assets/logo.png"
import { Title } from "../components/title";
import { Subtitle } from "../components/subtitle";
import { Input } from "../components/input";
import { Button } from "../components/button";

interface SignInProps {

}
export function SignIn(props: SignInProps) {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={8} backgroundColor={'gray.100'}  borderBottomRadius={24}>

                <Center >

                    <Image
                        source={logo}
                        resizeMode="contain"
                        size={32}
                        alt="logo"
                        mt={65}
                    />
                    <Title text="BARGANHA" fontSize={'3xl'} color={'blue.primary'} fontFamily={'title'} />
                    <Subtitle text="Seu espaço de compra e venda" />
                
                <Title text="Sua Conta" fontFamily={'body'} mt={20} mb={8}/>

                <Input placeholder="Email" />
                <Input type="password" placeholder="Senha" mt={8}/>
                <Button w={'100%'}> Entrar</Button>


                </Center>
            </VStack>
            <VStack paddingY={16} paddingX={5}>
                <Center>
                    <Subtitle text="Não tem uma conta? " />
                    <Button type="gray" w={'100%'} > Criar conta</Button>
                </Center>
            </VStack>

        </ScrollView>
    )
}