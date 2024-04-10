import { Center, HStack, Skeleton, VStack, View } from "native-base";
import { ArrowLeft, PencilSimpleLine } from "phosphor-react-native";
import { Dimensions } from "react-native";

export function ProductSkeleton() {
    const widthScreen = Dimensions.get('window').width
    const heightScreen = Dimensions.get('window').height
    return (
        <VStack flex={1} py={8} bg={'gray.200'} paddingY={8}>
            <HStack>


                <View style={{ margin: 10, flex: 1 }} >
                    <ArrowLeft />

                </View>

                <View style={{ margin: 10, }} >
                    <PencilSimpleLine />
                </View>
            </HStack>
            <Skeleton
                w={widthScreen}
                h={300}

                backgroundColor={'gray.primary'}
            />
            <HStack mt={5} mb={15} p={5}>
                <Skeleton
                    size={12}
                    rounded="full"
                    borderWidth={3}
                    borderColor={'blue.primary'}
                    mr={3}
                    backgroundColor={'gray.primary'}

                />

                <Skeleton
                    w={270}
                    mr={10}
                    backgroundColor={'gray.primary'}
                />

            </HStack>
            <Skeleton
                backgroundColor={'gray.primary'}
                h={10}
                w={270}
                borderRadius={2}

            />

            <Skeleton
                mt={2}
                backgroundColor={'gray.primary'}
                h={10}
                w={200}

            />

            <Skeleton
                backgroundColor={'gray.primary'}
                mt={2}
                h={10}
                w={270}
                borderRadius={2}

            />

            <Skeleton
                mt={2}
                backgroundColor={'gray.primary'}
                h={10}
                w={240}

            />

            <Skeleton
                mt={2}
                backgroundColor={'gray.primary'}
                h={10}
                w={240}

            />
            <HStack>

                <Skeleton
                    flex={1}
                    mt={2}
                    backgroundColor={'gray.primary'}
                    h={30}

                    mr={1}

                />

                <Skeleton
                    mt={2}
                    backgroundColor={'gray.primary'}
                    h={30}


                />
            </HStack>
        </VStack>
    )
}