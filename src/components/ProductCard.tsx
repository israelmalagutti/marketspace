import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ProductCondition, ProductDTO } from "@dtos/ProductDTO";

import { UserPhoto } from "./UserPhoto";
import { View, Text, Image, VStack, HStack } from "native-base";

type ProductCardProps = Partial<ProductDTO> & {
  marginRight: number;
};

export function ProductCard({
  id,

  name,
  price,

  isNew,

  thumb,

  marginRight,
}: ProductCardProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleProductScreen = () => {
    navigation.navigate("home");
  };

  const getProductCondition = (): ProductCondition => {
    let condition: Partial<ProductCondition>;
    if (isNew) {
      condition = "new";
    } else {
      condition = "used";
    }

    return condition;
  };

  return (
    <VStack space={1} marginRight={marginRight}>
      <TouchableOpacity
        onPress={handleProductScreen}
        style={{ position: "relative" }}
      >
        <Image
          resizeMode="cover"
          h={112}
          rounded="md"
          style={{ aspectRatio: 1.5 / 1 }}
          src={"https://github.com/israelmalagutti.png"}
        />

        <HStack
          w="full"
          position="absolute"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <UserPhoto isLoading={!thumb} size={6} />

          <View
            py={0.5}
            px={2}
            bgColor={getProductCondition() === "new" ? "blue.500" : "gray.300"}
            rounded="full"
          >
            <Text color="white" fontFamily="heading" fontSize={10}>
              {getProductCondition().toUpperCase()}
            </Text>
          </View>
        </HStack>
      </TouchableOpacity>

      <VStack>
        <Text color="gray.200" fontFamily="body" fontSize="sm">
          {name ?? "Product Name"}
        </Text>

        <HStack alignItems="baseline" space={1}>
          <Text color="gray.100" fontFamily="heading" fontSize="xs">
            R$
          </Text>

          <Text color="gray.100" fontFamily="heading" fontSize="md">
            {price ?? "Product Price"}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
