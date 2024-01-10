import {
  Center,
  IImageProps,
  Image,
  View,
  useTheme,
  Button,
  Skeleton,
} from "native-base";
import { PencilSimpleLine, User } from "phosphor-react-native";

type ImageProps = IImageProps & {
  size: number;

  isEditable?: boolean;
  isLoading: boolean;

  onPress: () => void;
};

export function UserPhoto({
  size,
  source,

  isEditable = false,
  isLoading,

  onPress,

  ...rest
}: ImageProps) {
  const { colors } = useTheme();

  if (isLoading)
    return (
      <View>
        <Skeleton
          w={size}
          h={size}
          rounded="full"
          startColor="gray.400"
          endColor="gray.500"
          borderWidth={3}
          borderColor="blue.100"
        />

        {isEditable && (
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
        )}
      </View>
    );

  return (
    <Button onPress={onPress} position="relative" bgColor="transparent">
      {source ? (
        <Image
          {...rest}
          alt="Profile picture"
          source={source}
          w={size}
          h={size}
          rounded="full"
          borderWidth={3}
          borderColor="blue.100"
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

      {isEditable && (
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
      )}
    </Button>
  );
}
