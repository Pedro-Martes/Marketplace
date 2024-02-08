import { Image , IImageProps} from "native-base";

type  UserImageProps = IImageProps & {
size: number;
}
export function UserImage({size, ...rest} : UserImageProps){
    return(
        <Image
        w={size}
        h={size}
        rounded={'full'}
        borderWidth={2}
        borderColor={'blue.primary'}
        m={4}
        background={'gray.200'}
        
        {...rest}
     
        />
    )
}