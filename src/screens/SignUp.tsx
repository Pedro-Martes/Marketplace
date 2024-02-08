import { Center, HStack, Image, ScrollView, VStack } from "native-base";
import logo from "../assets/logo.png"
import defaultImage from "../assets/iconUser.png";
import { Title } from "../components/title";
import { Subtitle } from "../components/subtitle";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { UserImage } from "../components/userImage";
import { useState } from "react";
import { PencilSimple } from "phosphor-react-native";


export function SignUp() {
    const PHOTO_SIZE = 88
    const [uriAvatar, setUriAvatar] = useState('')
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={5} backgroundColor={'gray.100'}>

                <Center >

                    <Image
                        source={logo}
                        resizeMode="contain"
                        size={20}
                        alt="logo"
                        mt={65}
                    />
                    <Title text="Boas Vindas!" fontSize={'3xl'} color={'blue.primary'} fontFamily={'title'} />
                    <Subtitle text="Crie sua conta e use o espaço para comprar itens variados e vender seus produtos" textAlign={'center'} />

                   

                    <HStack mt={6}>


                        <UserImage
                            source={defaultImage}
                            alt=''
                            w={PHOTO_SIZE}
                            h={PHOTO_SIZE}
                        />

                        <Button  rounded={'full'} h={10} position={'absolute'} ml={PHOTO_SIZE}  >
                            <PencilSimple color="white" size={16} />
                        </Button>

                    </HStack>

                    <Input placeholder="Nome" />
                    <Input placeholder="Email" keyboardType="email-address"/>
                    <Input placeholder="Telefone" keyboardType="number-pad"/>
                    <Input type="password" placeholder="Senha" />
                    <Input type="password" placeholder="Confirmar senha" />
                    <Button w={'100%'} mt={6} type="black" >Criar</Button>
                    
                    <Subtitle text="Já tem uma conta?"  mt={12}/>
                    <Button w={'100%'} type="gray"  mb={8}>Ir para login</Button>


                </Center>
            </VStack>


        </ScrollView>
    )
}