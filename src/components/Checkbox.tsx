import { View, StyledProps } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  color?: StyledProps["bgColor"];

  active: boolean;
  size?: number;
};

export function Checkbox({
  active = true,
  color,
  size = 5,
  onPress,
  ...rest
}: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} {...rest}>
      <View
        h={size}
        w={size}
        alignItems="center"
        justifyContent="center"
        p={0.5}
        rounded="full"
        borderColor={active ? color ?? "blue.100" : "gray.400"}
        borderWidth={2}
      >
        {active && (
          <View
            w="full"
            h="full"
            rounded="full"
            bgColor={color ?? "blue.100"}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
