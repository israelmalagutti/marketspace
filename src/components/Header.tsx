import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { useAuth } from "@hooks/useAuth";

import { Button } from "./Button";
import { UserPhoto } from "./UserPhoto";

import { HStack, Text, VStack, useTheme } from "native-base";
import { Plus } from "phosphor-react-native";

export function Header() {
  const { colors } = useTheme();

  const { user } = useAuth();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const getUserName = () => {
    if (user.name) {
      const splittedName = user.name.split(" ");

      if (splittedName.length > 1) {
        const fistName = splittedName[0];
        return fistName;
      } else {
        return user.name;
      }
    }
  };

  const handleCreateAd = () => {
    navigation.navigate("createAd");
  };

  return (
    <HStack pt={5} px={6} alignItems="center" justifyContent="space-between">
      <HStack space={3} alignItems="center">
        <UserPhoto
          size={45}
          isLoading={!!user}
          source={{ uri: user.avatar }}
          onPress={() => undefined}
        />

        <VStack>
          <Text color="gray.100" fontFamily="body" fontSize="md">
            Boas vindas,
          </Text>

          <Text color="gray.100" fontFamily="heading" fontSize="md">
            {getUserName() || "Ïsrael"}!
          </Text>
        </VStack>
      </HStack>

      <Button
        bgColor="black"
        textColor="gray.700"
        label="Criar anúncio"
        onPress={handleCreateAd}
      >
        <Plus color={colors.gray[700]} size={16} />
      </Button>
    </HStack>
  );
}
