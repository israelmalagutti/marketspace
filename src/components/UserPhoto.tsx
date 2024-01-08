import { Center, IImageProps, Image, View, useTheme } from "native-base";
import { PencilSimpleLine, User } from "phosphor-react-native";

type ImageProps = IImageProps & {
  size: number;
};

export function UserPhoto({ size, source, ...rest }: ImageProps) {
  const { colors } = useTheme();

  return (
    <View position="relative">
      {source ? (
        <Image
          {...rest}
          alt="Profile picture"
          source={source}
          w={size}
          h={size}
          rounded="full"
        />
      ) : (
        <Center
          w={size}
          h={size}
          bgColor="gray.500"
          rounded="full"
          borderWidth={3}
          borderColor="blue.100"
        >
          <User color={colors.gray[400]} weight="bold" size={48} />
        </Center>
      )}

      <View
        position="absolute"
        right={-8}
        bottom={0}
        p={3}
        bgColor="blue.100"
        rounded="full"
      >
        <PencilSimpleLine color="white" size={16} />
      </View>
    </View>
  );
}
