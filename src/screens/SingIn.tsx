import { Center, Image, ScrollView, VStack, useToast } from "native-base";
import logo from "../assets/logo.png"
import { Title } from "../components/title";
import { Subtitle } from "../components/subtitle";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";
import * as yup from 'yup'
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../hooks/useAuth";
import { AppError } from "../utils/AppError";

type FormData = {
    email: string;
    password: string;
}

const signInSchema = yup.object({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Digite uma senha valida').min(6, 'Senha inválido'),

})
export function SignIn() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(signInSchema)
    })
    const { signIn } = useAuth()

    async function handleSignIn({ email, password }: FormData) {
        setIsLoading(true)
        try {
            await signIn(email, password)

        } catch (error) {
            console.log(error.message);
            const isAppError = error.message.includes(404);
            const title= isAppError ? 'E-mail e/ou senha incorreta.' : 'Não foi possível realizar login, tente mais tarde.'
            
            setIsLoading(false)
            toast.show({
                    title,
                    placement: 'top',
                    bgColor:'red.500' , 
            })

            
        }
    }

    function handleNewAccount() {
        navigation.navigate('SignUp');
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={8} backgroundColor={'gray.100'} borderBottomRadius={24}>

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

                    <Title text="Sua Conta" fontFamily={'body'} mt={20} mb={8} />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value }, fieldState }) => (
                            <Input
                                placeholder="Email"
                                onChangeText={onChange}
                                value={value}
                                isRequired
                                errorMessage={fieldState.error?.message}
                                keyboardType="email-address"

                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value }, fieldState }) => (
                            <Input
                                placeholder="Senha"
                                onChangeText={onChange}
                                value={value}
                                isRequired
                                errorMessage={fieldState.error?.message}
                                type="password"

                            />
                        )}
                    />

                    <Button w={'100%'} mb={8} onPress={handleSubmit(handleSignIn)} isLoading = {isLoading}> Entrar</Button>


                </Center>
            </VStack>
            <VStack paddingY={16} paddingX={5}>
                <Center>
                    <Subtitle text="Não tem uma conta? " />
                    <Button type="gray" w={'100%'} onPress={handleNewAccount} disabled= {isLoading} > Criar conta</Button>
                </Center>
            </VStack>

        </ScrollView>
    )
}