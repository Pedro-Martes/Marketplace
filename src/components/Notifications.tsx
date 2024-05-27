import { HStack, Text, IconButton, CloseIcon, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { OSNotification } from 'react-native-onesignal';
import { AppNavigatorRoutesProps } from '../routes/app.routes';
import * as Linking from 'expo-linking';

type Props = {
  onClose: () => void;
  data: OSNotification;
}


export function Notification({ onClose, data }: Props) {

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleOnPress() {

    if(data.launchURL){
      Linking.openURL(data.launchURL);
      onClose();
    }

  }

  return (
    <Pressable w="full" p={4} pt={12} bgColor="rgba(168, 184, 202, 0.8);" position="absolute" zIndex={4} top={0} onPress={handleOnPress}>
      <HStack justifyContent="space-between" alignItems="center">
        <Icon as={Ionicons} name="notifications-outline" size={5} color="black" mr={2} />

        <Text fontSize="md" color="black" flex={1}>
          {data.title}
        </Text>

        <IconButton
          variant="unstyled"
          _focus={{ borderWidth: 0 }}
          icon={<CloseIcon size="3" />}
          _icon={{ color: "coolGray.900" }}
          color="black"
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}