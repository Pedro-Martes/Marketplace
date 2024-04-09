import { Center, HStack, Skeleton, VStack, View } from "native-base";
import { Dimensions } from "react-native";

export function ProductSkeleton() {
    const widthScreen = Dimensions.get('window').width
    const heightScreen = Dimensions.get('window').height
    return (
        <VStack>
            <Skeleton
                w={widthScreen}
                h={300}

                backgroundColor={'gray.300'}
            />
            <HStack mt={5} mb={15} p={5}>
                <Skeleton
                    size={12}
                    rounded="full"
                    borderWidth={3}
                    borderColor={'blue.primary'}
                    mr={3}
                    backgroundColor={'gray.300'}
                />

                <Skeleton
                    w={widthScreen}
                    backgroundColor={'gray.300'}
                />

            </HStack>
            <Skeleton
                backgroundColor={'gray.300'}
                h={heightScreen / 5}

            />

            <Skeleton
                mt={2}
                backgroundColor={'gray.300'}
                h={heightScreen / 2}

            />
        </VStack>
    )
}