import { Center, HStack, Image, ScrollView, VStack, useToast } from "native-base";
import logo from "../assets/logo.png"
import defaultImage from "../assets/iconUser.png";
import { Title } from "../components/title";
import { Subtitle } from "../components/subtitle";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { UserImage } from "../components/userImage";
import { useState } from "react";
import { PencilSimple } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { Control, Controller, useForm } from "react-hook-form";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { AppError } from "../utils/AppError";
import { api } from "../services/api";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    tel: string;

}

const signUpSchema = yup.object({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Digite uma senha valida').min(6, 'Senha dee ter no mínimo 6 caracteres'),
    confirmPassword: yup.string().required('Digite a senha valida').oneOf([yup.ref('password')], 'A confirmação da senha não confere'),
    tel: yup.string().required('Telefone obrigatório'),

})

export function SignUp() {
    const PHOTO_SIZE = 88
    const [uriAvatar, setUriAvatar] = useState('')
    const [userPhoto, setUserPhoto] = useState(`https://avatars.githubusercontent.com/u/38743714?v=4`)
    const [photoIsLoading, setPhotoIsLoading] = useState<Boolean>()
    const [isLoading, setIsLoading] = useState(false)
    const [Avatar, setAvatar] = useState<any>()
    const toast = useToast()

    const navigator = useNavigation()

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    })

    function handleGoBack() {
        navigator.goBack()
    }

    async function handleUserPhotoSelect() {
        setPhotoIsLoading(true)
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [PHOTO_SIZE, PHOTO_SIZE],
                quality: 1,
            });

            if (photoSelected.canceled) {
                return;
            }


            if (photoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
                if (photoInfo.size / 1024 / 1024 > 5) {

                    return toast.show({
                        title: 'Imagem muito grande, escolha uma de no máximo 5MB',
                        bgColor: 'red.500',
                        placement: 'top',
                        duration: 5000,
                    })
                } else {

                    setUserPhoto(photoSelected.assets[0].uri)
                    const fileExtension = photoSelected.assets[0].uri.split('.').pop();
                    const photoName = photoSelected.assets[0].uri.split('/');
                    console.log(photoName[photoName.length - 1]);
                    const AvatarFile = {
                        name: `${photoName[photoName.length - 1]}`,
                        uri: `${photoSelected.assets[0].uri}`,
                        type: `${photoSelected.assets[0].type}/${fileExtension}`
                    } as any
                       
                    setAvatar(AvatarFile)
                }

            }


        } catch (error) {
            console.log(error);
        }
        finally {
            setPhotoIsLoading(false)
        }
    }

    async function handleSubmitSingUp({ name, email, tel, password, confirmPassword, }: FormDataProps) {
        setIsLoading(true)
         
        try {
            const formData = new FormData();
            formData.append('avatar', Avatar);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('tel', tel);
            formData.append('password', password);



            await api.post('/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
            )
            toast.show({
                title: 'Usuário criado com sucesso',
                bgColor: 'green.500',
                placement: 'top',
                duration: 5000,
            })
        }

        catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Houve um erro de comunicação com servidor. Tente novamente mais tarde'
            console.log(error);
            toast.show({
                title: title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false);
        }

    }

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
                            source={{ uri: `${userPhoto}` }}
                            alt=''
                            w={PHOTO_SIZE}
                            h={PHOTO_SIZE}
                        />

                        <Button rounded={'full'} h={10} position={'absolute'} ml={PHOTO_SIZE - 7} bottom={4} onPress={handleUserPhotoSelect}  >
                            <PencilSimple color="white" size={16} />
                        </Button>

                    </HStack>

                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: 'Nome obrigatório' }}
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                                isRequired
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Email"
                                onChangeText={onChange}
                                value={value}
                                isRequired
                                errorMessage={errors.email?.message}
                                keyboardType="email-address"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="tel"
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Telefone"
                                onChangeText={onChange}
                                value={value}
                                isRequired
                                errorMessage={errors.tel?.message}
                                keyboardType="number-pad"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Senha"
                                onChangeText={onChange}
                                value={value}
                                isRequired
                                errorMessage={errors.password?.message}
                                type="password"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Confirmar Senha"
                                onChangeText={onChange}
                                value={value}
                                isRequired
                                errorMessage={errors.confirmPassword?.message}
                                type="password"

                            />
                        )}
                    />


                    <Button
                        w={'100%'}
                        type="black"
                        isLoading={isLoading}
                        onPress={handleSubmit(handleSubmitSingUp)}


                    >
                        Criar
                    </Button>

                    <Subtitle text="Já tem uma conta?" mt={12} />
                    <Button w={'100%'} type="gray" mb={8} onPress={handleGoBack}>Ir para login</Button>


                </Center>
            </VStack>


        </ScrollView>
    )
}