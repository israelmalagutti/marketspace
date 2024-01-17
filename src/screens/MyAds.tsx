import { TouchableOpacity } from "react-native";

import { ProductDTO } from "@dtos/ProductDTO";

import { ProductCard } from "@components/index";
import { View, Text, VStack, HStack, useTheme, FlatList } from "native-base";

import { CaretDown, Plus } from "phosphor-react-native";

const __MY_ADS__: Partial<ProductDTO[]> = [
  {
    id: "1",
    user_id: "1",

    name: "Luminária pendente",
    description: "Something that lights above your table",
    price: "45.0",

    isNew: false,
    acceptTrade: false,

    thumb: "",
  },
  {
    id: "2",
    user_id: "1",

    name: "Coturno Feminino",
    description: "Something to warm your feet",
    price: "80.0",

    isNew: true,
    acceptTrade: false,

    thumb: "",
  },
  {
    id: "3",
    user_id: "1",

    name: "Pink T-Shirt",
    description: "Something to make you look even more beautiful",
    price: "59.9",

    isNew: false,
    acceptTrade: false,

    thumb: "",
  },
  {
    id: "4",
    user_id: "1",

    name: "Rustic Drawer",
    description: "Something to stuff your things at",
    price: "89.9",

    isNew: false,
    acceptTrade: true,

    thumb: "",
  },
  {
    id: "5",
    user_id: "1",

    name: "Cozy Sofa",
    description: "Something to relax on",
    price: "120.0",

    isNew: true,
    acceptTrade: false,

    thumb: "",
  },
];

export function MyAds() {
  const { colors } = useTheme();

  return (
    <VStack flex={1} space={8}>
      <HStack alignItems="center" justifyContent="space-between" pt={5} px={6}>
        <View />

        <Text color="gray.100" fontFamily="heading" fontSize="lg">
          Meus Anúncios
        </Text>

        <TouchableOpacity activeOpacity={0.75}>
          <Plus color={colors.gray[100]} size={24} />
        </TouchableOpacity>
      </HStack>

      <VStack space={5}>
        <HStack alignItems="center" justifyContent="space-between" px={6}>
          <Text color="gray.100" fontFamily="body" fontSize="sm">
            {"X"} anúncios
          </Text>

          <TouchableOpacity
            activeOpacity={0.75}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 12,
              paddingVertical: 8,
              gap: 8,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: colors.gray[500],
            }}
          >
            <Text color="gray.100" fontFamily="body" fontSize="sm">
              {"Todos"}
            </Text>
            <CaretDown color={colors.gray[100]} size={16} />
          </TouchableOpacity>
        </HStack>

        <FlatList
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingBottom: 48,
            rowGap: 24,
          }}
          columnWrapperStyle={{ gap: 24 }}
          numColumns={2}
          data={__MY_ADS__}
          renderItem={({ item }) => <ProductCard showOwner={false} {...item} />}
        />
      </VStack>
    </VStack>
  );
}
