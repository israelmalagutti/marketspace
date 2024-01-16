import { TouchableOpacity } from "react-native";

import { Divider, HStack, Text } from "native-base";

import { MagnifyingGlass, Sliders } from "phosphor-react-native";

type SearchBarProps = {};

export function SearchBar({}: SearchBarProps) {
  return (
    <HStack
      justifyContent="space-between"
      py={4}
      px={5}
      bgColor="gray.700"
      rounded="md"
    >
      <Text color="gray.400" fontFamily="body" fontSize="md">
        Buscar anúncio
      </Text>

      <HStack space={3}>
        <TouchableOpacity activeOpacity={0.7}>
          <MagnifyingGlass weight="bold" />
        </TouchableOpacity>

        <Divider w={0.25} bgColor="gray.400" orientation="vertical" />

        <TouchableOpacity activeOpacity={0.7}>
          <Sliders weight="bold" />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
}
