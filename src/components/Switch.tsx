import { View } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type SwitchProps = TouchableOpacityProps & {
  active: boolean;
};

export function Switch({ active = false, onPress }: SwitchProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View
        flex={1}
        position="relative"
        p={1}
        bgColor={active ? "blue.100" : "gray.500"}
        rounded="full"
        style={{ width: 50 }}
      >
        <View
          alignSelf={active ? "flex-end" : "baseline"}
          h={6}
          w={6}
          bgColor={active ? "white" : "black"}
          rounded="full"
        />
      </View>
    </TouchableOpacity>
  );
}
