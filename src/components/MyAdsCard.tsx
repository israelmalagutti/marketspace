import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { HStack, Text, useTheme, View, VStack } from "native-base";

import { ArrowRight, Tag } from "phosphor-react-native";

type MyAdsCardProps = {
  numberOfAds: number | string;
};

export function MyAdsCard({ numberOfAds }: MyAdsCardProps) {
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleMyAds = () => {
    navigation.navigate("myAds");
  };

  return (
    <HStack
      justifyContent="space-between"
      py={3}
      pr={5}
      pl={4}
      bgColor="blue.100:alpha.10"
      rounded="md"
    >
      <HStack alignItems="center" space={4}>
        <Tag color={colors.blue[500]} weight="bold" />

        <VStack>
          <Text color="gray.200" fontFamily="heading" fontSize="lg">
            {numberOfAds || 4}
          </Text>
          <Text color="gray.200" fontFamily="body" fontSize="xs">
            anúncios ativos
          </Text>
        </VStack>
      </HStack>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleMyAds}
        style={{ justifyContent: "center" }}
      >
        <HStack space={2} alignItems="center">
          <Text color="blue.500">Meus anúncios</Text>
          <ArrowRight color={colors.blue[500]}></ArrowRight>
        </HStack>
      </TouchableOpacity>
    </HStack>
  );
}
